import Image from "next/image";

const SlideImage = () => {
    return ( 
        <div className="relative h-[150px] sm:h-[300px] mt-5 overflow-hidden bg-slate-900">
            <Image 
                src="/logos/logo-lymbika.svg" 
                alt="imagen" 
                fill
            />
        </div>
     );
}
 
export default SlideImage;