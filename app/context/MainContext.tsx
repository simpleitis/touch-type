import React, { useState } from "react";

interface MainContextType {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainContext = React.createContext<MainContextType>({
  start: false,
  setStart: () => {},
  hide: false,
  setHide: () => {},
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [start, setStart] = useState(false);
  const [hide, setHide] = useState(false);

  return (
    <MainContext.Provider value={{ start, setStart, hide, setHide }}>
      {children}
    </MainContext.Provider>
  );
}
