import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={cn("size-6 text-primary", className)}
      aria-hidden="true"
    >
      <path d="M12 2.5v19" />
      <path d="M20.22 7.25 3.78 16.75" />
      <path d="M3.78 7.25 20.22 16.75" />
    </svg>
  );
}

export { Logo };
