"use client";

import Link from "next/link";
import { ChevronDownIcon, SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductType } from "@/types/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useGetCategories } from "@/api/getCategories";

export type datatProps = {
  product: ProductType;
};

const NavegatorPages = ({ product }: datatProps) => {
  const { result: categories } = useGetCategories();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/shop">Farmacia</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1">
                {product.category.categoryName}
                <ChevronDownIcon className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id}>
                    <BreadcrumbLink asChild>
                      <Link href={`/category/${category.slug}`}>
                        {category.categoryName}
                      </Link>
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage title={product.productName}>
            {/* Responsive truncation */}
            <p className="truncate max-w-32 lg:max-w-48">
              {product.productName}
            </p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavegatorPages;
