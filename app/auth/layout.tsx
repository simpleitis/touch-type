"use client";

import AuthContextProvider from "../context/AuthenticationContext";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
          <AuthContextProvider>
              {children}
          </AuthContextProvider>
    </div>
  );
}
