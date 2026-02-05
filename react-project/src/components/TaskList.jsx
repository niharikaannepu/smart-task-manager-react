import React, { useState } from "react";

function TaskList({
  tasks,
  updateProgress,
  updateTaskName,
  deleteTask,
}) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <ul>
      {tasks.map((task, index) => {
        let status = "Pending";
        if (task.progress === 100) status = "Completed";
        else if (task.progress > 0) status = "In Progress";

        let color = "#f44336";
        if (task.progress > 70) color = "#4caf50";
        else if (task.progress > 40) color = "#ffc107";

        return (
          <li key={index}>
            {/* Task Name */}
            {editIndex === index ? (
              <input
                value={editText}
                autoFocus
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => {
                  updateTaskName(index, editText);
                  setEditIndex(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTaskName(index, editText);
                    setEditIndex(null);
                  }
                }}
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setEditIndex(index);
                  setEditText(task.text);
                }}
                style={{ cursor: "pointer" }}
              >
                {task.text}
              </span>
            )}

            {/* Status */}
            <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
              {status}
            </span>

            {/* Slider */}
            <div className="slider-box">
              <input
                type="range"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) =>
                  updateProgress(index, Number(e.target.value))
                }
              />
              <span className="percent">{task.progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="task-progress">
              <div
                className="task-progress-fill"
                style={{
                  width: `${task.progress}%`,
                  backgroundColor: color,
                }}
              ></div>
            </div>

            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;
