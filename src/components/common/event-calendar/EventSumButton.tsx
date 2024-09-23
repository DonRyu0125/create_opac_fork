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
	TAG_FUNC_DTE_LIST,
	ContactInfoRSVP,
	FilterType,
	TAG_DB_TYPE,
	EVENT_DEFAULT_COLOR,
} from './Constants'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { CalendarCheck } from 'lucide-react'
import EventButton from './EventButton'
import useConstants from '@/hooks/useConstants'
import { useAtom } from 'jotai'
import { calendarMonthType, calendarWeekType } from '@/store'
import EventCustomDialogContent from './EventCustomDialogContent'
import EventButtonTooltip from './EventButtonTooltip'

export interface eventSumType {
	filteredEvents: Cal_event[]
	contactInfo: ContactInfoRSVP[]
	filterTypes: FilterType[]
	fitlerOption: string
}

const EventSumButton = ({
	filteredEvents,
	contactInfo,
	filterTypes,
	fitlerOption,
}: eventSumType) => {
	const [monthType, __] = useAtom(calendarMonthType)
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
	const message = useConstants().message
	const groupedByType = (filteredEvents: Cal_event[]) => {
		let typeArr: any = {}
		let result = []
		filteredEvents.forEach((classInfo: any) => {
			const type = classInfo[fitlerOption]
			if (!typeArr[type]) {
				typeArr[type] = []
			}
			typeArr[type].push(classInfo)
		})
		result = Object.keys(typeArr).map((item) => {
			return { [fitlerOption]: item, [TAG_FUNC_DTE_LIST]: typeArr[item] }
		})
		return result ?? []
	}
	

	return (
		<>
			{monthType && filterTypes.length > 1 ? (
				<div className={'h-full mb-[2px] overflow-y-auto custom-scrollbar'}>
					{groupedByType(filteredEvents).map((item: any, id: number) => (
						<Dialog key={id}>
							<EventButtonTooltip item={item}>
								<DialogTrigger asChild>
									<Button
										className="h-[20px] border-hidden flex p-0 justify-start"
										variant="outline">
										<div
											className={cn(
												'h-4 w-[16px] border rounded',
												getColor(item[fitlerOption])
											)}
										/>
										<div className="hidden sm:block max-w-[100px] overflow-hidden text-left">
											{item[fitlerOption]}
										</div>
										<div className="flex items-center justify-center">
											<CalendarCheck
												height={18}
												className="hidden sm:block"
											/>
											:<div>{item[TAG_FUNC_DTE_LIST].length}</div>
										</div>
									</Button>
								</DialogTrigger>
							</EventButtonTooltip>
							<DialogContent
								hideClose={'invisible'}
								className={
									'max-h-[90vh] max-w-5xl overflow-y-auto p-1 gap-1 custom-scrollbar'
								}>
								<DialogHeader className={'w-full sticky top-0 bg-white z-10 '}>
									<DialogTitle
										className={
											'bg-primary text-primary-foreground h-10 flex items-center justify-between rounded p-2'
										}>
										<div className="h-8">
											<img className="h-full" src={logo} alt="logo" />
										</div>
										<div className={'flex'}>
											<div
												className={cn(
													'h-4 w-[16px] border rounded mr-1 ',
													getColor(item[fitlerOption])
												)}></div>
											{fitlerOption ? item[fitlerOption] : message.all}
										</div>
										<DialogPrimitive.Close>
											<X className={'h-6 w-6'} />
										</DialogPrimitive.Close>
									</DialogTitle>
								</DialogHeader>
								{item[TAG_FUNC_DTE_LIST]?.map((elm: any, key: number) => (
									<EventCustomDialogContent
										elm={elm}
										contactInfo={contactInfo}
										key={key}
									/>
								))}
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
					))}
				</div>
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
		</>
	)
}

export default EventSumButton
