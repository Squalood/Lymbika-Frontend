"use client";

import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types/category";
import { ChevronRight } from "lucide-react";

type CategoryListProps = {
  category: CategoryType[];
};

export default function CategoryList({ category }: CategoryListProps) {
  const withImage = category.filter(c => c?.mainImage?.url).slice(0, 6);
  const withoutImage = category.filter(c => !c?.mainImage?.url);

  return (
    <div className="w-[600px] py-4 px-8 flex gap-2">
      <div className="w-full">
        <h2 className="py-2 text-base text-muted-foreground">Categorías de la Farmacia</h2>
        <div className="grid grid-cols-2 gap-2">
          {withImage.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex items-center gap-3 rounded-md px-2 py-2 hover:bg-accent transition-colors"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={category.mainImage!.url}
                  alt={category.categoryName}
                  fill
                  sizes="48px"
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
          ))}
        </div>
        {withoutImage.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {withoutImage.filter(c => c.slug).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex-1 text-center px-3 py-1 text-xs font-medium border border-gray-300 rounded-md text-gray-600 hover:border-primary hover:text-primary transition-colors"
              >
                {category.categoryName}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}