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
	EVENT_BRANCH_NAME_LENGTH,
	EVENT_LIST,
} from './EventCalendar'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { config } from '@/constants'
import { X } from 'lucide-react'
import EventRSVPForm from './EventRSVPForm'

const EventButton = ({ elm, id }: { elm: Cal_event; id: number }) => {
	const { logo } = config

	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLowerTrim(item.type) === convertLowerTrim(event_type)
		})
		return `${result[0]?.color} ${result[0]?.icon}`
	}

	return (
		<Dialog key={id}>
			<DialogTrigger asChild>
				<Button
					className={'w-full h-[95%] border-hidden flex p-0 justify-start '}
					variant="outline">
					<div
						className={cn(
							'h-4 w-[16px] border rounded',
							getColor(elm[FILTER_TYPE])
						)}></div>
					<p className={'w-full h-full hidden sm:block break-all text-left'}>
						{elm[EVENT_NAME]}
					</p>
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
									getColor(elm[FILTER_TYPE])
								)}></div>
							<div>{elm[FILTER_TYPE]}</div>
						</div>
						<DialogPrimitive.Close>
							<X className={'h-6 w-6'} />
						</DialogPrimitive.Close>
					</DialogTitle>
				</DialogHeader>
				<div className={'w-full min-h-[390px] text-l sm:flex font-bold'}>
					<div className={'w-full sm:w-8/12 '}>
						<div className={'overflow-hidden text-lg'}>{elm[EVENT_NAME]}</div>
						<div className={'sm:flex'}>
							<div className="ml-[10px] sm:ml-0 text-md  text-gray-600 font-bold">
								&#x2022;{elm[EVENT_DATE]}
							</div>
							<div className="ml-[10px] text-md text-gray-600 font-bold">
								<span>&#x2022;{elm[EVENT_START_TIME]}</span>
								<span className={'mx-2'}>-</span>
								<span>{elm[EVENT_END_TIME]}</span>
							</div>
							<div className="ml-[10px] text-md text-gray-600 font-bold">
								&#x2022;Room: {elm[EVENT_ROOM]}
							</div>
						</div>
						<div className={'sm:flex'}>
							<div className="sm:ml-0 ml-[10px] text-md text-gray-600 font-bold">
								&#x2022;Suitable for: {elm[EVENT_AGE]}
							</div>
							<div className="ml-[10px] text-md text-gray-600 font-bold">
								&#x2022;Seats: {elm[EVENT_CAPACITY]}
							</div>
							<div className="ml-[10px] text-md text-gray-600 font-bold">
								&#x2022;Language: {elm[EVENT_LANG]}
							</div>
						</div>
						<DialogDescription
							className={
								'h-full max-h-80 break-all overflow-x-hidden overflow-y-auto'
							}>
							{elm[EVENT_DESC]}
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
	)
}

export default EventButton
