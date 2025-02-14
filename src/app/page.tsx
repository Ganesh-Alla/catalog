// app/page.tsx
'use client'

import { useState } from 'react'
import { PolynomialInput } from '@/lib/types'

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const validateJSON = (input: string): PolynomialInput => {
    const data = JSON.parse(input);
    if (!data.keys?.n || !data.keys?.k) {
      throw new Error('Invalid JSON structure: missing required keys');
    }
    return data as PolynomialInput;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setIsLoading(true)

    try {
      // Validate JSON before sending
      const validatedInput = validateJSON(jsonInput);
      
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedInput),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to solve polynomial')
      }

      setResult(data.secret)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'An error occurred while solving the polynomial')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Polynomial Solver</h1>
          <p className="text-gray-600 mb-4">
            Enter the JSON data for the polynomial roots. The format should include the number of roots (n)
            and minimum required roots (k).
          </p>
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="json-input" className="block text-sm font-medium text-gray-700">
                JSON Input
              </label>
              <textarea
                id="json-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={`{
  "keys": {
    "n": 4,
    "k": 3
  },
  "1": {
    "base": "10",
    "value": "4"
  },
  ...
}`}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 min-h-[200px] font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !jsonInput.trim()}
              className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                isLoading || !jsonInput.trim()
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Solving...
                </span>
              ) : (
                'Solve Polynomial'
              )}
            </button>
          </form>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Result</h2>
            <div className="bg-gray-100 rounded-lg p-4">
              {result !== null && (
                <div className="space-y-2">
                  <p className="text-gray-600">Constant term (c):</p>
                  <p className="text-2xl font-bold text-green-600">{result}</p>
                </div>
              )}
              {error && (
                <p className="text-red-600">{error}</p>
              )}
              {result === null && !error && (
                <p className="text-gray-500">Submit JSON to see the result</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}