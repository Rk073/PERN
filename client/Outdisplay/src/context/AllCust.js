import React, { useState, createContext } from "react";

export const AllcustContext = createContext();

export const AllcustProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  return (
    <AllcustContext.Provider value={{ customers, setCustomers }}>
      {children}
    </AllcustContext.Provider>
  );
};
