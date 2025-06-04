import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  updateUser: (userData: User & { token: string }) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
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

  const fetchUser = async () => {
    console.log("Entered fetch user");
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Fetched user data: ", response.data.data);

      setUser(response.data.data);
    } catch (error) {
      console.log("error while fetching data: ", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData: User & { token: string }) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const values: AppContextType = {
    navigate,
    SERVER_URL,
    user,
    setUser,
    loading,
    setLoading,
    updateUser,
    clearUser,
    fetchUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
