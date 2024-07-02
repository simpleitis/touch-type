"use server";

import { signIn } from "../auth";
import { prisma } from "@/utils/db";
import { hashPassword } from "../helpers/authHelpers";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";

interface registerInfo {
  name: string;
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: registerInfo) => {
  const { parsedName, parsedEmail, parsedPassword } =
    await signUpSchema.parseAsync({
      parsedName: name,
      parsedEmail: email,
      parsedPassword: password,
    });

  const hashedPassword = await hashPassword(parsedPassword);

  try {
    const dbRes = await prisma.user.create({
      data: {
        name: parsedName,
        email: parsedEmail,
        password: hashedPassword,
      },
    });

    if (dbRes.id) {
      return { success: true };
    } else {
      return { success: false, message: "Something went wrong!" };
    }
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { success: false, message: "Email already in use!" };
      }
    }

    console.log(err.message);
    return { success: false, message: "Something went wrong!" };
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
