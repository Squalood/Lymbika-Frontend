"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { crearCasoManual } from "@/app/data/actions/case-admin-actions";
import { OpcionCatalogo } from "@/types/case";

export function NuevoCasoForm({ procedimientos }: { procedimientos: OpcionCatalogo[] }) {
  const router = useRouter();
  const [enviando, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    fullName: "",
    phone: "",
    city: "",
    narrative: "",
    medicalService: "",
  });

  function set(campo: keyof typeof f, valor: string) {
    setF((prev) => ({ ...prev, [campo]: valor }));
  }

  function crear(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const resultado = await crearCasoManual({
        ...f,
        medicalService: f.medicalService || null,
      });
      if (resultado.ok) router.push(`/dashboard/operations/${resultado.documentId}`);
      else setError(resultado.error);
    });
  }

  return (
    <form onSubmit={crear} className="space-y-4 rounded-xl border bg-background p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="n-nombre">Nombre</Label>
          <Input id="n-nombre" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="n-telefono">WhatsApp / teléfono</Label>
          <Input
            id="n-telefono"
            type="tel"
            value={f.phone}
            placeholder="656 000 0000"
            onChange={(e) => set("phone", e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="n-ciudad">Ciudad</Label>
          <Input id="n-ciudad" value={f.city} onChange={(e) => set("city", e.target.value)} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="n-procedimiento">Procedimiento</Label>
        <select
          id="n-procedimiento"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          value={f.medicalService}
          onChange={(e) => set("medicalService", e.target.value)}
        >
          <option value="">Sin procedimiento todavía</option>
          {procedimientos.map((p) => (
            <option key={p.documentId} value={p.documentId}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="n-relato">Qué necesita</Label>
        <Textarea
          id="n-relato"
          rows={5}
          value={f.narrative}
          placeholder="Lo que contó el paciente, con sus palabras."
          onChange={(e) => set("narrative", e.target.value)}
          required
        />
      </div>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" disabled={enviando}>
          {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
          Crear caso
        </Button>
      </div>
    </form>
  );
}
