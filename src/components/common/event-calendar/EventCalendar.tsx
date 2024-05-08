/**
 * Calendar with event filtering function
 *
 * EventCalendar: Main Calendar component
 * Draw the calendar using Date js object
 */
import React, { useEffect, useState } from 'react'
import X2JS from 'x2js'
import EventCalendarFilter from './EventCalendarFilter'
import EventCalendarEventList from './EventCalendarEventList'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { convertToArr } from '@/lib/utils'

export interface Cal_event {
	[TAG_NAME]: string
	[TAG_FUNC_DESCIPT]: string
	[TAG_FUNC_LOC]: string
	[TAG_FUNC_LOC_ID]: string
	[TAG_FUNC_LOC_FEE]: string
	[TAG_FUNC_DATE]: string
	[TAG_FUNC_LOC_BAN]: string
	[TAG_FUNC_LOC_AUD]: string
	[TAG_FUNC_CAP]: number
	[TAG_FUNC_RSVP]: string
	[TAG_FUNC_START_T]: string
	[TAG_FUNC_END_T]: string
	[TAG_FUNC_ROOM]: string
	[TAG_FUNC_LANG]: string
	[PATRON]: patron[]
}

export interface patron {
	[PATRON]: string
	[TAG_FUNC_P_ID]: string
	[TAG_FUNC_P_FIRST]: string
	[TAG_FUNC_P_LAST]: string
	[TAG_FUNC_P_EMAIL]: string
	[TAG_FUNC_P_PAID]: string
	[TAG_FUNC_P_ATTND]: string
}


export interface Day_obj {
	day: number | null
	month?: number
	year?: number
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const CALENDAR_START_MONTH = 1
export const CALENDAR_WEEK_VIEW_DAYS = 7
export const TAG_NAME = 'TAG_NAME'
//Location group
export const TAG_FUNC_LOC_GRP = 'TAG_FUNC_LOC_GRP'
export const TAG_FUNC_DESCIPT = 'TAG_FUNC_DESCIPT'
export const TAG_FUNC_LOC = 'TAG_FUNC_LOC'
export const TAG_FUNC_LOC_ID = 'TAG_FUNC_LOC_ID'
export const TAG_FUNC_LOC_FEE = 'TAG_FUNC_LOC_FEE'
export const TAG_FUNC_LOC_BAN = 'TAG_FUNC_LOC_BAN'
export const TAG_FUNC_LOC_AUD = 'TAG_FUNC_LOC_AUD'
//Event group by location
export const TAG_FUNC_DTE_GRP = 'TAG_FUNC_DTE_GRP'
export const TAG_FUNC_DATE = 'TAG_FUNC_DATE'
export const TAG_FUNC_START_T = 'TAG_FUNC_START_T'
export const TAG_FUNC_END_T = 'TAG_FUNC_END_T'
export const TAG_FUNC_RSVP = 'TAG_FUNC_RSVP'
export const TAG_FUNC_CAP = 'TAG_FUNC_CAP'
export const TAG_FUNC_ROOM = 'TAG_FUNC_ROOM'
export const TAG_FUNC_LANG = 'TAG_FUNC_LANG'
//Patron group by event
export const FUNC_LOC_P_GRP = 'FUNC_LOC_P_GRP' 
export const PATRON = 'PATRON'
export const TAG_FUNC_P_ID = 'TAG_FUNC_P_ID'
export const TAG_FUNC_P_FIRST = 'TAG_FUNC_P_FIRST'
export const TAG_FUNC_P_LAST = 'TAG_FUNC_P_LAST'
export const TAG_FUNC_P_EMAIL = 'TAG_FUNC_P_EMAIL'
export const TAG_FUNC_P_PAID = 'TAG_FUNC_P_PAID'
export const TAG_FUNC_P_ATTND = 'TAG_FUNC_P_ATTND'
export const EVENT_RSVP_YES = 'X'
//Others
export const TAG_FUNC_P_ATTND_DEFAULT = 1
export const TAG_FUNC_P_ATTND_MAX = 4
export const TAG_FUNC_DTE_LIST = 'list'
export const TAG_FUNC_LOC_LENGTH = -7
export const TAG_NAME_LENGTH = 18
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
		type: 'Delhi BRANCH',
		color: COLORS_MAP['RED'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	{
		type: 'PORT DOVER BRANCH',
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
	{
		type: 'NORVIEW LODGE SITE',
		color: COLORS_MAP['PINK'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
]

const EventCalendar = () => {
	const [monthType, setMonthType] = useState<boolean>(true)
	const [weekType, setWeekType] = useState<boolean>(false)
	const [currentDate, setCurrentDate] = useState(new Date())
	const [currentEvent, setCurrentEvent] = useState<Cal_event[]>([])
	const [currentFilter, setCurrentFilter] = useState<string[]>([])
	const [isClickablePrev, setisClickablePrev] = useState<boolean>(false)
	const [isClickableNext, setisClickableNext] = useState<boolean>(false)

	useEffect(() => {
		getData(currentDate)
		isMonthBtnClick()
	}, [currentDate])

	const getData = async (currentDate: Date) => {
		const currE = await fetch_get(currentDate)
		setCurrentEvent(currE)
	}

	const showMonthView = () => {
		setMonthType(true)
		setWeekType(false)
	}

	const showWeekView = () => {
		setWeekType(true)
		setMonthType(false)
	}

	const fetch_get = async (currentDate: Date) => {
		const MONTH_REPORT = 'MONTHLY_CALENDAR_NEW_T4'
		const DATE_FIELD = 'TAG_FUNC_DATE'
		const DATE_WILDCARD = `${currentDate.getFullYear()}%2D0${currentDate.getMonth() + 1}%2D%2A`

		try {
			const response = await axios.get(
				`/scripts/mwimain.dll/144/M2L_TAG/${MONTH_REPORT}?commandsearch&exp=${DATE_FIELD} ${DATE_WILDCARD}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
				}
			)
			const x2js = new X2JS()
			const jsonData: any = x2js.xml2js(response.data)
			const event = jsonData?.div?.xml?.event

			if (!event) return []
			return convertToArr(event)
		} catch (error) {
			throw error
		}
	}

	const isMonthBtnClick = () => {
		const currentYear = new Date().getFullYear()
		let next_next_year = currentYear + 2

		if (currentDate.getFullYear() >= next_next_year) {
			setisClickableNext(true)
		} else if (
			currentDate.getMonth() + 1 === CALENDAR_START_MONTH &&
			currentDate.getFullYear() === currentYear
		) {
			setisClickablePrev(true)
		} else {
			setisClickablePrev(false)
			setisClickableNext(false)
		}
	}

	/**
	 *
	 * @param date
	 * @returns Date objects by the month
	 */
	const daysInMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		return new Date(year, month, 0).getDate() // get the last date.getMonth() + 1's last date
	}
	/**
	 *
	 * @returns date objects by month
	 */
	const generateMonth = () => {
		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
		const days = daysInMonth(currentDate)
		const startingDay = firstDayOfMonth.getDay() // show the date thorugh number ex) mon => 1
		const calendarArray = []

		//Calculate the starting day of the month
		//2024 Mar start with Friday so before the staring date store null to not show the date at the calendar
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

	const generateWeek = () => {
		const weekArray = []
		let firstDayOfWeek = new Date(currentDate)
		firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

		for (let i = 0; i < CALENDAR_WEEK_VIEW_DAYS; i++) {
			const day = new Date(firstDayOfWeek)
			day.setDate(day.getDate() + i)
			weekArray.push({
				day: day.getDate(),
				month: currentDate.getMonth() + 1,
				year: currentDate.getFullYear(),
			})
		}

		return weekArray
	}

	const nextWeek = () => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate() + 7
		)
		setCurrentDate(newDate)
	}

	const prevWeek = () => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate() - 7
		)
		setCurrentDate(newDate)
	}

	const prevMonth = () => {
		const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		setCurrentDate(newDate)
	}

	const nextMonth = () => {
		const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		setCurrentDate(newDate)
	}

	const showWeek = () => {
		let firstDayOfWeek = new Date(currentDate)
		firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
		let nextDay = new Date(
			firstDayOfWeek.getFullYear(),
			firstDayOfWeek.getMonth(),
			firstDayOfWeek.getDate() + 6
		)

		return `${currentDate.getFullYear()} ${firstDayOfWeek.toLocaleString('default', { month: 'short' })} ${firstDayOfWeek.getDate()}th ~  ${nextDay.toLocaleString('default', { month: 'short' })} ${nextDay.getDate()}th`
	}

	return (
		<div
			className={'w-full mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-0'}>
			<div
				className={
					'flex justify-center items-center bg-primary h-[100px] rounded relative'
				}>
				<Button
					onClick={weekType ? prevWeek : prevMonth}
					className={'text-4xl text-primary-foreground mx-5'}
					disabled={isClickablePrev}>
					<div className="mt-2">&lt;</div>
				</Button>
				<div className="text-3xl text-primary-foreground">
					{monthType &&
						currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
					{weekType && showWeek()}
				</div>
				<Button
					onClick={weekType ? nextWeek : nextMonth}
					className={'text-4xl text-primary-foreground mx-5'}
					disabled={isClickableNext}>
					<div className="mt-2">&gt;</div>
				</Button>
				<div className={'sm:absolute bottom-2 sm:right-10'}>
					<Button
						className={'bg-black text-primary-foreground rounded mx-1 hover:bg-black'}
						onClick={showMonthView}>
						Month
					</Button>
					<Button
						className={'bg-black text-primary-foreground rounded hover:bg-black'}
						onClick={showWeekView}>
						Week
					</Button>
				</div>
			</div>
			<EventCalendarFilter setCurrentFilter={setCurrentFilter} />
			<div className={'w-full mt-1'}>
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
					{monthType &&
						generateMonth().map((item: Day_obj, key: number) => {
							return (
								<div
									key={key}
									className="rounded-lg border border-black cursor-pointer max-w-40 h-28 w-full">
									<div className={'bg-slate-200'}>{item?.day}</div>
									<EventCalendarEventList
										dayObj={item}
										currentFilter={currentFilter}
										currentEvent={currentEvent}
										monthType={monthType}
										weekType={weekType}
									/>
								</div>
							)
						})}
					{weekType &&
						generateWeek().map((item: Day_obj, key: number) => {
							return (
								<div
									key={key}
									className="rounded-lg border border-black cursor-pointer max-w-40 h-96 w-full">
									<div className={'bg-slate-200'}>{item?.day}</div>
									<EventCalendarEventList
										dayObj={item}
										currentFilter={currentFilter}
										currentEvent={currentEvent}
										monthType={monthType}
										weekType={weekType}
									/>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default EventCalendar
