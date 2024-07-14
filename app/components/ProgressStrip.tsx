import React from "react";
import { progressKeys } from "../helpers/keyboard";

export default function ProgressStrip() {
  return (
    <div className="flex gap-2 w-[60%] justify-center mt-10 flex-wrap">
      {progressKeys.map((item) => {
        return <div key={item} className="h-10 w-10 border-4 rounded-full flex justify-center items-center">{item}</div>;
      })}
    </div>
  );
}
