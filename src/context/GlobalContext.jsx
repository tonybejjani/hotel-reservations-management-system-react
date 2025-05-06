/** @format */

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [guestRowData, setGuestRowData] = useState({});

  return (
    <GlobalContext.Provider value={{ guestRowData, setGuestRowData }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined)
    throw new Error('Global Context was used outside of the Global Provider.');
  return context;
}

export { GlobalProvider, useGlobalContext };
