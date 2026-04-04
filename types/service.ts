export type ServiceIconType =
  | "Home" | "Smile" | "Droplets" | "HeartPulse" | "Scale" | "Atom"
  | "Baby" | "Brain" | "BrainCircuit" | "ScanFace" | "Flower2" | "Scissors"
  | "BrainCog" | "Stethoscope" | "Apple" | "Sparkles" | "Ear" | "Bone"
  | "Droplet" | "Wind";

export type ServiceType = {
    id: number;
    serviceName: string;
    slug: string;
    image: {
        url: string;
    };
    description: string;
    atePrimary: boolean;
    icon: ServiceIconType;
};