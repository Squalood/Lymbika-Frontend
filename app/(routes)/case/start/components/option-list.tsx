import { cn } from "@/lib/utils";

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
};

/** Opciones de selección única, apiladas y a todo lo ancho. */
export function OptionList<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors",
              selected
                ? "border-primary bg-primary/5 font-medium text-primary"
                : "border-border hover:border-primary/40 hover:bg-muted/50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
