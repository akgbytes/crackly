import { createContext, useState, type FC, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

type AppContextType = {
  navigate: ReturnType<typeof useNavigate>;
  SERVER_URL: string;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clearUser: () => void;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clearUser = () => {
    setUser(null);
  };

  const values: AppContextType = {
    navigate,
    SERVER_URL,
    user,
    setUser,
    loading,
    setLoading,
    clearUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
