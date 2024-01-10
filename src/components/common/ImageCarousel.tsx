import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '../ui/card';

type Props = {};

const ImageCarousel = (props: Props) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className='w-full m'>
      <div>
        <img
          alt='Book Cover'
          className='aspect-[2/3] object-fit border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
          height={900}
          src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          width={600}
        />
      </div>
      <Carousel className='w-full '>
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className=' md:basis-1/2 lg:basis-1/3'
              onClick={() => setCurrent(index)}
            >
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='text-4xl font-semibold'>{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <div className='py-2 text-center text-sm text-muted-foreground'>
        Slide {current} of {count}
      </div> */}
    </div>
  );
};

export default ImageCarousel;
