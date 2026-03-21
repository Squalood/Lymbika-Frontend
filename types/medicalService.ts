export type MedicalServiceType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: { url: string } | null;
  type: "consultation" | "procedure" | "surgery";
  specialty: { slug: string } | null;
};

export type ServiceRateType = {
  id: number;
  price: number;
  duration_min: number | null;
  notes: string | null;
  medical_service: MedicalServiceType;
};

export type ServiceRateWithDoctorType = {
  id: number;
  price: number;
  duration_min: number | null;
  notes: string | null;
  doctor: {
    doctorName: string;
    slug: string;
    image: { url: string }[];
    clinic: { title: string; slug: string } | null;
  };
};
