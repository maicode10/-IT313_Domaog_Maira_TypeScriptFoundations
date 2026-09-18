export enum EnrollmentStatus {
    Passing = "PASSING",
    Probation = "PROBATION",
}

export interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

export interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}
