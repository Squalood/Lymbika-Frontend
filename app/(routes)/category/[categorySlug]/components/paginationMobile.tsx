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
  
  export default function PaginationControlsMobile({ page, totalFilteredPages, setPage }: PaginationProps) {
    if (totalFilteredPages <= 1) return null;
  
    const renderPageNumbers = () => {
      const pages: (number | "...")[] = [];
      const firstPage = 1;
      const lastPage = totalFilteredPages;
  
      if (page === firstPage) {
        pages.push(firstPage, firstPage + 1, "...", lastPage);
      } else if (page === lastPage) {
        pages.push(firstPage, "...", lastPage - 1, lastPage);
      } else {
        pages.push(page, page + 1, "...", lastPage);
      }
  
      return pages.map((pageNumber, index) => (
        <PaginationItem key={index}>
          {pageNumber === "..." ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              href="#"
              isActive={page === pageNumber}
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
      <Pagination className="mt-4">
        <PaginationContent>
          {/* Botón Anterior */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
  
          {/* Números de página con elipsis */}
          {renderPageNumbers()}
  
          {/* Botón Siguiente */}
          <PaginationItem>
            <PaginationNext
              href="#"
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
  