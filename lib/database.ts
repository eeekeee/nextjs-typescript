// "use server";

// import { MongoClient } from "mongodb";

// const url = process.env.MONGODB_URI;
// const options: any = { useNewUrlParser: true };
// let connectDB: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   // 개발 중 재실행을 막음
//   if (!global._mongo) {
//     global._mongo = new MongoClient(url as string, options).connect();
//   }
//   connectDB = global._mongo;
// } else {
//   connectDB = new MongoClient(url as string, options).connect();
// }

// export { connectDB };

// lib/database.ts
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
