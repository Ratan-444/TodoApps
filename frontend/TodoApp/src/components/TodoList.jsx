import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

function TodoList({ todos, refresh }) {
  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`${API_BASE}/api/todos/${id}`, {
        completed: !completed,
      });
      refresh();
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/todos/${id}`);
      refresh();
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} style={{ marginBottom: "10px" }}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTodo(todo._id, todo.completed)}
          >
            {todo.title}
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
