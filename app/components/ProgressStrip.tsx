import React from "react";
import { generateParagraph, progressKeys } from "../helpers/keyboard";
import { auth } from "@/auth";
import { getUserInfo } from "../actions/userInfo";

export default async function ProgressStrip() {
  let currentIndex = 0;

  const session = await auth();

  const id = session?.user?.id as string;

  const userInfoRes = await getUserInfo(id);

  if (userInfoRes?.success && userInfoRes.userInfo?.progress) {
    const practiseString = generateParagraph(userInfoRes.userInfo?.progress);

    const practiseStringArray = practiseString.split("");

    const displayString = practiseStringArray.map((item, index) => {
      if (currentIndex === index) {
        return (
          <div className="relative">
            {item}
            <div className="absolute left-0 w-full animate-[pulse_0.9s_ease-in-out_infinite] border-b-4 border-white"></div>
          </div>
        );
      }
      return <p key={index}>{item === " " ? "\u00A0" : item}</p>;
    });
    return (
      <>
        <div className="mt-10 flex w-[60%] flex-wrap items-center justify-center gap-2 text-xl font-semibold">
          {progressKeys.map((item, index) => {
            if (index < userInfoRes.userInfo?.progress) {
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
        <div className="m-10 flex w-[60%] flex-wrap items-center justify-center text-2xl tracking-widest">
          {displayString}
        </div>
      </>
    );
  } else if (!userInfoRes?.success) {
    return <p>Error loading progress!</p>;
  }
}
