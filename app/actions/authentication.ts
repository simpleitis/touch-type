"use server";

import { signIn } from "../auth";
import { prisma } from "@/utils/db";
import { hashPassword } from "../helpers/authHelpers";
import { signInSchema, signUpSchema } from "@/lib/zod";

export const register = async (formData: FormData) => {
  const formName = formData.get("name");
  const formEmail = formData.get("email");
  const formPassword = formData.get("password");

  const { email, password, name } = await signUpSchema.parseAsync({
    email: formEmail,
    password: formPassword,
    name: formName,
  });

  const hashedPassword = await hashPassword(password);

  try {
    const dbRes = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
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
  const formEmail = formData.get("email");
  const formPassword = formData.get("password");

  const { email, password } = await signInSchema.parseAsync({
    email: formEmail,
    password: formPassword,
  });

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
