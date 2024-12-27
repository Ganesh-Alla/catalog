import { NextResponse } from 'next/server';
import { solvePolynomial } from '@/lib/solve';
import { PolynomialInput, PolynomialResult, PolynomialSuccess } from '@/lib/types';

function isPolynomialSuccess(result: PolynomialResult): result is PolynomialSuccess {
  return (result as PolynomialSuccess).secret !== undefined;
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as PolynomialInput;
    const result: PolynomialResult = solvePolynomial(data);
    
    // Use the type guard to check if result is PolynomialSuccess
    if (isPolynomialSuccess(result)) {
      return NextResponse.json({ secret: result.secret });
    }
    
    // If it's not a PolynomialSuccess, it must be a PolynomialError
    return NextResponse.json(
      { error: result.error },
      { status: 400 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Invalid request or internal error' },
      { status: 500 }
    );
  }
}
