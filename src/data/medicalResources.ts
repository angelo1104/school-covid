const medicalResources: MedicalResource[] = [
  {
    name: "#oxygen",
    imageUrl: "/images/mac.jpg",
  },
  {
    name: "#ventilator",
    imageUrl: "/images/mac.jpg",
  },
];

interface MedicalResource {
  name: string;
  imageUrl: string;
}

export type { MedicalResource };

export default medicalResources;
