import type { JSX } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { Heart } from "lucide-react";

const socialLinks: {
  icon: JSX.Element;
  href: string;
  label: string;
}[] = [
  {
    icon: <FiGithub className="icon" />,
    href: "https://github.com/",
    label: "GitHub",
  },
  {
    icon: <FaDiscord className="icon" />,
    href: "https://discord.gg/",
    label: "Discord",
  },
  {
    icon: <FaXTwitter className="icon" />,
    href: "https://x.com/",
    label: "X",
  },
  {
    icon: <FiLinkedin className="icon" />,
    href: "https://linkedin.com/company/",
    label: "LinkedIn",
  },
];

const linkSections: {
  title: string;
  links: { name: string; href: string }[];
}[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/" },
      { name: "Interview Sets", href: "/dashboard" },
      { name: "AI Explanations", href: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full  px-4 sm:px-8 md:px-10 py-6 border-t border-gray-200 bg-white/80">
      <div className="mx-auto py-8 flex flex-col gap-10 md:flex-row md:justify-between max-w-screen-xl px-2.5 md:px-20">
        <div className="flex flex-col gap-2 max-w-md">
          <div className="w-48 h-12 hover:scale-105 transition-all cursor-pointer -ml-4.5">
            <img
              alt="PrepGenie Logo"
              className="h-full w-full object-contain"
              src="/logo-rose.png"
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Your AI Interview Companion
          </p>

          <div className="flex gap-4 text-zinc-500 mt-2">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                rel="noopener noreferrer"
                className="hover:text-primary hover:scale-105 transition-all"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm text-zinc-500">
          {linkSections.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-2">
              <h3 className="text-zinc-800 font-semibold">{title}</h3>
              {links.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto border-t border-gray-200 mt-8 pt-6 max-w-screen-xl px-2.5 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-sm text-zinc-800">
          <div>© 2025 PrepGenie. All rights reserved.</div>
          <div>
            Made with <Heart className="inline" fill="red" color="#ffffff" /> by{" "}
            <span className="underline cursor-pointer hover:text-red-400">
              akgbytes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
