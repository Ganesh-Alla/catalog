// app/api/solve/route.ts
import { NextResponse } from 'next/server';
import { solvePolynomial } from '@/lib/solve';
import { PolynomialInput, PolynomialResult } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const data = await request.json() as PolynomialInput;
    const result: PolynomialResult = solvePolynomial(data);
    
    // Type guard to check if we have an error result
    if ('error' in result && result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    // At this point, TypeScript knows result must be a PolynomialSuccess
    return NextResponse.json({ secret: result.secret });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Invalid request or internal error' },
      { status: 500 }
    );
  }
}