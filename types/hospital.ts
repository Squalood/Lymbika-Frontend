export type HospitalType = {
  id: number;
  hospitalName: string;
  infraestructura: number;
  servicio: number;
  precio: "economico" | "estandar" | "premium";
  review: number;
  descripcion: string;
  imagen: {
    url: string;
  };
};
