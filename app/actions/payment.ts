"use server";

import { prisma } from "@/lib/db";
import { Cashfree } from "cashfree-pg";
import { paymentStates } from "../helpers/paymentHelpers";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

interface CreateOrderData {
  order_amount: number;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
}

export async function createOrder(data: CreateOrderData) {
  const request = {
    order_amount: data.order_amount,
    order_currency: "INR",
    customer_details: {
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: "9999999999",
    },
    order_note: "",
  };

  try {
    const res = await Cashfree.PGCreateOrder("2023-08-01", request);
    if (res.status === 200 && res.data.order_id) {
      const dbRes = await prisma.userOrders.create({
        data: {
          id: res.data.order_id,
          userId: data.customer_id,
          amount: data.order_amount,
          status: paymentStates.paymentPending,
        },
      });
      return {
        success: true,
        session_id: res?.data?.payment_session_id,
        order_id: res.data.order_id,
      };
    } else {
      return { success: false };
    }
  } catch (error: any) {
    console.error("Error setting up order request:", error.message);
    return { success: false };
  }
}

export async function checkOrderStatus(id: string) {
  try {
    const res = await prisma.userOrders.findUnique({
      where: {
        id: id,
      },
    });

    return { success: true, status: res?.status };
  } catch (error) {}
}
