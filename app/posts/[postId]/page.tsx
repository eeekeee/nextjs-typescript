import { Metadata } from "next";

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
  return (
    <main>
      <h1>PostDetailPage</h1>
      <p>{params.postId}</p>
    </main>
  );
}
