import { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  const sizes = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-7xl",
  };

  return (
    <div className={clsx("mx-auto w-full px-6 sm:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}
