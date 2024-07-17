"use client";

import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../context/MainContext";

const CountdownBar = () => {
  const [width, setWidth] = useState(100);

  const { start } = useContext(MainContext);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (start) {
      interval = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth > 0) {
            return prevWidth - 100 / 120;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 250);
    }

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="h-4 w-[1200px] rounded-full border-2 border-white">
      <div
        className="h-full rounded-r-full bg-white duration-500 ease-linear"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default CountdownBar;
