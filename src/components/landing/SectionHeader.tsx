import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      {label ? (
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl text-slate-700">{title}</h2>
      {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
    </div>
  );
}
