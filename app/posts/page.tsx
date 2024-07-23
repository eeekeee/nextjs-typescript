// "use client";
// import { CldImage } from "next-cloudinary";
import { Suspense } from "react";

import { getPosts } from "@/lib/posts";
import PostsList from "@/components/PostsList";

async function Posts() {
  const posts = await getPosts();
  console.log(posts);
  return <PostsList posts={posts} />;
}

export default function PostsPage() {
  return (
    <main className="mt-8">
      <h1>Post Page</h1>
      <Suspense fallback={<p>Loading... Posts</p>}>
        <Posts />
      </Suspense>
    </main>
  );
}

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
