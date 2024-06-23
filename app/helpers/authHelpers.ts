import { prisma } from "../db";
import bcrypt from "bcrypt";

export const checkIfRegistered = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const createUser = async (
  credentials: Record<"email" | "password", string> | undefined,
) => {
  if (credentials?.email && credentials?.password) {
    const hashedPassword = await hashPassword(credentials.password);
    const user = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
        name: "Amar",
      },
    });

    if (!!user) {
      return user;
    }
  }

  return null;
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
