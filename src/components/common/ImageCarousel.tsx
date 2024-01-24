import React from 'react';

import Slide from './Slide';
import { ArrowLeftIcon, ChevronLeft, ChevronRight, Scan } from 'lucide-react';

export type ImageProps = {
  src: string;
  alt?: string;
  caption?: string;
};
export interface ImageCarouselProps {
  items: ImageProps[];
  renderItems: (item: ImageProps, index: number) => React.ReactNode;
}

const ImageCarousel = ({ items, renderItems }: ImageCarouselProps) => {
  const [current, setCurrent] = React.useState(0);
  const currentImage = items[current];
  return (
    <div className='flex flex-col space-y-4'>
      <Slide
        carouselStyle='sm:basis-1/4'
        items={items}
        renderItem={(item, index) => (
          <div className='cursor-pointer' onClick={() => setCurrent(index)}>
            {renderItems(item, index)}
          </div>
        )}
        auto={false}
      />

      <div className='flex w-full group cursor-pointer relative'>
        <img className='mx-auto' {...currentImage} />
        <Scan
          strokeWidth={'3px'}
          className='absolute bg-primary-foreground/20 w-8 h-8 text-white hover:text-primary bottom-2 right-2 transition-all ease-in duration-400 '
        />

        {/* <ChevronLeft className='absolute bg-primary-foreground/20 w-8 h-8 text-red-500 hover:text-primary left-2 top-1/2  transition-all ease-in duration-400 ' />

        <ChevronRight className='absolute bg-primary-foreground/20 w-8 h-8 text-white hover:text-primary right-2 top-1/2 transition-all ease-in duration-400 ' /> */}
      </div>
    </div>
  );
};

export default ImageCarousel;
