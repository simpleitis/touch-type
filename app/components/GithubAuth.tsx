import React from "react";
import { FaGithub } from "react-icons/fa";

interface GithubAuthProps {
  onClick: () => {};
}

export default function GithubAuth({ onClick }: GithubAuthProps) {
  return (
    <div
      className="mb-5 flex w-80 cursor-pointer items-center justify-center gap-2 rounded-md border p-2"
      onClick={onClick}
    >
      Sign in with
      <FaGithub />
    </div>
  );
}
