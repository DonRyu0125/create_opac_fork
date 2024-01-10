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

export interface SlideProps<T> {
  items: T[];
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}
const Slide = <T,>({ items, className, renderItem }: SlideProps<T>) => {
  return (
    <Carousel className={cn('w-full', className)}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem className='"md:basis-1/2 lg:basis-1/3' key={index}>
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
