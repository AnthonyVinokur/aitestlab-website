import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  elevated?: boolean;
};

export function Card({
  children,
  elevated = false,
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "ui-card",
    elevated ? "ui-card-elevated" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes} {...props}>
      {children}
    </article>
  );
}
