import express from "express";
import Todo from "../models/Todo.js";
import { connectDB } from "../index.js";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  await connectDB();
  const todos = await Todo.find();
  res.json(todos);
});

// Add new todo
router.post("/", async (req, res) => {
  await connectDB();
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

// Update todo
router.put("/:id", async (req, res) => {
  await connectDB();
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(updated);
});

// Delete todo
router.delete("/:id", async (req, res) => {
  await connectDB();
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
