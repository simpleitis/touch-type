"use client";

import { useContext, useEffect } from "react";
import { getUserInfo } from "../actions/userInfo";
import CountdownBar from "./CountdownBar";
import Keyboard from "./Keyboard";
import PractiseString from "./PractiseString";
import { MainContext } from "../context/MainContext";

interface MainContentType {
  id: string;
}

export default function MainContent({ id }: MainContentType) {
  const { setUserInfo } = useContext(MainContext);

  async function fetchUserInfo() {
    const userInfoRes = await getUserInfo(id);

    if (userInfoRes?.userInfo) {
      const userInfo = {
        id: userInfoRes?.userInfo?.id,
        userId: userInfoRes?.userInfo?.userId,
        progress: userInfoRes.userInfo?.progress as string[],
        bestWpm: userInfoRes?.userInfo?.wpm,
      };

      setUserInfo(userInfo);
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserInfo();
    }
  }, [id]);

  return (
    <>
      <PractiseString />

      <CountdownBar />

      <Keyboard />
    </>
  );
}
