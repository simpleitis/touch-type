import React, { useState } from "react";

interface MainContextType {
  startTimer: boolean;
  setStartTimer: React.Dispatch<React.SetStateAction<boolean>>;
  hideOverlay: boolean;
  setHideOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainContext = React.createContext<MainContextType>({
  startTimer: false,
  setStartTimer: () => {},
  hideOverlay: true,
  setHideOverlay: () => {},
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [startTimer, setStartTimer] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(true);

  return (
    <MainContext.Provider
      value={{ startTimer, setStartTimer, hideOverlay, setHideOverlay }}
    >
      {children}
    </MainContext.Provider>
  );
}
