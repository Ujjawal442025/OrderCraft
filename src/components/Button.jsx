import { ArrowUpRight } from "lucide-react";

/**
 * variant: "primary" | "secondary"
 */
export default function Button({ variant = "primary", children, icon = true, ...props }) {
  if (variant === "secondary") {
    return (
      <button
        className="btn-secondary group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-ink-primary transition-colors duration-300 hover:border-white/25"
        {...props}
      >
        <span>{children}</span>
        {icon && (
          <ArrowUpRight
            size={16}
            className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </button>
    );
  }

  return (
    <button
      className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-500 hover:scale-[1.03] active:scale-[0.98]"
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </button>
  );
}
