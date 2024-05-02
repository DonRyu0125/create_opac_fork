/**
 * EventCalendarEventList: Event list modal button (more than three events, it shows the all event buttons)
 */
import { useEffect, useState } from 'react'
import {
	Cal_event,
	EVENT_DATE,
	EVENT_START_TIME,
	EVENT_TAG_WORD_LENGTH,
	FILTER_TYPE,
	FILTER_TYPE_COLORS,
	EVENT_CAPACITY,
	EVENT_LANG,
	Day_obj,
} from './EventCalendar'
import { convertLowerTrim } from '@/lib/utils'
import EventSumButton from './EventSumButton'
import EventAllButton from './EventAllButton'

export interface Event_list {
	dayObj: Day_obj
	currentFilter: string[]
	currentEvent: Cal_event[]
	weekType:boolean
	monthType:boolean
}

const EventCalendarEventList = ({ dayObj, currentFilter = [], currentEvent, weekType, monthType}: Event_list) => {
	const [filteredEvents, setFilteredEvents] = useState<Cal_event[]>([])

	useEffect(() => {
		const updatedFilteredEvents = currentEvent?.filter((item: Cal_event) => {
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
		<div className={'h-4/5 relative w-full'}>
			{/* Event button */}
			<EventSumButton filteredEvents={filteredEvents} weekType={weekType} monthType={monthType} />
			{/* All events button */}
			{(monthType && filteredEvents.length > 2) && (
				<div className={'h-[20px] absolute bottom-0 w-full'}>
					<EventAllButton filteredEvents={filteredEvents} />
				</div>
			)}
		</div>
	)
}

export default EventCalendarEventList
