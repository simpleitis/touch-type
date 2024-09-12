import React from "react";
import ProfileSection from "./ProfileSection";

interface Header {
  user: {
    name: string;
    image: string | null | undefined;
  };
}



export default function Header({ user }: Header) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-2 flex h-20 w-full items-center justify-between rounded-full border-4 border-white p-6 backdrop-blur-lg">
        <p className="text-4xl font-extrabold">touchtype_</p>

        <div>
          <ProfileSection user={user} />
        </div>
      </div>
    </div>
  );
}
