"use client";
import { Circle } from "rc-progress";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import {
  updateUserProgress,
  updateUserWpm,
  updateUserWpmAndProgress,
} from "../actions/userInfo";
import { toast } from "react-toastify";
import { threshHoldSpeed } from "../helpers/keyboard";

export default function GlassSlab() {
  const [wpmProgress, setWpmProgress] = useState(0);

  const { wpm, result, userInfo, setUserInfo } = useContext(MainContext);

  // Calculate accuracy
  let accuracy = 0;
  if (!!result.correct) {
    accuracy = Math.round(
      (result.correct / (result.correct + result.wrong)) * 100,
    );
  }

  async function updateUserProgressData() {
    // Update user's best score in wpm and extend the progress array with the next element for practise
    if (wpm > userInfo?.bestWpm && wpm >= threshHoldSpeed) {
      const updateRes = await updateUserWpmAndProgress(
        userInfo?.id,
        wpm,
        userInfo?.progress,
      );

      if (updateRes?.success && updateRes?.userInfo) {
        setUserInfo({
          id: updateRes.userInfo?.id,
          userId: updateRes.userInfo?.userId,
          progress: updateRes.userInfo?.progress as string[],
          bestWpm: updateRes.userInfo?.wpm,
        });

        const progressArray = updateRes.userInfo?.progress as string[];
        const unlockedKey = progressArray[progressArray.length - 1];
        toast.success(
          <div className="flex items-center gap-2">
            <p className="flex h-2 w-2 items-center justify-center rounded-lg border border-white p-4">
              {unlockedKey}
            </p>
            <p>unlocked!</p>
          </div>,
        );
      } else {
        toast.error("Something went wrong!");
      }
    }

    // Update user's best score in wpm in the DB
    else if (wpm > userInfo?.bestWpm && wpm < threshHoldSpeed) {
      const updateRes = await updateUserWpm(userInfo?.id, wpm);

      if (updateRes?.success && updateRes?.userInfo) {
        setUserInfo({
          id: updateRes.userInfo?.id,
          userId: updateRes.userInfo?.userId,
          progress: updateRes.userInfo?.progress as string[],
          bestWpm: updateRes.userInfo?.wpm,
        });
      } else {
        toast.error("Something went wrong!");
      }
    }

    // Update user's progress array with the next element for practise
    else if (wpm <= userInfo?.bestWpm && wpm >= threshHoldSpeed) {
      const updateRes = await updateUserProgress(
        userInfo?.id,
        userInfo?.progress,
      );

      if (updateRes?.success && updateRes.userInfo) {
        setUserInfo({
          id: updateRes.userInfo?.id,
          userId: updateRes.userInfo?.userId,
          progress: updateRes.userInfo?.progress as string[],
          bestWpm: updateRes.userInfo?.wpm,
        });

        const progressArray = updateRes.userInfo?.progress as string[];
        const unlockedKey = progressArray[progressArray.length - 1];
        toast.success(
          <div className="flex items-center gap-2">
            <p className="flex h-2 w-2 items-center justify-center rounded-lg border border-white p-4">
              {unlockedKey}
            </p>
            <p>unlocked!</p>
          </div>,
        );
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  // Updating current wpm animation in meter
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

  // Update user details according to new data
  useEffect(() => {
    if (
      wpm > userInfo?.bestWpm ||
      wpm > threshHoldSpeed ||
      userInfo?.bestWpm === 0
    ) {
      updateUserProgressData();
    }
  }, [wpm]);

  return (
    <div className="w-100% h-100% absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-evenly rounded-xl bg-white bg-opacity-[0.04] p-2 backdrop-blur">
      <div className="flex h-[70%] w-full justify-evenly">
        <div className="relative h-80 w-80">
          <Circle
            className="relative"
            percent={wpmProgress}
            gapDegree={70}
            strokeWidth={6}
            trailWidth={6}
            strokeColor={{
              "0%": "#16a34a",
              "25%": "#84cc16",
              "50%": "#a8d408",
              "75%": "#e11d48",
            }}
            trailColor="rgba(255, 255, 255, 0.1)"
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-2xl">
            <p className="text-6xl font-bold">{wpm}</p>
            <p className="text-lime-400">WPM</p>

            <div className="absolute top-24 flex justify-center rounded-md align-baseline text-sm underline underline-offset-4">
              <p className="flex w-24 items-center justify-center p-1">
                <span>
                  Best:
                  <span className="text-lg font-bold text-lime-500">
                    {wpm >= userInfo?.bestWpm ? wpm : userInfo?.bestWpm}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-80 w-80">
          <Circle
            className="relative"
            percent={(accuracy / 100) * 100}
            gapDegree={70}
            strokeWidth={6}
            trailWidth={6}
            strokeColor={{
              "0%": "#16a34a",
              "25%": "#84cc16",
              "50%": "#a8d408",
              "75%": "#e11d48",
            }}
            trailColor="rgba(255, 255, 255, 0.1)"
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-2xl">
            <p className="text-6xl font-bold">{accuracy}</p>
            <p className="text-2xl text-lime-400">Accuracy</p>
          </div>
        </div>
      </div>

      <p className="animate-pulse text-2xl text-slate-200">
        Press Enter⎆ to start
      </p>
    </div>
  );
}
