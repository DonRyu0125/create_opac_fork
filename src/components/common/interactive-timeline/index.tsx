import React, { useState, useEffect, useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import archiveIcon from '../../../assets/icons/archive.png'
import libraryIcon from '../../../assets/icons/library.png'
import museumIcon from '../../../assets/icons/museum.png'
import { getImage } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'

interface DataType {
	legal_title: string
	sisn: string
	time_index: string
	date: string
	id: string
	database_type: string
	imag_url: string
	century?: string
	all_title_word_occurrence: string
	accession_number?: string
	refd?: string
	description: string
	title: string
	decimal_latitude: any
	decimal_longitude: any
	origin_country: string
	origin_prv_state: string
	origin_city: string
	gen_note?: string
	author?: string
	pauthor_occurrence?: string
	ca_name_occurrence?: string
}

const Timeline = () => {
	const [data, setData] = useState<DataType[]>([])
	const { message } = useConstants()
	let count = 0
	const biblio_data: any =
		useJSONData({
			selector: '#BIBLIO_WEB_TIMELINE',
		}).data ?? []
	const collection_data: any =
		useJSONData({
			selector: '#COLLECTIONS_WEB_TIMELINE',
		}).data ?? []
	const description_data: any =
		useJSONData({
			selector: '#DESCRIPTION_WEB_TIMELINE',
		}).data ?? []

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		let centuries: any[] = []
		let currentCenturyLabel: string | null = null
		let files = [
			...(biblio_data?.xml?.record || []),
			...(collection_data?.xml?.record || []),
			...(description_data?.xml?.record || []),
		]

		const records = files
			.map((record: DataType) => ({
				...record,
				time_index: record.time_index?.split('--')[0],
			}))
			.sort((a: any, b: any) => a.time_index - b.time_index)

		records.forEach((item) => {
			const timeIndex = parseInt(item.time_index)
			let centuryLabel

			if (timeIndex >= 10000) {
				const century = Math.floor((timeIndex - 10000) / 1000) * 1000
				centuryLabel = century === 0 ? 'AD 0' : `AD ${century}`
			} else {
				const offset = 10000 - timeIndex
				const century = Math.floor(offset / 1000) * 1000
				centuryLabel = `BC ${century + 1000}`
			}

			if (
				centuryLabel !== currentCenturyLabel &&
				!(centuryLabel === 'BC 0' && currentCenturyLabel?.startsWith('BC'))
			) {
				centuries.push({ century: centuryLabel })
				currentCenturyLabel = centuryLabel
			}

			centuries.push(item)
		})

		setData(centuries)
	}

	const getIconForType = (databaseType: string) => {
		switch (databaseType) {
			case 'Archive':
				return {
					icon: archiveIcon,
					bgColor: 'bg-blue-900/80',
					keyName: 'REFD',
					key: 'REFD',
					database: 'DESCRIPTION_WEB',
					description_keyname: 'Description',
					description_key: 'scope',
					title_key: 'title',
				}
			case 'Library':
				return {
					icon: libraryIcon,
					bgColor: 'bg-red-600/90',
					keyName: 'Accession Number',
					key: 'ACCESSION_NUMBER',
					database: 'BIBLO_WEB',
					description_keyname: 'General Note',
					description_key: 'gen_note',
					title_key: 'all_title_word_occurrence',
				}
			case 'Museum':
				return {
					icon: museumIcon,
					bgColor: 'bg-yellow-400/90',
					keyName: 'Accession Number',
					key: 'ACCESSION_NUMBER',
					database: 'COLLECTIONS_WEB',
					description_keyname: 'Description',
					description_key: 'description',
					title_key: 'legal_title',
				}
		}
	}

	return (
		<div className="w-full relative md:flex my-2">
			<div className={`absolute top-3 right-0 z-40 w-[5px] h-[100px] bg-gray-600 `}></div>
			<div className={`absolute top-3 left-0 z-40 w-[5px] h-[100px] bg-gray-600 `}></div>
			<div
				className={`w-full relative flex items-center h-36 justify-around overflow-x-auto custom-scrollbar px-2`}>
				{data.map((item: any, idx: number) => {
					if (item.century) {
						count++
						return (
							<div
								key={idx}
								className={
									'z-10 pr-1 mb-[15px] w-[20px] h-[110px] flex flex-col justify-between mb-1'
								}>
								<div className="text-left text-xs w-[52px] h-[20px]">
									{count % 2 === 1 && item.century}
								</div>
								<div
									className={`w-[4px] h-[90px] cursor-pointer transition-transform bg-gray-400 `}></div>
								<div className="text-left text-xs w-[52px] h-[20px] mt-1">
									{count % 2 === 0 && item.century}
								</div>
							</div>
						)
					} else {
						const {
							title_key,
							key,
							keyName,
							database,
							description_keyname,
							description_key,
						}: any = getIconForType(item?.database_type)
						const timeIndex = parseInt(item?.time_index)
						return (
							<div
								key={idx}
								className="relative flex flex-col items-center w-full min-w-[10px]">
								<div
									className={`absolute z-0 w-full h-[5px] ${timeIndex >= 10000 ? 'bg-gray-200' : 'bg-gray-300'}  top-[40%]`}
								/>
								<Popover.Root key={idx}>
									<Popover.Trigger
										className={`z-10 w-[5px] h-[50px]  cursor-pointer transition-transform hover:scale-150 bg-gray-400`}></Popover.Trigger>
									<Popover.Content
										side="top"
										align="center"
										className="p-4 bg-white shadow-lg rounded-xl z-10"
										sideOffset={40}>
										<div key={idx} className="mb-4">
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${database}&language=144&REPORT=WEB_UNION_DETAIL&EXP=${key}%20${item.id}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600 border-b pb-2">
														{item[title_key] ?? 'n/a'}
													</h3>
												</a>
												{item?.imag_url && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={getImage(item.imag_url)}
															alt="image"
															className="w-full h-full object-contain rounded-t-lg "
														/>
													</div>
												)}
												<table className="w-full text-sm">
													<tbody>
														<tr className="border-b">
															<td className="font-semibold">
																{message.Type}
															</td>
															<td>{item.database_type}</td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold">
																{keyName}
															</td>
															<td className="max-w-[200px] overflow-x-auto custom-scrollbar whitespace-nowrap">
																{item.id}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																{message.date}
															</td>
															<td>{item.date ?? 'n/a'}</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																{description_keyname}
															</td>
															<td>
																<div className="max-h-[150px] overflow-y-auto custom-scrollbar">
																	{item[description_key] ?? 'n/a'}
																</div>
															</td>
														</tr>
														{item?.database_type === 'Library' && (
															<tr>
																<td className="font-semibold py-1 pr-2">
																	Author
																</td>
																<td>
																	{item.pauthor_occurrence ||
																		item.ca_name_occurrence}
																</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>
										</div>
										<Popover.Arrow className="fill-white" />
									</Popover.Content>
								</Popover.Root>
							</div>
						)
					}
				})}
			</div>
		</div>
	)
}

export default Timeline
