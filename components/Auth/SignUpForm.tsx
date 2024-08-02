"use client";

import { checkValidEmail, checkValidUsername, createUser } from "@/lib/users";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { useRef, useState } from "react";
import { sendEmail } from "@/lib/email";

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
    watch,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [authNumber, setAuthNumber] = useState<number | null>(null);
  const [isGettingAuth, setIsGettingAuth] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean | null>(null);

  const numberRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function verifyEmail(to: string) {
    const number = Math.floor(100000 + Math.random() * 900000);
    console.log("number : " + number);
    setAuthNumber(number);

    const mailOptions = {
      from: "FROM에서 보냄",
      to: to,
      subject: "[이메일 인증] 회원가입 인증번호입니다.",
      message: `<h3>인증번호 : ${number}</h3>`,
    };
    return sendEmail(mailOptions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const verifyNumber = () => {
    const inputNumber = numberRef.current?.value;
    if (!inputNumber || !authNumber) return;

    console.log(inputNumber);

    if (inputNumber === authNumber.toString()) {
      setIsVerifiedEmail(true);
      console.log("같아");
    } else {
      setIsVerifiedEmail(false);
      console.log("달라");
    }
  };

  const validEmailHandler = async () => {
    const email = watch("email");
    if (email === "") {
      return;
    }
    setCheckingEmail(true);
    const { success } = await checkValidEmail(email);
    setEmailValid(success);
    setCheckingEmail(false);
  };

  const validUsernameHandler = async () => {
    const username = watch("username");
    if (username === "") {
      return;
    }
    setCheckingUsername(true);
    const { success } = await checkValidUsername(username);
    setUsernameValid(success);
    setCheckingUsername(false);
  };

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
      className="flex flex-col w-[500px] justify-start border-gray-500 border-4 rounded-xl p-4 shadow-xl bg-gray-100"
      onSubmit={handleSubmit((data) => signUpHandler(data))}
    >
      <div className="flex justify-between">
        <label className="text-xl self-start" htmlFor="email">
          이메일
        </label>
        {errors.email?.message && <span>{errors.email?.message}</span>}
        <div className="flex gap-4 items-center">
          {emailValid !== null && (
            <p className={`text-${emailValid ? "green" : "red"}-500`}>
              {emailValid
                ? "사용 가능한 이메일입니다."
                : "이메일이 이미 사용 중입니다."}
            </p>
          )}
          <button
            type="button"
            className="px-4 py-2 border border-black rounded-lg"
            onClick={validEmailHandler}
            disabled={checkingEmail}
          >
            {checkingEmail ? "확인 중..." : "중복 확인"}
          </button>
        </div>
      </div>

      <input
        className="flex mb-4 border-gray-600 border py-2 px-4"
        type="email"
        id="email"
        placeholder="이메일"
        required
        {...register("email")}
      />
      {emailValid && (
        <button
          className={`px-4 py-2 bg-gray-800 rounded-2xl mb-4 w-[240px] self-center text-white tracking-widest bg-opacity-${isVerifiedEmail ? "40" : "100"}`}
          onClick={() => {
            setIsGettingAuth(true);
            verifyEmail(watch("email"));
          }}
          disabled={isVerifiedEmail ? true : false}
        >
          {isGettingAuth
            ? isVerifiedEmail
              ? "인증 완료"
              : "인증코드 다시 받기"
            : "인증코드 받기"}
        </button>
      )}
      {isGettingAuth && (
        <div className="mb-2">
          <input
            className="px-6 py-2 border border-gray-500 mr-4 rounded-xl"
            name="number"
            ref={numberRef}
            placeholder="인증코드"
          />
          <button
            className={`px-4 py-2 border border-black rounded-md bg-green-500  text-white bg-opacity-${isVerifiedEmail ? "40" : "100"} mb-2`}
            onClick={verifyNumber}
            disabled={isVerifiedEmail ? true : false}
          >
            확인
          </button>
          {isVerifiedEmail !== null && isVerifiedEmail ? (
            <p>인증 완료되었습니다.</p>
          ) : (
            <p>인증 번호가 다릅니다.</p>
          )}
        </div>
      )}
      <div className="flex justify-between items-center">
        <label className="text-xl" htmlFor="username">
          닉네임
        </label>
        <div className="flex gap-4 items-center">
          {usernameValid !== null && (
            <p className={`text-${usernameValid ? "green" : "red"}-500`}>
              {usernameValid
                ? "사용 가능한 닉네임입니다."
                : "닉네임이 이미 사용 중입니다."}
            </p>
          )}
          <button
            type="button"
            className="px-4 py-2 border border-black rounded-lg"
            onClick={validUsernameHandler}
            disabled={checkingUsername}
          >
            {checkingUsername ? "확인 중..." : "중복 확인"}
          </button>
        </div>
      </div>
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
      <div className="mt-6 mb-4">
        <SubmitButton msg="회원가입하기" pendingMsg="회원가입중..." />
      </div>
    </form>
  );
}
