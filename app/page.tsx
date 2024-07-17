import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import MainContextWrapper from "./components/MainContextWrapper";
import ProgressStrip from "./components/ProgressStrip";

export default function Home() {
  return (
    <MainContextWrapper>
      <div className="h-screen px-10 pt-5">
        <Header />
        <div className="flex flex-col items-center">
          <ProgressStrip />
          <Keyboard />
        </div>
      </div>
    </MainContextWrapper>
  );
}
