import React, { ReactElement, useState } from "react";
import { User } from "shared";

type Token = { token: string };

type AuthContextType = {
  user: (User & Token) | null;
  setUser: (user: (User & Token) | null) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

/**
 * Auth provider content system
 * @param {React.PropsWithChildren<{}>} props
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<(User & Token) | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
