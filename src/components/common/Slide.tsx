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

export type ItemsPerSlide = Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
const DEFAULT_ITEM_PER_SLIDE: ItemsPerSlide = {
  xs: 1,
  sm: 1,
  md: 3,
  lg: 3,
  xl: 3,
};
export interface SlideProps<T> {
  itemsPerSlide: ItemsPerSlide;
  items: T[];
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}
const Slide = <T,>({
  itemsPerSlide = DEFAULT_ITEM_PER_SLIDE,
  items,
  className,
  renderItem,
}: SlideProps<T>) => {
  const ITEM_STYLE = Object.keys(itemsPerSlide)
    .map((e) => `${e}:basis-1/${itemsPerSlide[e as keyof ItemsPerSlide]}`)
    .join(' ');

  return (
    <Carousel className={cn('w-full', className)}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem className={cn(ITEM_STYLE)} key={index}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slide;
