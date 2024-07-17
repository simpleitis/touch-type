import React, { useState } from "react";

interface MainContextType {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  practiseString: string;
  setPractiseString: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContext = React.createContext<MainContextType>({
  start: false,
  setStart: () => { },
  currentIndex: 0,
  setCurrentIndex: () => { },
  practiseString: '',
  setPractiseString: () => {}
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [practiseString, setPractiseString] = useState('')

  return (
    <MainContext.Provider
      value={{
        start,
        setStart,
        currentIndex,
        setCurrentIndex,
        practiseString,
        setPractiseString,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
