"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createOrder } from "../actions/payment";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "react-toastify";
import {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useEffect,
} from "react";
import { positiveNumberSchema, stringSchema } from "@/lib/zod";
import { prisma } from "@/lib/db";

interface DepositDialogProps {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DepositDialog({ user, open, setOpen }: DepositDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("10");
  const [withdrawCondition, setWithdrawCondition] = useState<string>("");

  const handleDeposit = async () => {
    setIsLoading(true);

    try {
      const { parsedNumber } = await positiveNumberSchema.parseAsync({
        parsedNumber: Number(amount),
      });

      const { parsedString } = await stringSchema.parseAsync({
        parsedString: withdrawCondition,
      });

      // Initialize SDK
      const cashfree = await load({ mode: "sandbox" });

      // Create order
      const data = {
        order_amount: parsedNumber,
        customer_id: user.id,
        customer_name: user.name || "User",
        customer_email: user.email,
        withdraw_condition: withdrawCondition,
      };
      const res = await createOrder(data);

      // Load checkout
      if (res?.success && res?.session_id && res?.order_id) {
        await cashfree.checkout({
          paymentSessionId: res.session_id,
          redirectTarget: "_self",
          returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-processing/${res.order_id}`,
        });
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error: any) {
      if (error?.name == "ZodError") {
        toast.error(`${error.issues[0]?.message}!`);
      } else {
        console.error("Deposit error:", error);
        toast.error("Something went wrong! Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Enter the amount you would like to deposit and choose the milestone
            at which you wish to withdraw it.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-left">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="condition" className="text-left">
            Withdraw condition
          </Label>

          <div className="col-span-3">
            <Select
              value={withdrawCondition}
              onValueChange={(value) => setWithdrawCondition(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select withdraw condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">After unlocking 5 keys</SelectItem>
                <SelectItem value="10">After unlocking 10 keys</SelectItem>
                <SelectItem value="15">After unlocking 15 keys</SelectItem>
                <SelectItem value="20">After unlocking 20 keys</SelectItem>
                <SelectItem value="25">After unlocking 25 keys</SelectItem>
                <SelectItem value="30">After unlocking 30 keys</SelectItem>
                <SelectItem value="35">After unlocking 35 keys</SelectItem>
                <SelectItem value="38">After unlocking all keys</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Processing..." : "Deposit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
