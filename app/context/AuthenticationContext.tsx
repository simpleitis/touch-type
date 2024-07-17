import React, { useState } from "react";

interface AuthContextType {
  magicLink: boolean;
  setMagicLink: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextType>({
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
