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
    console.log("Rapor klasörü ve belgeleri temizleniyor...");
    execSync("npm run clean:all", { stdio: "inherit" });

    // 2. Run Cypress tests
    console.log("Cypress testleri çalıştırılıyor...");
    execSync("npm run cypress:run", { stdio: "inherit" });

    // 3. Wait a bit for files to be written
    console.log("JSON raporlarının oluşturulması bekleniyor...");
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
        "Hata: 'cypress/reports' klasörü bulunamadı veya okunamadı."
      );
      process.exit(1);
    }

    if (reportFiles.length === 0) {
      console.warn(
        "Uyarı: Birleştirilecek JSON raporu bulunamadı. Raporlama atlanıyor."
      );
      process.exit(0);
    }

    const jsonPaths = reportFiles.map((file) => path.join(reportsDir, file));

    // 5. Merge JSON reports
    console.log("Rapor dosyaları birleştiriliyor...");
    const mergedReport = await merge({ files: jsonPaths });
    fs.writeFileSync(mergedReportPath, JSON.stringify(mergedReport, null, 2));

    // 6. Generate HTML report
    console.log("HTML raporu oluşturuluyor...");
    await generator.create(mergedReport, {
      reportDir: htmlReportDir,
      inlineAssets: true,
    });

    // 7. Copy report to docs folder
    console.log("Oluşturulan rapor docs klasörüne kopyalanıyor...");
    execSync(`npx cpx "${htmlReportDir}/**/*" "${docsDir}"`, {
      stdio: "inherit",
    });

    console.log("Raporlama işlemi başarıyla tamamlandı!");
  } catch (error) {
    console.error("Raporlama işlemi sırasında bir hata oluştu:", error.message);
    process.exit(1);
  }
}

generateReport();
