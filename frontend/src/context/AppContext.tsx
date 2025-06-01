import { createContext, type FC, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AppContextType = {
  navigate: ReturnType<typeof useNavigate>;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const values = {
    navigate,
  };

  return <AppContext.Provider value={values}> {children} </AppContext.Provider>;
};
