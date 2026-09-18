# IT313 Enrollment Eligibility Checker (TypeScript)

## Problem
The registrar provides a raw list of enrollee records, each with prelim, midterm, and final grades. This program calculates each enrollee's average and reports whether they are PASSING (average of 75 or higher) or on PROBATION, along with the overall class average and passing count — now fully typed in TypeScript so type-related bugs are caught before the code ever runs.

## TypeScript concepts applied
- **Basic type annotations** — every function parameter and return value (`computeAverage`, `getStatus`, `getEnrollees`, `groupBy`) is explicitly typed.
- **Interfaces** — `Enrollee` describes the raw registrar record; `EligibilityReport` describes the processed output, including an optional `remarks` property set only for enrollees on `PROBATION`.
- **Enum** — `EnrollmentStatus` (`Passing`, `Probation`) replaces the raw strings from the Lab 2 JavaScript version, so status can only ever be one of two known values.
- **Union type + narrowing** — a simulated `batchId: string | number` is narrowed with a `typeof` check before being used as a single consistent string.
- **Generics** — `groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]>` groups the typed report entries by status without being tied to one specific type.
- **Type alias vs. interface** — `EligibilityReport` is an interface (an extensible object shape); the `batchId` union is a type alias, since a union of primitives can't be expressed as an interface.

## Approach
- `types.ts` exports the `EnrollmentStatus` enum and the `Enrollee` / `EligibilityReport` interfaces.
- `gradeUtils.ts` exports a named function `computeAverage(prelim, midterm, final): number` and a default function `getStatus(average): EnrollmentStatus`.
- `index.ts` imports both, simulates fetching enrollee data from a "registrar API" via `getEnrollees(): Promise<Enrollee[]>`, and awaits it inside an `async` function wrapped in `try/catch` so a failed fetch is caught and reported instead of crashing the program.
- Each enrollee record is destructured, then `.map()` builds a typed array of `EligibilityReport` objects using the imported functions.
- `groupBy` (generic) buckets the typed reports by status; `.reduce()` calculates the class average; template literals format and print the final report.

## How to run
1. Make sure Node.js is installed.
2. In the project folder, run:
   npm install
3. Type-check with zero errors:
   npx tsc --noEmit
4. Run the program:
   npx ts-node index.ts
5. The formatted eligibility report will print to the console after a short simulated delay.

## Files
- `types.ts` — `EnrollmentStatus` enum, `Enrollee` and `EligibilityReport` interfaces
- `gradeUtils.ts` — exports `computeAverage` (named) and `getStatus` (default)
- `index.ts` — main script: fetches data, processes it, and prints the report
- `tsconfig.json` — strict mode enabled
