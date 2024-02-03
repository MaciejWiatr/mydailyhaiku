"use client";

import { AuthUser } from "@kysely/types";
import { FC, PropsWithChildren, createContext, useContext } from "react";

interface UserContextValue {
  user: AuthUser | null;
}

const UserContext = createContext<UserContextValue>({ user: null });

interface UserProviderProps extends PropsWithChildren {
  user: AuthUser | null;
}

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
