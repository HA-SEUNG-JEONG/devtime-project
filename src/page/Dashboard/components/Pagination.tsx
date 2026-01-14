import ChevronLeft from "@/components/Icon/ChevronLeft";
import ChevronRight from "@/components/Icon/ChevronRight";
import DoubleChevronLeft from "@/components/Icon/DoubleChevronLeft";
import DoubleChevronRight from "@/components/Icon/DoubleChevronRight";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (
  current: number,
  total: number,
): (number | "ellipsis")[] => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const delta = 1;

  pages.push(1);

  if (current > delta + 2) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (current < total - delta - 1) {
    pages.push("ellipsis");
  }

  if (!pages.includes(total)) {
    pages.push(total);
  }

  return pages;
};

const Pagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={!hasPrev}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100",
          !hasPrev && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
        aria-label="처음으로"
      >
        <DoubleChevronLeft size={16} />
      </button>

      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100",
          !hasPrev && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
        aria-label="이전"
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-8 w-8 items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors",
              currentPage === page
                ? "bg-primary-0 text-white"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100",
          !hasNext && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
        aria-label="다음"
      >
        <ChevronRight size={16} />
      </button>

      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={!hasNext}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100",
          !hasNext && "cursor-not-allowed opacity-50 hover:bg-transparent",
        )}
        aria-label="끝으로"
      >
        <DoubleChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
