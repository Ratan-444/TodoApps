import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";

dotenv.config();
const app = express();

// ✅ Allow specific domains (your frontend)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://todoapps-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Root
app.get("/", (req, res) => {
  res.send("✅ Todo App Backend Running 🚀");
});

// MongoDB Connection
let isConnected = false;
export const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, { bufferCommands: false });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

// Export app for Vercel
export default app;

// Local dev
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  });
}
