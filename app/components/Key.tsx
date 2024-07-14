"use client";

import React, { useEffect } from "react";

interface KeyProps {
  value: string;
  display: string;
  isPressed: boolean;
  specialWidth: string;
}

function Key({ value, display, isPressed, specialWidth }: KeyProps) {
  return (
    <div
      className={`m-2 flex h-20 items-center justify-center rounded-lg border-2 border-white border-opacity-40 px-2 py-1 shadow-lg ${
        specialWidth || "w-20"
      } ${isPressed ? "bg-white bg-opacity-100 text-black" : "bg-white bg-opacity-20 text-white backdrop-blur-md"}`}
    >
      {display}
    </div>
  );
}

export default React.memo(Key);
