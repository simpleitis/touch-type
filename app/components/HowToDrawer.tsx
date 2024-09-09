import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import { IoBookOutline } from "react-icons/io5";
import CardWrapper from "./CardWrapper";
import Image from "next/image";

export default function HowToDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div
          className="absolute bottom-5 right-10 flex items-center gap-1 rounded-full border-2 border-lime-400 px-4 py-2 text-2xl"
          title="How to guide"
        >
          <IoBookOutline />
          Guide
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex w-full flex-col items-center justify-center">
          <div className="flex justify-center gap-10">
            <CardWrapper
              title="1"
              subTitle="Deposit money"
              description="Go to profile section and deposit an amount which you would like to keep locked until you reach a certain goal."
            />

            <CardWrapper
              title="2"
              subTitle="Start typing test"
              description="Come back to main screen and start your 30sec typing test."
            />

            <CardWrapper
              title="3"
              subTitle="Progress according to your result"
              description="Initially only two letters would be unlocked"
            />

            <CardWrapper
              title="4"
              subTitle="Unlock personal milestones"
              description="After you reach a milestone you had initially set, you can withdraw the money you had deposited for that milestone."
            />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center rounded-lg border w-[86vw]">
            <div className="rounded-full">
              <p className="text-4xl font-bold">Finger placement</p>
              <p className="text-slate-400">
                The resting finger placement is marked with _ under the letters.
              </p>
            </div>
            <Image
              src="/all_finger_placement.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </DrawerHeader>
        <DrawerFooter className="min-w-[40%] max-w-[40%] self-center">
          <DrawerClose asChild>
            <Button>Got it</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
