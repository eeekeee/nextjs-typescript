"use server";

import { connectDB } from "@/lib/database";
// import bcrypt from "@types/bcrypt";
import * as bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

type User = {
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export async function createUser(
  formData: FormData
): Promise<{ success: boolean; userId?: ObjectId }> {
  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) {
      throw new Error("Missing required fields");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const hashedPassword = await bcrypt.hash(password, salt);

    const db = (await connectDB()).db("guam");
    const usersCollection = db.collection<User>("users");

    const user: User = {
      username,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await usersCollection.insertOne(user);
    console.log(result);
    return { success: true };
  } catch (error) {
    console.error("Error creating new user", error);
    throw new Error("Failed to create new user");
  }
}

export async function getUsers() {
  try {
    const db = (await connectDB()).db("guam");
    const usersCollection = db.collection<User>("users");

    const users = await usersCollection.find().toArray();

    const usersPlainObjects = users.map((user) => ({
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    return usersPlainObjects;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function updateUser(formData: FormData, userId: string) {
  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) {
      throw new Error("Missing required fields");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

    const db = (await connectDB()).db("guam");
    const usersCollection = db.collection<User>("users");

    const updateData = {
      username,
      email,
      password: hashedPassword,
      updated_at: new Date(),
    };

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    return { success: result.matchedCount > 0 };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(
  userId: string
): Promise<{ success: boolean }> {
  try {
    const db = (await connectDB()).db("guam");
    const usersCollection = db.collection<User>("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(userId),
    });

    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

// Authentication
export async function Login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const db = (await connectDB()).db("guam");
  const usersCollection = db.collection<User>("users");

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const check = await bcrypt.compare(password, user.password);

  if (check) {
    return { success: true, message: "로그인 성공" };
  } else {
    return { success: false, message: "로그인 실패" };
  }
}
