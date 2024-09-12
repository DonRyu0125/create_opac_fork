/**
 * EventCalendarFilter: Filter option list buttons at the EventCalendar
 */
import React, { useState } from 'react'
import { FilterType } from './Constants'
import CheckboxWithLabel from '../CheckboxWithLabel'
import { RefreshCw } from 'lucide-react'

interface MyComponentProps {
	setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>
	filterTypes: FilterType[]
}

type SelectType = {
	[key: string]: number
}

const EventCalendarFilter: React.FC<MyComponentProps> = ({ setCurrentFilter,filterTypes}) => {
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
		<div
			className={
				'px-3 relative flex-none sm:flex flex-wrap w-100 justify-start items-center my-2 h-16 overflow-auto'
			}>
			{filterTypes?.map((item, key) => {
				return (
					<div className={'w-[30%] mx-1 my-1'} key={key}>
						<CheckboxWithLabel
							label={item.type}
							callback={handleChange}
							checked={selectType[item.type] === 1}
							className={`${item.color} ${item.icon}`}
						/>
					</div>
				)
			})}
			<button
				className={'absolute right-1 bottom-2 bg-primary h-8 w-8 text-white flex justify-center items-center rounded'}
				onClick={resetFilter}>
				<RefreshCw />
			</button>
		</div>
	)
}

export default EventCalendarFilter
