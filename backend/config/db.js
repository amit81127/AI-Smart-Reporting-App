const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("❌ MONGO_URI is missing from .env file!");
        return;
    }
    
    // Log redacted URI for debugging
    const redactedUri = uri.replace(/\/\/.*@/, "//****:****@");
    console.log(`Attempting to connect to MongoDB: ${redactedUri}`);

    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    if (error.message.includes("IP addr")) {
        console.error("👉 TIP: This looks like a MongoDB Atlas IP Whitelist issue. Please allow all IP addresses (0.0.0.0/0) in your Atlas dashboard.");
    }
  }
};

module.exports = connectDB;
