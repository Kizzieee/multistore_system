import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isStoreOwner, setIsStoreOwner] = useState(null);
  const [toastData, setToastData] = useState({
    severity: "",
    header: "",
    body: "",
    show: false,
  });
  const [orders, setOrders] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isStoreOwner,
        setIsStoreOwner,
        toastData,
        setToastData,
        orders,
        setOrders,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
