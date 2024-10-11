"use client";

import { signOut } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { LogOut, CircleDollarSign, HandCoins, Milestone } from "lucide-react";
import { createOrder } from "../actions/payment";
import { getInitials } from "../helpers/string";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "react-toastify";

interface ProfileSection {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
}

export default function ProfileSection({ user }: ProfileSection) {
  async function handleDeposit() {
    // Initialize SDK
    let cashfree;
    var initializeSDK = async function () {
      cashfree = await load({
        mode: "sandbox",
      });
    };
    await initializeSDK();

    // Create order
    const data = {
      order_amount: 10,
      customer_id: String(user?.id),
      customer_name: user?.name ?? "User",
      customer_email: String(user?.email),
    };
    const res = await createOrder(data);

    // Load checkout
    if (res?.success && res?.session_id) {
      const checkOutResponse = await cashfree!.checkout({
        paymentSessionId: res?.session_id,
        redirectTarget: "_modal",
      });

      if (checkOutResponse.error) {
        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        console.log(
          "User has closed the popup or there is some payment error, Check for Payment Status",
        );
        console.log(checkOutResponse.error);
      } else if (checkOutResponse.paymentDetails) {
        // This will be called whenever the payment is completed irrespective of transaction status
        console.log("Payment has been completed, Check for Payment Status");
        console.log(checkOutResponse.paymentDetails.paymentMessage);
      } else if (checkOutResponse.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
    } else {
      toast.error("Something went wrong! Please try again after sometime");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Avatar>
            <AvatarImage src={String(user?.image)} />
            <AvatarFallback>{getInitials(user?.name ?? "U S")}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      {/* <button>Deposit</button>
          <button className="" >
            Logout
          </button> */}
      <DropdownMenuContent className="back mr-4 mt-2 w-60 bg-opacity-10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-lg" onClick={handleDeposit}>
          <CircleDollarSign className="mr-2 h-4 w-4" />
          Deposit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-lg">
          <HandCoins className="mr-2 h-4 w-4" />
          Withdraw
        </DropdownMenuItem>
        <DropdownMenuItem className="text-lg">
          <Milestone className="mr-2 h-4 w-4" /> Milestones
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-lg text-red-500"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
