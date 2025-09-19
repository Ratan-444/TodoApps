import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todos.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Todo App Backend Running 🚀");
});

// MongoDB connection (serverless-safe)
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

// Export app for Vercel serverless
export default app;

// Optional: For local development
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}
