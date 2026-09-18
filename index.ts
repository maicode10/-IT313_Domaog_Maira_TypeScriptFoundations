import { computeAverage } from "./gradeUtils.js";
import getStatus from "./gradeUtils.js";
import type { Enrollee, EligibilityReport } from "./types.js";
import { EnrollmentStatus } from "./types.js";

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
       resolve(enrollees);
    }, 1000);
  });
}

function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

async function generateReport(): Promise<void> {
  try {
    const data = await getEnrollees();

    let batchId: string | number = Math.random() < 0.5 ? "BATCH-2026-A" : 2026;

    let batchLabel: string;
    if (typeof batchId === "string") {
      batchLabel = batchId;
    } else {
      batchLabel = `BATCH-${batchId}`;
    }

    const results: EligibilityReport[] = data.map((enrollee) => {
      const { name, prelim, midterm, final } = enrollee;
      const average = computeAverage(prelim, midterm, final);
      const status = getStatus(average);
      const report: EligibilityReport = { name, average, status };
      if (status === EnrollmentStatus.Probation) {
        report.remarks = "Needs consultation";
      }
      return report;
    });

    const grouped = groupBy(results, (r) => r.status);

    const classAverage =
      results.reduce((sum, r) => sum + r.average, 0) / results.length;

    console.log(`Batch ID received: ${batchLabel}`);
    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");
    results.forEach((r) => {
      const remarksText = r.remarks ? ` - ${r.remarks}` : "";
      console.log(`${r.name} - Average: ${r.average.toFixed(2)} - ${r.status}${remarksText}`);
    });
    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${grouped[EnrollmentStatus.Passing]?.length ?? 0} / ${results.length}`);
  } catch (error) {
    console.log("Failed to fetch enrollee data:", (error as Error).message);
  }
}

generateReport();