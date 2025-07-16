

import React, { useState, useEffect } from 'react';

function ToDoList() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State to manage the new task input value
  const [newTask, setNewTask] = useState("");
  
  // State to toggle between light and dark themes
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On component mount: load saved tasks and theme from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    const storedTheme = localStorage.getItem("theme");
    if (storedTasks) setTasks(storedTasks);
    if (storedTheme) setIsDarkMode(storedTheme === "dark");
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Update theme in localStorage and apply background color
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.style.backgroundColor = isDarkMode ? "hsla(0, 6%, 7%, 1.00)" : "#f2f2f2";
  }, [isDarkMode]);

  // Update new task input field
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  // Delete a task by index
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Move a task up in the list
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  // Move a task down in the list
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  // Toggle the completion status of a task
  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  // Toggle between dark and light mode
  function toggleTheme() {
    setIsDarkMode(prev => !prev);
  }

  return (
    <div className={`to-do-list ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>To-Do List</h1>

      {/* Button to switch theme */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Input field and add button */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>Add</button>
      </div>

      {/* List of tasks */}
      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className={`text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>👆</button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>
          </li>
        )}
      </ol>
    </div>
  );
}

export default ToDoList;
