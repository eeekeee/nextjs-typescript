"use client";

import { useFormStatus } from "react-dom";

export default function TodoSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-green-700 text-white w-28 py-2 px-4 text-base hover:bg-green-500 transition"
      type="submit"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
