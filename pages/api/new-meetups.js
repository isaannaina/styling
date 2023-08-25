import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, image, address } = req.body;

  if (!title || !image || !address) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  const { db } = await connectToDatabase();

  const meetupsCollection = db.collection('meetups');

  const result = await meetupsCollection.insertOne({
    title,
    image,
    address,
  });

  return res.status(201).json({ message: 'Meetup inserted!' });
}
