import React from "react";

import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
export interface LightboxImageProps {
  show: boolean;
  items: Slide[];
}
import { Slide } from "yet-another-react-lightbox";

const LightboxImage = ({ items, show }: LightboxImageProps) => {
  return (
    <Lightbox
      open={show}
      slides={items}
      plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
    />
  );
};

export default LightboxImage;
