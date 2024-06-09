import { prisma } from "@/app/db";

export async function POST(request: Request) {
  const res = await request.json();

  const dbRes = await prisma.user.create({
    data: {
      email: res.email,
      password: res.password,
      name: res.name,
    },
  });

  return Response.json({ dbRes });
}
