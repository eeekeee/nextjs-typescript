import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

export default function PostsPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">PostsPage</h1>
    </main>
  );
}
