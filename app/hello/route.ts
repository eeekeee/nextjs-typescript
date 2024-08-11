import { NextRequest } from "next/server";

// export async function GET() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await response.json();

//   return Response.json(posts);
// }
// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const query = searchParams.get('query')

//   console.log(query)

//   return Response.json(query);
// }

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  console.log(requestHeaders.get("Authorization"));

  return new Response("<h1>Header Test</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "age=20,name=jin",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const res = await response.json();

  return Response.json(res);
}
