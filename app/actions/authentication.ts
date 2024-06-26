"use server";

import { signIn } from "../auth";
import { prisma } from "@/utils/db";
import { hashPassword } from "../helpers/authHelpers";

export const register = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const hashedPassword = await hashPassword(String(password));

  try {
    const dbRes = await prisma.user.create({
      data: {
        email: String(email),
        password: String(hashedPassword),
        name: String(name),
      },
    });

    if (dbRes.id) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err: any) {
    console.log(err);
    return { success: false };
  }
};

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
