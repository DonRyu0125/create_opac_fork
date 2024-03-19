import React, { useEffect, useState } from 'react'
import X2JS from 'x2js'
import response from '../../samples/fetch_calendar.json'
import EventCalendarFilter from './EventCalendarFilter'
import { Button } from '../ui/button'

export interface Cal_event {
	'event-date': string
	'event-start'?: string
	'event-end'?: string
	'event-name': string
	'event-desc'?: string
	'event-loc': string
}

export interface Day_obj {
	day: number
	month: number
	year: number
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const FILTER_TYPE = 'event-loc'
export const EVENT_DATE = 'event-date'
export const EVENT_NAME = 'event-name'
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
		type: 'SIMCOE',
		color: COLORS_MAP['ORANGE'],
		icon: ICON_SHAPE_MAP['CIRCLE'],
	},
	{
		type: 'Waterford',
		color: COLORS_MAP['PURPLE'],
		icon: ICON_SHAPE_MAP['SQUARE'],
	},
	{
		type: 'All',
		color: COLORS_MAP['GREY'],
		icon: ICON_SHAPE_MAP['CIRCLE'],
	},
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
		const currE = response
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

		for (let i = 0; i < startingDay; i++) {
			calendarArray.push(0)
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

	const changeStrToDate = (dateString: string) => {
		const dateObject = new Date(dateString)
		const month = dateObject.getMonth() + 1
		const day = dateObject.getDate()

		return { month, day }
	}

	const eventTag = (dayObj: Day_obj) => {
		if (currentFilter.length > 0) {
			return currentEvent.map((item: Cal_event) => {
				return currentFilter.map((type) => {
					if (
						convertLower(type) === convertLower(item[FILTER_TYPE]) &&
						changeStrToDate(item[EVENT_DATE]).day == dayObj.day &&
						changeStrToDate(item[EVENT_DATE]).month == dayObj.month
					) {
						return `${item[EVENT_NAME]?.substring(0, 10)} ${item[FILTER_TYPE]} ${getColor(item[FILTER_TYPE])}`
					}
				})
			})
		} else {
			return currentEvent.map((item: Cal_event) => {
				if (
					changeStrToDate(item[EVENT_DATE]).day == dayObj.day &&
					changeStrToDate(item[EVENT_DATE]).month == dayObj.month
				) {
					return `${item[EVENT_NAME]?.substring(0, 10)} ${item[FILTER_TYPE]} ${getColor(item[FILTER_TYPE])} `
				}
			})
		}
	}

	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLower(item.type) === convertLower(event_type)
		})
		return result[0]?.color
	}

	const convertLower = (type: string) => {
		let trimed = type.trim()
		return trimed.toLowerCase()
	}

	return (
		<div className={'mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'}>
			<div className={'flex justify-center items-center'}>
				<Button onClick={prevMonth}>&lt;</Button>
				<h2 className="text-xl ">
					{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
				</h2>
				<Button onClick={nextMonth}>&gt;</Button>
			</div>
			<EventCalendarFilter setCurrentFilter={setCurrentFilter} />{' '}
			<div className={'w-full mt-1'}>
				<div className={'flex'}></div>
				<div className={'grid grid-cols-7 gap-1'}>
					{daysOfWeek.map((item, key) => {
						return (
							<div key={key} style={{ textAlign: 'right', width: 90 }}>
								{item}
							</div>
						)
					})}
					{generateMonth().map((item: any, key: number) => {
						return (
							<div
								key={key}
								className="rounded-lg border border-black  cursor-pointer  w-screen max-w-40 min-h-40">
								<div>{item.day}</div>
								<div>{eventTag(item)}</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default EventCalendar
