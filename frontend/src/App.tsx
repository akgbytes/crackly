import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import PrepSession from "./pages/PrepSession";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "./hooks/useAppContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const { SERVER_URL, setUser, setLoading } = useAppContext();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${SERVER_URL}/api/v1/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error: any) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
  return (
    <div className="min-h-[calc(100vh-1px)] flex flex-col grainy antialiased">
      <main className="relative flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prep-session/:sessionId" element={<PrepSession />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default App;
