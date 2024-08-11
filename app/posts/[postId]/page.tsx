import { getPost } from "@/lib/posts";
import { Metadata } from "next";
import { Suspense } from "react";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import BackButton from "@/components/BackButton";

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

    const sanitizeHtml = (html: string) => {
      return DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(html);
    };

    return (
      <div className="justify-center grid">
        <div className="flex w-full px-4 py-1 justify-center gap-x-24 items-center border-y-4 mb-4">
          <BackButton></BackButton>
          <p className="text-2xl">{post.title}</p>
          <p>author</p>
          <p className="">{post.created_at.toLocaleString("ko-kr")}</p>
        </div>
        <div
          className="border-4 text-l font-light px-8"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />
      </div>
    );
  }

  return (
    <main className="grid">
      <Suspense fallback={<p>Loading... Post</p>}>
        <Post />
      </Suspense>
      {/* <p>{params.postId}</p> */}
    </main>
  );
}
