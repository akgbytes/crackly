import { Heart } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border mt-20">
      <div className="h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-8 flex flex-col  md:flex-row md:justify-between">
        {/* Left Section */}
        <div className="flex gap-4 flex-col max-w-md">
          <div className="text-base font-semibold">Crackly</div>

          <p className="text-sm text-muted-foreground">
            Transform your interview prep with AI-powered guidance. Practice
            smarter, understand deeper, and save time.
          </p>

          <div className="flex mt-1 gap-4 text-muted-foreground">
            <a
              href="https://github.com/akgbytes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 hover:scale-105 transition-all"
            >
              <FiGithub className="icon" />
            </a>
            <a
              href="https://x.com/akgbytes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 hover:scale-105 transition-all"
            >
              <FaXTwitter className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/akgbytes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 hover:scale-105 transition-all"
            >
              <FiLinkedin className="icon" />
            </a>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-semibold">Quick Links</h3>

          <Link
            to={""}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            to={""}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-semibold">Legal</h3>
          <Link
            to={""}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to={""}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20 border-t border-border py-3 text-muted-foreground">
        <div className="flex justify-between text-sm gap-3">
          <div>© 2025 Crackly. All rights reserved.</div>
          <div>
            <span className="">
              Made with{" "}
              <Heart className="inline border-none size-5 text-sky-600" /> by{" "}
            </span>
            <span className="cursor-pointer hover:text-sky-600 hover:underline">
              akgbytes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
