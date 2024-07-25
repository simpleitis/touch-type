"use client";
import { Circle } from "rc-progress";
import React, { useEffect, useState } from "react";
export default function GlassSlab() {
  const [speedPercent, setSpeedPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (speedPercent < 90) {
      interval = setTimeout(() => {
        setSpeedPercent((prev) => prev + 1);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [speedPercent]);

  return (
    <div className="w-100% h-100% absolute bottom-0 left-0 right-0 top-0 z-10 flex cursor-pointer flex-col items-center justify-evenly rounded-xl bg-white bg-opacity-10 p-2 backdrop-blur">
      <div className="flex h-[70%] w-full justify-evenly">
        <div className="relative h-80 w-80">
          <Circle
            className="relative"
            percent={speedPercent}
            gapDegree={70}
            strokeWidth={6}
            trailWidth={6}
            strokeColor={{
              "0%": "#ef4444",
              "25%": "#fbbf24",
              "50%": "#bef264",
              "75%": "#84cc16",
              "100%": "#16a34a",
            }}
          />
          <p className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-2xl">
            <span className="text-6xl font-bold">40</span> <span>WPM</span>
          </p>
        </div>
        <div className="relative h-80 w-80">
          <Circle
            className="relative"
            percent={speedPercent}
            gapDegree={70}
            strokeWidth={6}
            trailWidth={6}
            strokeColor={{
              "0%": "#ef4444",
              "25%": "#fbbf24",
              "50%": "#bef264",
              "75%": "#84cc16",
              "100%": "#16a34a",
            }}
          />
          <p className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-2xl">
            <span className="text-6xl font-bold">2</span> <span>OF 60</span>
          </p>
        </div>
      </div>

      <p className="animate-pulse text-2xl text-slate-200">
        Press Enter⎆ to start
      </p>
    </div>
  );
}
