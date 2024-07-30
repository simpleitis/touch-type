import React, { useState } from "react";

interface MainContextType {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  practiseString: string;
  setPractiseString: React.Dispatch<React.SetStateAction<string>>;
  result: { correct: number; wrong: number };
  setResult: React.Dispatch<
    React.SetStateAction<{
      correct: number;
      wrong: number;
    }>
  >;
  wpm: number;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  userInfo: {
    id: string;
    userId: string;
    progress: string[];
    bestWpm: number;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      id: string;
      userId: string;
      progress: string[];
      bestWpm: number;
    }>
  >;
}

export const MainContext = React.createContext<MainContextType>({
  start: false,
  setStart: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
  practiseString: "",
  setPractiseString: () => {},
  result: { correct: 0, wrong: 0 },
  setResult: () => {},
  wpm: 0,
  setWpm: () => {},
  userInfo: {
    id: "",
    userId: "",
    progress: ["R", "Q"],
    bestWpm: 0,
  },
  setUserInfo: () => {},
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiseString, setPractiseString] = useState("");
  const [result, setResult] = useState({ correct: 0, wrong: 0 });
  const [wpm, setWpm] = useState(0);
  const [userInfo, setUserInfo] = useState({
    id: "",
    userId: "",
    progress: ["R", "Q"],
    bestWpm: 0,
  });

  return (
    <MainContext.Provider
      value={{
        start,
        setStart,
        currentIndex,
        setCurrentIndex,
        practiseString,
        setPractiseString,
        result,
        setResult,
        wpm,
        setWpm,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
