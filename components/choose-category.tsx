"use client"
import { useGetCategories } from "@/api/getCategories";
import { CategoryType } from "@/types/category";
import {ResponseType} from '@/types/response';
import Link from "next/link";
import Image from "next/image";
import SkeletonGalleryCol3 from "./skeleton/skeletonGalleryCol3";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategories()

    return ( 
        <div className="sm:max-w-4xl py-4 mx-2 lg:mx-auto sm:py-16">
            <h3 className="px-2 pb-4 text-3xl sm:pb-8">Categorías de la Farmacia</h3>
            {loading && 
                <SkeletonGalleryCol3 grid={6} />
            }
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5">
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
                        <p className="absolute w-full py-0 sm:py-1 text-xs sm:text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                            {category.categoryName}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
     );
}
 
export default ChooseCategory;