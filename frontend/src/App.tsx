import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrepSession from "./pages/PrepSession";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="min-h-[calc(100vh-1px)] flex flex-col antialiased grainy">
      <main className="relative flex-1 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prep-session/:sessionId" element={<PrepSession />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
        <Footer />
      </main>
    </div>
  );
};

export default App;
