import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Login page</p>
      <LoginForm />
      <p>
        Don't have an account?
        <Link href={"/register"}>
          <span className="underline">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
