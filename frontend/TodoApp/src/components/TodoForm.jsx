import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

function TodoForm({ refresh }) {
  const [text, setText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(`${API_BASE}/api/todos`, { text });
    setText("");
    refresh();
  };

  return (
    <form onSubmit={addTodo} style={{ marginBottom: "20px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo"
        style={{ padding: "8px", width: "70%" }}
      />
      <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
