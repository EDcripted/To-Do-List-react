import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load tasks & theme on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    const storedTheme = localStorage.getItem("theme");
    if (storedTasks) setTasks(storedTasks);
    if (storedTheme) setIsDarkMode(storedTheme === "dark");
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme to localStorage and update body class for gradient switch
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Toggle background gradient via body class
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function toggleTheme() {
    setIsDarkMode(prev => !prev);
  }

  return (
    <div className={`to-do-list ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>E-day List</h1>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) => (
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
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
