import React, { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import dummy from './dummy_50.json'

const Timeline = () => {
	const [selectedItem, setSelectedItem] = useState<string | null>(null)

	const yearFromIndex = (index: number) =>
		index >= 10000 ? index - 10000 : `BC ${10000 - index}`

	const groupedItems = dummy.reduce(
		(acc, item) => {
			const key = Number(item.TIME_INDEX)
			if (!acc[key]) acc[key] = []
			acc[key].push(item)
			return acc
		},
		{} as Record<number, typeof dummy>
	)

	const itemsWithPosition = Object.entries(groupedItems).map(([timeIndex, items]) => ({
		timeIndex: Number(timeIndex),
		position: ((Number(timeIndex) - 9500) / 2500) * 100,
		items,
	}))

	const adjustPositions = (positions) => {
		const spacing = 5
		positions.sort((a, b) => a.position - b.position)
		for (let i = 1; i < positions.length; i++) {
			if (positions[i].position - positions[i - 1].position < spacing) {
				positions[i].position = positions[i - 1].position + spacing
			}
		}
		return positions
	}

	return (
		<div className="w-full bg-gray-100 py-8 px-4 overflow-x-auto ">
			<div className="relative flex items-center h-32 justify-around min-w-[1700px]">
				<div className="absolute h-[10px] bg-gray-300 w-full top-[37%]" />
				{adjustPositions([...itemsWithPosition]).map(({ timeIndex, position, items }) => (
					<div key={timeIndex} className="relative flex flex-col items-center">
						<div className="flex space-x-2">
							{items.map((item, idx) => (
								<Popover.Root>
									<Popover.Trigger >
										<div
											key={item.sisn}
											className={`w-[30px] h-[30px] rounded-full cursor-pointer transition-colors mx-4 ${
												selectedItem === item.sisn
													? 'bg-blue-600'
													: 'bg-blue-400 hover:bg-blue-500 hover:h-[40px] hover:w-[40px] hover:mx-6'
											}`}
											onClick={() =>
												setSelectedItem(
													selectedItem === item.sisn ? null : item.sisn
												)
											}
										/>
										 {yearFromIndex(timeIndex)}
									</Popover.Trigger>
									<Popover.Content
										className="p-4 bg-white shadow-lg rounded-lg z-10"
										sideOffset={10}>
										{items.map((item) => (
											<div key={item.sisn} className="mb-4">
												<table className="text-sm">
													<tbody>
														{item.DATE && (
															<tr>
																<td className="font-semibold pr-2">
																	DATE:
																</td>
																<td>{item.DATE}</td>
															</tr>
														)}
														{item.REFD && (
															<tr>
																<td className="font-semibold pr-2">
																	REFD:
																</td>
																<td>{item.REFD}</td>
															</tr>
														)}
														<tr>
															<td className="font-semibold pr-2">
																DATABASE_TYPE:
															</td>
															<td>{item.DATABASE_TYPE}</td>
														</tr>
													</tbody>
												</table>
												<hr className="my-2 border-gray-200" />
											</div>
										))}
										<Popover.Arrow className="fill-white" />
									</Popover.Content>
								</Popover.Root>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Timeline
