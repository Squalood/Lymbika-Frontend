"use client";
import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types/category";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/api/getProduct";
import {ResponseType} from '@/types/response';

export default function Page() {
    const { result, loading}: ResponseType = useGetCategories();

    return(  
    
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Productos Farmaceuticos</h3>

            {loading && 
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                </div>
            }

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
