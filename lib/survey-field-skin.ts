import { cn } from "@/lib/utils";

const underlineBase =
  "rounded-none border-0 border-b border-neutral-900/25 bg-transparent px-0 shadow-none outline-none transition-colors focus-visible:border-b-2 focus-visible:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-destructive aria-invalid:ring-0";

export function surveyInputUnderlineClass(invalid?: boolean) {
  return cn(
    underlineBase,
    "h-auto min-h-8 py-2",
    invalid && "border-destructive focus-visible:border-destructive",
  );
}

export function surveyTextareaUnderlineClass(invalid?: boolean) {
  return cn(
    underlineBase,
    "min-h-[120px] resize-y py-3 md:text-sm",
    invalid && "border-destructive focus-visible:border-destructive",
  );
}
