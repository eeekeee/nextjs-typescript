"use client";

import { FormEvent, useRef, useState } from "react";
import Tiptap from "./Tiptap";
import { createPost } from "@/lib/posts";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const contentChangeHandler = (reason: string) => {
    setContent(reason);
  };
  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    const title = titleRef.current?.value;
    if (!title) {
      console.error("Title is required.");
      return;
    }

    const data = {
      title: title,
      content: content,
    };

    const { success }: { success: boolean } = await createPost(data);

    if (success) {
      router.push("/posts");
    } else {
      alert("Post 생성 실패");
    }
  }

  return (
    <form
      className="max-w-4xl w-full grid place-items-center mx-auto pt-10 mb-10"
      onSubmit={submitHandler}
    >
      <p className="text-3xl text-center text-black mb-10">New Post</p>
      <label htmlFor="title">제목</label>
      <input
        className="w-full border-black border-2 mb-2 p-4 text-[20px]"
        type="text"
        name="title"
        id="title"
        placeholder="제목을 입력하세요."
        ref={titleRef}
        required
      />

      <hr />
      <Tiptap
        content={content}
        onChange={(newContent: string) => contentChangeHandler(newContent)}
      />
      <hr />
    </form>
  );
}
