import React from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const handleChange = () => {
    updateTodo(todo._id, { ...todo, completed: !todo.completed });
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleChange} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
