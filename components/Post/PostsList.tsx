import PostItem from "./PostItem";

type Post = {
  _id: string;
  title: string;
  // image: string;
  content: string;
  // author: string;
  created_at: Date;
  updated_at: Date;
};
export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <div className="border-black border-2 max-w-[1000px] w-full">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}
