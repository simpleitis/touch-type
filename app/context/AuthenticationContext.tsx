import React, { useState } from "react";

interface MyContextType {
  magicLink: boolean;
  setMagicLink: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<MyContextType>({
  magicLink: false,
  setMagicLink: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [magicLink, setMagicLink] = useState(false);

  return (
    <AuthContext.Provider value={{ magicLink, setMagicLink }}>
      {children}
    </AuthContext.Provider>
  );
}
