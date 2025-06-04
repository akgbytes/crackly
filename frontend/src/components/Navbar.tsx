import { useAppContext } from "../hooks/useAppContext";
import Profile from "./Profile";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Navbar = () => {
  const { navigate, user } = useAppContext();
  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <div className="flex h-16 items-center justify-between mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <a href="/" className="flex z-40 font-semibold text-xl">
          Prep<span className="text-primary">Genie</span>
        </a>

        <div className="h-full flex items-center space-x-4">
          {user ? (
            <>
              <Button
                onClick={() => navigate("/pricing")}
                size="sm"
                variant={"ghost"}
                className="cursor-pointer"
              >
                Pricing
              </Button>
              <Profile />
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/pricing")}
                size="sm"
                variant={"ghost"}
                className="cursor-pointer"
              >
                Pricing
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="sm"
                variant={"ghost"}
                className="cursor-pointer"
              >
                Login
              </Button>

              <div className="h-8 w-px bg-gray-200" />

              <Button
                onClick={() => navigate("/register")}
                className="flex items-center gap-1.5 cursor-pointer"
                size={"lg"}
              >
                Register <ArrowRight className="" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
