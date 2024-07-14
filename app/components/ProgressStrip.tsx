import React from "react";
import { progressKeys } from "../helpers/keyboard";
import { auth } from "@/auth";
import { getUserInfo } from "../actions/userInfo";

export default async function ProgressStrip() {
  const session = await auth();

  const id = session?.user?.id as string;

  const userInfoRes = await getUserInfo(id);

  if (userInfoRes?.success && userInfoRes.userInfo?.progress) {
    return (
      <div className="mt-10 flex w-[60%] flex-wrap justify-center gap-2 font-semibold text-xl">
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
    );
  } else if (!userInfoRes?.success) {
    return <p>Error loading progress!</p>;
  }
}
