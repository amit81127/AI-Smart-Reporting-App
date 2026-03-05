const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Load Envs
dotenv.config();

// Connect DB
connectDB().then(() => {
    console.log("Database connection sequence complete.");
}).catch(err => {
    console.error("Critical Database connection error:", err.message);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Stats/Health Route
app.get("/api/status", (req, res) => {
  res.json({ 
    status: "working", 
    timestamp: new Date(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Smart Campus Hackathon API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is up and listening on http://0.0.0.0:${PORT}`);
  console.log(`🔌 You can access it locally at http://localhost:${PORT}`);
});
