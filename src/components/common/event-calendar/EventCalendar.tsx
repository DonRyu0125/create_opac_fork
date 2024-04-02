/**
 * Calendar with event filtering function
 *
 * EventCalendar: Main Calendar component
 * Draw the calendar using Date js object
 */
import React, { useEffect, useState } from 'react'
import X2JS from 'x2js'
import response from '../../../samples/fetch_calendar.json'
import EventCalendarFilter from './EventCalendarFilter'
import EventCalendarEventList from './EventCalendarEventList'
import axios from 'axios'
import { Button } from '@/components/ui/button'

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
export const CALENDAR_START_MONTH = 1
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
	{
		type: 'Norview Lodge',
		color: COLORS_MAP['PINK'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
]

const EventCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentEvent, setCurrentEvent] = useState<Cal_event[]>([]);
	const [currentFilter, setCurrentFilter] = useState<string[]>([]);
	const [isClickablePrev, setisClickablePrev] = useState<boolean>(false);
	const [isClickableNext, setisClickableNext] = useState<boolean>(false);

	useEffect(() => {
		getData(currentDate)
		isMonthBtnClick()
	}, [currentDate])

	const getData = async (currentDate: Date) => {
		const currE = await fetch_get(currentDate)
		setCurrentEvent(currE)
	}

	const fetch_get = async (currentDate: Date) => {
		const BASE_URL = 'http://norfolk_test.minisisinc.com'
		const MONTH_REPORT = 'MONTHLY_CALENDAR_TEST02'
		const DATE_FIELD = 'EV_START_DATE'
		const DATE_WILDCARD = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-*`

		try {
			const response = await axios.get(
				`${BASE_URL}/scripts/mwimain.dll/144/M2L_TAG/${MONTH_REPORT}?commandsearch&exp=${DATE_FIELD} ${DATE_WILDCARD}`,
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
			if (Array.isArray(event)) {
				return event
			}
			return [event]
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
				<Button
					onClick={prevMonth}
					className={'text-4xl text-primary-foreground mx-5'}
					disabled={isClickablePrev}>
					<div className="mt-2">&lt;</div>
				</Button>
				<div className="text-3xl text-primary-foreground">
					{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
				</div>
				<Button
					onClick={nextMonth}
					className={'text-4xl text-primary-foreground mx-5'}
					disabled={isClickableNext}>
					<div className="mt-2">&gt;</div>
				</Button>
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
								<EventCalendarEventList
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

export default EventCalendar
