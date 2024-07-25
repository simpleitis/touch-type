"use client";

import React, { useContext, useEffect } from "react";
import { generateParagraph } from "../helpers/keyboard";
import { MainContext } from "../context/MainContext";
import { MdErrorOutline } from "react-icons/md";

export default function PractiseString({
  progress,
}: {
  progress: string[] | undefined;
}) {
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
        <div className="relative mb-2 flex min-w-4 justify-center">
          {item === " " ? "\u00A0" : item}
          <div className="absolute -bottom-1 left-0 w-full animate-[pulse_0.9s_ease-in-out_infinite] border-b-4 border-white"></div>
        </div>
      );
    }
    return (
      <div className="mb-2 flex min-w-4 justify-center">
        {item === " " ? "\u00A0" : item}
      </div>
    );
  });

  return (
    <div className="m-10 flex max-h-40 min-h-40 w-[60%] flex-wrap items-center justify-center text-2xl tracking-widest">
      {progress ? (
        displayString
      ) : (
        <p className="text-red-500 flex gap-2 items-center justify-center">
          <MdErrorOutline />
          Something went wrong! Please try again after sometime
        </p>
      )}
    </div>
  );
}
