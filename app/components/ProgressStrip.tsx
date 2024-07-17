"use client";

import React, { useContext, useEffect } from "react";
import { generateParagraph, progressKeys } from "../helpers/keyboard";
import { MainContext } from "../context/MainContext";

export default function ProgressStrip({ progress }: { progress: number }) {
  return (
    <>
      {!!progress ? (
        <>
          {" "}
          <div className="mt-10 flex w-[60%] flex-wrap items-center justify-center gap-2 text-xl font-semibold">
            {progressKeys.map((item, index) => {
              if (index < progress) {
                return (
                  <div
                    key={item}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-lime-400"
                  >
                    {item}
                  </div>
                );
              } else {
                return (
                  <div
                    key={item}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-800 text-slate-500"
                  >
                    {item}
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        <>
          <p className="text-lg text-red-500">Error loading progress!</p>
        </>
      )}
    </>
  );
}
