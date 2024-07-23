"use client";
import { createUser } from "@/lib/users";

export default function SignUpForm() {
  async function signUpHandler(formData: FormData) {
    const { success }: { success: boolean } = await createUser(formData);
    if (success) {
      alert("회원가입 성공");
    } else {
      alert("회원가입 실패");
    }
  }

  return (
    <form
      className="flex flex-col w-[500px] justify-start border-gray-500 border-4 rounded-xl p-4"
      action={signUpHandler}
    >
      <label className="text-2xl" htmlFor="email">
        이메일
      </label>
      <input
        className="flex mt-4 border-gray-600 border py-2 px-4 "
        type="email"
        name="email"
        id="email"
        placeholder="이메일"
        required
      />
      <label className="text-2xl mt-4" htmlFor="username">
        닉네임
      </label>
      <input
        className="flex mt-4 border-gray-600 border py-2 px-4 "
        type="text"
        name="username"
        id="username"
        placeholder="닉네임"
        required
      />
      <label className="text-2xl mt-4" htmlFor="password">
        비밀번호
      </label>
      <input
        className="flex mt-4 border-gray-600 border py-2 px-4 "
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호"
        required
      />
      <label className="text-2xl mt-4" htmlFor="password_confirm">
        비밀번호 확인
      </label>
      <input
        className="flex mt-4 border-gray-600 border py-2 px-4 "
        type="password"
        name="password_confirm"
        id="password_confirm"
        placeholder="비밀번호 확인"
        required
      />
      <button
        type="submit"
        className="mt-4 self-center w-[200px] text-2xl px-2 py-2 border-gray-600 border-2 rounded-2xl hover:bg-gray-600 hover:text-white transition duration-200"
      >
        회원가입하기
      </button>
    </form>
  );
}
