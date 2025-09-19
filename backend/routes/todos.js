import express from "express";
import Todo from "../models/Todo.js";
import { connectDB } from "../index.js";

const router = express.Router();

// Create Todo
router.post("/", async (req, res) => {
  try {
    await connectDB();
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Todos
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Todo
router.put("/:id", async (req, res) => {
  try {
    await connectDB();
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Todo
router.delete("/:id", async (req, res) => {
  try {
    await connectDB();
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
