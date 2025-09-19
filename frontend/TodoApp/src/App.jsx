import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${API_BASE}/api/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>📝 MERN Todo App</h1>
      <TodoForm refresh={fetchTodos} />
      <TodoList todos={todos} refresh={fetchTodos} />
    </div>
  );
}

export default App;
