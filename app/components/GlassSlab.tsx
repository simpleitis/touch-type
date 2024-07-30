"use client";
import { Circle } from "rc-progress";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { updateUserWpm } from "../actions/userInfo";

export default function GlassSlab() {
  const [wpmProgress, setWpmProgress] = useState(0);

  const { wpm, result, userInfo, setUserInfo } = useContext(MainContext);

  let accuracy = 0;
  if (!!result.correct) {
    accuracy = Math.round(
      (result.correct / (result.correct + result.wrong)) * 100,
    );
  }

  async function updateUserWpmData() {
    if (userInfo.id) {
      const updateRes = await updateUserWpm(userInfo?.id, wpm);

      if (updateRes.success && updateRes.userInfo) {
        setUserInfo({
          id: updateRes.userInfo?.id,
          userId: updateRes.userInfo?.userId,
          progress: updateRes.userInfo?.progress as string[],
          bestWpm: updateRes.userInfo?.wpm,
        });
      }
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (wpmProgress < wpm) {
      interval = setTimeout(() => {
        setWpmProgress((prev) => prev + 1);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [wpmProgress, wpm]);

  useEffect(() => {
    if (
      (userInfo?.bestWpm || userInfo?.bestWpm === 0) &&
      wpm > userInfo?.bestWpm
    ) {
      updateUserWpmData();
    }
  }, [wpm]);

  return (
    <div className="w-100% h-100% absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-evenly rounded-xl bg-white bg-opacity-10 p-2 backdrop-blur">
      <div className="flex h-[70%] w-full justify-evenly">
        <div className="relative h-80 w-80">
          <Circle
            className="relative"
            percent={wpmProgress}
            gapDegree={70}
            strokeWidth={6}
            trailWidth={6}
            strokeColor={{
              "0%": "#fbbf24",
              "25%": "#bef264",
              "50%": "#84cc16",
              "75%": "#16a34a",
            }}
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-2xl">
            <p className="text-6xl font-bold text-lime-400">
              {wpm > userInfo?.bestWpm ? wpm : userInfo?.bestWpm}
            </p>
            <p>WPM</p>
            <p className="text-2xl">
              <span className="font-bold text-blue-600" title="Accuracy">
                {accuracy}%
              </span>
            </p>
          </div>
        </div>
        <div className="relative h-80 w-80">
          <Circle
            className="relative"
            percent={wpmProgress}
            gapDegree={70}
            strokeWidth={6}
            trailWidth={6}
            strokeColor={{
              "0%": "#fbbf24",
              "25%": "#bef264",
              "50%": "#84cc16",
              "75%": "#16a34a",
            }}
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-2xl">
            <p className="text-6xl font-bold">2</p>
            <p>OF 60</p>
          </div>
        </div>
      </div>

      <p className="animate-pulse text-2xl text-slate-200">
        Press Enter⎆ to start
      </p>
    </div>
  );
}
