"use client";

import { User } from "@prisma/client";
import { FC, PropsWithChildren, createContext, useContext } from "react";

interface UserContextValue {
  user: User | null;
}

const UserContext = createContext<UserContextValue>({ user: null });

interface UserProviderProps extends PropsWithChildren {
  user: User | null;
}

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
