// components/ui/separator.tsx

import { clsx } from "clsx";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      className={clsx("h-px w-full bg-gray-300", className)}
      role="separator"
    />
  );
}
