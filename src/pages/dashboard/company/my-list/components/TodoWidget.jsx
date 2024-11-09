import React, { useState } from 'react';

const TodoWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const addOrUpdateTask = () => {
    if (taskInput.trim()) {
      if (editTaskId) {
        setTasks(tasks.map(task => 
          task.id === editTaskId ? { ...task, text: taskInput, dueDate, priority } : task
        ));
        setEditTaskId(null);
      } else {
        setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false, dueDate, priority }]);
      }
      setTaskInput('');
      setDueDate('');
      setPriority('Medium');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditTask = (task) => {
    setTaskInput(task.text);
    setEditTaskId(task.id);
    setDueDate(task.dueDate);
    setPriority(task.priority);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="font-semibold text-xl mb-4">To-Do List</h2>
      <div className="mt-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded p-2 w-full mb-2">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addOrUpdateTask} className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition">Add/Update Task</button>
      </div>
      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task.id} className={`flex justify-between items-center p-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            <span onClick={() => toggleTaskCompletion(task.id)} className="cursor-pointer">{task.text} (Due: {task.dueDate}, Priority: {task.priority})</span>
            <div>
              <button onClick={() => startEditTask(task)} className="text-blue-500 hover:text-blue-700 transition">Edit</button>
              <button onClick={() => removeTask(task.id)} className="text-red-500 ml-2 hover:text-red-700 transition">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWidget;