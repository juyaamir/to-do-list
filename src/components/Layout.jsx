import React, { useEffect, useState } from 'react';

const Layout = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);
  const [toggleEditButton, setToggleEditButton] = useState(true)
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('to-do-list'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || task.trim() === '') return alert('Please enter a task!');
    const newTasks = [...tasks, task];
    localStorage.setItem('to-do-list', JSON.stringify(newTasks));
    setTasks(newTasks);
    setTask('');
  };

  const handleDeleteAll = () => {
    localStorage.removeItem(`to-do-list`);
    setTasks([]);
  };

  const handleDeleteTask = (index) => {
    
    const updateTasks = tasks.filter((_, ind) => ind !== index);
    setTasks(updateTasks);
    localStorage.setItem('to-do-list', JSON.stringify(updateTasks))
  }

  const handleEdit = () => {
    setToggleEditButton(false);
    setToggleButton(true);
  }

  const handleUpdateButton = () => {
    setToggleButton(false);
    setToggleEditButton(true);
  }

  return (
    <div>
      <h1 className='text-5xl font-bold text-center mt-36'>To-Do List</h1>
      <form onSubmit={handleSubmit} className='border-2 border-gray-600 mx-auto my-6 container p-4 rounded-lg'>
        <div className='flex flex-wrap gap-4'>
          <input
            type="text"
            className="border border-gray-300 flex-grow p-2 rounded"
            value={task}
            placeholder='Enter your task here'
            onChange={(e) => setTask(e.target.value)}
          />
          <button type='submit' className='border border-gray-300 p-2 bg-green-400'>
            Add Task
          </button>
          <button
            type='button'
            onClick={handleDeleteAll}
            className='border border-gray-300 p-2 bg-red-500 text-white'
          >
            Delete All
          </button>
        </div>
      </form>
      <ul className='border-2 border-gray-600 mx-auto my-6 container p-4 rounded-lg'>
        {tasks.map((task, index) => (
          <li key={index} className='flex gap-4'>
          <input type="text" value={task} className='px-2 py-4 border-b border-gray-300 my-2 read-only flex-grow bg-gray-100'/>
          
          {toggleButton && <button className='border border-gray-300 py-2 px-4 bg-lime-500 text-white' onClick={handleUpdateButton} >Update</button>}
          {toggleEditButton && <button className='border border-gray-300 py-2 px-4 bg-orange-400 text-white' onClick={handleEdit}>Edit</button>}
          <button className='border border-gray-300 py-2 px-4 bg-red-400 text-white'
          onClick={()=> handleDeleteTask(index)}
          >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layout;
