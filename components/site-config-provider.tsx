"use client";

import { createContext, useContext } from "react";
import { SITE_CONFIG_DEFAULTS, SiteConfig } from "@/lib/site-config";

// El valor por defecto son los defaults, no null: un componente que quede fuera
// del provider sigue funcionando con los valores de lib/constants.ts.
const SiteConfigContext = createContext<SiteConfig>(SITE_CONFIG_DEFAULTS);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>;
}

/** Constantes globales en client components. En server components: getSiteConfig(). */
export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
