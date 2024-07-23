"use server";

import { connectDB } from "@/lib/database";
import { ObjectId } from "mongodb";

export async function getPosts() {
  try {
    const db = (await connectDB()).db("guam");
    const postsCollection = db.collection("posts");

    const posts = await postsCollection.find().toArray();

    // Convert MongoDB documents to plain objects
    const postsPlainObjects = posts.map((post) => ({
      title: post.title,
      content: post.content,
      image: post.image,
      author_id: post.author_id,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }));

    return postsPlainObjects;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const date = formData.get("date");

    if (title === null || date === null) {
      throw new Error("Check your form");
    }

    if (typeof date === "string") {
      const post = {
        title: title as string,
        date: new Date(date),
      };
      const db = (await connectDB()).db("guam");
      const postsCollection = db.collection("posts");
      const result = await postsCollection.insertOne(post);
      console.log(result);
      return { success: true };
    } else {
      throw new Error("date is not Date type");
    }
  } catch (error) {
    console.error("Error creating new post", error);
    throw new Error("Failed to create new post");
  }
}

export async function updatePost(formData: FormData, id: string) {
  try {
    const title = formData.get("title");
    let date = formData.get("date");
    if (title === null || date === null) {
      throw new Error("Check your form");
    }
    if (typeof date === "string") {
      const db = (await connectDB()).db("guam");
      const postsCollection = db.collection("posts");
      const result = await postsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title: title, date: new Date(date) } }
      );

      if (result.modifiedCount === 0) {
        throw new Error("No post found to update");
      }

      return { success: true };
    } else {
      throw new Error("date is not Date type");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update the post");
  }
}

export async function deletePost(id: string) {
  try {
    const db = (await connectDB()).db("guam");
    const postsCollection = db.collection("posts");

    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error("No post found to delete");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the post");
  }
}
