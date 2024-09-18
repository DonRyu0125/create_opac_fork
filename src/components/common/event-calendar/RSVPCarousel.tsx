import React from 'react'
import { Accessibility, ChevronLeft, ChevronRight, CircleParkingOff, Scan } from 'lucide-react'
import LightboxImage from '../LightboxImage'

import {
	TAG_FUNC_DATE,
	TAG_FUNC_LOC_DEC,
	TAG_FUNC_END_T,
	TAG_NAME,
	TAG_FUNC_LOC_ROO,
	TAG_FUNC_LOC_AUD,
	TAG_FUNC_START_T,
	TAG_FUNC_LOC_MAX,
	TAG_FUNC_RSVP,
	TAG_FUNC_CANCEL,
	TAG_FUNC_CAN_RES,
	TAG_FUNC_LOC_IMG,
	PATRON,
	SISN,
	TAG_FUNC_ACCESS,
	ContactInfoRSVP,
	BD_DIS_ACC,
	BD_DIS_ACC_TYPE,
	BD_DIS_ACC_DETAI,
	MEDIA_TYPE,
} from './Constants'
import useConstants from '@/hooks/useConstants'
import { getContactInfo } from './Service'

export type ImageProps = {
	TAG_FUNC_LOC_MT: string
	TAG_FUNC_LOC_MD: string
}
export interface ImageCarouselProps {
	items: ImageProps[]
	elm: any
	contactInfo: ContactInfoRSVP[]
}

const RSVPCarousel = ({ items = [], elm, contactInfo }: ImageCarouselProps) => {
	const [current, setCurrent] = React.useState(0)
	const currentMedia = items[current]
	const message = useConstants().message

	return (
		<div className="flex flex-col space-y-4 h-1/2 min-h-[370px] justify-center bg-primary">
			<div className="max-h-[370px] flex w-full h-full  group cursor-pointer relative">
				<div className="w-full h-full flex justify-center items-center bg-zinc-400">
					{currentMedia?.TAG_FUNC_LOC_MT !== MEDIA_TYPE.VIDEO ? (
						<>
							<img
								className="w-full object-fill h-full"
								alt={elm[TAG_NAME]}
								src={`${currentMedia?.TAG_FUNC_LOC_MD}`}
							/>
							<div className="pt-3 px-12 h-full overflow-y-auto absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100  items-center justify-evenly transition-opacity duration-300 ">
								<div className={'text-white overflow-hidden text-2xl'}>
									{elm[TAG_NAME]}
								</div>
								<div className={'sm:flex text-lg'}>
									<div className="text-white ml-[10px] sm:ml-0 text-md  text-gray-600 font-bold">
										&#x2022;{elm[TAG_FUNC_DATE]}
									</div>
									<div className="text-white ml-[10px] text-md text-gray-600 font-bold">
										<span>&#x2022;{elm[TAG_FUNC_START_T]?.toUpperCase()}</span>
										<span className={'mx-2'}>-</span>
										<span>{elm[TAG_FUNC_END_T]?.toUpperCase()}</span>
									</div>
									<div className="text-white ml-[10px] text-md text-gray-600 font-bold">
										&#x2022;{message.room}: {elm[TAG_FUNC_LOC_ROO]}
									</div>
								</div>
								<div className={'sm:flex text-lg mb-6'}>
									<div className="text-white sm:ml-0 ml-[10px] text-md text-gray-600 font-bold">
										&#x2022;{message.suitableFor}: {elm[TAG_FUNC_LOC_AUD]}
									</div>
									<div className="text-white ml-[10px] text-md text-gray-600 font-bold">
										&#x2022;{message.seats}: {elm[TAG_FUNC_LOC_MAX]}
									</div>
								</div>
								{getContactInfo(BD_DIS_ACC, contactInfo, elm)?.map(
									(
										item: {
											BD_DIS_ACC_TYPE: string
											BD_DIS_ACC_DETAI: string
										},
										key: number
									) => {
										return (
											<div className={'sm:flex text-white'} key={key}>
												<div className={'mr-2'}>
													{item[BD_DIS_ACC_TYPE]}:
												</div>
												<div>{item[BD_DIS_ACC_DETAI]}</div>
											</div>
										)
									}
								)}
							</div>
						</>
					) : (
						<>
							<video className="w-full h-full" controls controlsList="nodownload">
								<source src={currentMedia?.TAG_FUNC_LOC_MD} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</>
					)}
				</div>
			</div>
			<ChevronLeft
				strokeWidth={'3px'}
				className="cursor-pointer absolute bg-gray-400 bg-opacity-30 w-8 h-8 text-white hover:text-primary left-2 top-1/2 transform -translate-y-1/2 transition-all ease-in duration-400"
				onClick={() => setCurrent(current - 1 < 0 ? 0 : current - 1)}
			/>
			<ChevronRight
				strokeWidth={'3px'}
				className="cursor-pointer absolute bg-gray-400 bg-opacity-30 w-8 h-8 text-white hover:text-primary right-2 top-1/2 transform -translate-y-1/2 transition-all ease-in duration-400"
				onClick={() =>
					setCurrent(current + 1 === items.length ? items.length - 1 : current + 1)
				}
			/>
		</div>
	)
}

export default RSVPCarousel
