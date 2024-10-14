import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const webHookData = await request.json();

    if (
      webHookData?.data?.order?.order_id &&
      webHookData?.data?.payment?.payment_status
    ) {
      const dbRes = await prisma.userOrders.update({
        where: {
          id: webHookData?.data?.order?.order_id,
        },
        data: {
          status: webHookData?.data?.payment?.payment_status,
        },
      });
    }
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
