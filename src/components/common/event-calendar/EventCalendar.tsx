import React, { useEffect, useState } from 'react'
import X2JS from 'x2js'
import { config } from '@/constants'
import response from '../../../samples/fetch_calendar.json'
import EventCalendarFilter from './EventCalendarFilter'
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

export interface Cal_event {
	'event-date': string
	'event-start': string
	'event-end'?: string
	'event-name': string
	'event-desc'?: string
	'event-loc': string
}

export interface Day_obj {
	day: number | null
	month?: number
	year?: number
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const FILTER_TYPE = 'event-loc'
export const EVENT_DATE = 'event-date'
export const EVENT_NAME = 'event-name'
export const EVENT_END_TIME = 'event-end'
export const EVENT_START_TIME = 'event-start'
export const EVENT_DESC = 'event-desc'
export const EVENT_TAG_WORD_LENGTH = 18
export const MON_REPORT_TYPES = [
	'MONTHLY_CALENDAR',
	'NEXT_MONTH_CALENDAR',
	'NEXT_TWO_MONTH_CALENDAR',
	'NEXT_THREE_MONTH_CALENDAR',
	'NEXT_FOUR_MONTH_CALENDAR',
	'NEXT_FIVE_MONTH_CALENDAR',
]

export const COLORS_MAP = {
	RED: 'bg-red-500 border-red-500',
	YELLOW: 'bg-yellow-500 border-yellow-500',
	GREEN: 'bg-green-500 border-green-500',
	ORANGE: 'bg-orange-500 border-orange-500',
	PURPLE: 'bg-purple-500 border-purple-500',
	GREY: 'bg-neutral-500 border-neutral-500',
	PINK: 'bg-pink-500 border-pink-500',
}

export const ICON_SHAPE_MAP = {
	SQUARE: 'rounded',
	CIRCLE: 'rounded-full',
}

export const FILTER_TYPE_COLORS = [
	{
		type: 'Delhi',
		color: COLORS_MAP['RED'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	{
		type: 'Port Dover',
		color: COLORS_MAP['YELLOW'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	{
		type: 'Port Rowan',
		color: COLORS_MAP['GREEN'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	{
		type: 'Simcoe',
		color: COLORS_MAP['ORANGE'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	{
		type: 'Waterford',
		color: COLORS_MAP['PURPLE'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	// {
	// 	type: 'All',
	// 	color: COLORS_MAP['GREY'],
	// 	icon: ICON_SHAPE_MAP['CIRCLE'],
	// },
	{
		type: 'Norview Lodge',
		color: COLORS_MAP['PINK'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
]

const EventCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [currentEvent, setCurrentEvent] = useState<Cal_event[]>([])
	const [currentFilter, setCurrentFilter] = useState<string[]>([])

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		// const currE = await fetch_get("MONTHLY_CALENDAR");
		const currE: any = response
		setCurrentEvent(currE)
	}

	const fetch_get = async (monthReport: string) => {
		// try {
		//   const response = await axios.get(`${base_url}/scripts/mwimain.dll/144/M2L_TAG/${monthReport}?commandsearch&exp=tag_type calendar`, {
		//     headers: {
		//       "Content-Type": "text/xml",
		//     },
		//   });
		//   const x2js = new X2JS();
		//   const jsonData: any = x2js.xml2js(response);
		//   return jsonData.div.xml.event;
		// } catch (error) {
		//   throw error;
		// }
	}

	const daysInMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		return new Date(year, month, 0).getDate() // get the last date.getMonth() + 1's last date
	}

	const generateMonth = () => {
		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
		const days = daysInMonth(currentDate)
		const startingDay = firstDayOfMonth.getDay() // show the date thorugh number ex) mon => 1
		const calendarArray = []

		//Calculate the starting day of the month
		for (let i = 0; i < startingDay; i++) {
			calendarArray.push({ day: null })
		}

		for (let i = 1; i <= days; i++) {
			calendarArray.push({
				day: i,
				month: currentDate.getMonth() + 1,
				year: currentDate.getFullYear(),
			})
		}

		return calendarArray
	}

	const prevMonth = () => {
		const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		setCurrentDate(newDate)
	}

	const nextMonth = () => {
		const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		setCurrentDate(newDate)
	}

	return (
		<div
			className={'w-full mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-0'}>
			<div className={'flex justify-center items-center bg-primary h-[100px] rounded'}>
				<button onClick={prevMonth} className={'text-4xl text-primary-foreground mx-5'}>
					&lt;
				</button>
				<div className="text-3xl text-primary-foreground">
					{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
				</div>
				<button onClick={nextMonth} className={'text-4xl text-primary-foreground mx-5'}>
					&gt;
				</button>
			</div>
			<EventCalendarFilter setCurrentFilter={setCurrentFilter} />
			<div className={'w-full mt-1'}>
				<div className={'flex'}></div>
				<div className={'grid grid-cols-7 gap-1'}>
					{daysOfWeek.map((item, key) => {
						return (
							<div
								key={key}
								className={
									'text-center text-xl bg-primary text-primary-foreground rounded'
								}>
								{item}
							</div>
						)
					})}
					{generateMonth().map((item: Day_obj, key: number) => {
						return (
							<div
								key={key}
								className="rounded-lg border border-black cursor-pointer max-w-40 h-28 w-full">
								<div className={'bg-slate-200'}>{item?.day}</div>
								<EventList
									dayObj={item}
									currentFilter={currentFilter}
									currentEvent={currentEvent}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

type showStrObj = {
	[key: number]: boolean
}

const EventList = ({ dayObj, currentFilter, currentEvent }: any) => {
	const { logo } = config
	const [showFullStr, setShowFullStr] = useState<showStrObj>({})
	const [filteredEvents, setFilteredEvents] = useState<Cal_event[]>([])

	useEffect(() => {
		const updatedFilteredEvents = currentEvent.filter((item: Cal_event) => {
			const { day, month } = changeStrToDate(item[EVENT_DATE])
			const isMatchingDayMonth = day === dayObj.day && month === dayObj.month
			if (currentFilter.length > 0) {
				return (
					isMatchingDayMonth &&
					currentFilter.some(
						(type: string) => convertLower(type) === convertLower(item[FILTER_TYPE])
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

	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLower(item.type) === convertLower(event_type)
		})
		return `${result[0]?.color} ${result[0]?.icon}`
	}

	const changeStrToDate = (dateString: string) => {
		const dateObject = new Date(dateString)
		const month = dateObject.getMonth() + 1
		const day = dateObject.getDate() + 1

		return { month, day }
	}

	const convertLower = (type: string) => {
		let trimmed = type.trim()
		return trimmed.toLowerCase()
	}

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
						<DialogContent hideClose={'invisible'} className={'p-1'}>
							<DialogHeader>
								<DialogTitle
									className={
										' bg-primary text-primary-foreground h-10 flex items-center justify-around rounded'
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
							<DialogDescription className={'h-24 overflow-auto p-2'}>
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
							className={'h-[500px] overflow-auto p-1 flex flex-col items-center'}
							hideClose={'invisible'}>
							<DialogHeader className={'w-full'}>
								<DialogTitle
									className={
										' bg-primary text-primary-foreground h-10 flex items-center justify-around rounded'
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
									<DialogDescription
										className={`${showFullStr[idx] ? 'h-24' : 'h-10'} overflow-auto p-2`}>
										<>
											{showFullStr[idx] ? (
												<>
													{item[EVENT_DESC]}
													<button
														className={'text-stone-800'}
														onClick={() => showStrToggle(idx)}>
														....Close
													</button>
												</>
											) : (
												<>
													{item[EVENT_DESC]?.substring(0, 10)}
													<button
														className={'text-stone-800'}
														onClick={() => showStrToggle(idx)}>
														....More
													</button>
												</>
											)}
										</>
									</DialogDescription>
								</div>
							))}
							<DialogFooter>
								<DialogPrimitive.Close
									onClick={resetToggleSetting}
									className={
										'bg-primary text-primary-foreground h-10 w-20 flex items-center justify-around rounded'
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

export default EventCalendar
