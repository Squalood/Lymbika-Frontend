"use client";

import { useRouter } from "next/navigation";

/**
 * Fila de la bandeja que abre el caso al darle clic en cualquier parte. Los
 * enlaces de adentro (nombre y botón Abrir) siguen funcionando con teclado y
 * con "abrir en otra pestaña".
 */
export function FilaCaso({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <tr
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        router.push(href);
      }}
      className="cursor-pointer hover:bg-muted/40"
    >
      {children}
    </tr>
  );
}
