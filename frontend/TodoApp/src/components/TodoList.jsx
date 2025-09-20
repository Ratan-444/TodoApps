import React from "react";

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map(todo => (
        <li key={todo._id} style={{ margin: "10px 0" }}>
          <span 
            onClick={() => toggleTodo(todo._id, todo.completed)} 
            style={{ 
              textDecoration: todo.completed ? "line-through" : "none", 
              cursor: "pointer", 
              marginRight: "15px" 
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo._id)} style={{ color: "red" }}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
