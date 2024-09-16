import React from 'react'
import { ChevronLeft, ChevronRight, Scan } from 'lucide-react'
import LightboxImage from '../LightboxImage'

export type ImageProps = {
	src: string
	alt?: string
	caption?: string
	video?: string
}
export interface ImageCarouselProps {
	items: ImageProps[]
	renderItems: (item: ImageProps, index: number) => React.ReactNode
}

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
	return (
		<video className="w-full h-full" controls controlsList="nodownload">
			<source src={videoUrl} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	)
}

const RSVPCarousel = ({ items, renderItems }: ImageCarouselProps) => {
    const [current, setCurrent] = React.useState(0)
	const [openLightbox, setOpenLightbox] = React.useState(false)
	const currentMedia = items[current]

  return (
    <div className="flex flex-col space-y-4">
			<div className="flex w-full group cursor-pointer relative">
				<div className="w-full h-full min-h-[370px]">
					{currentMedia.video ? (
						<VideoPlayer videoUrl={currentMedia.video} />
					) : (
						<img
							className="mx-auto w-full object-fill max-h-[370px]"
							{...currentMedia}
						/>
					)}
				</div>
				<Scan
					strokeWidth={'3px'}
					className="cursor-pointer absolute bg-gray-400 bg-opacity-30  w-8 h-8 text-white hover:text-primary bottom-2 right-2 transition-all ease-in duration-400"
					onClick={() => setOpenLightbox(true)}
				/>
				<ChevronLeft
					strokeWidth={'3px'}
					className="cursor-pointer absolute bg-gray-400 bg-opacity-30 w-8 h-8 text-white hover:text-primary left-2 top-1/2  transition-all ease-in duration-400 "
					onClick={() => setCurrent(current - 1 < 0 ? 0 : current - 1)}
				/>
				<ChevronRight
					strokeWidth={'3px'}
					className="cursor-pointer absolute bg-gray-400 bg-opacity-30  w-8 h-8 text-white hover:text-primary right-2 top-1/2 transition-all ease-in duration-400 "
					onClick={() =>
						setCurrent(current + 1 === items.length ? items.length - 1 : current + 1)
					}
				/>
				<LightboxImage onOpen={setOpenLightbox} open={openLightbox} items={items} />
			</div>
			{/* {!isRSVP && (
				<Slide
					carouselStyle="sm:basis-1/4"
					items={items}
					renderItem={(item, index) => (
						<div className="cursor-pointer w-fit" onClick={() => setCurrent(index)}>
							{renderItems(item, index)}
						</div>
					)}
					auto={false}
				/>
			)} */}
		</div>
  )
}

export default RSVPCarousel
