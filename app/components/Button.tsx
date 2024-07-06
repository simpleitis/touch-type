import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-4 flex h-10 w-36 items-center justify-center rounded-md border-2 border-white"
    >
      {children}
    </button>
  );
}
