type Props = {
  step: number;
  total: number;
};

export function IntakeProgress({ step, total }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Paso {step} de {total}
      </p>
      <div
        className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
