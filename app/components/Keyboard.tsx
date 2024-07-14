"use client";

import { useEffect, useState } from "react";
import { keys, specialKeys } from "../helpers/keyboard";

const Keyboard = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    setPressedKey(event.code);

    setTimeout(() => {
      setPressedKey(null);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="mt-20 w-full p-10" key={pressedKey}>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-1 flex justify-center">
          {row.map((item) => (
            <div
              key={item.value}
              className={`m-2 flex h-20 items-center justify-center rounded-lg border-2 border-white border-opacity-40 px-2 py-1 shadow-lg ${
                specialKeys[item.display] || "w-20"
              } ${pressedKey === item.value ? "bg-white bg-opacity-100 text-black" : "bg-white bg-opacity-20 text-white backdrop-blur-md"}`}
            >
              {item.display}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
