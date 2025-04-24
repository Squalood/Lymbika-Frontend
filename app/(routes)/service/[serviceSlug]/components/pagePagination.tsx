"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ServiceType } from "@/types/service"

type Props = {
  result: ServiceType[],
  currentSlug: string
}

export const PagePaginationPrevious = ({ result, currentSlug }: Props) => {
  const index = result.findIndex((s) => s.slug === currentSlug)
  const prev = index > 0 ? result[index - 1] : null

  if (!prev) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/service/${prev.slug}`}>
          </PaginationPrevious>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export const PagePaginationNext = ({ result, currentSlug }: Props) => {
  const index = result.findIndex((s) => s.slug === currentSlug)
  const next = index < result.length - 1 ? result[index + 1] : null

  if (!next) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationNext href={`/service/${next.slug}`}>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
