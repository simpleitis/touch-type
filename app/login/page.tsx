"use client";

import { login } from "../actions/authentication";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInSchema } from "@/lib/zod";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Login page</p>
      <form
        className="my-5 flex flex-col items-center rounded-md p-3"
        onSubmit={onSubmit}
      >
        <div className={`h-10 text-xl text-red-500`}>{error}</div>
        <div className="my-2 flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            className="rounded border border-gray-500 text-black"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded border border-gray-500 text-black"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex w-36 items-center justify-center rounded bg-orange-300"
        >
          Login
        </button>
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
