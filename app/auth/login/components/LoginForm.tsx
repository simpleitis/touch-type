"use client";

import {
  credentialLogin,
  githubAuthentication,
  magicLinkLogin,
  sendSetPasswordMail,
} from "@/app/actions/authentication";
import Button from "@/app/components/Button";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { AuthContext } from "@/app/context/AuthenticationContext";
import { emailSchema, signInSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { magicLink, setMagicLink } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [magicLink]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  async function handleGithubClick() {
    await githubAuthentication();
  }

  return (
    <>
      <div className="mt-10 flex h-12 w-[358px] justify-center overflow-hidden rounded-md border border-white">
        <div
          title="Sign in using email/password"
          className="flex w-full cursor-pointer items-center justify-center"
          onClick={() => setMagicLink(false)}
        >
          <div
            className={`flex h-[80%] w-[95%] cursor-pointer items-center justify-center rounded-md ${magicLink ? "bg-black text-white" : "bg-white text-black"}`}
          >
            <MdOutlinePassword />
          </div>
        </div>

        <div
          title="Sign in using email verification"
          className="flex w-full cursor-pointer items-center justify-center"
          onClick={() => setMagicLink(true)}
        >
          <div
            className={`flex h-[80%] w-[95%] cursor-pointer items-center justify-center rounded-md ${magicLink ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <IoIosMail />
          </div>
        </div>
      </div>

      <div className={`my-2 h-4 text-lg text-red-500`}>{error}</div>
      <form
        className="mb-2 flex flex-col items-center justify-start rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2 flex flex-col">
          <input
            placeholder="Email"
            className="rounded border border-gray-500 bg-transparent p-1"
            type="email"
            name="email"
            id="email"
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
      </form>
      <hr className="mb-5 mt-4 h-1 w-80"></hr>

      <div
        className="mb-5 flex w-80 cursor-pointer items-center justify-center gap-2 rounded-md border p-2"
        onClick={handleGithubClick}
      >
        Sign in with
        <FaGithub />
      </div>
    </>
  );
}
