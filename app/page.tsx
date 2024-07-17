import { auth } from "@/auth";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MainContextWrapper from "./components/MainContextWrapper";
import { getUserInfo } from "./actions/userInfo";

export default async function Home() {
  const session = await auth();

  const id = session?.user?.id as string;

  const userInfoRes = await getUserInfo(id);

  // 2 is the index, so the first two letters would be unlocked in the ProgressStrip component
  const progress = userInfoRes.userInfo?.progress ?? 0

  return (
    <MainContextWrapper>
      <div className="h-screen px-5">
        <Header />
        <div className="flex flex-col items-center">
          <MainContent progress={progress} />
        </div>
      </div>
    </MainContextWrapper>
  );
}
