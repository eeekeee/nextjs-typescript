"use client";
import { Login } from "@/lib/users";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  async function loginHandler(formData: FormData) {
    const { success, message }: { success: boolean; message: string } =
      await Login(formData);
    if (success) {
      router.push("/");
    } else {
      alert(message);
    }
  }

  return (
    <form
      className="flex flex-col w-[500px] border-gray-500 border-4 rounded-xl p-4"
      action={loginHandler}
    >
      <label className="text-2xl" htmlFor="email">
        Email
      </label>
      <input
        className="flex mt-4 border-gray-600 border py-2 px-4 "
        type="email"
        name="email"
        id="email"
        placeholder="이메일"
        required
      />
      <label className="mt-4 text-2xl" htmlFor="password">
        Password
      </label>
      <input
        className="flex mt-4 border-gray-600 border py-2 px-4 "
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호"
        required
      />
      <button
        type="submit"
        className="mt-4 self-center w-[200px] text-2xl px-2 py-2 border-gray-600 border-2 rounded-2xl hover:bg-gray-600 hover:text-white transition duration-200"
      >
        로그인
      </button>
      <Link href="/auth/signup" className="mt-2 hover:underline">
        회원가입하기
      </Link>
    </form>
  );
}
