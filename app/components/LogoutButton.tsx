"use client";

import React from "react";
import { IoPower } from "react-icons/io5";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="flex items-center gap-2 p-2 text-lg text-red-500 font-medium"
      onClick={() => signOut()}
    >
      <IoPower />
      Logout
    </button>
  );
}
