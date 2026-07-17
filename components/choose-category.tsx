"use client"
import { useGetCategories } from "@/api/getCategories";
import { CategoryType } from "@/types/category";
import {ResponseType} from '@/types/response';
import Link from "next/link";
import SkeletonGalleryCol3 from "./skeleton/skeletonGalleryCol3";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

const ChooseCategoryAlt = () => {
    const { result, loading }: ResponseType = useGetCategories()

    return (
        <div className="sm:max-w-6xl py-4 mx-2 lg:mx-auto sm:py-16">
            <h3 className="px-2 pb-4 text-3xl sm:pb-8">Categorías de la Farmacia</h3>
            {loading &&
                <SkeletonGalleryCol3 grid={6} />
            }
            {!loading && (() => {
                const withIcon = result?.filter((c: CategoryType) => c.icon) ?? [];
                const withoutIcon = result?.filter((c: CategoryType) => !c.icon) ?? [];
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5">
                            {withIcon.map((category: CategoryType) => {
                                const Icon = CATEGORY_ICONS[category.icon!];
                                return (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.slug}`}
                                        className="group flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                    >
                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary group-hover:text-white">
                                            <Icon size={28} strokeWidth={1.75} />
                                        </span>
                                        <p className="text-xs font-medium text-center text-gray-700 sm:text-sm group-hover:text-primary">
                                            {category.categoryName}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                        {withoutIcon.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {withoutIcon.filter((c: CategoryType) => c.slug).map((category: CategoryType) => (
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

export default ChooseCategoryAlt;