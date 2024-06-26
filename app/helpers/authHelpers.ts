import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";

export const createUser = async (
  credentials: Record<"email" | "password", string> | undefined,
) => {
  if (credentials?.email && credentials?.password) {
    const hashedPassword = await hashPassword(credentials.password);
    console.log("Hashed password: ", hashedPassword);
    const user = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
        name: "Amar",
      },
    });

    if (!!user) {
      console.log("Created user: ", user);
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

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  return passwordMatch;
};
