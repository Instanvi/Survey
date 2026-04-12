import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/** Compact building mark — matches survey reference branding. */
export function SurveyBrandMark({ className }: Props) {
  return (
    <svg
      className={cn("text-primary", className)}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 28V14h8v14H4zm10 0V8h8v20H14zm10 0V4h8v24h-8z" />
    </svg>
  );
}
