import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return ( 
        <>
        <div className="mt-4 text-center">
            <p>Ve todos nuestro productos</p>
            <h4 className="mt-2 text-5xl font-extrabold uppercase">Salud para todos</h4>
            <p>despierta tus sentidos</p>
            <Link href="#" className={buttonVariants()}>Comprar</Link>
        </div>
        <div className="h-[150px] bg-cover sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/slide-image.png')] bg-center mt-5" />
        </>
     );
}
 
export default BannerProduct;