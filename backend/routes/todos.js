import express from "express";
import Todo from "../models/Todo.js";
import { connectDB } from "../index.js";

const router = express.Router();

// ✅ Middleware: ensure DB connection for every request
router.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }
});

// Create Todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error("Create Todo Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error("Get Todos Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update Todo
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update Todo Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete Todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Delete Todo Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
