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
import { getInitials } from "../helpers/string";
import { DepositDialog } from "./DepositDialog";
import { useState } from "react";

interface ProfileSection {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
}

export default function ProfileSection({ user }: ProfileSection) {
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <div>
            <Avatar>
              <AvatarImage src={String(user?.image)} />
              <AvatarFallback>
                {getInitials(user?.name ?? user?.email)}
              </AvatarFallback>
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

          <DropdownMenuItem
            className="text-lg"
            onClick={() => {
              setDepositDialogOpen(true);
            }}
          >
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

      <DepositDialog
        user={user}
        open={depositDialogOpen}
        setOpen={setDepositDialogOpen}
      />
    </>
  );
}
