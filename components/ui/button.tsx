import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: "default" | "small";
  className?: string;
  external?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = [
    "button",
    variant === "secondary" ? "button-secondary" : "",
    size === "small" ? "button-small" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
