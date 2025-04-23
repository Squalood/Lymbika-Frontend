import Link from "next/link";
import Image from "next/image";
import { ServiceType } from "@/types/service";

const ServiceCard = ({ service }: { service: ServiceType }) => {
    return (
      <Link
        href={`/service/${service.slug}`}
        className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
      >
        {service.image?.url ? (
          <Image
            src={service.image.url}
            alt={service.serviceName}
            width={270}
            height={200}
            className="transition duration-300 ease-in-out rounded-lg hover:scale-110 sm:max-h-[220px] w-full h-auto"
          />
        ) : (
          <div className="w-[270px] h-[200px] bg-gray-300 flex items-center justify-center">
            <span className="text-gray-700">Sin imagen</span>
          </div>
        )}
        <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
          {service.serviceName}
        </p>
      </Link>
    );
  };
  
  export default ServiceCard;