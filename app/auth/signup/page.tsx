import SignUpForm from "@/components/SignUpForm";
// import { createUser } from "@/lib/users";

export default function SignUpPage() {
  // async function signUpHandler(formData: FormData) {
  //   const { success }: { success: boolean } = await createUser(formData);
  //   if (success) {
  //     alert("회원가입 성공");
  //   } else {
  //     alert("회원가입 실패");
  //   }
  // }

  return (
    <main className="grid justify-center ">
      <p className="text-3xl font-bold mb-4">회원가입</p>
      <SignUpForm />
    </main>
  );
}
