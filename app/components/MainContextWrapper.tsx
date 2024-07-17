"use client";

import React from "react";
import MainContextProvider from "../context/MainContext";

export default function MainContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainContextProvider>{children}</MainContextProvider>;
}
