import axios from "axios";
import { useAppContext } from "../hooks/useAppContext";

import { Button } from "./ui/button";
import { ArrowRight, Brain } from "lucide-react";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { navigate, user, clearUser, SERVER_URL } = useAppContext();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      clearUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to log out. Please try again."
      );
    }
  };

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <div className="flex h-16 items-center justify-between mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <a href="/" className="flex z-40 font-semibold text-xl">
          <div className="flex gap-2 items-center">
            <Brain className="w-8 h-8 text-rose-600" />
            <div>
              {" "}
              Prep<span className="text-primary">Genie</span>
            </div>
          </div>
        </a>

        <div className="h-full flex items-center space-x-4">
          {user ? (
            <Button
              onClick={handleLogout}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              Get Started <ArrowRight className="" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
