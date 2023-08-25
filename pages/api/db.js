import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://sainipiyush11111:Piyush2020@cluster0.uljguzz.mongodb.net/todo?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

export const connectDatabase = async () => {
  if (!db) {
    await client.connect();
    db = client.db('todo-app');
  }
};

export const getDatabase = () => db;
