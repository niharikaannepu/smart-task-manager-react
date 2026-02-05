import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { text, progress: 0 }]);
  };

  const updateProgress = (index, value) => {
    const updated = [...tasks];
    updated[index].progress = value;
    setTasks(updated);
  };

  const updateTaskName = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // 🔍 Search + Filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    let status = "pending";
    if (task.progress === 100) status = "completed";
    else if (task.progress > 0) status = "in-progress";

    const matchesFilter =
      filter === "all" || filter === status;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page">
      <div className="app-container">
        <h1>Smart Task Manager</h1>

        {/* Search + Filter */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <TaskInput addTask={addTask} />

        <TaskList
          tasks={filteredTasks}
          updateProgress={updateProgress}
          updateTaskName={updateTaskName}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
