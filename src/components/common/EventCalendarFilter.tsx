import React, { useState } from 'react'
import { Cal_event, FILTER_TYPE_COLORS } from './EventCalendar'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'

interface MyComponentProps {
	setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>
	currentEvent: Cal_event[]
}

const EventCalendarFilter: React.FC<MyComponentProps> = ({ setCurrentFilter, currentEvent }) => {
	const [selectType, setSelectedType] = useState<any>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let map = selectType
		if (map[e.target.name] > 0) {
			delete map[e.target.name]
		} else {
			map[e.target.name] = 1
		}

		setSelectedType(map)
		setCurrentFilter(Object.keys(map))
	}

	const showFilter = () => {
		return FILTER_TYPE_COLORS.map((item, key) => {
			return (
				<label
					key={key}
					className="flex items-center text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					<input
						className={cn(
							'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
						)}
						type="checkbox"
						checked={selectType[item.type] === 1}
						onChange={(e) => handleChange(e)}
						name={item.type}
					/>
					<div className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						{item.type}
					</div>
				</label>
			)
		})
	}

	// Put type color at the array
	// Get the type during comparing

	const resetFilter = () => {
		setSelectedType({})
		setCurrentFilter([])
	}

	return (
		<div className={'flex w-100 justify-evenly'}>
			<div className={cn('flex items-center space-x-2')}>{showFilter()}</div>
			<Button onClick={resetFilter}>Reset</Button>
		</div>
	)
}

export default EventCalendarFilter
