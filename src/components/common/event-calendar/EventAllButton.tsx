import React, { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog'
import { Button } from '@/components/ui/button'
import { convertLowerTrim } from '@/lib/utils'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
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
import { config } from '@/constants'
type showStrObj = {
	[key: number]: boolean
}

const EventAllButton = ({ filteredEvents }: { filteredEvents: Cal_event[] }) => {
    const { logo } = config
	const [showFullStr, setShowFullStr] = useState<showStrObj>({})
	const showStrToggle = (key: number) => {
		setShowFullStr((prevShowFullStr) => {
			const updatedShowFullStr = { ...prevShowFullStr }
			updatedShowFullStr[key] = !updatedShowFullStr[key]
			return updatedShowFullStr
		})
	}

	const resetToggleSetting = () => {
		setShowFullStr({})
	}

	const getColor = (event_type: string) => {
		let result = FILTER_TYPE_COLORS?.filter((item) => {
			return convertLowerTrim(item.type) === convertLowerTrim(event_type)
		})
		return `${result[0]?.color} ${result[0]?.icon}`
	}

    


	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className={
						' h-full w-full px-0 absolute bottom-0 flex items-center justify-center overflow-hidden'
					}>
					All {filteredEvents.length} events
				</Button>
			</DialogTrigger>
			<DialogContent
				onPointerDownOutside={resetToggleSetting}
				className={
					'max-w-lg h-[500px] overflow-auto p-1 flex flex-col items-center max-w-l md:max-w-3xl'
				}
				hideClose={'invisible'}>
				<DialogHeader className={'w-full sticky top-0 bg-white z-10 '}>
					<DialogTitle
						className={
							' bg-primary text-primary-foreground h-10 flex items-center justify-between rounded p-2'
						}>
						<div className="h-8">
							<img className="h-full" src={logo} alt="logo" />
						</div>
						<div>All Events</div>
						<DialogPrimitive.Close onClick={resetToggleSetting}>
							<X className={'h-6 w-6'} />
						</DialogPrimitive.Close>
					</DialogTitle>
				</DialogHeader>
				{filteredEvents.map((item: Cal_event, idx: number) => (
					<div key={idx} className={'w-11/12 border-2 rounded'}>
						<DialogTitle
							className={
								'bg-primary text-primary-foreground h-10 flex justify-center items-center rounded'
							}>
							<div className={'flex'}>
								<div
									className={cn(
										'h-4 w-[16px] border rounded mr-1',
										getColor(item[FILTER_TYPE])
									)}></div>
								{item[FILTER_TYPE]}
							</div>
						</DialogTitle>
						<div
							className={
								'w-full text-l w-full flex flex-col justify-center items-left font-bold px-2 '
							}>
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
							</div>
						</div>
						{/* 'More' button to toggle description of the event */}
						<DialogDescription
							className={`${showFullStr[idx] ? 'h-24' : 'h-10'} p-2 break-all overflow-x-hidden overflow-y-auto`}>
							<>
								{showFullStr[idx] ? (
									<>
										{item[EVENT_DESC]}
										<button
											className={'text-slate-950 font-semibold'}
											onClick={() => showStrToggle(idx)}>
											....Close
										</button>
									</>
								) : (
									<>
										{item[EVENT_DESC]?.substring(0, 10)}
										{(item[EVENT_DESC]?.length ?? 0) > 10 && (
											<button
												className={'text-slate-950 font-semibold'}
												onClick={() => showStrToggle(idx)}>
												....More
											</button>
										)}
									</>
								)}
							</>
						</DialogDescription>
					</div>
				))}
				<DialogFooter className={'w-full flex justify-end'}>
					<DialogPrimitive.Close
						onClick={resetToggleSetting}
						className={
							'bg-primary text-primary-foreground h-10 w-20 flex items-center justify-center rounded'
						}>
						Close
					</DialogPrimitive.Close>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EventAllButton
