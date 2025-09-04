const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { merge } = require("mochawesome-merge");
const reportGenerator = require("mochawesome-report-generator");

// Gelişmiş bekleme (delay) fonksiyonu
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function generateReport() {
  const reportsDir = path.resolve(__dirname, "cypress/reports");
  const mergedReportPath = path.join(reportsDir, "report.json");
  const htmlReportDir = path.join(reportsDir, "html");
  const docsDir = path.resolve(__dirname, "docs");

  try {
    // 1. Önceki raporları temizle
    console.log("Rapor klasörü ve belgeleri temizleniyor...");
    execSync("npm run clean:all", { stdio: "inherit" });

    // 2. Cypress testlerini çalıştır
    console.log("Cypress testleri çalıştırılıyor...");
    execSync("npm run cypress:run", { stdio: "inherit" });

    // 3. Dosyaların yazılması için biraz bekleme
    console.log("JSON raporlarının oluşturulması bekleniyor...");
    await delay(2000); // 2 saniye bekleme, gerekirse artırılabilir.

    // 4. Mochawesome JSON dosyalarını bul
    let reportFiles = [];
    try {
      reportFiles = fs
        .readdirSync(reportsDir)
        .filter(
          (file) => file.endsWith(".json") && file.startsWith("mochawesome")
        );
    } catch (e) {
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

    // 5. JSON dosyalarını birleştir
    console.log("Rapor dosyaları birleştiriliyor...");
    const mergedReport = await merge({ files: jsonPaths });
    fs.writeFileSync(mergedReportPath, JSON.stringify(mergedReport, null, 2));

    // 6. Birleştirilmiş JSON'dan HTML raporu oluştur
    console.log("HTML raporu oluşturuluyor...");
    await reportGenerator.create(mergedReport, {
      reportDir: htmlReportDir,
      inlineAssets: true,
    });

    // 7. Raporu docs klasörüne kopyala
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
