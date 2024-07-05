"use server";

import { signIn } from "../../auth";
import { prisma } from "@/utils/db";
import { comparePassword, hashPassword } from "../helpers/authHelpers";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

export async function register({ name, email, password }: RegisterInfo) {
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
}

export async function login({ email, password }: LoginInfo) {
  try {
    const { parsedEmail, parsedPassword } = await signInSchema.parseAsync({
      parsedEmail: email,
      parsedPassword: password,
    });

    const user = await prisma.user.findUnique({
      where: {
        email: parsedEmail,
      },
    });

    if (!user) {
      return {
        success: false,
        redirect: true,
      };
    }

    const userPassword = user?.password as string;
    const passwordsMatch = await comparePassword(parsedPassword, userPassword);

    if (passwordsMatch) {
      const res = await signIn("credentials", {
        email: parsedEmail,
        id: user.id,
        name: user.name,
        redirect: false,
      });

      if (res) {
        return { success: true };
      }
    } else {
      return { success: false, message: "Invalid credentials!" };
    }
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}
