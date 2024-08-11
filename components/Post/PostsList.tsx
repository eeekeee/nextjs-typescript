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
    <div className="max-w-[1000px] w-full border-x-8">
      <div className="flex px-4 py-2 m-2 justify-between border-y-4 border-blue-500">
        <div>
          <p className="text-xl">제목</p>
        </div>
        <div className="flex w-[300px] justify-between">
          <p className="text-xl">작성자</p>
          <p className="text-xl">작성일</p>
        </div>
      </div>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}
