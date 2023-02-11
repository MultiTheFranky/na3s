import React, { ReactElement, useState } from "react";
import { User } from "shared";

type Token = { token: string };

type AuthContextType = {
  user: (User & Token) | null;
  setUser: (user: (User & Token) | null) => void;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

/**
 * Auth provider content system
 * @param {React.PropsWithChildren<{}>} props
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<(User & Token) | null>(
    localStorage.getItem("user")
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (JSON.parse(localStorage.getItem("user")!) as User & Token)
      : null
  );

  // Get user from local storage
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // Save user to local storage
  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
