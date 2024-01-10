import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export interface PageLink extends Record<string, string | boolean | undefined> {
  url: string;
  active?: boolean;
}

export type PagePaginationProps = {
  next: string;
  previous: string;
  items: PageLink[];
  renderItem: (item: PageLink, index: number) => string | React.ReactNode;
};

const PagePagination = ({
  previous,
  next,
  items,
  renderItem,
}: PagePaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={previous} />
        </PaginationItem>
        {items.map((item, index) => (
          <PaginationItem>
            <PaginationLink isActive={item.active} href={item.url}>
              {renderItem(item, index)}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
