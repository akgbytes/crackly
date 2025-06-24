import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrepSession from "./pages/PrepSession";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "./hooks/useAppContext";

const App = () => {
  const { SERVER_URL, setUser } = useAppContext();
  useEffect(() => {
    async function fetchUser() {
      const userProfile = await axios.get(`${SERVER_URL}/api/v1/auth/me`, {
        withCredentials: true,
      });

      setUser(userProfile.data.data);
    }
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen w-full bg-[#fff9f5] relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prep-session/:sessionId" element={<PrepSession />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
