import Image from "next/image";

type Props = {
  imageUrl?: string;
};

const SlideImage = ({ imageUrl }: Props) => {
  return (
    <div className="relative h-[150px] sm:h-[300px] mt-5 overflow-hidden bg-slate-900">
      <Image
        src={imageUrl || "/logos/logo-lymbika.svg"}
        alt="imagen"
        fill
      />
    </div>
  );
};

export default SlideImage;
