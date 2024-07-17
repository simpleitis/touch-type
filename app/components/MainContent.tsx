"use client";

import ProgressStrip from "./ProgressStrip";
import CountdownBar from "./CountdownBar";
import Keyboard from "./Keyboard";
import PractiseString from "./PractiseString";

export default function MainContent({ progress }: { progress: number }) {
  return (
    <>
      <ProgressStrip progress={progress} />

      <PractiseString progress={progress} />

      <CountdownBar />

      <Keyboard />
    </>
  );
}
