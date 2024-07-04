'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadCNPagination,
} from '@/components/ui/pagination';

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  // nextPageNum: number
  // prevPageNum: number
}

const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  hasPrevPage,
  hasNextPage,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePageParam = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', pageNum.toString());

    return params.toString();
  };

  return (
    <ShadCNPagination className="mb-10">
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious
              href={pathname + '?' + updatePageParam(currentPage - 1)}
              className="bg-black-700"
            />
          </PaginationItem>
        )}
        <PaginationItem className="px-8 py-2">
          {currentPage}/{totalPages}
        </PaginationItem>
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              href={pathname + '?' + updatePageParam(currentPage + 1)}
              className="bg-black-700"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadCNPagination>
  );
};

export default Pagination;
