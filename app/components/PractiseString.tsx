"use client";

import React, { useContext, useEffect } from "react";
import { generateParagraph } from "../helpers/keyboard";
import { MainContext } from "../context/MainContext";

export default function PractiseString({ progress }: { progress: number }) {
  const { currentIndex, practiseString, setPractiseString } =
    useContext(MainContext);

  useEffect(() => {
    if (!!progress) {
      const generatedParagraph = generateParagraph(progress);

      setPractiseString(generatedParagraph);
    }
  }, [progress]);

  const practiseStringArray = practiseString.split("");

  const displayString = practiseStringArray.map((item, index) => {
    if (currentIndex === index) {
      return (
        <div className="relative">
          {item === " " ? "\u00A0" : item}
          <div className="absolute left-0 w-full animate-[pulse_0.9s_ease-in-out_infinite] border-b-4 border-white"></div>
        </div>
      );
    }
    return <div>{item === " " ? "\u00A0" : item}</div>;
  });

  return (
    <div className="m-10 flex w-[60%] flex-wrap items-center justify-center text-2xl tracking-widest">
      {displayString}
    </div>
  );
}
