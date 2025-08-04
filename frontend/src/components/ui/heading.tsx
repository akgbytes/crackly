import type { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className="eb_garamond text-5xl sm:text-6xl text-pretty font-semibold tracking-tight text-zinc-800"
      {...props}
    >
      {children}
    </h1>
  );
};
