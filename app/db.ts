import { PrismaClient } from "@prisma/client";

// First we define that we don't know the type of unknown and then we assert/say that the type is
// {
//   prisma: PrismaClient | undefined;
// };
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
