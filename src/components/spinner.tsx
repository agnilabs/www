import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<SVGElement> {
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-8 h-8",
};

export function Spinner({
  size = "medium",
  className,
  ...props
}: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
      {...props}
    />
  );
}
