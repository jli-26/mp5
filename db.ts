import { MongoClient, Db, Collection } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI as string;
console.log('Mongo URI:', process.env.MONGODB_URI);

if (!MONGO_URI) {
  throw new Error('MONGODB_URI environment variable is undefined');
}

const DB_NAME = "mp5";
export const POST_COLLECTION = "urls";


let client: MongoClient | null = null;
let db : Db | null = null;

async function connect(){
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
    if (!db) {
      db = await connect();
    }
    return db.collection(collectionName);
  }