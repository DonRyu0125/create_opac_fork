/**
 * EventCalendarEventList: Event list modal button (more than three events, it shows the all event buttons)
 */
import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { config } from '@/constants'
import {
	Cal_event,
	EVENT_DATE,
	EVENT_DESC,
	EVENT_END_TIME,
	EVENT_NAME,
	EVENT_START_TIME,
	EVENT_TAG_WORD_LENGTH,
	FILTER_TYPE,
	FILTER_TYPE_COLORS,
} from './EventCalendar'
import { convertLowerTrim } from '@/lib/utils'

type showStrObj = {
	[key: number]: boolean
}

const EventCalendarEventList = ({ dayObj, currentFilter, currentEvent }: any) => {
	const { logo } = config
	const [showFullStr, setShowFullStr] = useState<showStrObj>({})
	const [filteredEvents, setFilteredEvents] = useState<Cal_event[]>([])

	useEffect(() => {
		const updatedFilteredEvents = currentEvent.filter((item: Cal_event) => {
			const { day, month, year } = changeStrToDate(item[EVENT_DATE])
			const isMatchingDayMonth =
				day === dayObj.day && month === dayObj.month && year === dayObj.year
			if (currentFilter.length > 0) {
				return (
					isMatchingDayMonth &&
					currentFilter.some(
						(type: string) =>
							convertLowerTrim(type) === convertLowerTrim(item[FILTER_TYPE])
					)
				)
			}
			return isMatchingDayMonth
		})

		updatedFilteredEvents.sort((a: Cal_event, b: Cal_event) => {
			const timeA: Date | undefined = parseTimeString(a[EVENT_START_TIME])
			const timeB: Date | undefined = parseTimeString(b[EVENT_START_TIME])
			if (timeA && timeB) {
				return timeA.getTime() - timeB.getTime()
			}
			return 0
		})

		setFilteredEvents(updatedFilteredEvents)
	}, [currentEvent, currentFilter, dayObj])

	const showStrToggle = (key: number) => {
		setShowFullStr((prevShowFullStr) => {
			const updatedShowFullStr = { ...prevShowFullStr }
			updatedShowFullStr[key] = !updatedShowFullStr[key]
			return updatedShowFullStr
		})
	}

	const resetToggleSetting = () => {
		setShowFullStr({})
	}

	/**
	 *
	 * @param event_type
	 * @returns color, filtering icon type
	 */
	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLowerTrim(item.type) === convertLowerTrim(event_type)
		})
		return `${result[0]?.color} ${result[0]?.icon}`
	}

	const changeStrToDate = (dateString: string) => {
		const dateObject = new Date(dateString)
		const month = dateObject.getMonth() + 1
		const day = dateObject.getDate() + 1
		const year = dateObject.getFullYear()

		return { month, day, year }
	}

	// SMA's time format is 00:00 PM/AM
	// To sort the time shift
	const parseTimeString = (timeString: string) => {
		if (timeString) {
			const [time, meridian] = timeString?.split(' ')
			const [hours, minutes] = time?.split(':').map(Number)

			let hours24 = hours
			if (meridian === 'PM' && hours !== 12) {
				hours24 += 12
			} else if (meridian === 'AM' && hours === 12) {
				hours24 = 0
			}
			const dateObject = new Date()
			dateObject.setHours(hours24, minutes, 0, 0)
			return dateObject
		}
		return
	}

	return (
		<div className={'h-full relative'}>
			{/* Event button */}
			<div className={'h-3/5 overflow-auto mb-[2px]'}>
				{filteredEvents.map((item: Cal_event, key: number) => (
					<Dialog key={key}>
						<DialogTrigger asChild>
							<Button
								className={'w-full h-[20px] border-hidden flex p-0 justify-start'}
								variant="outline">
								<div
									className={cn(
										'h-4 w-[16px] border rounded',
										getColor(item[FILTER_TYPE])
									)}></div>
								<div
									className={
										'invisible max-w-[126px] text-left overflow-hidden sm:w-full sm:visible'
									}>
									{item[EVENT_NAME]?.substring(0, EVENT_TAG_WORD_LENGTH)}
								</div>
							</Button>
						</DialogTrigger>
						<DialogContent
							hideClose={'invisible'}
							className={'p-1 min-h-96 max-w-lg md:max-w-3xl'}>
							<DialogHeader>
								<DialogTitle
									className={
										' bg-primary text-primary-foreground h-10 flex items-center justify-between rounded p-2'
									}>
									<div className="h-8">
										<img className="h-full" src={logo} alt="logo" />
									</div>
									<div>{item[FILTER_TYPE]}</div>
									<DialogPrimitive.Close>
										<X className={'h-6 w-6'} />
									</DialogPrimitive.Close>
								</DialogTitle>
							</DialogHeader>
							<div
								className={
									'w-full text-l w-full flex flex-col justify-center items-left font-bold px-2 '
								}>
								<div className={'overflow-hidden text-lg'}>{item[EVENT_NAME]}</div>
								<div className={'flex'}>
									<div className="text-md text-gray-600">{item[EVENT_DATE]}</div>
									<div className="mx-2 text-gray-600">&#x2022;</div>
									<div className="text-md text-gray-600">
										{item[EVENT_START_TIME]} - {item[EVENT_END_TIME]}
									</div>
								</div>
							</div>
							<DialogDescription className={'h-full min-h-80 overflow-auto p-2'}>
								{item[EVENT_DESC]}
							</DialogDescription>
							<DialogFooter>
								<DialogPrimitive.Close
									className={
										'bg-primary text-primary-foreground h-10 w-20 flex items-center justify-around rounded'
									}>
									Close
								</DialogPrimitive.Close>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				))}
			</div>
			{/* All events button */}
			<div className={'h-[20px]'}>
				{filteredEvents.length > 3 && (
					<Dialog>
						<DialogTrigger asChild>
							<Button
								className={
									' h-full w-full px-0 absolute bottom-0 flex items-center justify-center overflow-hidden'
								}>
								All {filteredEvents.length} events
							</Button>
						</DialogTrigger>
						<DialogContent
							onPointerDownOutside={resetToggleSetting}
							className={
								'max-w-lg h-[500px] overflow-auto p-1 flex flex-col items-center max-w-l md:max-w-3xl'
							}
							hideClose={'invisible'}>
							<DialogHeader className={'w-full'}>
								<DialogTitle
									className={
										' bg-primary text-primary-foreground h-10 flex items-center justify-between rounded p-2'
									}>
									<div className="h-8">
										<img className="h-full" src={logo} alt="logo" />
									</div>
									<div>All Events</div>
									<DialogPrimitive.Close onClick={resetToggleSetting}>
										<X className={'h-6 w-6'} />
									</DialogPrimitive.Close>
								</DialogTitle>
							</DialogHeader>
							{filteredEvents.map((item: Cal_event, idx: number) => (
								<div key={idx} className={'w-11/12 border-2 rounded'}>
									<DialogTitle
										className={
											'bg-primary text-primary-foreground h-10 flex justify-center items-center rounded'
										}>
										<div>{item[FILTER_TYPE]}</div>
									</DialogTitle>
									<div
										className={
											'w-full text-l w-full flex flex-col justify-center items-left font-bold px-2 '
										}>
										<div className={'overflow-hidden text-lg'}>
											{item[EVENT_NAME]}
										</div>
										<div className={'flex'}>
											<div className="text-md text-gray-600">
												{item[EVENT_DATE]}
											</div>
											<div className="mx-2 text-gray-600">&#x2022;</div>
											<div className="text-md text-gray-600">
												{item[EVENT_START_TIME]} - {item[EVENT_END_TIME]}
											</div>
										</div>
									</div>
									{/* 'More' button to toggle description of the event */}
									<DialogDescription
										className={`${showFullStr[idx] ? 'h-24' : 'h-10'} overflow-auto p-2`}>
										<>
											{showFullStr[idx] ? (
												<>
													{item[EVENT_DESC]}
													<button
														className={'text-slate-950 font-semibold'}
														onClick={() => showStrToggle(idx)}>
														....Close
													</button>
												</>
											) : (
												<>
													{item[EVENT_DESC]?.substring(0, 10)}
													<button
														className={'text-slate-950 font-semibold'}
														onClick={() => showStrToggle(idx)}>
														....More
													</button>
												</>
											)}
										</>
									</DialogDescription>
								</div>
							))}
							<DialogFooter className={'w-full flex justify-end'}>
								<DialogPrimitive.Close
									onClick={resetToggleSetting}
									className={
										'bg-primary text-primary-foreground h-10 w-20 flex items-center justify-center rounded'
									}>
									Close
								</DialogPrimitive.Close>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</div>
	)
}

export default EventCalendarEventList
