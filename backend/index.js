import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
import eventRoutes from "./routes/events.js";
import teamRoutes from "./routes/team.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let dbConnected = false;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    dbConnected = true;
    console.log("✓ MongoDB connected");
  })
  .catch((err) => {
    console.error("✗ MongoDB connection error:", err.message);
  });

// Middleware to check DB connection
app.use((req, res, next) => {
  if (!dbConnected && !req.path.includes("/health")) {
    console.warn(`DB not connected for ${req.method} ${req.path}`);
  }
  next();
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/team", teamRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message, err.stack);
  res.status(err.statusCode || err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});


if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;