import { auth } from "@/auth";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MainContextWrapper from "./components/MainContextWrapper";

export default async function Home() {
  const session = await auth();

  const id = session?.user?.id as string;

  return (
    <MainContextWrapper>
      <div className="h-screen px-5">
        <Header />
        <div className="flex flex-col items-center">
          <MainContent id={id} />
        </div>
      </div>
    </MainContextWrapper>
  );
}
