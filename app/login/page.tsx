"use client";

import { login } from "../actions/authentication";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await login(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Login page</p>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center rounded-md p-3"
        onSubmit={(e) => onSubmit}
      >
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
