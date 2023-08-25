import { useState, useEffect } from 'react';
import Link from 'next/link';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('/api/getTasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    fetch('/api/addTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask, completed: false }), 
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Task added successfully.') {
        setTasks([...tasks, { task: newTask, completed: false }]);
        setNewTask('');
      }
    });
  };
  
  const markComplete = (id) => {
    fetch(`/api/updateTask?id=${id}`, { method: 'PUT' }) 
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Task marked as complete.') {
          const updatedTasks = tasks.map(task =>
            task._id === id ? { ...task, completed: true } : task
          );
          setTasks(updatedTasks);
        }
      });
  };
    const deleteTask = (id) => {
    fetch(`/api/deleteTask?id=${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Task deleted successfully.') {
          const updatedTasks = tasks.filter(task => task._id !== id);
          setTasks(updatedTasks);
        }
      });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => markComplete(task._id)}
            />
            {task.task}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link href="/today"><a>Today's Tasks</a></Link>
      <Link href="/completed"><a>Completed Tasks</a></Link>
    </div>
  );
};

export default Home;
