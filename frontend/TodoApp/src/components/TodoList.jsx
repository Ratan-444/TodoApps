import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

function TodoList({ todos, refresh }) {
  const toggleTodo = async (id, completed) => {
    await axios.put(`${API_BASE}/api/todos/${id}`, { completed: !completed });
    refresh();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE}/api/todos/${id}`);
    refresh();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} style={{ marginBottom: "10px" }}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => toggleTodo(todo._id, todo.completed)}
          >
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
