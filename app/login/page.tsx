"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../actions/authentication";

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const res = await login(formData);
      if (!res) {
        setError(res.error.message);
      } else {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center text-2xl">
      <p className="self-center text-2xl text-red-500">{error}</p>
      <form
        className="my-5 flex flex-col items-center justify-center"
        onSubmit={onSubmit}
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
          className="mt-4 flex items-center justify-center rounded border border-white p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
