'use client';

import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addTodo = (task, description) => {
    const newTodo = { id: Date.now(), task, description };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddTodo = () => {
    if (description.trim() !== '' && task.trim() !== '') {
      addTodo(task, description);
      setDescription('');
      setTask('');
    } else if (task.trim() !== '') {
      addTodo(task, ';)');
      setDescription('');
      setTask('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className='w-4/5 mx-auto'>
      <div class='flex mt-10 px-2 py-2 bg-black rounded-xl gap-4'>
        <div className='flex flex-col flex-auto'>
          <input
            className='text-secondary bg-gray-300 rounded-md h-8 mb-4 p-2'
            type='text'
            value={task}
            onChange={handleTaskChange}
            placeholder='Enter task...'
          />
          <textarea
            className='text-black bg-gray-300 rounded-md h-24 text-left p-2'
            value={description}
            onChange={handleDescriptionChange}
            placeholder='Enter optional description...'
          />
        </div>
        <button onClick={handleAddTodo} className='mr-3'>
          <AddIcon icon={<IoMdAdd size={36} />} />
        </button>
      </div>
      <ul className='flex flex-col h-screen mt-4 mb-16 gap-4'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='flex flex-col border-2 border-gray-700 rounded-lg p-4'
          >
            <div className='flex justify-between'>
              <p className='font-sans text-3xl font-bold dark:text-gray-300 text-black'>
                {todo.task}
              </p>
              <button onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon icon={<MdDelete size={28} />} />
              </button>
            </div>
            <div>
              <hr class='w-full h-1 mx-auto my-2 border-0 rounded md:my-4 dark:bg-gray-70 bg-gray-700' />
              <p className='font-sans dark:text-gray-300 text-black'>{todo.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const AddIcon = ({ icon, text = 'add task' }) => (
  <div className='addtask-icon group'>
    {icon}
    <span className='addtask-icon-tooltip hover:scale-100'>{text}</span>
  </div>
);

const DeleteIcon = ({ icon, text = 'delete task' }) => (
  <div className='deltask-icon group'>
    {icon}
    <span className='deltask-icon-tooltip hover:scale-100'>{text}</span>
  </div>
);
