import React from "react";

interface KeyProps {
  value: string;
  display: string;
  isPressed: boolean;
  specialWidth: string;
  colored?: boolean;
}

function Key({ display, isPressed, specialWidth, colored }: KeyProps) {
  return (
    <div
      className={`m-2 flex h-16 items-center justify-center rounded-xl border-2 ${colored ? "border-4 border-lime-600" : "border-white border-opacity-40"} px-2 py-1 shadow-lg ${
        specialWidth || "w-16"
      } ${isPressed ? "bg-white text-black" : "bg-transparent text-white"}`}
    >
      {display}
    </div>
  );
}

export default React.memo(Key);
