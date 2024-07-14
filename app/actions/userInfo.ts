"use server";

import { tokenSchema } from "@/lib/zod";
import { prisma } from "@/utils/db";

export async function getUserInfo(id: string) {
  const { parsedToken } = await tokenSchema.parseAsync({
    parsedToken: id,
  });

  try {
    const userInfo = await prisma.userProgress.findUnique({
      where: {
        userId: parsedToken,
      },
    });

    if (userInfo) {
      return { success: true, userInfo: userInfo };
    }

    const createUserProgressRecordRes = await prisma.userProgress.create({
      data: {
        userId: parsedToken,
        progress: 2,
      },
    });

    if (createUserProgressRecordRes.id) {
      return { succes: true, userInfo: createUserProgressRecordRes };
    }

    return { success: false, message: "Something went wrong!" };
  } catch (err: any) {
    console.log(err.message);
    return { success: false, message: "Something went wrong!" };
  }
}
