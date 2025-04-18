import { MongoClient, Db, Collection } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI as string;
console.log('Mongo URI:', process.env.MONGODB_URI);

if (!MONGO_URI) {
  throw new Error('MONGODB_URI environment variable is undefined');
}

const DB_NAME = "mp5";
export const POST_COLLECTION = "urls";

//Google: https://coreui.io/blog/what-is-globalthis-in-javascript/
declare global {
  var mongoClient: MongoClient | undefined;
  var mongoDb: Db | undefined;
}

let client: MongoClient | undefined = global.mongoClient;
let db: Db | undefined = global.mongoDb;

async function connect(): Promise<Db> {
  if (!client) {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGO_URI);
    await client.connect();
    global.mongoClient = client;
    db = client.db(DB_NAME);
    global.mongoDb = db;
    console.log('MongoDB connected');
  }
  return db!;
}

export default async function getCollection(collectionName: string): Promise<Collection> {
  try {
    if (!db) {
      await connect(); 
    }
    return db!.collection(collectionName); 
  } catch (error) {
    console.error('Error while getting collection:', error);
    throw new Error('Could not get the MongoDB collection');
  }
}
