import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Register page</p>
      <RegisterForm />
      <p>
        Already have an account?
        <Link href={"/login"}>
          <span className="underline">Login</span>
        </Link>
      </p>
    </div>
  );
}
