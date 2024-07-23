type Post = {
  title: string;
  image: string;
  content: string;
  author_id: string;
  created_at: Date;
  updated_at: Date;
};
export default function PostsList({ posts }: { posts: Post[] }) {
  return <h1>PostsList</h1>;
}
