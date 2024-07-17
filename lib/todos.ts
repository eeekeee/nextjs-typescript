"use server";

import { connectDB } from "@/lib/database";

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

export async function createTodo(formData: FormData) {
  try {
    const title = formData.get("title");
    const date = formData.get("date");

    if (title === null || date === null) {
      throw new Error("Check your form");
    }

    if (typeof date === "string") {
      const todo = {
        title: title as string,
        date: new Date(date),
      };
      const db = (await connectDB()).db("guam");
      const todosCollection = db.collection("todos");
      const result = await todosCollection.insertOne(todo);
      console.log(result);
      return { success: true };
    } else {
      throw new Error("date is not Date type");
    }
  } catch (error) {
    console.error("Error creating new todo", error);
    throw new Error("Failed to create new todo");
  }
}
