// pages/api/addTask.js
import { connectDatabase, getDatabase } from './db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { task } = req.body;
    
    await connectDatabase();
    const db = getDatabase();
    const tasks = db.collection('tasks');
    
    await tasks.insertOne({ task, completed: false });
    
    res.status(201).json({ message: 'Task added successfully.' });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};
