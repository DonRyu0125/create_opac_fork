import React from "react";
import { Card } from "../ui/card";

export interface CardWithThumbnailProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  url: string;
  thumbnail: string;
}

const CardWithThumbnail = ({
  title,
  url,
  thumbnail,
  className,
  children,
}: CardWithThumbnailProps) => {
  return (
    <Card className="group relative block">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={thumbnail}
          alt={title}
          className="brightness-75 absolute inset-0 h-full w-full object-cover "
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
        <span className="mt-3 inline-block bg-primary px-5 py-3 text-md  font-medium uppercase tracking-wide text-white">
          {title}
        </span>
        {children}
      </div>
    </Card>
  );
};

export default CardWithThumbnail;
