import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthRoutes from "./layouts/AuthRoutes";

const App = () => {
  return (
    <div className="min-h-[calc(100vh-1px)] flex flex-col grainy antialiased">
      <main className="relative flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthRoutes />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/interview-set/:setId" element={<InterviewSet />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default App;
