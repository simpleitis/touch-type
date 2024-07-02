"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { register } from "../actions/authentication";
import { signUpSchema } from "@/lib/zod";

const RegistrationForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formName = formData.get("name");
    const formEmail = formData.get("email");
    const formPassword = formData.get("password");

    try {
      const { parsedName, parsedEmail, parsedPassword } =
        await signUpSchema.parseAsync({
          parsedName: formName,
          parsedEmail: formEmail,
          parsedPassword: formPassword,
        });

      const res = await register({
        name: parsedName,
        email: parsedEmail,
        password: parsedPassword,
      });

      if (res.success) {
        router.push("/login");
      } else if (!res.success && res.message) {
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
      <p className="text-5xl font-bold">Register page</p>
      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-col items-center rounded-md p-3"
      >
        <div className={`h-10 text-xl text-red-500`}>{error}</div>

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
