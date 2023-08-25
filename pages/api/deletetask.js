// pages/api/deleteTask.js
import { connectDatabase, getDatabase } from './db';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    
    await connectDatabase();
    const db = getDatabase();
    const tasks = db.collection('tasks');
    
    await tasks.deleteOne({ _id: ObjectId(id) });
    
    res.status(200).json({ message: 'Task deleted successfully.' });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};
