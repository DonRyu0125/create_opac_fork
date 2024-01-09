import { cn } from '@/lib/utils';

export interface HeroProps extends React.ComponentProps<'section'> {
  title: string;
  description: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({
  children,
  className,
  title,
  description,
  backgroundImage,
}: HeroProps) => {
  return (
    <section
      className={cn('relative w-full h-[600px] bg-center bg-cover', className)}
      style={{
        backgroundImage,
      }}
    >
      <div className='absolute inset-0 bg-black/50' />
      <div className='relative h-full flex flex-col items-center justify-center text-center text-white px-4'>
        <h1 className='text-4xl font-bold md:text-5xl lg:text-6xl'>{title}</h1>
        <p className='mt-2 text-lg md:text-xl lg:text-2xl max-w-[700px] mx-auto'>
          {description}
        </p>
        {children}
      </div>
    </section>
  );
};

export default Hero;
