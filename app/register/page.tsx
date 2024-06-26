"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { register } from "../actions/authentication";

const RegistrationForm = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      response.status === 201 && router.push("/");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Register page</p>
      <form
        // onSubmit={handleSubmit}
        action={register}
        className="my-5 flex flex-col items-center rounded-md p-3"
      >
        <div className="my-2 flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="rounded border border-gray-500 text-black"
            type="text"
            name="name"
            id="name"
          />
        </div>
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
          Register
        </button>
      </form>
      <p>
        Already have an account?
        <Link href={"/login"}>
          <span className="underline">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
