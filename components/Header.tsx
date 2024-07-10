import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";

import Logo from "@/assets/GUAM.png";

const headerStyle = css({
  backgroundColor: "white",
  width: "100%",
  height: 200,
});

function Header() {
  return (
    <div css={{ font }}>
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
