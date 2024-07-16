"use client";

import { useRouter } from "next/navigation";
import LogoImage from "@/assets/GUAM.png";
import Image from "next/image";

export default function Logo() {
  const router = useRouter();

  const LogoClickHandler = () => {
    router.push("/");
  };

  return (
    <div
      className="flex w-[240px] mx-10 cursor-pointer"
      onClick={LogoClickHandler}
    >
      <Image src={LogoImage} alt="logo" />
    </div>
  );
}
