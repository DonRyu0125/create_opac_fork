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
import ButtonTooltip from './ButtonTooltip'

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
							<ButtonTooltip item={item.list}>
								<DialogTrigger>
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
							</ButtonTooltip>
							<DialogContent
								hideClose={'invisible'}
<<<<<<< HEAD
								className={'max-w-lg h-[500px] overflow-auto p-4 md:max-w-3xl'}>
								<>
									<DialogHeader className={'w-full sticky top-0 bg-white z-10 '}>
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
										<div
											key={key}
											className={
												'w-full text-l sm:flex font-bold p-2 border-2 rounded relative'
											}>
											{elm[TAG_FUNC_CANCEL] && (
												<EventRSVPCancel reason={elm[TAG_FUNC_CAN_RES]} />
											)}
											<div
												className={`w-full ${elm[TAG_FUNC_RSVP] && 'sm:w-8/12'}`}>
												<div className={'overflow-hidden text-lg'}>
													{elm[TAG_NAME]} {elm[TAG_FUNC_CANCEL]}
												</div>
												<div className={'sm:flex'}>
													<div className="ml-[10px] sm:ml-0 text-md text-gray-600 font-bold">
														&#x2022;{elm[TAG_FUNC_DATE]}
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														<span>
															&#x2022;
															{elm[TAG_FUNC_START_T]?.toUpperCase()}
														</span>
														<span className={'mx-2'}>-</span>
														<span>
															{elm[TAG_FUNC_END_T]?.toUpperCase()}
														</span>
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;{message.room}: {elm[TAG_FUNC_ROOM]}
													</div>
												</div>
												<div className={'sm:flex'}>
													<div className="sm:ml-0 ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;{message.suitableFor}:{' '}
														{elm[TAG_FUNC_LOC_AUD]}
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;{message.seats}: {elm[TAG_FUNC_CAP]}
													</div>
													<div className="ml-[10px] text-md text-gray-600 font-bold">
														&#x2022;{message.language}:{' '}
														{elm[TAG_FUNC_LANG]}
													</div>
												</div>
												<DialogDescription
													className={
														'h-[320px] break-all overflow-y-auto'
													}>
													{elm[TAG_FUNC_DESC]}
												</DialogDescription>
											</div>
											{elm[TAG_FUNC_RSVP] && (
												<div className={'w-full sm:w-4/12'}>
													<EventRSVPForm
														capacity={elm[TAG_FUNC_CAP]}
														patrons={convertToArr(elm[PATRON])}
														event={elm}
														sisnNumber={elm[SISN]}
														contactInfo={contactInfo}
													/>
												</div>
											)}
=======
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
>>>>>>> 9b3bcdc51d65c57ab4322be2b66be155ae28f857
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
