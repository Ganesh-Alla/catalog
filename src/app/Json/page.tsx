// app/page.tsx
'use client'

import { useState } from 'react'
import { samples } from '@/lib/json/sample'
// import { PolynomialInput, PolynomialResult } from '@/lib/types'

export default function Home() {
  // State to manage which sample is selected and the results
  const [selectedSample, setSelectedSample] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setIsLoading(true)

    try {
      // Find the selected sample data
      const selectedData = samples.find(s => s.name === selectedSample)?.data
      
      if (!selectedData) {
        throw new Error('Please select a valid sample')
      }

      // Send the data to our API endpoint
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedData),
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
            Select a sample polynomial to solve and find its constant term.
          </p>
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="sample-select" className="block text-sm font-medium text-gray-700">
                Select Sample
              </label>
              <select
                id="sample-select"
                value={selectedSample}
                onChange={(e) => setSelectedSample(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Choose a sample...</option>
                {samples.map((sample) => (
                  <option key={sample.name} value={sample.name}>
                    {sample.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedSample && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sample Data Preview
                </label>
                <pre className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-lg overflow-auto max-h-[200px] font-mono text-sm">
                  {JSON.stringify(samples.find(s => s.name === selectedSample)?.data, null, 2)}
                </pre>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !selectedSample}
              className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                isLoading || !selectedSample
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
                <p className="text-gray-500">Select a sample and submit to see the result</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}