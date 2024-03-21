import React, { useState } from 'react'
import { Cal_event, FILTER_TYPE_COLORS } from './EventCalendar'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import CheckboxWithLabel from './CheckboxWithLabel'

interface MyComponentProps {
	setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>
}

type SelectType = {
	[key: string]: number
}

const EventCalendarFilter: React.FC<MyComponentProps> = ({ setCurrentFilter }) => {
	const [selectType, setSelectedType] = useState<SelectType>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.id) return
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
		<div className={'flex flex-wrap w-100 justify-evenly items-center my-2 h-16 overflow-auto'}>
			{FILTER_TYPE_COLORS.map((item, key) => {
				return (
					<div className={'mx-1'}key={key}>
						<CheckboxWithLabel
							label={item.type}
							callback={handleChange}
							checked={selectType[item.type] === 1}
							className={`${item.color} ${item.icon}`}
						/>
					</div>
				)
			})}
			<Button className={'w-5'} onClick={resetFilter}>
				Reset All
			</Button>
		</div>
	)
}

export default EventCalendarFilter
