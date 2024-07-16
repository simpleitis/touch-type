"use client";

import { useEffect, useState } from "react";
import { keys, specialKeys } from "../helpers/keyboard";
import Key from "./Key";

const Keyboard = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    setPressedKey(event.code);

    setTimeout(() => {
      setPressedKey(null);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full ">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-1 flex justify-center">
          {row.map((item) => (
            <Key
              value={item.value}
              display={item.display}
              key={item.value}
              isPressed={pressedKey === item.value}
              specialWidth={specialKeys[item.display]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
