import React, { useState } from 'react'
import { Cal_event, FILTER_TYPE_COLORS } from './EventCalendar'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import CheckboxWithLabel from './CheckboxWithLabel'

interface MyComponentProps {
	setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>
}

const EventCalendarFilter: React.FC<MyComponentProps> = ({ setCurrentFilter }) => {
	const [selectType, setSelectedType] = useState<any>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let map = selectType
		if (map[e.target.id] > 0) {
			delete map[e.target.id]
		} else {
			map[e.target.id] = 1
		}
		setSelectedType(map)
		setCurrentFilter(Object.keys(map))
	}

	const resetFilter = () => {
		setSelectedType({})
		setCurrentFilter([])
	}

	return (
		<div className={'flex w-100 justify-evenly'}>
			{FILTER_TYPE_COLORS.map((item, key) => {
				return (
					<CheckboxWithLabel
						key={key}
						label={item.type}
						callback={handleChange}
						checked={selectType[item.type] === 1}
					/>
				)
			})}
			<Button onClick={resetFilter}>Reset</Button>
		</div>
	)
}

export default EventCalendarFilter
