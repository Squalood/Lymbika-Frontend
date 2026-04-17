"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useGetClinics } from "@/api/useGetClinics";

type ClinicBreadcrumbProps = {
  clinicTitle: string;
  texts: { home: string; clinics: string };
};

const ClinicBreadcrumb = ({ clinicTitle, texts }: ClinicBreadcrumbProps) => {
  const { clinics } = useGetClinics();

  return (
    <div className="max-w-6xl mx-auto px-4 pt-2 sm:pt-12 pb-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{texts.home}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {texts.clinics}
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {clinics
                  .filter((c) => c.featuredClinic)
                  .map((c) => (
                    <DropdownMenuItem key={c.id} asChild>
                      <Link href={`/clinics/${c.slug}`}>{c.title}</Link>
                    </DropdownMenuItem>
                  ))}
                {clinics.some((c) => c.featuredClinic) &&
                  clinics.some((c) => !c.featuredClinic) && (
                    <DropdownMenuSeparator />
                  )}
                {clinics
                  .filter((c) => !c.featuredClinic)
                  .map((c) => (
                    <DropdownMenuItem key={c.id} asChild>
                      <Link href={`/clinics/${c.slug}`}>{c.title}</Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{clinicTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ClinicBreadcrumb;
