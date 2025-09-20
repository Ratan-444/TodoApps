import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow frontend domain (Render frontend)
app.use(cors({
  origin: "https://todoapps-fronte-gmia.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// API Routes
app.use("/api/todos", todoRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("✅ Todo App Backend Running on Vercel 🚀");
});

// MongoDB connection
if (!global.mongoose) {
  global.mongoose = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export default app;
