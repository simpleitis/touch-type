import { prisma } from "../db";

export const checkIfRegistered = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: credentials?.email,
      password: credentials?.password,
    },
  });

  if (!!user && user.id) {
    return { ...user, id: user.id.toString() };
  }

  return null;
};

export const createUser = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  if (credentials?.email && credentials?.password) {
    const user = await prisma.user.create({
      data: {
        email: credentials?.email,
        password: credentials?.password,
        name: "Amar",
      },
    });

    if (!!user) {
      return user;
    }
  }

  return null;
};
