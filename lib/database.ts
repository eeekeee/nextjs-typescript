import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

let clientPromise: Promise<MongoClient>;

export async function connectDB() {
  if (!clientPromise) {
    const client = new MongoClient(uri, {});
    clientPromise = client.connect();
  }
  return clientPromise;
}
