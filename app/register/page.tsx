"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-9xl font-extrabold">Register page</p>

      <form className="flex flex-col gap-4" onSubmit={(e) => onSubmit(e)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="text-black"
            name="name"
            type="text"
            required
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="text-black"
            name="email"
            type="email"
            required
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="text-black"
            name="password"
            type="password"
            required
            onChange={onChange}
          />
        </div>
        <button
          className="mt-2 self-center rounded-xl border-2 p-2"
          type="submit"
        >
          Create account
        </button>
      </form>

      <div className="padding-5 w-max p-2 underline">
        <Link href="/login">Go to login page</Link>
      </div>
    </div>
  );
};

export default Page;
