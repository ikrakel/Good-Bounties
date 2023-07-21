import { useQuery } from "@tanstack/react-query";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

interface GlobalContextType {}
const initialState = {};

const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useMemo(() => {
    return {};
  }, []);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
