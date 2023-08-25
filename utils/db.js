import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://sainipiyush11111:Piyush2020@cluster0.uljguzz.mongodb.net/meetups?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return {
    client,
    db: client.db(),
  };
}
