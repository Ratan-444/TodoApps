import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow your frontend origin explicitly
app.use(cors({
  origin: ["https://todoapps-fronte-gmia.onrender.com"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Important: API route
app.use("/api/todos", todoRoutes);

// Root
app.get("/", (req, res) => {
  res.send("✅ Todo App Backend Running on Vercel 🚀");
});

// ✅ MongoDB connection
if (!global.mongoose) {
  global.mongoose = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export default app;
