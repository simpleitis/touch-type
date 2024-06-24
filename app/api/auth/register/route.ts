import { prisma } from "@/utils/db";
import { hashPassword } from "@/app/helpers/authHelpers";

export async function POST(request: Request) {
  const res = await request.json();

  const hashedPassword = await hashPassword(res.password);

  const dbRes = await prisma.user.create({
    data: {
      email: res.email,
      password: hashedPassword,
      name: res.name,
    },
  });

  return Response.json({ dbRes });
}
