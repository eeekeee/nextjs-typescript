type Props = {
  params: {
    postId: string;
  };
};

export default function EditPostPage({ params }: Props) {
  return (
    <main>
      <h1>Edit Post Page {params.postId}</h1>
    </main>
  );
}
