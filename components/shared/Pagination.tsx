import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadCNPagination,
} from '@/components/ui/pagination';

interface IPaginationProps {}

const Pagination: React.FC<IPaginationProps> = (props) => {
  return (
    <ShadCNPagination className="mb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="bg-black-700" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="bg-black-700">
            1
          </PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext href="#" className="bg-black-700" />
        </PaginationItem>
      </PaginationContent>
    </ShadCNPagination>
  );
};

export default Pagination;
