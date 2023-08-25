import { connectDatabase, getDatabase } from './db';

export default async (req, res) => {
  if (req.method === 'PUT') { 
    const { id } = req.query;
    
    await connectDatabase();
    const db = getDatabase();
    const tasks = db.collection('tasks');
    
    await tasks.updateOne({ _id: ObjectId(id) }, { $set: { completed: true } }); 
    
    res.status(200).json({ message: 'Task marked as complete.' });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};
