import Image from "next/image";

const BannerProduct = () => {
    return ( 
        <>
        <div className="relative h-[150px] bg-primary sm:h-[300px] md:h-[400px] lg:h-[500px] mt-5 overflow-hidden">
            <Image 
                src="/slide-image.png" 
                alt="imagen" 
                fill
                className="object-cover opacity-20"
            />
        </div>
        </>
     );
}
 
export default BannerProduct;