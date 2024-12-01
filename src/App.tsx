import React, { useState, useEffect } from 'react';
import './App.css';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [priority, setPriority] = useState<string>('Low');
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  const quotes: string[] = [
    "Reach for the stars, but don't forget to take small steps!",
    "The cosmos isn't the limit; it's the starting point.",
    "Stay focused and grounded, even as you dream big.",
    "Every small task completed is a step toward your galaxy."
  ];

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      priority,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setPriority('Low');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const sortTasksByPriority = () => {
    const priorityOrder: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    setTasks(sortedTasks);
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateRandomPosition = () => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    return { left: `${randomX}%`, top: `${randomY}%` };
  };

  const generateFloatingSVGs = () => {
    const elements = [];
    for (let i = 0; i < 50; i++) {
      const { left, top } = generateRandomPosition();
      elements.push(
        <svg
          key={i}
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            left,
            top,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            opacity: Math.random() * 0.5 + 0.5,
            animation: `sparkle ${Math.random() * 3 + 2}s infinite alternate`,
          }}
        >
          <circle cx="50" cy="50" r="10" fill="#ffffff" />
        </svg>
      );
    }
    return elements;
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-heading">To-Do List</h1>
        <p className="hero-description">Manage your tasks with the power of the cosmos! Stay on track with style and flair!</p>
        <div className="quote-container">
          <p className="quote">{quotes[quoteIndex]}</p>
        </div>
      </section>

      {/* Floating SVGs */}
      <div className="floating-svgs">
        {generateFloatingSVGs()} {/* Render 50+ stars/planets dynamically */}
      </div>

      {/* Task Input and Controls */}
      <div className="task-input-container">
        <input
          className="task-input"
          type="text"
          value={newTask}
          placeholder="Add a new task..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button className="add-task-button" onClick={addTask}>
          Add Task
        </button>
        <button className="sort-tasks-button" onClick={sortTasksByPriority}>
          Sort by Priority
        </button>
      </div>

      {/* Task List */}
      <div className="task-container">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.priority.toLowerCase()}-priority`}>
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className={task.completed ? 'completed' : ''}>{task.title}</span>
              </div>
              <button className="delete-task-button" onClick={() => deleteTask(task.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Clear Completed Tasks */}
        <button className="clear-completed-button" onClick={clearCompletedTasks}>
          Clear Completed Tasks
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="rocket"></div>
        <span>love for aman bhaiya</span>
      </footer>
    </div>
  );
};

export default App;
