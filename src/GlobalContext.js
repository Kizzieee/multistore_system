import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isStoreOwner, setIsStoreOwner] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isStoreOwner,
        setIsStoreOwner,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
