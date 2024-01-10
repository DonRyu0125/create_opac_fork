import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export type ItemsPerSlide = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};
// const DEFAULT_ITEM_PER_SLIDE: ItemsPerSlide = {
//   sm: 1,
//   md: 3,
//   lg: 3,
//   xl: 3,
// };
export interface SlideProps<T> {
  itemsPerSlide?: ItemsPerSlide;
  items: T[];
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}
const Slide = <T,>({ items, className, renderItem }: SlideProps<T>) => {
  return (
    <Carousel className={cn('w-full', className)}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            className={'sm:basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/3'}
            key={index}
          >
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
};

export default Slide;
