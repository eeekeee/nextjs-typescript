import { getPost } from "@/lib/posts";
import { Metadata } from "next";
import { Suspense } from "react";
import DOMPurify from "dompurify";

type Props = {
  params: {
    postId: string;
  };
};

// export const generateMetadata = ({ params }: Props): Metadata => {
//   return {
//     title: `Post ${params.postId}`,
//   };
// };
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const post = await getPost(params.postId);
  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
  };
};

export default function PostDetailPage({ params }: Props) {
  async function Post() {
    const post = await getPost(params.postId);
    if (!post) {
      return null;
    }

    const sanitizeContent = DOMPurify.sanitize(post.content);

    return (
      <div>
        <p>{post.title}</p>
        <div dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
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
