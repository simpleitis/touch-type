import { prisma } from "@/utils/db";
import { hashPassword } from "@/app/helpers/authHelpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  const hashedPassword = await hashPassword(password);

  try {
    const dbRes = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
  } catch (err: any) {
    return new NextResponse(err.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
