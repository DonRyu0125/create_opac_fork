import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PageLink extends Record<string, string | boolean | undefined> {
  url: string;
  active?: boolean;
}

export type PagePaginationProps = {
  next?: string;
  previous?: string;
  items: PageLink[];
  maxItem?: number;
  renderItem: (item: PageLink, index: number) => string | React.ReactNode;
};

const PagePagination = ({
  previous,
  next,
  items,
  maxItem = 10,
  renderItem,
}: PagePaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        {previous && (
          <PaginationItem>
            <PaginationPrevious href={previous} />
          </PaginationItem>
        )}
        {items
          .filter((e, i) => i < maxItem)
          .map((item, index) => (
            <PaginationItem>
              <PaginationLink isActive={item.active} href={item.url}>
                {renderItem(item, index)}
              </PaginationLink>
            </PaginationItem>
          ))}

        {next && (
          <PaginationItem>
            <PaginationNext href={next} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
