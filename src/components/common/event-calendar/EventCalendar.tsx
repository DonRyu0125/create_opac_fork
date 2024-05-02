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

export interface Cal_event {
	[EVENT_NAME]: string
	[EVENT_DESC]: string
	[FILTER_TYPE]: string
	[FILTER_TYPE_ID]: string
	[EVENT_FEE]: string
	[EVENT_DATE]: string
	[EVENT_BANNER_TYPE]: string
	[EVENT_AGE]: string
	[EVENT_CAPACITY]: string
	[EVENT_RSVP]: string
	[EVENT_START_TIME]: string
	[EVENT_END_TIME]: string
	[EVENT_ROOM]: string
	[EVENT_LANG]: string
}

export interface Day_obj {
	day: number | null
	month?: number
	year?: number
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const CALENDAR_START_MONTH = 1
export const EVENT_NAME = 'tag-name'
export const EVENT_DESC = 'tag-func-desc'
export const FILTER_TYPE = 'tag-func-loc'
export const FILTER_TYPE_ID = 'tag-func-loc-id'
export const EVENT_FEE = 'tag-func-loc-fee'
export const EVENT_BANNER_TYPE = 'tag-func-loc-banner'
export const EVENT_AGE = 'tag-func-loc-aud'
export const EVENT_DATE = 'tag-func-date'
export const EVENT_START_TIME = 'tag-func-start-t'
export const EVENT_END_TIME = 'tag-func-end-t'
export const EVENT_RSVP = 'tag-func-rsvp'
export const EVENT_CAPACITY = 'tag-func-cap'
export const EVENT_ROOM = 'tag-func-room'
export const EVENT_LANG = 'tag-func-lang'
export const EVENT_LIST = 'list'

const dummy = [
	{
		[EVENT_NAME]: 'Korean cooking class',
		[EVENT_DESC]:
			'Chow mein is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of chǎomiàn were developed in many regions of China; there are several methods of frying the noodles and a range of toppings can be used.[1][failed verification] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad.[2] It is particularly popular in India,[3] Nepal,[4] the UK,[5] and the US.',
		[FILTER_TYPE]: 'PORT DOVER BRANCH',
		[FILTER_TYPE_ID]: 'Delhi',
		[EVENT_FEE]: 22,
		[EVENT_BANNER_TYPE]: 'banner1',
		[EVENT_AGE]: 'Young Adult',
		[EVENT_CAPACITY]: 40,
		[EVENT_RSVP]: 'X',
		[EVENT_DATE]: '2024-04-22',
		[EVENT_START_TIME]: '9:00 am',
		[EVENT_END_TIME]: '10:00 am',
		[EVENT_ROOM]: '105',
	},
	{
		[EVENT_NAME]: 'Korean2 cooking class',
		[EVENT_DESC]:
			'Chow mein is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of chǎomiàn were developed in many regions of China; there are several methods of frying the noodles and a range of toppings can be used.[1][failed verification] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad.[2] It is particularly popular in India,[3] Nepal,[4] the UK,[5] and the US.',
		[FILTER_TYPE]: 'PORT DOVER BRANCH',
		[FILTER_TYPE_ID]: 'Delhi',
		[EVENT_FEE]: 22,
		[EVENT_BANNER_TYPE]: 'banner1',
		[EVENT_AGE]: 'Young Adult',
		[EVENT_CAPACITY]: 40,
		[EVENT_RSVP]: 'X',
		[EVENT_DATE]: '2024-04-22',
		[EVENT_START_TIME]: '9:00 am',
		[EVENT_END_TIME]: '10:00 am',
		[EVENT_ROOM]: '105',
	},
	{
		[EVENT_NAME]: 'Korean4 cooking class',
		[EVENT_DESC]:
			'Chow mein is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of chǎomiàn were developed in many regions of China; there are several methods of frying the noodles and a range of toppings can be used.[1][failed verification] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad.[2] It is particularly popular in India,[3] Nepal,[4] the UK,[5] and the US.',
		[FILTER_TYPE]: 'Delhi BRANCH',
		[FILTER_TYPE_ID]: 'Delhi',
		[EVENT_FEE]: 22,
		[EVENT_BANNER_TYPE]: 'banner1',
		[EVENT_AGE]: 'Young Adult',
		[EVENT_CAPACITY]: 40,
		[EVENT_RSVP]: 'X',
		[EVENT_DATE]: '2024-04-22',
		[EVENT_START_TIME]: '9:00 am',
		[EVENT_END_TIME]: '10:00 am',
		[EVENT_ROOM]: '105',
	},
	{
		[EVENT_NAME]: 'Korean5 cooking class',
		[EVENT_DESC]:
			'Chow mein is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of chǎomiàn were developed in many regions of China; there are several methods of frying the noodles and a range of toppings can be used.[1][failed verification] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad.[2] It is particularly popular in India,[3] Nepal,[4] the UK,[5] and the US.',
		[FILTER_TYPE]: 'Delhi BRANCH',
		[FILTER_TYPE_ID]: 'Delhi',
		[EVENT_FEE]: 22,
		[EVENT_BANNER_TYPE]: 'banner1',
		[EVENT_AGE]: 'Young Adult',
		[EVENT_CAPACITY]: 40,
		[EVENT_RSVP]: 'X',
		[EVENT_DATE]: '2024-04-22',
		[EVENT_START_TIME]: '9:00 am',
		[EVENT_END_TIME]: '10:00 am',
		[EVENT_ROOM]: '105',
	},
	{
		[EVENT_NAME]: 'Korean5 cooking class sadasgsd32re32e this ie kimchi soy sauce beef',
		[EVENT_DESC]:
			'Chow mein is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of chǎomiàn were developed in many regions of China; there are several methods of frying the noodles and a range of toppings can be used.[1][failed verification] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad.[2] It is particularly popular in India,[3] Nepal,[4] the UK,[5] and the US.',
		[FILTER_TYPE]: 'Port Rowan',
		[FILTER_TYPE_ID]: 'Port Rowan',
		[EVENT_FEE]: 22,
		[EVENT_BANNER_TYPE]: 'banner1',
		[EVENT_AGE]: 'Young Adult',
		[EVENT_CAPACITY]: 40,
		[EVENT_RSVP]: 'X',
		[EVENT_DATE]: '2024-04-20',
		[EVENT_START_TIME]: '9:00 am',
		[EVENT_END_TIME]: '10:00 am',
		[EVENT_ROOM]: '105',
	},
	{
		[EVENT_NAME]: 'Korean5 cooking class sadasgsd32re32e this ie kimchi soy sauce beef',
		[EVENT_DESC]:
			'Chow mein is a dish of Chinese stir-fried noodles with vegetables and sometimes meat or tofu. Over the centuries, variations of chǎomiàn were developed in many regions of China; there are several methods of frying the noodles and a range of toppings can be used.[1][failed verification] It was introduced in other countries by Chinese immigrants.[1] The dish is popular throughout the Chinese diaspora and appears on the menus of most Chinese restaurants abroad.[2] It is particularly popular in India,[3] Nepal,[4] the UK,[5] and the US.',
		[FILTER_TYPE]: 'Port Rowan',
		[FILTER_TYPE_ID]: 'Port Rowan',
		[EVENT_FEE]: 22,
		[EVENT_BANNER_TYPE]: 'banner1',
		[EVENT_AGE]: 'Young Adult',
		[EVENT_CAPACITY]: 40,
		[EVENT_RSVP]: 'X',
		[EVENT_DATE]: '2024-04-20',
		[EVENT_START_TIME]: '9:00 am',
		[EVENT_END_TIME]: '10:00 am',
		[EVENT_ROOM]: '105',
	},
]

export const EVENT_BRANCH_NAME_LENGTH = -7
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
		type: 'Norview Lodge',
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
		// console.log('currE',currE)

		setCurrentEvent(dummy)
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
		const BASE_URL = 'http://norfolk_test.minisisinc.com'
		const MONTH_REPORT = 'MONTHLY_CALENDAR_NEW_T4'
		const DATE_FIELD = 'TAG_FUNC_DATE'
		const DATE_WILDCARD = '%222024-04-%2A%22'
		//`${currentDate.getFullYear()}%2D0${currentDate.getMonth() + 1}%2D%2A`

		try {
			const response = await axios.get(
				`${BASE_URL}/scripts/mwimain.dll/144/M2L_TAG/${MONTH_REPORT}?commandsearch&exp=${DATE_FIELD} 2024-04-`,
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

	const generateWeek = () => {
		const weekArray = []
		let firstDayOfWeek = new Date()
		firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

		for (let i = 0; i < 7; i++) {
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
					{monthType && currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
					{weekType && showWeek()}
				</div>
				<Button
					onClick={weekType ? nextWeek : nextMonth}
					className={'text-4xl text-primary-foreground mx-5'}
					disabled={isClickableNext}>
					<div className="mt-2">&gt;</div>
				</Button>
				<div className={'sm:absolute bottom-2 sm:right-10'}>
					<Button className={'bg-black text-primary-foreground rounded mx-1 hover:bg-black'} onClick={showMonthView}>
						Month
					</Button>
					<Button className={'bg-black text-primary-foreground rounded hover:bg-black'} onClick={showWeekView}>Week</Button>
				</div>
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
					{monthType && generateMonth().map((item: Day_obj, key: number) => {
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
					{weekType && generateWeek().map((item: Day_obj, key: number) => {
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
