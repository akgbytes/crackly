import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Navbar = () => {
  const user = false;
  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <div className="flex h-16 items-center justify-between mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <a href="/" className="flex z-40 font-semibold text-xl">
          Prep<span className="text-primary">Genie</span>
        </a>

        <div className="h-full flex items-center space-x-4">
          {user ? (
            <>
              <Button size="sm" variant="ghost">
                Sign out
              </Button>

              <a
                href="/dashboard"
                className={buttonVariants({
                  size: "sm",
                  className: "flex items-center gap-1",
                })}
              >
                Dashboard <ArrowRight className="ml-1.5 size-4" />
              </a>
            </>
          ) : (
            <>
              <a
                href="/pricing"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                Pricing
              </a>
              <a
                href="/sign-in"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                Sign in
              </a>

              <div className="h-8 w-px bg-gray-200" />

              <a href="/sign-up">
                <Button className="flex items-center gap-1.5" size={"lg"}>
                  Sign up <ArrowRight className="" />
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
