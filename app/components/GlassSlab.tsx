import React from 'react'

export default function GlassSlab() {
  return (
    <div className="w-100% h-100% absolute bottom-0 left-0 right-0 top-0 z-10 flex cursor-pointer items-center justify-center rounded-xl bg-white bg-opacity-10 backdrop-blur-lg">
      <p className="text-2xl text-slate-200 animate-pulse">Press Enter⎆ to start</p>
    </div>
  );
}
