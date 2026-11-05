import type { Metadata } from "next";
import { getSchedulesPage } from "@/lib/strapi/pages";
import { elegirDoctor, resolverContenido } from "./config";
import { SchedulesView, metadataDe } from "./schedules-view";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSchedulesPage();
  return metadataDe(page, resolverContenido(page, elegirDoctor(page)));
}

export default async function SchedulesPage() {
  // Si Strapi falla o el single type aún no existe, la página sale con los
  // defaults de config.ts en lugar de romperse.
  const page = await getSchedulesPage();
  return <SchedulesView content={resolverContenido(page, elegirDoctor(page))} />;
}
