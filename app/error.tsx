"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main>
      <p>에러 발생</p>
      <p>{error?.message}</p>
    </main>
  );
}
