"use client";

import { useContext, useEffect, useState } from "react";
import { keys, specialKeys } from "../helpers/keyboard";
import Key from "./Key";
import { MainContext } from "../context/MainContext";

const Keyboard = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const { start, setStart } = useContext(MainContext);

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
    <div className="relative flex h-[440px] w-[1000px] items-center justify-center">
      {!start && (
        <div
          className="w-100% h-100% absolute bottom-0 left-0 right-0 top-0 z-10 flex cursor-pointer items-center justify-center rounded-xl bg-white bg-opacity-10 backdrop-blur-lg"
          onClick={() => setStart(true)}
        >
          <p className="text-2xl text-slate-200">Click to start</p>
        </div>
      )}
      <div>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-1 flex items-center justify-center">
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
    </div>
  );
};

export default Keyboard;
