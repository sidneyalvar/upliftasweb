import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "btn-primary",
  outline: "btn-outline",
  white: "btn-white",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  ...props
}) {
  const classes = cn(variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
