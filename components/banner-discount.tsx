import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
    return ( 
        <div className="p-5 sm:p-20 text-center">
            <h2 className="uppercase font-black text-2xl text-primary">¡El ahorro es ahora!</h2>
            <h3 className="mt-3 font-semibold">Con nuestra membresía mensual MediClub,<br/>accede a medicamentos y productos de la salud a precio de proveedor,<br/>diseñado para cuidar la economía de nuestros pacientes.</h3>

            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <Link href="" className={buttonVariants()}>Comprar</Link>
                <Link href="" className={buttonVariants({variant: "outline"})}>Mas informacion</Link>
            </div>
        </div>
     );
}
 
export default BannerDiscount;