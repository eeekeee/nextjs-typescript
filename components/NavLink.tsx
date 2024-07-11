"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <Link
      className={`mx-10 text-3xl text-gray-500 self-center ${path.startsWith(href) ? "text-red-600 text font-bold" : undefined} hover:text-red-600`}
      href={href}
    >
      {children}
    </Link>
  );
}
