import React, { useState } from "react";

interface MainContextType {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainContext = React.createContext<MainContextType>({
  start: false,
  setStart: () => {},
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [start, setStart] = useState(false);

  return (
    <MainContext.Provider value={{ start, setStart }}>
      {children}
    </MainContext.Provider>
  );
}
