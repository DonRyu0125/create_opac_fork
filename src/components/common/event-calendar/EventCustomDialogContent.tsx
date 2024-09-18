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

const EventCustomDialogContent = ({ elm, contactInfo, key = 0 }: any) => {
	return (
		<div
			key={key}
			className={
				'p-1 rounded border-2 border-slate-800 w-full h-full sm:flex font-bold relative sm:min-h-[750px]'
			}>
			{elm[TAG_FUNC_CANCEL] && <EventRSVPCancel reason={elm[TAG_FUNC_CAN_RES]} />}
			<div className={'w-full md:h-full sm:w-8/12 '}>
				<RSVPCarousel elm={elm} items={elm.FUNC_LOC_M_GRP ?? []} contactInfo={contactInfo} />
				<DialogDescription className={'h-[200px] break-all overflow-y-auto text-base'}>
					{elm[TAG_FUNC_LOC_DEC]}
				</DialogDescription>
			</div>
			<div className={'w-full md:h-full md:ml-2 sm:w-4/12'}>
				<EventRSVPForm
					sisnNumber={elm[SISN]}
					capacity={elm[TAG_FUNC_LOC_MAX]}
					patrons={convertToArr(elm[PATRON])}
					event={elm}
					contactInfo={contactInfo}
				/>
			</div>
		</div>
	)
}

export default EventCustomDialogContent
