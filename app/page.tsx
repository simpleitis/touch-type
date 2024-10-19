import { auth } from "@/auth";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MainContextWrapper from "./components/MainContextWrapper";
import HowToDrawer from "./components/HowToDrawer";

export default async function Home() {
  const session = await auth();

  const id = session?.user?.id as string;
  const user = {
    id: String(session?.user?.id),
    name: String(session?.user?.name),
    image: String(session?.user?.image),
    email: String(session?.user?.email),
  };

  return (
    <MainContextWrapper>
      <div className="relative h-screen px-5">
        <Header user={user} />

        <div className="flex flex-col items-center">
          <MainContent id={id} />
        </div>

        <HowToDrawer />
      </div>
    </MainContextWrapper>
  );
}
