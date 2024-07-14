import React from "react";
import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex h-20 w-full items-center justify-between rounded-lg border border-white border-opacity-20 bg-white bg-opacity-10 p-6 backdrop-blur-lg">
        <p className="text-4xl font-bold">touchtype_</p>
        <LogoutButton />
      </div>
    </div>
  );
}
