// types.ts

// First, let's define our input structure
export interface PolynomialInput {
    keys: {
      n: number;    // Total number of roots
      k: number;    // Minimum required roots (degree + 1)
    };
    [key: string]: {
      base: string;
      value: string;
    } | PolynomialInput['keys'];
  }
  
  // Define what a successful result looks like
  export interface PolynomialSuccess {
    secret: number;
  }
  
  // Define what an error result looks like
  export interface PolynomialError {
    error: string;
  }
  
  // The result can be either success or error
  export type PolynomialResult = PolynomialSuccess | PolynomialError;
  
  // Point interface for our calculations
  export interface Point {
    x: number;
    y: number;
  }

  // Define the structure of our sample data entries
export interface SampleEntry {
    name: string;
    data: PolynomialInput;
}