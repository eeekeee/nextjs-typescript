"use client";
import { createUser } from "@/lib/users";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";

const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled" })
      .email({ message: "유효하지 않은 이메일입니다." }),
    username: z.string().min(2).max(10),
    password: z.string().min(8, "비밀번호는 최소 8자리 이상이어야 합니다."),
    password_confirm: z
      .string()
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["password_confirm"],
  });

type SignUpType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const router = useRouter();

  async function signUpHandler(data: SignUpType) {
    const parsedData = SignUpSchema.parse(data);

    const formData = new FormData();
    formData.append("email", parsedData.email);
    formData.append("username", parsedData.username);
    formData.append("password", parsedData.password);
    formData.append("password_confirm", parsedData.password_confirm);
    console.log(formData);

    const { success }: { success: boolean } = await createUser(formData);
    if (success) {
      alert("회원가입 성공");
      router.push("/");
    } else {
      alert("회원가입 실패");
    }
  }

  return (
    <form
      className="flex flex-col w-[500px] justify-start border-gray-500 border-4 rounded-xl p-4 shadow-xl"
      onSubmit={handleSubmit((data) => signUpHandler(data))}
    >
      <div className="flex justify-between">
        <label className="text-xl self-start" htmlFor="email">
          이메일
        </label>
        {errors.email?.message && <span>{errors.email?.message}</span>}
      </div>

      <input
        className="flex mb-4 border-gray-600 border py-2 px-4"
        type="email"
        id="email"
        placeholder="이메일"
        required
        {...register("email")}
      />
      <label className="text-xl self-start" htmlFor="username">
        닉네임
      </label>
      <input
        className="flex mb-4 border-gray-600 border py-2 px-4 "
        type="text"
        id="username"
        placeholder="닉네임"
        required
        {...register("username")}
      />
      <div className="flex justify-between">
        <label className="text-xl self-start" htmlFor="password">
          비밀번호
        </label>
        {errors.password?.message && <span>{errors.password.message}</span>}
      </div>
      <input
        className="flex mb-4 border-gray-600 border py-2 px-4 "
        type="password"
        id="password"
        placeholder="비밀번호"
        required
        {...register("password")}
      />
      <div className="flex justify-between">
        <label className="text-xl self-start" htmlFor="password_confirm">
          비밀번호 확인
        </label>
        {errors.password_confirm?.message && (
          <span>{errors.password_confirm.message}</span>
        )}
      </div>

      <input
        className="flex mb-4 border-gray-600 border py-2 px-4 "
        type="password"
        id="password_confirm"
        placeholder="비밀번호 확인"
        required
        {...register("password_confirm")}
      />

      <SubmitButton msg="회원가입하기" pendingMsg="회원가입중..." />
    </form>
  );
}
