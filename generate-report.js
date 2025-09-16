import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { merge } from "mochawesome-merge";
import generator from "mochawesome-report-generator";

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function generateReport() {
  const reportsDir = path.resolve(__dirname, "cypress/reports");
  const mergedReportPath = path.join(reportsDir, "report.json");
  const htmlReportDir = path.join(reportsDir, "html");
  const docsDir = path.resolve(__dirname, "docs");

  try {
    // 1. Clean old reports
    console.log("Cleaning report directory and documentation...");
    execSync("npm run clean:all", { stdio: "inherit" });

    // 2. Run Cypress tests using your e2e-test script
    console.log("Running Cypress tests...");
    execSync("npm run e2e-test", { stdio: "inherit" });

    // 3. Wait a bit for files to be written
    console.log("Waiting for JSON reports to be generated...");
    await delay(2000);

    // 4. Find mochawesome JSON files
    let reportFiles = [];
    try {
      reportFiles = fs
        .readdirSync(reportsDir)
        .filter(
          (file) => file.endsWith(".json") && file.startsWith("mochawesome")
        );
    } catch {
      console.error(
        "Error: The 'cypress/reports' folder was not found or could not be read."
      );
      process.exit(1);
    }

    if (reportFiles.length === 0) {
      console.warn(
        "Warning: No JSON reports found to merge. Skipping report generation."
      );
      process.exit(0);
    }

    const jsonPaths = reportFiles.map((file) => path.join(reportsDir, file));

    // 5. Merge JSON reports
    console.log("Merging report files...");
    const mergedReport = await merge({ files: jsonPaths });
    fs.writeFileSync(mergedReportPath, JSON.stringify(mergedReport, null, 2));

    // 6. Generate HTML report
    console.log("Generating HTML report...");
    await generator.create(mergedReport, {
      reportDir: htmlReportDir,
      inlineAssets: true,
    });

    // 7. Copy report to docs folder
    console.log("Copying the generated report to the docs folder...");
    execSync(`npx cpx "${htmlReportDir}/**/*" "${docsDir}"`, {
      stdio: "inherit",
    });

    console.log("Reporting process completed successfully!");
  } catch (error) {
    console.error(
      "An error occurred during the reporting process:",
      error.message
    );
    process.exit(1);
  }
}

generateReport();
