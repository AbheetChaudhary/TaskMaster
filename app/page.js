'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addTodo = (task, text) => {
    const newTodo = { id: Date.now(), task, text };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddTodo = () => {
    if (text.trim() !== '' && task.trim() !== '') {
      addTodo(task, text);
      setText('');
      setTask('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <div class='flex px-4 py-2 bg-indigo-800 text-white rounded-xl border-2 border-black'>
        <input
          className='text-secondary rounded-xl h-12'
          type='text'
          value={task}
          onChange={handleTaskChange}
          placeholder='Enter task name...'
        />
        <input
          className='text-black rounded-xl h-12'
          type='text'
          value={text}
          onChange={handleTextChange}
          placeholder='Enter a new todo...'
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.task}</p>
            <p>{todo.text}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
