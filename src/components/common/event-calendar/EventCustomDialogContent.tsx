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
import RSVPCarousel from './RSVPCarousel'

// src: string
// alt?: string
// caption?: string
// video?: string

const images = [
	{
		type: 'Image',
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/6_16/ae91ce34_b9b4_44a4_9f0e_a3bc011460e8/preview_00433892_001.jpg',
	},
	{
		type: 'Video',
		src: 'https://titanapi.minisisinc.com/api/links/65043c1192f8422685fe7fcd57027d50/uuid/6d5353be50e04be7af42453ff65ca6c7/access',
	},
	{
		type: 'Image',
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_11/2_1/5bcca073_26c7_4e0f_bb70_a3d7001a1c24/preview_01081548_001.jpg',
	},
	{
		type: 'Image',
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/11_3/8dc66e9f_43e1_4170_956b_a3c1003d49ec/preview_00595099_001.jpg',
	},
	{ type: '', src: '' },
]

const EventCustomDialogContent = ({ elm, contactInfo, key }: any) => {
	return (
		<div
			key={key}
			className={
				' p-1 rounded border-2 border-slate-800 w-full h-full sm:flex font-bold relative'
			}>
			{elm[TAG_FUNC_CANCEL] && <EventRSVPCancel reason={elm[TAG_FUNC_CAN_RES]} />}
			<div className={'w-full md:h-full sm:w-8/12 '}>
				<RSVPCarousel
					elm={elm}
					items={images}
					renderItems={(image) => (
						<img
							src={image.src}
							className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
						/>
					)}
				/>
				<DialogDescription
					className={'h-[200px]  break-all overflow-y-auto'}>
					{elm[TAG_FUNC_LOC_DEC]}
				</DialogDescription>
			</div>
			<div className={'w-full md:h-full md:ml-2 sm:w-4/12'}>
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
