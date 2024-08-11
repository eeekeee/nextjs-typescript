"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function backHandler() {
    router.back();
  }
  return (
    <button
      className="text-[16px] tracking-wider px-6 py-2 border border-black bg-white text-black  rounded-xl  hover:bg-black hover:text-white transition-colors items-center"
      onClick={backHandler}
    >
      뒤로가기
    </button>
  );
}
