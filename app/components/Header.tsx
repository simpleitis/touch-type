import React from "react";
import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex h-20 w-full items-center justify-between rounded-lg border-4 border-white p-6 backdrop-blur-lg">
        <p className="text-4xl font-extrabold">touchtype_</p>
        <LogoutButton />
      </div>
    </div>
  );
}
