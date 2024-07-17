"use client";

import ProgressStrip from "./ProgressStrip";
import CountdownBar from "./CountdownBar";
import Keyboard from "./Keyboard";

export default function MainContent({ progress }: { progress: number }) {
  return (
    <>
      <ProgressStrip progress={progress} />

      <CountdownBar />

      <Keyboard />
    </>
  );
}
