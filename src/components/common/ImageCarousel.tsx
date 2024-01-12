import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '../ui/card';
import Slide from './Slide';

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
        items={items}
        renderItem={(item, index) => (
          <div className='cursor-pointer ' onClick={() => setCurrent(index)}>
            {renderItems(item, index)}
          </div>
        )}
        auto={false}
      />

      <div>
        <img {...currentImage} />
      </div>
    </div>
  );
};

export default ImageCarousel;
