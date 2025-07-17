require("dotenv").config({ path: "./server/.env" });

const mongoose = require("mongoose");
const app = require("./app");
const { fetchAndStoreImages } = require("./services/imageService");
const { fetchAndStoreVideos } = require("./services/videoService");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    console.log("🌐 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    console.log("📸 Fetching and storing images...");
    await fetchAndStoreImages(); // ✅ sadece burada çağrılıyor

    console.log("🎥 Fetching and storing videos...");
    await fetchAndStoreVideos();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
