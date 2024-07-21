import React, { useState, useEffect } from 'react';
import axios from './axios';
import TodoItem from './components/TodoItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  const addTodo = () => {
    axios.post('/todos', { title })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.log(error));
  };

  const updateTodo = (id, updatedTodo) => {
    axios.put(`/todos/${id}`, updatedTodo)
      .then(response => setTodos(todos.map(todo => todo._id === id ? response.data : todo)))
      .catch(error => console.log(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};

export default App;
