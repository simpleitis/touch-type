"use client";

import {
  credentialLogin,
  githubAuthentication,
  magicLinkLogin,
  sendSetPasswordMail,
} from "@/app/actions/authentication";
import Button from "@/app/components/Button";
import GithubAuth from "@/app/components/GithubAuth";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { AuthContext } from "@/app/context/AuthenticationContext";
import { emailSchema, signInSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AuthMethodSwitcher from "./AuthMethodSwitcher";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const { magicLink } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [magicLink]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const formEmail = formData.get("email");
    const formPassword = formData.get("password");

    if (magicLink) {
      try {
        const { parsedEmail } = await emailSchema.parseAsync({
          parsedEmail: formEmail,
        });
        await magicLinkLogin({ email: parsedEmail });

        toast.success("Verification link sent! Please check your email");
      } catch (err: any) {
        if (err.name == "ZodError") {
          setError(`${err.issues[0]?.message}!`);
        } else {
          console.error("Error: ", err);
          setError("Something went wrong!");
        }
      }
    } else if (!magicLink) {
      try {
        const { parsedEmail, parsedPassword } = await signInSchema.parseAsync({
          parsedEmail: formEmail,
          parsedPassword: formPassword,
        });

        const res = await credentialLogin({
          email: parsedEmail,
          password: parsedPassword,
        });

        if (!res?.success && res?.redirect) {
          toast.warning("Please create an account! \n Redirecting in 3s");
          setTimeout(() => {
            router.push("/auth/register");
          }, 3200);
        } else if (res?.success) {
          router.push("/");
        } else if (!res?.success && res?.message) {
          if (res?.noPassword) {
            const sendEmailRes = await sendSetPasswordMail({
              email: parsedEmail,
            });
            if (sendEmailRes?.success) {
              toast.error(`${res?.message}! \n Please check you email!`);
            } else if (!sendEmailRes.success && sendEmailRes.message) {
              setError(sendEmailRes.message);
            }
          } else {
            setError(res.message);
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
    }

    setLoading(false);
  }

  async function handleGithubLogin() {
    await githubAuthentication();
  }

  async function handlePasswordReset() {
    const email = emailRef?.current?.value;
    setError("");

    try {
      setPasswordResetLoading(true);

      const { parsedEmail } = await emailSchema.parseAsync({
        parsedEmail: email,
      });

      const id = toast.loading("Processing...");

      const sendEmailRes = await sendSetPasswordMail({
        email: parsedEmail,
      });

      if (sendEmailRes.success) {
        toast.update(id, {
          render: "Password reset email sent! Please check your email",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else if (!sendEmailRes.success && sendEmailRes.message) {
        toast.update(id, {
          render: "Please try again after sometime!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setError(sendEmailRes.message);
      }
    } catch (err: any) {
      if (err.name == "ZodError") {
        setError(`${err.issues[0]?.message}!`);
      } else {
        console.error("Error: ", err);
        setError("Something went wrong!");
      }
    } finally {
      setPasswordResetLoading(false);
    }
  }

  return (
    <>
      <AuthMethodSwitcher />

      <div className={`my-2 h-4 text-lg text-red-500`}>{error}</div>
      <form
        className="mb-2 flex flex-col items-center justify-start rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-2 flex flex-col">
          <input
            placeholder="Email"
            className="rounded border border-gray-500 bg-transparent p-1"
            type="email"
            name="email"
            id="email"
            ref={emailRef}
          />
        </div>

        {!magicLink && (
          <div className="my-2 flex flex-col">
            <input
              className="rounded border border-gray-500 bg-transparent p-1"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
        )}

        <Button>{loading ? <LoadingSpinner /> : "Login"}</Button>
        {!magicLink && (
          <p
            onClick={handlePasswordReset}
            className={`cursor-pointer pt-2 underline ${passwordResetLoading ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            Forgot password?
          </p>
        )}
      </form>
      <hr className="mb-5 mt-4 h-1 w-80"></hr>

      <GithubAuth onClick={handleGithubLogin} />
    </>
  );
}
