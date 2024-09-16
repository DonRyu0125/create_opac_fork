import React from 'react'
import { DialogDescription } from '../../ui/dialog'
import { cn, convertToArr } from '@/lib/utils'
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
} from './Constants'
import { Accessibility } from 'lucide-react'
import EventRSVPForm from './EventRSVPForm'
import EventRSVPCancel from './EventCancel'
import useConstants from '@/hooks/useConstants'
import ImageCarousel from '../ImageCarousel'
import RSVPCarousel from './RSVPCarousel'

// src: string
// alt?: string
// caption?: string
// video?: string

const images = [
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/6_16/ae91ce34_b9b4_44a4_9f0e_a3bc011460e8/preview_00433892_001.jpg',
	},
	{
		src: 'https://titanapi.minisisinc.com/api/links/65043c1192f8422685fe7fcd57027d50/uuid/6d5353be50e04be7af42453ff65ca6c7/access',
		video: 'https://titanapi.minisisinc.com/api/links/65043c1192f8422685fe7fcd57027d50/uuid/6d5353be50e04be7af42453ff65ca6c7/access',
		caption: 'caption',
		alt: 'ads',
	},
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_11/2_1/5bcca073_26c7_4e0f_bb70_a3d7001a1c24/preview_01081548_001.jpg',
	},
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/11_3/8dc66e9f_43e1_4170_956b_a3c1003d49ec/preview_00595099_001.jpg',
	},
	{
		src: '',
	},
]

const EventCustomDialogContent = ({ elm, contactInfo, key }: any) => {
	const message = useConstants().message
	return (
		<div
			key={key}
			className={
				'p-1 rounded border-2 border-slate-800 w-full h-full sm:flex font-bold relative'
			}>
			{elm[TAG_FUNC_CANCEL] && <EventRSVPCancel reason={elm[TAG_FUNC_CAN_RES]} />}
			<div className={'w-full h-full sm:w-8/12 '}>
				<RSVPCarousel
					items={images}
					renderItems={(image) => (
						<img
							alt={image.caption}
							src={image.src}
							className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
						/>
					)}
				/>
				<div className={'overflow-hidden text-lg'}>{elm[TAG_NAME]}</div>
				<div className={'sm:flex'}>
					<div className="ml-[10px] sm:ml-0 text-md  text-gray-600 font-bold">
						&#x2022;{elm[TAG_FUNC_DATE]}
					</div>
					<div className="ml-[10px] text-md text-gray-600 font-bold">
						<span>&#x2022;{elm[TAG_FUNC_START_T]?.toUpperCase()}</span>
						<span className={'mx-2'}>-</span>
						<span>{elm[TAG_FUNC_END_T]?.toUpperCase()}</span>
					</div>
					<div className="ml-[10px] text-md text-gray-600 font-bold">
						&#x2022;{message.room}: {elm[TAG_FUNC_LOC_ROO]}
					</div>
					{elm[TAG_FUNC_ACCESS] && (
						<div className="ml-[10px] text-md text-gray-600 font-bold flex">
							&#x2022;
							<Accessibility />: Y
						</div>
					)}
				</div>
				<div className={'sm:flex'}>
					<div className="sm:ml-0 ml-[10px] text-md text-gray-600 font-bold">
						&#x2022;{message.suitableFor}: {elm[TAG_FUNC_LOC_AUD]}
					</div>
					<div className="ml-[10px] text-md text-gray-600 font-bold">
						&#x2022;{message.seats}: {elm[TAG_FUNC_LOC_MAX]}
					</div>
				</div>
				<DialogDescription className={'h-full break-all'}>
					{elm[TAG_FUNC_LOC_DEC]}
				</DialogDescription>
			</div>
			<div className={'w-full m-1 sm:w-4/12 max-h-[400px]'}>
				{elm[TAG_FUNC_RSVP] && (
					<EventRSVPForm
						sisnNumber={elm[SISN]}
						capacity={elm[TAG_FUNC_LOC_MAX]}
						patrons={convertToArr(elm[PATRON])}
						event={elm}
						contactInfo={contactInfo}
					/>
				)}
			</div>
		</div>
	)
}

export default EventCustomDialogContent
