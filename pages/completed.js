import { useState, useEffect } from 'react';

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetch('/api/getTasks')
      .then(response => response.json())
      .then(data => {
        const completedTasks = data.filter(task => task.completed);
        setCompletedTasks(completedTasks);
      });
  }, []);

  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul>
        {completedTasks.map(task => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Completed;
