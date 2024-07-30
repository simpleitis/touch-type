"use server";

import { numberSchema, idSchema } from "@/lib/zod";
import { prisma } from "@/utils/db";

export async function getUserInfo(id: string) {
  try {
    const { parsedToken: parsedId } = await idSchema.parseAsync({
      parsedToken: id,
    });

    const userInfo = await prisma.userProgress.findUnique({
      where: {
        userId: parsedId,
      },
    });

    if (userInfo) {
      return { success: true, userInfo: userInfo };
    }

    const createUserProgressRecordRes = await prisma.userProgress.create({
      data: {
        userId: parsedId,
        progress: ["Q", "R"],
        wpm: 0,
      },
    });

    if (createUserProgressRecordRes.id) {
      return { success: true, userInfo: createUserProgressRecordRes };
    }

    return { success: false, message: "Something went wrong!" };
  } catch (err: any) {
    console.log(err.message);
    return { success: false, message: "Something went wrong!" };
  }
}

export async function updateUserWpm(id: string, wpm: number) {
  try {
    const { parsedToken: parsedId } = await idSchema.parseAsync({
      parsedToken: id,
    });

    const { parsedNumber: parsedWpm } = await numberSchema.parseAsync({
      parsedNumber: wpm,
    });

    const updatedUser = await prisma.userProgress.update({
      where: {
        id: parsedId,
      },
      data: {
        wpm: parsedWpm,
      },
    });

    if (updatedUser.id) {
      return { success: true, userInfo: updatedUser };
    } else {
      return { success: false, message: "Something went wrong!" };
    }
  } catch (err: any) {
    console.log(err.message);
    return { success: false, message: "Something went wrong!" };
  }
}
