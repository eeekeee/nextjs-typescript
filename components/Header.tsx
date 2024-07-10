import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/GUAM.png";

function Header() {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "150px",
        display: "flex",
      }}
    >
      <div>
        <Image src={Logo} alt="logo" />
        <h2>LOGO</h2>
      </div>
      <Link href="/posts">Posts</Link>
      <Link href="/posts/new">New Posts</Link>
      <Link href="/posts/1">Detail Post</Link>
    </div>
  );
}

export default Header;
