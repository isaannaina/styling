// pages/api/getTasks.js
import { connectDatabase, getDatabase } from './db';

export default async (req, res) => {
  if (req.method === 'GET') {
    await connectDatabase();
    const db = getDatabase();
    const tasks = await db.collection('tasks').find().toArray();
    
    res.status(200).json(tasks);
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};
