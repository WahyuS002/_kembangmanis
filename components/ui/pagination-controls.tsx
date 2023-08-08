import { Button } from "@/components/ui/button";

export interface Meta {
  currentPage: number;
  totalPages: number;
  prevPageUrl?: boolean;
  nextPageUrl?: boolean;
}

interface PaginationControlsProps {
  pagination: Meta;
  setCurrentPage: (page: number) => void;
}

export default function PaginationControls({
  pagination,
  setCurrentPage,
}: PaginationControlsProps) {
  if (pagination?.totalPages === 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-10 gap-3">
      <Button
        variant="outline"
        size="sm"
        disabled={!pagination?.prevPageUrl}
        onClick={() => setCurrentPage(pagination.currentPage - 1)}
      >
        Prev
      </Button>
      {Array.from({ length: pagination?.totalPages }).map((_, index) => (
        <Button
          variant="outline"
          size="sm"
          key={index}
          className={`${
            pagination?.currentPage === index + 1 &&
            "text-white bg-zinc-900 hover:bg-zinc-800 hover:text-white"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        disabled={!pagination?.nextPageUrl}
        onClick={() => setCurrentPage(pagination.currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
