"use client"
import { useGetCategories } from "@/api/getProduct";
import { CategoryType } from "@/types/category";
import {ResponseType} from '@/types/response';
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategories()

    return ( 
        <div className="max-w-6xl py-4 mx-4 sm:mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Farmacia</h3>

            {loading && 
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Skeleton className=" w-[250px] h-[250px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-lg" />
                </div>
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
                        <p className="absolute w-full py-0 sm:py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                            {category.categoryName}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
     );
}
 
export default ChooseCategory;
