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
  currentPage: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  hasPrevPage,
  hasNextPage,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePageParam = (isNextPage: boolean) => {
    const currentPageNumber = Number(currentPage);
    const prevPageNumber = (currentPageNumber - 1).toString();
    const nextPageNumber = (currentPageNumber + 1).toString();
    const params = new URLSearchParams(searchParams.toString());

    isNextPage
      ? params.set('page', nextPageNumber)
      : params.set('page', prevPageNumber);

    return params.toString();
  };

  return (
    <ShadCNPagination className="mb-10">
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious
              href={pathname + '?' + updatePageParam(false)}
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
              href={pathname + '?' + updatePageParam(true)}
              className="bg-black-700"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadCNPagination>
  );
};

export default Pagination;
