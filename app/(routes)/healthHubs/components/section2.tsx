import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LandingPageJson } from "@/types/landingPageJson";

type Props = { data?: LandingPageJson["doctoresSection2"] };

const Section2 = ({ data }: Props) => {
  if (!data) return null;
  const { badge, title, description, colRol, colCost, colLymbika, rows, totalLabel, totalCost, totalLymbika, banner } = data;

  return (
    <section className="w-full py-12 px-4 md:px-20 max-w-6xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="space-y-3">
        {badge && (
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {/* Tabla */}
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold text-foreground w-[40%]">{colRol}</TableHead>
              <TableHead className="font-semibold text-foreground text-center">{colCost}</TableHead>
              <TableHead className="font-semibold text-primary text-center">{colLymbika}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-foreground">{row.rol}</TableCell>
                <TableCell className="text-muted-foreground text-center">{row.cost}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center gap-1 text-primary font-medium text-sm">
                    <Check className="w-4 h-4 shrink-0" />
                    {row.lymbika}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {/* Fila total */}
            {(totalLabel || totalCost || totalLymbika) && (
              <TableRow className="bg-muted/30 font-semibold hover:bg-muted/30">
                <TableCell className="font-bold text-foreground">{totalLabel}</TableCell>
                <TableCell className="text-destructive font-semibold text-center">{totalCost}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-md">
                    {totalLymbika}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Banner */}
      {banner && (
        <div className="rounded-xl bg-green-500 text-white text-center text-sm md:text-base font-medium px-6 py-4">
          {banner}
        </div>
      )}
    </section>
  );
};

export default Section2;
