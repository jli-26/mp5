import { MongoClient, Db, Collection } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI as string;
console.log('Mongo URI:', process.env.MONGODB_URI);

if (!MONGO_URI) {
  throw new Error('MONGODB_URI environment variable is undefined');
}

const DB_NAME = "mp5";
export const POST_COLLECTION = "urls";

// change suggest by: https://coreui.io/blog/what-is-globalthis-in-javascript/
declare global {
  var mongoClient: MongoClient | undefined;
  var mongoDb: Db | undefined;
}

let client: MongoClient | null = global.mongoClient || null;
let db : Db | null = globalThis.mongoDb || null;

async function connect(){
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
  if (!client || !db) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);

    // Store in globalThis so it persists across function calls
    globalThis.mongoClient = client;
    globalThis.mongoDb = db;
  }

  return db.collection(collectionName);
}
