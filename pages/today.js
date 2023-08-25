// pages/today.js
import { useState, useEffect } from 'react';

const Today = () => {
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    fetch('/api/getTasks')
      .then(response => response.json())
      .then(data => {
        const tasksForToday = data.filter(task => !task.completed);
        setTodayTasks(tasksForToday);
      });
  }, []);

  return (
    <div>
      <h1>Today's Tasks</h1>
      <ul>
        {todayTasks.map(task => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Today;
