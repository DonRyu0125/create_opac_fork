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
import { cn } from '@/lib/utils'
import { convertLowerTrim } from '@/lib/utils'
import {
	Cal_event,
	EVENT_DATE,
	EVENT_DESC,
	EVENT_END_TIME,
	EVENT_NAME,
	EVENT_ROOM,
	EVENT_AGE,
	EVENT_START_TIME,
	EVENT_TAG_WORD_LENGTH,
	FILTER_TYPE,
	FILTER_TYPE_COLORS,
	EVENT_CAPACITY,
	EVENT_LANG,
} from './EventCalendar'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { config } from '@/constants'
import { X } from 'lucide-react'
import EventRSVPForm from './EventRSVPForm'

const EventDialog = ({ filteredEvents }: { filteredEvents: Cal_event[] }) => {
    const { logo } = config
    
	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLowerTrim(item.type) === convertLowerTrim(event_type)
		})
		return `${result[0]?.color} ${result[0]?.icon}`
	}

	return (
		<div className={'h-3/5 overflow-y-auto mb-[2px] overflow-x-hidden sm:overflow-x-auto'}>
			{filteredEvents.map((item: Cal_event, key: number) => (
				<Dialog key={key}>
					<DialogTrigger asChild>
						<Button
							className={'h-[20px] border-hidden flex p-0 justify-start'}
							variant="outline">
							<div
								className={cn(
									'h-4 w-[16px] border rounded',
									getColor(item[FILTER_TYPE])
								)}></div>
							<div className={'invisible sm:visible max-w-[126px] text-left '}>
								{item[EVENT_NAME]?.substring(0, EVENT_TAG_WORD_LENGTH)}
							</div>
						</Button>
					</DialogTrigger>
					<DialogContent hideClose={'invisible'} className={'max-w-lg md:max-w-3xl'}>
						<DialogHeader>
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
											'h-4 w-[16px] border rounded mr-1',
											getColor(item[FILTER_TYPE])
										)}></div>
									{item[FILTER_TYPE]}
								</div>
								<DialogPrimitive.Close>
									<X className={'h-6 w-6'} />
								</DialogPrimitive.Close>
							</DialogTitle>
						</DialogHeader>
						<div className={'w-full min-h-[390px] text-l sm:flex font-bold'}>
							<div className={'w-full sm:w-8/12 '}>
								<div className={'overflow-hidden text-lg'}>{item[EVENT_NAME]}</div>
								<div className={'sm:flex'}>
									<div className="ml-[10px] sm:ml-0 text-md text-gray-600">
										&#x2022;{item[EVENT_DATE]}
									</div>
									<div className="ml-[10px] text-md text-gray-600">
										&#x2022;{item[EVENT_START_TIME]} -{item[EVENT_END_TIME]}
									</div>
									<div className="ml-[10px] text-md text-gray-600">
										&#x2022;Room: {item[EVENT_ROOM]}
									</div>
								</div>
								<div className={'sm:flex'}>
									<div className="sm:ml-0 ml-[10px] text-md text-gray-600">
										&#x2022;Suitable for: {item[EVENT_AGE]}
									</div>
									<div className="ml-[10px] text-md text-gray-600">
										&#x2022;Seats: {item[EVENT_CAPACITY]}
									</div>
									<div className="ml-[10px] text-md text-gray-600">
										&#x2022;Language: {item[EVENT_LANG]}
									</div>
								</div>
								<DialogDescription
									className={
										'h-full max-h-80 break-all overflow-x-hidden overflow-y-auto'
									}>
									{item[EVENT_DESC]}
								</DialogDescription>
							</div>
							<div className={'w-full sm:w-4/12'}>
								<EventRSVPForm />
							</div>
						</div>
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
	)
}

export default EventDialog
