"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  msg,
  pendingMsg,
}: {
  msg: string;
  pendingMsg: string;
}) {
  const { pending } = useFormStatus();

  return (
    // <button
    //   className="bg-green-700 text-white w-28 py-2 px-4 text-base hover:bg-green-500 transition"
    //   type="submit"
    //   disabled={pending}
    // >
    //   {pending ? "Saving..." : "Save"}
    // </button>
    <button
      type="submit"
      className="self-center w-[200px] text-2xl px-2 py-2 border-gray-600 border-2 rounded-2xl hover:bg-gray-600 hover:text-white transition duration-200"
      disabled={pending}
    >
      {pending ? pendingMsg : msg}
    </button>
  );
}
