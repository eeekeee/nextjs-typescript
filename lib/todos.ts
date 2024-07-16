"use server";
import { connectDB } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export async function getTodos() {
  try {
    const db = (await connectDB()).db("guam");
    const todosCollection = db.collection("todos");

    const todos = await todosCollection.find().toArray();

    // Convert MongoDB documents to plain objects
    const todosPlainObjects = todos.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      date: todo.date,
    }));

    return todosPlainObjects;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
}

export async function newTodo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
  } catch (error) {
    console.error("Error creating new todo", error);
    throw new Error("Failed to create new todo");
  }
}
