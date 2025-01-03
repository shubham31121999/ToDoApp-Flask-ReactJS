import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';

function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch todos from backend
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/todos');
      setTodos(data);
    } catch (err) {
      setError('Error fetching todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos/stats/daily');
      console.log('Stats response:', response.data);  // Log the response to see the actual data
      setStats(response.data);  // Ensure stats are set properly
    } catch (err) {
      setError('Error fetching stats');
      console.error(err);
    }
  };

  // Load todos and stats on mount
  

  // Create new Todo
  const createTodo = async (todo) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/todos', todo);
      setTodos(prevTodos => [...prevTodos, data]);
    } catch (err) {
      setError('Error creating todo');
      console.error(err);
    }
  };

  // Update Todo status (done/rejected)
  const updateTodo = async (id, updatedData) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedData);
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? data : todo));
    } catch (err) {
      setError('Error updating todo');
      console.error(err);
    }
  };

  // Delete a Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Error deleting todo');
      console.error(err);
    }
  };
  

  // Toggle Done status (Complete/Rejected)
  const toggleDone = (id, currentStatus) => {
    const updatedStatus = { done: !currentStatus };
    updateTodo(id, updatedStatus);
  };

  // Fetch stats from backend
  
  return (
    <div className="App">
      <h1>ToDo List</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoForm createTodo={createTodo} />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        toggleDone={toggleDone}  // Pass toggleDone function to TodoList
      />
      <TodoStats stats={stats} />
    </div>
  );
}

export default App;
