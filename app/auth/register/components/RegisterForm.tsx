"use client";

import { FormEvent, useContext, useState } from "react";
import {
  credentialRegister,
  githubAuthentication,
  magicLinkRegister,
} from "../../../actions/authentication";
import { magicLinkSignUpSchema, signUpSchema } from "@/lib/zod";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Button from "../../../components/Button";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { AuthContext } from "@/app/context/AuthenticationContext";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { magicLink, setMagicLink } = useContext(AuthContext);

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const formName = formData.get("name");
    const formEmail = formData.get("email");
    const formPassword = formData.get("password");

    if (magicLink) {
      try {
        const { parsedName, parsedEmail } =
          await magicLinkSignUpSchema.parseAsync({
            parsedName: formName,
            parsedEmail: formEmail,
          });

        const res = await magicLinkRegister({
          name: parsedName,
          email: parsedEmail,
        });

        if (res.success) {
          router.push("/auth/login");
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
    } else if (!magicLink) {
      try {
        const { parsedName, parsedEmail, parsedPassword } =
          await signUpSchema.parseAsync({
            parsedName: formName,
            parsedEmail: formEmail,
            parsedPassword: formPassword,
          });

        const res = await credentialRegister({
          name: parsedName,
          email: parsedEmail,
          password: parsedPassword,
        });

        if (res.success) {
          router.push("/auth/login");
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
    }

    setLoading(false);
  }

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center rounded-md p-3"
      >
        <div className={`mb-2 h-4 text-lg text-red-500`}>{error}</div>

        <div className="my-2 flex flex-col">
          <input
            className="rounded border border-gray-500 bg-transparent p-1"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="my-2 flex flex-col">
          <input
            className="rounded border border-gray-500 bg-transparent p-1"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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

        <Button>{loading ? <LoadingSpinner /> : "Register"}</Button>
      </form>

      <hr className="mb-5 mt-4 h-1 w-80"></hr>

      <div
        className="flex w-80 cursor-pointer items-center justify-center gap-2 rounded-md border p-2"
        onClick={handleGithubClick}
      >
        Sign up with
        <FaGithub />
      </div>
    </>
  );
}
