import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-pretty leading-7 text-slate-400">{description}</p>}
    </div>
  );
}
