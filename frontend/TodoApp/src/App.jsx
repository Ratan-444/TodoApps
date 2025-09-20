import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

// Replace with your Vercel backend URL after deployment
const API_URL = "https://your-vercel-backend.vercel.app/api/todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(res => setTodos(res.data));
  }, []);

  const addTodo = async (text) => {
    const res = await axios.post(API_URL, { text });
    setTodos([...todos, res.data]);
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
