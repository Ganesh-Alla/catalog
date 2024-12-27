// lib/solve.ts
import { PolynomialInput, PolynomialResult, Point } from '@/lib/types';

// Helper function to convert numbers from any base to decimal
function convertToDecimal(value: string, base: string): number {
  const baseNum = parseInt(base, 10);
  const result = parseInt(value, baseNum);
  
  if (!value || !base || isNaN(baseNum) || isNaN(result)) {
    throw new Error(`Invalid conversion: value=${value}, base=${base}`);
  }
  
  return result;
}

// Lagrange interpolation implementation
function lagrangeInterpolation(points: Point[]): (x: number) => number {
  return (x: number): number => {
    let result = 0;
    
    for (let i = 0; i < points.length; i++) {
      let term = points[i].y;
      for (let j = 0; j < points.length; j++) {
        if (j !== i) {
          term *= (x - points[j].x) / (points[i].x - points[j].x);
        }
      }
      result += term;
    }
    
    return Math.round(result);
  };
}

// Main solver function with proper error handling and typing
export function solvePolynomial(data: PolynomialInput): PolynomialResult {
  try {
    // Validate input structure
    if (!data.keys?.k || !data.keys?.n) {
      return { error: 'Invalid input structure' };
    }

    const points: Point[] = [];
    const { k } = data.keys;

    // Convert and collect points
    for (let i = 1; i <= k; i++) {
      const item = data[i.toString()];
      if (!item || 'n' in item) {
        return { error: `Missing data point at position ${i}` };
      }

      try {
        const y = convertToDecimal(item.value, item.base);
        points.push({ x: i, y });
      } catch (err) {
        console.log(err)
        return { error: `Invalid data point at position ${i}` };
      }
    }

    // Ensure we have enough points
    if (points.length < k) {
      return { error: `Insufficient points: needed ${k}, got ${points.length}` };
    }

    // Calculate polynomial and find constant term
    const polynomial = lagrangeInterpolation(points);
    const constantTerm = polynomial(0);

    // Return successful result
    return { secret: constantTerm };
    
  } catch (err) {
    console.log(err)
    return { error: 'Failed to solve polynomial' };
  }
}