export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();

  return Response.json(post);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const res = await response.json();

  return Response.json(res);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      method: "DELETE",
    }
  );
  const res = await response.json();

  return Response.json(res);
}
