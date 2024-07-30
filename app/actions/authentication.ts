"use server";

import { signIn } from "../../auth";
import { prisma } from "@/utils/db";
import { comparePassword, hashPassword } from "../helpers/authHelpers";
import {
  emailSchema,
  magicLinkSignUpSchema,
  signInSchema,
  signUpSchema,
  idSchema,
} from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { sendChangePasswordEmail } from "@/lib/nodemailer";
import { v4 as uuidv4 } from "uuid";
import { getDatetimePlusOneHourGMT } from "../helpers/datetime";

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

interface EmailInfo {
  email: string;
}

interface SetPasswordInfo {
  email: string;
  password: string;
  token: string;
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
    if (!userPassword) {
      return {
        success: false,
        message: "Password not set",
        noPassword: true,
      };
    }
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

export async function magicLinkLogin({ email }: EmailInfo) {
  const { parsedEmail } = await emailSchema.parseAsync({
    parsedEmail: email,
  });

  await signIn("nodemailer", { email: parsedEmail, redirect: false });
}

export async function sendSetPasswordMail({ email }: EmailInfo) {
  try {
    const { parsedEmail } = await emailSchema.parseAsync({
      parsedEmail: email,
    });

    const verificationToken = uuidv4();
    const expiry = getDatetimePlusOneHourGMT();

    const res = await prisma.verificationToken.create({
      data: {
        identifier: parsedEmail,
        token: verificationToken,
        expires: expiry,
      },
    });

    if (res.token) {
      const sendVerificationEmail = await sendChangePasswordEmail({
        email: parsedEmail,
        verificationToken: verificationToken,
      });

      if (sendVerificationEmail.success) {
        return { success: true };
      } else {
        return { success: false, message: "Something went wrong!" };
      }
    } else {
      return { success: false, message: "Something went wrong!" };
    }
  } catch (err: any) {
    console.log(err.message);
    return { success: false, message: "Something went wrong!" };
  }
}

export async function setPassword({ email, password, token }: SetPasswordInfo) {
  try {
    const { parsedEmail, parsedPassword } = await signInSchema.parseAsync({
      parsedEmail: email,
      parsedPassword: password,
    });

    const { parsedToken } = await idSchema.parseAsync({
      parsedToken: token,
    });

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: parsedToken,
        identifier: parsedEmail,
      },
    });

    if (verificationToken?.token) {
      const deleteVerificationToken = await prisma.verificationToken.deleteMany(
        {
          where: {
            token: verificationToken?.token,
          },
        },
      );

      if (deleteVerificationToken) {
        const currentDateTime = new Date();
        if (verificationToken?.expires > currentDateTime) {
          const hashedPassword = await hashPassword(parsedPassword);

          const updateUser = await prisma.user.update({
            where: {
              email: parsedEmail,
            },
            data: {
              password: hashedPassword,
            },
          });

          if (updateUser?.id) {
            return { success: true };
          } else {
            return { success: false, message: "Something went wrong!" };
          }
        } else {
          return { success: false, message: "Verification token expired!" };
        }
      } else {
        return { success: false, message: "Something went wrong!" };
      }
    } else {
      return { success: false, message: "Verification token expired!" };
    }
  } catch (err: any) {
    console.log(err.message);
    return { success: false, message: "Something went wrong!" };
  }
}
