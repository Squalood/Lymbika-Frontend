import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  interface PaginationProps {
    page: number;
    totalFilteredPages: number;
    setPage: (page: number) => void;
  }
  
  export default function PaginationControls({ page, totalFilteredPages, setPage }: PaginationProps) {
    if (totalFilteredPages <= 1) return null;
  
    const renderPageNumbers = () => {
      const pages: (number | "...")[] = [];
      const firstPage = 1;
      const lastPage = totalFilteredPages;
  
      // Mostrar siempre la primera página
      pages.push(firstPage);
  
      // Mostrar elipsis después de la primera página si la actual es mayor a 3
      if (page > 3) pages.push("...");
  
      // Mostrar las páginas alrededor de la actual
      const start = Math.max(2, page - 1);
      const end = Math.min(lastPage - 1, page + 1);
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      // Mostrar elipsis antes de la última página si la actual es menor a (última - 2)
      if (page < lastPage - 2) pages.push("...");
  
      // Mostrar siempre la última página si hay más de una
      if (lastPage > 1) pages.push(lastPage);
  
      return pages.map((pageNumber, index) => (
        <PaginationItem key={index}>
          {pageNumber === "..." ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              isActive={page === pageNumber}
              className="min-w-9 text-sm"
              onClick={(e) => {
                e.preventDefault();
                setPage(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          )}
        </PaginationItem>
      ));
    };
  
    return (
      <Pagination className="mt-6 justify-center">
        <PaginationContent className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {/* Botón Anterior */}
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
              className={`min-w-9 text-sm ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
  
          {/* Números de página con elipsis */}
          {renderPageNumbers()}
  
          {/* Botón Siguiente */}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (page < totalFilteredPages) setPage(page + 1);
              }}
              className={page >= totalFilteredPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }