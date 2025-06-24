import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mx-auto pt-4 pb-2 px-2.5 md:px-20 flex flex-col gap-10 md:flex-row justify-center text-sm text-zinc-800 border-t">
      <div>© 2025 PrepGenie. All rights reserved.</div>
      <div>
        Made with <Heart className="inline" fill="red" color="#ffffff" /> by{" "}
        <span className="underline cursor-pointer hover:text-red-400">
          akgbytes
        </span>
      </div>
    </footer>
  );
};

export default Footer;
