/**
 * EventCalendarEventList: Event list modal button (more than three events, it shows the all event buttons)
 */
import { useEffect, useState } from 'react'
import {
	Cal_event,
	TAG_FUNC_DATE,
	TAG_FUNC_START_T,
	TAG_FUNC_LOC,
	Day_obj,
	ContactInfo,
	FilterType,
} from './Constants'
import { convertLowerTrim } from '@/lib/utils'
import EventSumButton from './EventSumButton'
import EventAllButton from './EventAllButton'
import { calendarMonthType, calendarWeekType } from '@/store'
import { useAtom } from 'jotai'
import EventButton from './EventButton'

export interface Event_list {
	dayObj: Day_obj
	currentFilter: string[]
	currentEvent: Cal_event[]
	weekType: boolean
	contactInfo: ContactInfo[]
	filterTypes: FilterType[]
	fitlerOption: string
}

const EventCalendarEventList = ({
	dayObj,
	currentFilter = [],
	currentEvent,
	contactInfo,
	filterTypes,
	fitlerOption,
}: Event_list) => {
	const [filteredEvents, setFilteredEvents] = useState<Cal_event[]>([])
	const [weekType, _] = useAtom(calendarWeekType)
	const [monthType, __] = useAtom(calendarMonthType)
	useEffect(() => {
		const updatedFilteredEvents = currentEvent?.filter((item: any) => {
			const { day, month, year } = changeStrToDate(item[TAG_FUNC_DATE])
			const isMatchingDayMonth =
				day === dayObj.day && month === dayObj.month && year === dayObj.year
			if (currentFilter.length > 0) {
				return (
					isMatchingDayMonth &&
					currentFilter.some(
						(type: string) =>
							convertLowerTrim(type) === convertLowerTrim(item[fitlerOption])
					)
				)
			}
			return isMatchingDayMonth
		})

		updatedFilteredEvents?.sort((a: Cal_event, b: Cal_event) => {
			const timeA: any = parseTimeString(a[TAG_FUNC_START_T])
			const timeB: any = parseTimeString(b[TAG_FUNC_START_T])
			if (timeA && timeB) {
				return timeA.getTime() - timeB.getTime()
			}
			return 0
		})
		setFilteredEvents(updatedFilteredEvents)
	}, [currentEvent, currentFilter, dayObj])

	const changeStrToDate = (dateString: string) => {
		if (dateString) {
			let date =
				dateString?.split('-').map((part) => parseInt(part.replace(/^0+/, ''), 10)) ?? []
			let day = date[2] ?? 0
			let month = date[1] ?? 0
			let year = date[0] ?? 0
			return { day, month, year }
		}
		return { day: undefined, month: undefined, year: undefined }
	}

	// SMA's time format is 00:00 PM/AM
	// To sort the time shift
	const parseTimeString = (timeString: string) => {
		if (timeString) {
			const [time, meridian] = timeString?.split(' ')
			const [hours, minutes] = time?.split(':').map(Number)
			const meridianUpper = meridian?.toUpperCase()

			let hours24 = hours
			if (meridianUpper === 'PM' && hours !== 12) {
				hours24 += 12
			} else if (meridianUpper === 'AM' && hours === 12) {
				hours24 = 0
			}
			const dateObject = new Date()
			dateObject.setHours(hours24, minutes, 0, 0)
			return dateObject
		}
		return
	}

	return (
		<div className={`${monthType ? 'h-[82%]' : 'h-[98%]'} relative w-full`}>
			<div className={'bg-slate-200 flex justify-between h-[25px]'}>
				<div>{dayObj?.day}</div>
				{filteredEvents.length > 2 && (
					<div>
						<EventAllButton
							filteredEvents={filteredEvents}
							contactInfo={contactInfo}
							filterTypes={filterTypes}
							fitlerOption={fitlerOption}
						/>
					</div>
				)}
			</div>
			{monthType && filterTypes.length > 1 ? (
				<EventSumButton
					filteredEvents={filteredEvents}
					contactInfo={contactInfo}
					filterTypes={filterTypes}
					fitlerOption={fitlerOption}
				/>
			) : (
				<div className={'max-h-[95%] mb-[2px] w-full overflow-y-auto custom-scrollbar'}>
					{filteredEvents.map((item: any, idx: number) => (
						<EventButton
							elm={item}
							key={idx}
							id={idx}
							contactInfo={contactInfo}
							filterTypes={filterTypes}
							fitlerOption={fitlerOption}
						/>
					))}
				</div>
			)}
			{/* {filteredEvents.length > 2 && (
				<div className={'h-[24px] absolute top-0 right-0'}>
					<EventAllButton
						filteredEvents={filteredEvents}
						contactInfo={contactInfo}
						filterTypes={filterTypes}
						fitlerOption={fitlerOption}
					/>
				</div>
			)} */}
		</div>
	)
}

export default EventCalendarEventList
