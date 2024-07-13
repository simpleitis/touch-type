"use client";

import { setPassword } from "@/app/actions/authentication";
import Button from "@/app/components/Button";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { setPasswordSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface SetPasswordForm {
  email: string;
  token: string;
}

export default function SetPasswordForm({ email, token }: SetPasswordForm) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const formPassword = formData.get("password");
    const formConfirmPassword = formData.get("confirmPassword");

    try {
      const { parsedPassword, parsedConfirmPassword } =
        await setPasswordSchema.parseAsync({
          parsedPassword: formPassword,
          parsedConfirmPassword: formConfirmPassword,
        });

      if (parsedPassword !== parsedConfirmPassword) {
        setError("Passwords don't match!");
      } else if (parsedPassword === parsedConfirmPassword) {
        const res = await setPassword({
          email: email,
          password: parsedPassword,
          token: token,
        });

        if (res.success) {
          router.push("/auth/login");

          toast.success("New password set! \n Redirecting in 3s");
          setTimeout(() => {
            router.push("/auth/login");
          }, 3200);
        } else if (!res.success && res?.message) {
          setError(res?.message);
        }
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
    <>
      <div className={`my-2 h-4 text-lg text-red-500`}>{error}</div>
      <form
        className="mb-2 flex flex-col items-center justify-start rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2 flex flex-col">
          <input
            className="rounded border border-gray-500 bg-transparent p-1"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="my-2 flex flex-col">
          <input
            className="rounded border border-gray-500 bg-transparent p-1"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="ConfirmPassword"
          />
        </div>
        <Button>{loading ? <LoadingSpinner /> : "Save"}</Button>
      </form>
    </>
  );
}
