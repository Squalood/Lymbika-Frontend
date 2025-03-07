"use client"
import { useGetCategories } from "@/api/getProduct";
import { CategoryType } from "@/types/category";
import {ResponseType} from '@/types/response';
import Link from "next/link";
import Image from "next/image";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategories()

    return ( 
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Escoge una categoría</h3>

            {loading && <p className="text-center">Cargando categorías...</p>}

            <div className="grid gap-5 sm:grid-cols-3">
                {!loading && result?.map((category: CategoryType) => (
                    <Link 
                        key={category.id} 
                        href={`/category/${category.slug}`}
                        className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                    >
                        {category.mainImage?.url ? (
                            <Image 
                                src={category.mainImage.url}
                                alt={category.categoryName}
                                width={270}
                                height={200}
                                className="transition duration-300 ease-in-out rounded-lg hover:scale-110"
                            />
                        ) : (
                            <div className="w-[270px] h-[200px] bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-700">Sin imagen</span>
                            </div>
                        )}
                        <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                            {category.categoryName}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
     );
}
 
export default ChooseCategory;
