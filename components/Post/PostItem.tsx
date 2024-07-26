import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  // image: string;
  content: string;
  // author: string;
  created_at: Date;
  updated_at: Date;
};
export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex px-4 py-2 border-2 m-2 justify-between">
      {/* <p className="w-[160px]">{post.title}</p> */}
      <Link className="text-xl" href={`/posts/${post._id}`}>
        {post.title}
      </Link>
      {/* <p>{post.image}</p> */}
      {/* <p>{post.content}</p> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      <div className="flex w-[300px] justify-between">
        <p className="mr-2">{"author"}</p>
        <p className="self-end">{post.created_at.toLocaleString("ko-kr")}</p>
      </div>
    </div>
  );
}
