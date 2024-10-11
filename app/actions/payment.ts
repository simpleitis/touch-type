"use server";

import { Cashfree } from "cashfree-pg";

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
  var request = {
    order_amount: data.order_amount,
    order_currency: "INR",
    customer_details: {
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: "9999999999",
    },
    order_meta: {
      return_url: `${process.env.AUTH_URL}`,
    },
    order_note: "",
  };

  try {
    const res = await Cashfree.PGCreateOrder("2023-08-01", request);
    if (res.status === 200) {
      return { success: true, session_id: res?.data?.payment_session_id };
    } else {
      return { success: false };
    }
  } catch (error: any) {
    console.error("Error setting up order request:", error.response.data);
    return { success: false };
  }
}

// export async function verifyPayment() {
//   try {
//     cosnt res = await Cashfree.PGOrderFetchPayments("2023-08-01", "devstudio_83880788")
//   } catch (error) {
    
//   }

//   .then((response) => {
//       console.log('Order fetched successfully:', response.data);
//   }).catch((error) => {
//       console.error('Error:', error.response.data.message);
//   });
// }

