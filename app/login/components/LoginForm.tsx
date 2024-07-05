"use client";

import { login } from "@/app/actions/authentication";
import Button from "@/app/components/Button";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { signInSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
  );
};

export default LoginForm;
