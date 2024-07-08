"use server";

import { signIn } from "../../auth";
import { prisma } from "@/utils/db";
import { comparePassword, hashPassword } from "../helpers/authHelpers";
import {
  magicLinkSchema,
  magicLinkSignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/zod";
import { Prisma } from "@prisma/client";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

interface MagicLinkRegisterInfo {
  name: string;
  email: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface MagicLinkInfo {
  email: string;
}

export async function credentialRegister({
  name,
  email,
  password,
}: RegisterInfo) {
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

export async function magicLinkRegister({
  name,
  email,
}: MagicLinkRegisterInfo) {
  const { parsedName, parsedEmail } = await magicLinkSignUpSchema.parseAsync({
    parsedName: name,
    parsedEmail: email,
  });

  try {
    const dbRes = await prisma.user.create({
      data: {
        name: parsedName,
        email: parsedEmail,
        password: null,
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

export async function credentialLogin({ email, password }: LoginInfo) {
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
    console.log("🚀 ~ credentialLogin ~ err:", err);

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}

export async function githubAuthentication() {
  await signIn("github");
}

export async function magicLinkAuthentication({ email }: MagicLinkInfo) {
  const { parsedEmail } = await magicLinkSchema.parseAsync({
    parsedEmail: email,
  });

  await signIn("nodemailer", { email: parsedEmail, redirect: false });
}
