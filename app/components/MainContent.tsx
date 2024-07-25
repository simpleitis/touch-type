"use client";

import CountdownBar from "./CountdownBar";
import Keyboard from "./Keyboard";
import PractiseString from "./PractiseString";

export default function MainContent({
  progress,
}: {
  progress: string[] | undefined;
}) {
  return (
    <>
      <PractiseString progress={progress} />

      <CountdownBar />

      <Keyboard progress={progress} />
    </>
  );
}
