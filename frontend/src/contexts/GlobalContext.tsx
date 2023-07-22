import { useQuery } from "@tanstack/react-query";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import { AModal } from "../components/Common/AModal";
import { Box, Input } from "@mui/joy";
import { CreateBountyModal } from "../components/CreateBountyModal";

interface GlobalContextType {
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState = {
  setCreateModalOpen: () => {},
};

const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const value = useMemo(() => {
    return { setCreateModalOpen };
  }, [setCreateModalOpen]);

  return (
    <GlobalContext.Provider value={value}>
      {createModalOpen && (
        <CreateBountyModal createModalOpen={createModalOpen} setCreateModalOpen={setCreateModalOpen} />
      )}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
