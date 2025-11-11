import { PageType } from "@/types/pages";
import Image from "next/image";

type LymbikaLocationProps = {
  contact?: PageType["Contact"];
};

const LymbikaLocation = ({ contact }: LymbikaLocationProps) => {
  if (!contact) {
    return null;
  }

  console.log(contact)

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
        <div className="flex gap-4 flex-col flex-1">
          <div className="flex gap-4 flex-col items-center">
            <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-center">
              {contact.title}
            </h2>

            <div
              className="text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contact.timeText }}
            />

            <p className="text-center">{contact.description}</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-md w-full aspect-square h-full flex-1">
          <Image
            src={contact.image?.url || "/images/location.webp"}
            alt={contact.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LymbikaLocation;