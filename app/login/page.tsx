"use client";

import { login } from "../actions/authentication";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInSchema } from "@/lib/zod";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const formEmail = formData.get("email");
    const formPassword = formData.get("password");

    try {
      const { parsedEmail, parsedPassword } = await signInSchema.parseAsync({
        parsedEmail: formEmail,
        parsedPassword: formPassword,
      });

      const res = await login({
        email: parsedEmail,
        password: parsedPassword,
      });

      if (!res?.success && res?.redirect) {
        toast.warning("Please create an account! \n Redirecting in 3s");
        setTimeout(() => {
          router.push("/register");
        }, 3200);
      } else if (res?.success) {
        router.push("/");
      } else if (!res?.success && res?.message) {
        setError(res.message);
      }
    } catch (err: any) {
      if (err.name == "ZodError") {
        setError(`${err.issues[0]?.message}!`);
      } else {
        console.error("Error: ", err);
        setError("Something went wrongafdsdfasasfd!");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Login page</p>
      <form
        className="mb-2 flex flex-col items-center rounded-md p-3"
        onSubmit={onSubmit}
      >
        <div className={`mb-2 h-4 text-lg text-red-500`}>{error}</div>
        <div className="my-2 flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            className="rounded border border-gray-500 bg-transparent"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded border border-gray-500 bg-transparent"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <Button>{loading ? <LoadingSpinner /> : "Login"}</Button>
      </form>
      <p>
        Don't have an account?
        <Link href={"/register"}>
          <span className="underline">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
