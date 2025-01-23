import React, { useState, useEffect, useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import archiveIcon from '../../../assets/icons/archive.png'
import libraryIcon from '../../../assets/icons/library.png'
import museumIcon from '../../../assets/icons/museum.png'
import dummy from './dummy_50.json'
import { getImage } from '@/lib/utils'

const Timeline = () => {
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const yearFromIndex = (index: string) =>
	parseInt(index) >= 10000 ? `${parseInt(index) - 10000}` : `${10000 - parseInt(index)} BC`
	const getIconForType = (databaseType: string) => {
		switch (databaseType) {
			case 'Archive':
				return { icon: archiveIcon, bgColor: 'bg-blue-900/70' }
			case 'Library':
				return { icon: libraryIcon, bgColor: 'bg-red-600/70' }
			case 'Museum':
				return { icon: museumIcon, bgColor: 'bg-yellow-400/70' }
		}
	}

	return (
		<div className="w-full bg-gray-100 py-8 px-4 overflow-x-auto">
			<div
				className="w-full relative flex items-center h-32 justify-around">
				<div className="w-full absolute h-[10px] bg-gray-300 left-0 right-0 top-[47%]" />
				{dummy.map((item, key) => {
					const { icon, bgColor }: any = getIconForType(item.DATABASE_TYPE)
					return (
						<div key={key} className="relative flex flex-col items-center mx-8">
							<div className="relative flex flex-col items-center">
								<Popover.Root key={item.sisn}>
									<Popover.Trigger>
										<div
											className={`flex justify-center items-center z-10 w-[40px] h-[40px] rounded-full cursor-pointer transition-transform hover:scale-125 ${bgColor}`}
											onClick={() =>
												setSelectedItem(
													selectedItem === item.sisn ? null : item.sisn
												)
											}>
											<img
												src={icon}
												alt={item.DATABASE_TYPE}
												className={` w-[20px] h-[20px]  `}
											/>
										</div>
									</Popover.Trigger>
									<Popover.Content
										side="top"
										align="center"
										className="p-4 bg-white shadow-lg rounded-lg z-10"
										sideOffset={10}>
										<div key={item.sisn} className="mb-4 w-[300px]">
											<table className="text-sm">
												<tbody>
													{item.IMAG_URL && (
														<tr>
															<img src={getImage(item.IMAG_URL)} />
														</tr>
													)}
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
										<Popover.Arrow className="fill-white" />
									</Popover.Content>
								</Popover.Root>
								<div className="absolute -bottom-10 text-sm whitespace-nowrap">
									{yearFromIndex(item?.TIME_INDEX)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Timeline
