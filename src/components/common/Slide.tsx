import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import React from 'react';

type Props = {};

const Slide = (props: Props) => {
  return (
    // 50% on small screens and 33% on larger screens.
    <Carousel>
      <CarouselContent>
        <CarouselItem className='md:basis-1/2 lg:basis-1/3'>...</CarouselItem>
        <CarouselItem className='md:basis-1/2 lg:basis-1/3'>...</CarouselItem>
        <CarouselItem className='md:basis-1/2 lg:basis-1/3'>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Slide;
