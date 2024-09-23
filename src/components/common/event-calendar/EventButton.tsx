import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import { cn, convertToArr } from '@/lib/utils'
import { convertLowerTrim } from '@/lib/utils'
import {
	Cal_event,
	TAG_FUNC_DATE,
	TAG_FUNC_LOC_DEC,
	TAG_FUNC_END_T,
	TAG_NAME,
	TAG_FUNC_LOC_ROO,
	TAG_FUNC_LOC_AUD,
	TAG_FUNC_START_T,
	TAG_NAME_LENGTH,
	TAG_DB_TYPE,
	TAG_FUNC_LOC_MAX,
	TAG_FUNC_LANG,
	TAG_FUNC_LOC_LENGTH,
	TAG_FUNC_DTE_LIST,
	PATRON,
	TAG_FUNC_RSVP,
	SISN,
	ContactInfoRSVP,
	TAG_FUNC_ACCESS,
	TAG_FUNC_CANCEL,
	TAG_FUNC_CAN_RES,
	FilterType,
	EVENT_DEFAULT_COLOR,
	TAG_FUNC_LOC_IMG,
} from './Constants'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Accessibility, SquareUserRound, X } from 'lucide-react'
import useConstants from '@/hooks/useConstants'
import { useAtom } from 'jotai'
import { calendarWeekType } from '@/store'
import EventCustomDialogContent from './EventCustomDialogContent'
import ImageCarousel from '../ImageCarousel'

const EventButton = ({
	elm,
	id,
	contactInfo,
	filterTypes,
	fitlerOption,
}: {
	elm: any
	id: number
	contactInfo: ContactInfoRSVP[]
	filterTypes: FilterType[]
	fitlerOption: string
}) => {
	const [weekType, _] = useAtom(calendarWeekType)
	const message = useConstants().message
	const { logo } = useConstants().config
	const getColor = (event_type: string) => {
		let result = filterTypes?.filter((item) => {
			return convertLowerTrim(item.type) === convertLowerTrim(event_type)
		})

		if (result.length < 1) {
			return EVENT_DEFAULT_COLOR
		}
		return `${result[0]?.color} ${result[0]?.icon}`
	}
	
	// <Expand />
	// <MonitorPlay />
	//<SquareUserRound />

	return (
		<Dialog key={id}>
			<DialogTrigger asChild>
				{weekType ? (
					<Button
						className={`${getColor(elm[fitlerOption])} min-w-[100px] h-[55px] mr-1 overflow-y-hidden w-full md:max-w-[168px] md:h-[30%] md:mb-2 border-hidden p-1 text-sm flex flex-col justify-start text-white md:p-1`}
						variant="outline">
						<div className={'w-full text-left'}>
							<div className={'flex w-full'}>
								<p className={'w-full h-full break-all sm:overflow-hidden font-bold'}>
									{elm[TAG_NAME]}
								</p>
							</div>
							<div className={'hidden md:flex items-center justify-around w-full'}>
								<div>
									<div>{elm[TAG_FUNC_START_T]?.toUpperCase()}-</div>
									<div>{elm[TAG_FUNC_END_T]?.toUpperCase()}</div>
								</div>
								<div className={'hidden sm:block w-[18px]'}>
									{elm[TAG_FUNC_RSVP] && <SquareUserRound />}
								</div>
							</div>
						</div>
					</Button>
				) : (
					<Button
						className={`overflow-y-hidden flex flex-col justify-start w-full max-h-[60px] border-hidden p-0 text-sm`}
						variant="outline">
						<div className={'flex w-full text-left'}>
							<div
								className={cn(
									'h-4 w-[16px] border rounded',
									getColor(elm[fitlerOption])
								)}></div>
							<p className={'w-full h-full hidden sm:block break-all'}>
								{elm[TAG_NAME]}
							</p>
						</div>
					</Button>
				)}
			</DialogTrigger>
			<DialogContent
				hideClose={'invisible'}
				className={'max-h-[90vh] max-w-5xl overflow-y-auto p-1 gap-1 '}>
				<DialogHeader>
					<DialogTitle
						className={
							' bg-primary text-primary-foreground h-10 flex items-center justify-between rounded p-2 '
						}>
						<div className="h-8">
							<img className="h-full" src={logo} alt="logo" />
						</div>
						<div className={'flex'}>
							<div
								className={cn(
									'h-4 w-[16px] border rounded mr-1',
									getColor(elm[TAG_DB_TYPE])
								)}></div>
							<div>{elm[TAG_NAME]}</div>
						</div>
						<DialogPrimitive.Close>
							<X className={'h-6 w-6'} />
						</DialogPrimitive.Close>
					</DialogTitle>
				</DialogHeader>
				<EventCustomDialogContent elm={elm} contactInfo={contactInfo} />
				<DialogFooter>
					<DialogPrimitive.Close
						className={
							'font-bold bg-primary text-primary-foreground h-10 w-20 flex items-center justify-around rounded'
						}>
						{message.close}
					</DialogPrimitive.Close>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EventButton
