"use client";

import { useContext, useEffect, useState } from "react";
import { keys, specialKeys } from "../helpers/keyboard";
import Key from "./Key";
import { MainContext } from "../context/MainContext";
import GlassSlab from "./GlassSlab";

const Keyboard = ({ progress }: { progress: string[] | undefined }) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const {
    start,
    setStart,
    currentIndex,
    setCurrentIndex,
    practiseString,
    result,
    setResult,
    setWpm,
  } = useContext(MainContext);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
    }

    if (event.code === "Enter" && !start) {
      setStart(true);
      setResult({ correct: 0, wrong: 0 });
      setWpm(0)
    } else if (start) {
      setPressedKey(event.code);

      if (practiseString[currentIndex] == event?.key.toLowerCase()) {
        setCurrentIndex((prevIndex) => prevIndex + 1);

        if (event?.key !== " ") {
          setResult((prev) => {
            return { correct: prev.correct + 1, wrong: prev.wrong };
          });
        }
      } else {
        setResult((prev) => {
          return { correct: prev.correct, wrong: prev.wrong + 1 };
        });
      }

      setTimeout(() => {
        setPressedKey(null);
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (!start) {
      const durationInMinutes = 30 / 60;
      const numberOfWords = result.correct / 5;
      const calculatedWpm = numberOfWords / durationInMinutes;
      setWpm(Math.round(calculatedWpm));
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [start, currentIndex]);

  return (
    <div className="relative flex h-[460px] w-[1200px] items-center justify-center">
      {!start && <GlassSlab />}

      <div>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-1 flex items-center justify-center">
            {row.map((item) => {
              if (progress?.includes(item.display)) {
                return (
                  <Key
                    value={item.value}
                    display={item.display}
                    key={item.value}
                    isPressed={pressedKey === item.value}
                    specialWidth={specialKeys[item.display]}
                    colored={true}
                  />
                );
              } else {
                return (
                  <Key
                    value={item.value}
                    display={item.display}
                    key={item.value}
                    isPressed={pressedKey === item.value}
                    specialWidth={specialKeys[item.display]}
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
