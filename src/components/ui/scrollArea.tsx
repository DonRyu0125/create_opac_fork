import * as React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils'; 

const ScrollAreaRoot = ScrollArea.Root;

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof ScrollArea.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollArea.Viewport>
>(({ className, children, ...props }, ref) => (
  <ScrollArea.Viewport ref={ref} className={cn('', className)} {...props}>
    {children}
  </ScrollArea.Viewport>
));
ScrollAreaViewport.displayName = ScrollArea.Viewport.displayName;

const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollArea.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollArea.Scrollbar>
>(({ className, orientation, ...props }, ref) => (
  <ScrollArea.Scrollbar ref={ref} orientation={orientation} className={cn('', className)} {...props}>
    <ScrollArea.Thumb className="" />
  </ScrollArea.Scrollbar>
));
ScrollAreaScrollbar.displayName = ScrollArea.Scrollbar.displayName;

const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof ScrollArea.Corner>,
  React.ComponentPropsWithoutRef<typeof ScrollArea.Corner>
>(({ className, ...props }, ref) => (
  <ScrollArea.Corner ref={ref} className={cn('', className)} {...props} />
));
ScrollAreaCorner.displayName = ScrollArea.Corner.displayName;


export { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaCorner };
