"use server";

import { connectDB } from "@/lib/database";
import { ObjectId } from "mongodb";
import xss from "xss";

import { uploadImageToCloudinary } from "@/util/cloudinary";

export async function getPosts() {
  try {
    const db = (await connectDB()).db("guam");
    const postsCollection = db.collection("posts");

    const posts = await postsCollection.find().toArray();

    // Convert MongoDB documents to plain objects
    // const postsPlainObjects = posts.map((post) => ({
    //   _id: post._id.toString(),
    //   title: post.title,
    //   content: post.content,
    //   image: post.image,
    //   author: post.author,
    //   created_at: post.created_at,
    //   updated_at: post.updated_at,
    // }));

    const postsPlainObjects = posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      content: post.content,

      created_at: post.created_at,
      updated_at: post.updated_at,
    }));

    return postsPlainObjects;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getPost(id: string) {
  try {
    const db = (await connectDB()).db("guam");
    const postsCollection = db.collection("posts");

    const posts = await postsCollection.findOne({ _id: new ObjectId(id) });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function createPost(data: { title: string; content: string }) {
  try {
    const title = data.title as string;
    const content = data.content as string;

    if (title === "" || content === "") {
      throw new Error("Check your form");
    }

    const imgTagRegex = /<img[^>]+src="data:image\/[^">]+"/g;
    let match;
    const imageUploads: Promise<string>[] = [];

    // content에서 모든 이미지 URL을 추출
    while ((match = imgTagRegex.exec(content)) !== null) {
      const imgTag = match[0];
      const base64ImageMatch = imgTag.match(/src="data:image\/[^">]+"/);

      if (base64ImageMatch) {
        const base64Image = base64ImageMatch[0].split('"')[1];
        imageUploads.push(uploadImageToCloudinary(base64Image));
      }
    }

    const imageUrls = await Promise.all(imageUploads);
    console.log(imageUrls);

    let updatedContent = content;
    let urlIndex = 0;

    updatedContent = updatedContent.replace(imgTagRegex, (match) => {
      const base64ImageMatch = match.match(/src="data:image\/[^">]+"/);
      if (base64ImageMatch) {
        const base64Image = base64ImageMatch[0].split('"')[1];
        const cloudinaryUrl = imageUrls[urlIndex++];
        return match.replace(base64Image, cloudinaryUrl);
      }
      return match;
    });

    const post = {
      title: title,
      content: xss(updatedContent),
      // image: image,
      // author: author,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // return { success: false };

    //////////

    // const post = {
    //   title: slugify(title),
    //   content: xss(content),
    //   // image: image,
    //   // author: author,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // };

    const db = (await connectDB()).db("guam");
    const postsCollection = db.collection("posts");
    const result = await postsCollection.insertOne(post);
    console.log(result);
    return { success: true };
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
