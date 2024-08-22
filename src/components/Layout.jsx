import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineAddTask } from "react-icons/md";
/*
 Layout component for the to-do list application.
 */
const Layout = () => {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('to-do-list'));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  /*
   Handles the form submission event.
   */
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask || newTask.trim() === '') return setWarning(true);
    const updatedTaskList = [...taskList, newTask];
    localStorage.setItem('to-do-list', JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
    setNewTask('');
    setWarning(false);
  };

  const handleDeleteAllTasks = () => {
    localStorage.removeItem('to-do-list');
    setTaskList([]);
    setCompletedTasks(new Set());
  };

  /*
    Deletes a task from the task list.
   */
  const handleDeleteTask = (index) => {
    const updatedTaskList = taskList.filter((_, ind) => ind !== index);
    setTaskList(updatedTaskList);
    localStorage.setItem('to-do-list', JSON.stringify(updatedTaskList));
    setCompletedTasks((prev) => {
      const newCompletedTasks = new Set(prev);
      newCompletedTasks.delete(index);
      return newCompletedTasks;
    });
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

  /*
    Handles the checkbox change event.
   */
  const handleCheckboxChange = (index) => {
    setCompletedTasks((prev) => {
      const newCompletedTasks = new Set(prev);
      if (newCompletedTasks.has(index)) {
        newCompletedTasks.delete(index);
      } else {
        newCompletedTasks.add(index);
      }
      return newCompletedTasks;
    });
  };

  return (
    <div className='main-container'>
      <h1 className='text-5xl font-bold text-center mt-14 mb-9'>To-Do List</h1>
      <div className='border border-gray-600 mx-auto container p-6 rounded-lg shadow-2xl '>

      <form onSubmit={handleAddTask} >
        <div className='flex flex-wrap gap-4  justify-evenly'>
          <input
            type="text"
            className="border border-gray-300 flex-grow p-2 rounded text-wrap form-input"
            value={newTask}
            placeholder='Enter your task here'
            onChange={handleNewTaskChange}
          />
          <button type='submit' className='text-white  bg-green-500 hover:bg-green-600 hover:scale-110 rounded-md p-2 add-btn'>
            <MdOutlineAddTask size='2em' title='Add task' />
          </button>
          <button
            type='button'
            onClick={handleDeleteAllTasks}
            className='border border-gray-300 p-2 bg-red-500 text-white hover:bg-red-600 hover:scale-110 rounded-md delete-all-btn'
            title='Delete all tasks'
          >
            Delete All
          </button>
        </div>
        { warning && <p className='text-red-600 pt-1'><sup>*</sup> Enter your task and then click the add button</p>}
      </form>
      <div className='border  border-t-black my-8 border-dashed '>
        {taskList.map((task, index) => (
          <div key={index} className='flex flex-wrap md:gap-2 lg:gap-4 border-b border-gray-300 tasks text-wrap mt-3'>
            <input
              type="checkbox"
              className='text-wrap border border-red-400 text-red-500 w-8'
              checked={completedTasks.has(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            {editIndex === index ? (
              <input
                type="text"
                value={editTaskValue}
                className={`text-wrap p-2 my-2 flex-grow ${completedTasks.has(index) ? 'line ' : ''}`}
                onChange={(e) => setEditTaskValue(e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={task}
                className={`p-2  text-wrap my-2 flex-grow bg-gray-50 ${completedTasks.has(index) ? 'line' : ''}`}
                readOnly
              />
            )}
            {editIndex === index ? (
              <button className=' p-2  text-green-500 hover:text-green-600 hover:scale-110 update-btn' 
              onClick={() => handleUpdateTask(index)}><GrUpdate size='2em' title='Update task' /></button>
            ) : (
              <button className=' p-2   text-orange-500 hover:text-orange-600 hover:scale-110 ' 
              onClick={() => handleEditTask(index)}> <BiSolidEdit size='2em' title='Edit task' /></button>
            )}
            <button className=' p-2  text-red-500 hover:text-red-600 hover:scale-110 ' 
            onClick={() => handleDeleteTask(index)}><RiDeleteBin5Line size='2em' title='delete task'/></button>
          </div>
        ))}
      </div>
      </div>
      

    </div>
  );
};

export default Layout;