import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text); // sends as 'title'
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter todo..." 
        style={{ padding: "10px", width: "250px" }}
      />
      <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>Add</button>
    </form>
  );
}

export default TodoForm;
