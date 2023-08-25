import { MongoClient } from 'mongodb';

const uri = 'your-mongodb-connection-uri';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

export const connectDatabase = async () => {
  if (!db) {
    await client.connect();
    db = client.db('todo-app');
  }
};

export const getDatabase = () => db;
