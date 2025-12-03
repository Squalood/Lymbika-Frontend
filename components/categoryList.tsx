"use client";

import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types/category";
import { ChevronRight } from "lucide-react";

type CategoryListProps = {
  category: CategoryType[];
};

export default function CategoryList({ category }: CategoryListProps) {
  const gridCategory = category.filter(category => category).slice(0, 6);
  
  return (
    <div className="w-[600px] py-4 px-8 flex gap-2">
      <div className="w-full">
        <h2 className="py-2 text-base text-muted-foreground">Categorías de la Farmacia</h2>
        <div className="grid grid-cols-2 gap-2">
          {gridCategory.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex items-center gap-3 rounded-md px-2 py-2 hover:bg-accent transition-colors"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={category.mainImage.url}
                    alt={category.categoryName}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">
                    {category.categoryName}
                  </span>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
                
                <ChevronRight
                  size={14}
                  className="ml-1 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}