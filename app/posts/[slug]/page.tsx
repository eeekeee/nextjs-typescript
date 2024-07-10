type PageParams = {
  params: {
    slug: string;
  };
};

export default function PostDetailPage({ params }: PageParams) {
  return (
    <main>
      <h1>PostDetailPage</h1>
      <p>{params.slug}</p>
    </main>
  );
}
