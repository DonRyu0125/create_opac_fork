import React, { useState } from 'react'
import { Cal_event, EVENT_COLORS, FILTER_TYPE, FILTER_TYPE_COLORS } from './EventCalendar'

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
		return FILTER_TYPE_COLORS.map((item,key) => {
			return (
				<label key={key} style={{ display: 'flex' }}>
					<input
						type="checkbox"
						checked={selectType[item.type] === 1}
						onChange={(e) => handleChange(e)}
						name={item.type}
					/>
					<div style={{ backgroundColor: `${item.color}` }}>{item.type}</div>
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
		<div>
			<div>{showFilter()}</div>
			<button onClick={resetFilter}>Reset</button>
		</div>
	)
}

export default EventCalendarFilter
