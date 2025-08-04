import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="sticky z-[50] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-2">
            <img src="/logo.svg" />
            <Link to="/" className="flex z-40 font-semibold mt-2">
              Crackly
            </Link>
          </div>

          <div className="h-full flex items-center space-x-4">
            <Link
              to="/pricing"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Pricing
            </Link>
            <Link
              to="/sign-in"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Sign in
            </Link>

            <div className="h-8 w-px bg-gray-200" />

            <Link
              to="/sign-up"
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1.5",
              })}
            >
              Sign up <ArrowRight className="size-4" />
            </Link>

            {/* <Button size="sm" variant="ghost">
                  Sign out
                </Button>
              

              <Link
                to="/dashboard"
                className={buttonVariants({

                  size: "sm",
                  className: "flex items-center gap-1",
                })}
              >
                Dashboard <ArrowRight className="ml-1.5 size-4" />
              </Link> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
