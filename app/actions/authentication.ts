"use server";

import { signIn } from "@/auth";

export const login = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};
