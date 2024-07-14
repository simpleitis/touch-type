import Header from "./components/Header";
import Keyboard from "./components/Keyboard";

export default function Home() {
  return (
    <div className="h-screen pt-5 px-10">
      <Header />

      <Keyboard />
    </div>
  );
}
