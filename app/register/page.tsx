"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { register } from "../actions/authentication";
import { signUpSchema } from "@/lib/zod";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

const RegistrationForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

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

    setLoading(false);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl">
      <p className="text-5xl font-bold">Register page</p>
      <form
        onSubmit={handleSubmit}
        className="mb-2 flex flex-col items-center rounded-md p-3"
      >
        <div className={`mb-2 h-4 text-lg text-red-500`}>{error}</div>

        <div className="my-2 flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="= rounded border border-gray-500 bg-transparent"
            type="text"
            name="name"
            id="name"
          />
        </div>
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

        <Button>{loading ? <LoadingSpinner /> : "Register"}</Button>
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
