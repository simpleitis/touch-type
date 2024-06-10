import { prisma } from '../db';
import bcrypt from 'bcrypt';

export const checkIfRegistered = async (
  credentials: Record<'email' | 'password', string> | undefined
) => {
  
  const user = await prisma.user.findUnique({
    where: {
      email: credentials?.email,
      password: credentials?.password,
    },
  });

  if (user?.password) {
    const isMatch = await bcrypt.compare(credentials?.password!, user?.password);
    if (isMatch) {
      return { id: user.id.toString(), email: user.email, name: user.name };
    }
  }

  return null;
};

export const createUser = async (
  credentials: Record<'email' | 'password', string> | undefined
) => {
  if (credentials?.email && credentials?.password) {
    const user = await prisma.user.create({
      data: {
        email: credentials?.email,
        password: credentials?.password,
        name: 'Amar',
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
