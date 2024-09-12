"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface ProfileSection {
  user: {
    name: string;
    image: string | null | undefined;
  };
}

export default function ProfileSection({ user }: ProfileSection) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)}>
        <Avatar>
          <AvatarImage src={String(user?.image)} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </button>
      {showMenu && (
        <div className="top-15 absolute right-2 flex w-32 flex-col items-start justify-between gap-5 border p-2">
          <button>Deposit</button>
          <button className="" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
