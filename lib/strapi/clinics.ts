import { ClinicType } from "@/types/clinic";
import { ServiceRateType } from "@/types/medical-service";
import { CAMPOS_CLINICA } from "@/lib/clinic-fields";
import { strapiLista, strapiPrimero } from "./client";

export function getClinics() {
  return strapiLista<ClinicType>(`clinics?${CAMPOS_CLINICA}&pagination[pageSize]=100`, "clinics");
}

/**
 * La ficha de clínica se arma con tres consultas a la misma clínica: el doctor
 * y las tarifas llevan populates profundos que no conviene mezclar con el
 * populate=* de la ficha.
 */
export async function getClinicData(slug: string) {
  const s = encodeURIComponent(slug);
  const [clinic, doctorClinic, servicesClinic] = await Promise.all([
    strapiPrimero<ClinicType>(`clinics?filters[slug][$eq]=${s}&populate=*`, "clinic"),
    strapiPrimero<ClinicType>(
      `clinics?filters[slug][$eq]=${s}&populate[doctor][populate]=*`,
      "clinic-doctor"
    ),
    strapiPrimero<{ service_rates: ServiceRateType[] }>(
      `clinics?filters[slug][$eq]=${s}&populate[service_rates][populate][medical_service][populate][image]=true&populate[service_rates][populate][medical_service][populate][specialty]=true&populate[service_rates][populate][doctor]=true`,
      "clinic-services"
    ),
  ]);

  return { clinic, doctorClinic, servicesClinic };
}
