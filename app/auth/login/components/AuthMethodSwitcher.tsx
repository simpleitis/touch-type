import { AuthContext } from "@/app/context/AuthenticationContext";
import React, { useContext } from "react";
import { IoIosMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";

export default function AuthMethodSwitcher() {
  const { magicLink, setMagicLink } = useContext(AuthContext);

  return (
    <div className="mt-10 flex h-12 w-[358px] justify-center overflow-hidden rounded-md border border-white">
      <div
        title="Sign in using email/password"
        className="flex w-full cursor-pointer items-center justify-center"
        onClick={() => setMagicLink(false)}
      >
        <div
          className={`flex h-[80%] w-[95%] cursor-pointer items-center justify-center rounded-md ${magicLink ? "bg-black text-white" : "bg-white text-black"}`}
        >
          <MdOutlinePassword />
        </div>
      </div>

      <div
        title="Sign in using email verification"
        className="flex w-full cursor-pointer items-center justify-center"
        onClick={() => setMagicLink(true)}
      >
        <div
          className={`flex h-[80%] w-[95%] cursor-pointer items-center justify-center rounded-md ${magicLink ? "bg-white text-black" : "bg-black text-white"}`}
        >
          <IoIosMail />
        </div>
      </div>
    </div>
  );
}
