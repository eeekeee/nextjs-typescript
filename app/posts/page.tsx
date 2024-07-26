import { Suspense } from "react";
import { getPosts } from "@/lib/posts";
import PostsList from "@/components/Post/PostsList";
import Link from "next/link";
import { type Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Posts",
  };
};

async function Posts() {
  const posts = await getPosts();
  return <PostsList posts={posts} />;
}

export default function PostsPage() {
  return (
    <main className="mt-8 border-red-500 border-2 ">
      <div className="flex w-full justify-around items-center my-2">
        <p className="text-3xl">Post Page</p>
        <Link className="border-yellow-300 border-4" href={"/posts/new"}>
          글 생성하기
        </Link>
      </div>
      <div className="flex justify-center">
        <Suspense fallback={<p>Loading... Posts</p>}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}

// "use client";
// import { CldImage } from "next-cloudinary";

// export default function PostPage() {
//   return (
//     <main>
//       <div className="border-4 border-red-500">
//         <h1>Post Page</h1>
//         {/* <CldImage
//           src="cld-sample-4" // Use this sample image or upload your own via the Media Explorer
//           width="500" // Transform the image: auto-crop to square aspect_ratio
//           height="500"
//           alt="image"
//           crop={{
//             type: "auto",
//             source: true,
//           }}
//         /> */}
//       </div>
//     </main>
//   );
// }
