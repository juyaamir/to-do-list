import React, { useEffect, useState } from 'react';

/**
 * Layout component for the to-do list application.
 */
const Layout = () => {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('to-do-list'));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  /** 
   * Handles the form submission event.
   */
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask || newTask.trim() === '') return;
    const updatedTaskList = [...taskList, newTask];
    localStorage.setItem('to-do-list', JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
    setNewTask('');
  };

  const handleDeleteAllTasks = () => {
    localStorage.removeItem('to-do-list');
    setTaskList([]);
  };

  /*
    Deletes a task from the task list.
   */
  const handleDeleteTask = (index) => {
    const updatedTaskList = taskList.filter((_, ind) => ind !== index);
    setTaskList(updatedTaskList);
    localStorage.setItem('to-do-list', JSON.stringify(updatedTaskList));
  };

  /*
    Handles the edit action for a specific item.
   */
  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTaskValue(taskList[index]);
  };

  /*
   #Handles the update button click event.
   */
  const handleUpdateTask = (index) => {
    const updatedTaskList = taskList.map((task, i) => (i === index ? editTaskValue : task));
    setTaskList(updatedTaskList);
    localStorage.setItem('to-do-list', JSON.stringify(updatedTaskList));
    setEditIndex(null);
    setEditTaskValue('');
  };

  return (
    <div>
      <h1 className='text-5xl font-bold text-center mt-36'>To-Do List</h1>
      <form onSubmit={handleAddTask} className='border-2 border-gray-600 mx-auto my-6 container p-4 rounded-lg'>
        <div className='flex flex-wrap gap-4'>
          <input
            type="text"
            className="border border-gray-300 flex-grow p-2 rounded"
            value={newTask}
            placeholder='Enter your task here'
            onChange={handleNewTaskChange}
          />
          <button type='submit' className='border border-gray-300 p-2 bg-green-400'>
            Add Task
          </button>
          <button
            type='button'
            onClick={handleDeleteAllTasks}
            className='border border-gray-300 p-2 bg-red-500 text-white'
          >
            Delete All
          </button>
        </div>
      </form>
      <ul className='border-2 border-gray-600 mx-auto my-6 container p-4 rounded-lg'>
        {taskList.map((task, index) => (
          <li key={index} className='flex gap-4'>
            {editIndex === index ? (
              <input
                type="text"
                value={editTaskValue}
                className='px-2 py-4 border-b border-gray-300 my-2 flex-grow bg-gray-100'
                onChange={(e) => setEditTaskValue(e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={task}
                className='px-2 py-4 border-b border-gray-300 my-2 flex-grow bg-gray-100'
                readOnly
              />
            )}
            {editIndex === index ? (
              <button className='border border-gray-300 py-2 px-4 bg-lime-500 text-white' onClick={() => handleUpdateTask(index)}>Update</button>
            ) : (
              <button className='border border-gray-300 py-2 px-4 bg-orange-400 text-white' onClick={() => handleEditTask(index)}>Edit</button>
            )}
            <button className='border border-gray-300 py-2 px-4 bg-red-400 text-white' onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layout;