import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div role="status" className={className}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-5 w-5 animate-spin")}
      >
        <ellipse
          opacity="0.2"
          cx="15.9821"
          cy="16"
          rx="11.533"
          ry="11.696"
          strokeWidth="2.4"
        />
        <path
          d="M15.9022 4.30427C18.3377 4.28716 20.716 5.05242 22.6962 6.49035C24.6764 7.92829 26.157 9.96508 26.9256 12.3088"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
