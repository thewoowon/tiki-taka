import React, { createContext, useState, useEffect, useContext } from "react";

type UserContextType = {
  user: {
    userId: number | null;
    email: string;
    profileImage: string;
    nickname: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      userId: number | null;
      email: string;
      profileImage: string;
      nickname: string;
    }>
  >;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    userId: number | null;
    email: string;
    profileImage: string;
    nickname: string;
  }>({
    userId: null,
    email: "",
    profileImage: "",
    nickname: "",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
