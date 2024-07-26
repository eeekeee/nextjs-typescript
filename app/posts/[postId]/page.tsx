import { getPost } from "@/lib/posts";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: {
    postId: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Post ${params.postId}`,
  };
};

export default function PostDetailPage({ params }: Props) {
  async function Post() {
    const post = await getPost(params.postId);
    if (!post) {
      return null;
    }
    return (
      <div>
        <p>{post.title}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <p>author</p>
        <p className="self-end">{post.created_at.toLocaleString("ko-kr")}</p>
      </div>
    );
  }

  return (
    <main>
      <h1>PostDetailPage</h1>
      <Suspense fallback={<p>Loading... Post</p>}>
        <Post />
      </Suspense>
      <p>{params.postId}</p>
    </main>
  );
}
