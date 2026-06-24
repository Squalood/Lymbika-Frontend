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
        <div className="sm:max-w-6xl py-4 mx-2 lg:mx-auto sm:py-16">
            <h3 className="px-2 pb-4 text-3xl sm:pb-8">Categorías de la Farmacia</h3>
            {loading && 
                <SkeletonGalleryCol3 grid={6} />
            }
            {!loading && (() => {
                const withImage = result?.filter((c: CategoryType) => c.mainImage?.url) ?? [];
                const withoutImage = result?.filter((c: CategoryType) => !c.mainImage?.url) ?? [];
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5">
                            {withImage.map((category: CategoryType) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                                >
                                    <Image
                                        src={category.mainImage!.url}
                                        alt={category.categoryName}
                                        width={270}
                                        height={200}
                                        className="w-full h-auto transition duration-300 ease-in-out rounded-lg hover:scale-110"
                                    />
                                    <p className="absolute w-full py-0 sm:py-1 text-xs sm:text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                                        {category.categoryName}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        {withoutImage.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {withoutImage.filter((c: CategoryType) => c.slug).map((category: CategoryType) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.slug}`}
                                        className="flex-1 text-center px-4 py-1.5 text-sm font-medium border border-gray-400 rounded-md text-gray-700 hover:border-primary hover:text-primary transition-colors"
                                    >
                                        {category.categoryName}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                );
            })()}
        </div>
     );
}
 
export default ChooseCategory;