export default function DashboardLayout({
  children,
  member,
  newPost,
}: {
  children: React.ReactNode;
  member: React.ReactNode;
  newPost: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="flex gap-8">
        <div className="p-[100px] m-12 shadow-2xl border-2 items-center">
          {member}
        </div>
        <div className="p-[100px] m-12 shadow-2xl border-2 items-center">
          {newPost}
        </div>
      </div>
    </div>
  );
}
