"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoadingSvgAnimatedProps {
  imageSrc: string;
  loop: boolean;
}

export default function LoadingSvgAnimated({
  imageSrc,
  loop,
}: LoadingSvgAnimatedProps) {
  return (
    <div className="flex h-1/3 items-center justify-center">
      <DotLottieReact src={imageSrc} loop={loop} autoplay />
    </div>
  );
}
