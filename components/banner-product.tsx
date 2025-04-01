import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return ( 
        <>
        <div className="h-[150px] bg-cover sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/slide-image.png')] bg-center mt-5" />
        </>
     );
}
 
export default BannerProduct;