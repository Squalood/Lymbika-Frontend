"use client"

import { SugeryType } from "@/types/sugery"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

type Props = {
  result: SugeryType[],
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
          <PaginationPrevious href={`/surgery/${prev.slug}`}>
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
          <PaginationNext href={`/surgery/${next.slug}`}>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
