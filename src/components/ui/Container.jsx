import { cn } from "@/lib/utils";

export default function Container({ children, className }) {
  return <div className={cn("container-xl", className)}>{children}</div>;
}
