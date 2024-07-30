"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function backHandler() {
    router.back();
  }
  return (
    <button
      className="px-4 py-2 mx-4 mb-8 border border-black bg-white text-black text-[20px] rounded-xl  hover:bg-black hover:text-white transition-colors"
      onClick={backHandler}
    >
      뒤로가기
    </button>
  );
}
