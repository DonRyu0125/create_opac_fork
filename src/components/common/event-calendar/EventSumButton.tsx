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
import { cn } from '@/lib/utils'
import { convertLowerTrim } from '@/lib/utils'
import {
	Cal_event,
	EVENT_DATE,
	EVENT_DESC,
	EVENT_END_TIME,
	EVENT_NAME,
	EVENT_ROOM,
	EVENT_AGE,
	EVENT_START_TIME,
	EVENT_TAG_WORD_LENGTH,
	FILTER_TYPE,
	FILTER_TYPE_COLORS,
	EVENT_CAPACITY,
	EVENT_LANG,
	EVENT_BRANCH_NAME_LENGTH,
	EVENT_LIST,
	EVENT_RSVP,
} from './EventCalendar'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { config } from '@/constants'
import { X } from 'lucide-react'
import EventRSVPForm from './EventRSVPForm'
import { CalendarCheck } from 'lucide-react'
import EventButton from './EventButton'

export interface eventSumType {
	filteredEvents: Cal_event[]
	weekType: boolean
	monthType: boolean
}

const EventSumButton = ({ filteredEvents, weekType, monthType }: eventSumType) => {
	const { logo } = config

	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLowerTrim(item.type) === convertLowerTrim(event_type)
		})
		return `${result[0]?.color} ${result[0]?.icon}`
	}

	const groupedByLocation = (filteredEvents: Cal_event[]) => {
		let locatoionArr: any = {}
		let result = []

		filteredEvents.forEach((classInfo) => {
			const location = classInfo['tag-func-loc']
			if (!locatoionArr[location]) {
				locatoionArr[location] = []
			}
			locatoionArr[location].push(classInfo)
		})

		result = Object.keys(locatoionArr).map((loc) => {
			return { [FILTER_TYPE]: loc, [EVENT_LIST]: locatoionArr[loc] }
		})
		return result ?? []
	}

	return (
		<>
			{monthType && filteredEvents.length > 3 ? (
				<div className={'h-full mb-[2px] overflow-x-hidden'}>
					{groupedByLocation(filteredEvents).map((item: any, key: number) => (
						<Dialog key={key}>
							<DialogTrigger asChild>
								<Button
									className={'h-[20px] border-hidden flex p-0 justify-start'}
									variant="outline">
									<div
										className={cn(
											'h-4 w-[16px] border rounded',
											getColor(item[FILTER_TYPE])
										)}></div>
									<div className={'hidden sm:block max-w-[126px] text-left '}>
										{item[FILTER_TYPE]?.slice(0, EVENT_BRANCH_NAME_LENGTH)}
									</div>
									<div className={'flex items-center justify-center'}>
										<CalendarCheck height={18} className={'hidden sm:block'} />:{' '}
										<div>{item[EVENT_LIST].length}</div>
									</div>
								</Button>
							</DialogTrigger>
							<DialogContent
								hideClose={'invisible'}
								className={'max-w-lg h-[500px] overflow-auto p-4 md:max-w-3xl'}>
								<>
									<DialogHeader>
										<DialogTitle
											className={
												' bg-primary text-primary-foreground h-10 flex items-center justify-between rounded p-2'
											}>
											<div className="h-8">
												<img className="h-full" src={logo} alt="logo" />
											</div>
											<div className={'flex'}>
												<div
													className={cn(
														'h-4 w-[16px] border rounded mr-1',
														getColor(item[FILTER_TYPE])
													)}></div>
												{item[FILTER_TYPE]}
											</div>
											<DialogPrimitive.Close>
												<X className={'h-6 w-6'} />
											</DialogPrimitive.Close>
										</DialogTitle>
									</DialogHeader>
									{item[EVENT_LIST]?.map((elm: any, key: number) => (
										<div
											key={key}
											className={
												'w-full text-l sm:flex font-bold p-2 border-2 rounded '
											}>
											<div className={`w-full ${elm[EVENT_RSVP] && 'sm:w-8/12'}`}>
												<div className={'overflow-hidden text-lg'}>
													{elm[EVENT_NAME]}
												</div>
												<div className={'sm:flex'}>
													<div className="ml-[10px] sm:ml-0 text-md text-gray-600 font-bold">
														&#x2022;{elm[EVENT_DATE]}
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														<span>&#x2022;{elm[EVENT_START_TIME]}</span>
														<span className={'mx-2'}>-</span>
														<span>{elm[EVENT_END_TIME]}</span>
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;Room: {elm[EVENT_ROOM]}
													</div>
												</div>
												<div className={'sm:flex'}>
													<div className="sm:ml-0 ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;Suitable for: {elm[EVENT_AGE]}
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;Seats: {elm[EVENT_CAPACITY]}
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;Language: {elm[EVENT_LANG]}
													</div>
												</div>
												<DialogDescription
													className={
														'h-[320px] break-all overflow-y-auto'
													}>
													{elm[EVENT_DESC]}
												</DialogDescription>
											</div>
											{console.log('elm',elm)}
											{elm[EVENT_RSVP] && (
												<div className={'w-full sm:w-4/12'}>
													<EventRSVPForm capacity={elm[EVENT_CAPACITY]} />
												</div>
											)}
										</div>
									))}
									<DialogFooter>
										<DialogPrimitive.Close
											className={
												'bg-primary text-primary-foreground h-10 w-20 flex items-center justify-around rounded'
											}>
											Close
										</DialogPrimitive.Close>
									</DialogFooter>
								</>
							</DialogContent>
						</Dialog>
					))}
				</div>
			) : (
				<div className={'max-h-[95%] mb-[2px] w-full overflow-y-auto'}>
					{filteredEvents.map((item: any, idx: number) => (
						<EventButton elm={item} key={idx} id={idx} />
					))}
				</div>
			)}
		</>
	)
}

export default EventSumButton
