
const BannerProduct = () => {
    return ( 
        <>
        <div className="relative h-[150px] bg-primary sm:h-[300px] md:h-[400px] lg:h-[500px] mt-5 overflow-hidden">
            <img 
                src="/slide-image.png" 
                alt="imagen" 
                className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
            />
        </div>
        </>
     );
}
 
export default BannerProduct;