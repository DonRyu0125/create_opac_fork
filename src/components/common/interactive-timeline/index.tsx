import React, { useState, useEffect, useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import archiveIcon from '../../../assets/icons/archive.png'
import libraryIcon from '../../../assets/icons/library.png'
import museumIcon from '../../../assets/icons/museum.png'
import { convertXMLToJson, getImage } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

const Timeline = ({ page }: { page: string }) => {
	const [data, setData] = useState<DataType[]>([])
	const { message, archives, library, museum } = useConstants()
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)
	const [openPopoverId, setOpenPopoverId] = useState<number | null>()
	const scrollContainerRef = useRef<any>(null)
	let count = 0

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		const currentRef = scrollContainerRef.current
		if (!currentRef) return

		const wheelListener = (e: WheelEvent) => e.preventDefault()
		currentRef.addEventListener('wheel', wheelListener, { passive: false })

		return () => currentRef.removeEventListener('wheel', wheelListener)
	}, [])

	const getData = async () => {
		let centuries: any[] = []
		let currentCenturyLabel: string | null = null
		const filePaths = getFilePaths(page)
		let files: DataType[] = []
		try {
			const responses = await Promise.allSettled(filePaths.map((path) => axios.get(path)))
			const validResponses = responses
				.filter((res) => res.status === 'fulfilled' && res.value?.data?.trim())
				.map((res) => (res as PromiseFulfilledResult<any>).value)
			if (validResponses.length === 0) {
				console.warn('All files are empty or invalid.')
			} else {
				validResponses.forEach((response) => {
					const json = convertXMLToJson(response.data)
					json.xml.record = Array.isArray(json.xml.record)
						? json.xml.record
						: [json.xml.record]
					if (json.xml.record) {
						files.push(
							...json.xml.record.map((record: DataType) =>
								Object.fromEntries(
									Object.entries(record).map(([key, value]) => [
										key.toLowerCase(),
										typeof value === 'object' && value !== null ? value : value,
									])
								)
							)
						)
					}
				})
			}
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
					const century = Math.floor((timeIndex - 10000) / 100) * 100
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
		} catch (error) {
			console.error('Error fetching files:', error)
		}
	}

	const getFilePaths = (page: string): string[] => {
		switch (page) {
			case 'library':
				return ['/preprocessing/BIBLIO_WEB_TIMELINE.html']
			case 'museum':
				return ['/preprocessing/COLLECTIONS_WEB_TIMELINE.html']
			case 'archives':
				return ['/preprocessing/DESCRIPTION_WEB_TIMELINE.html']
			case 'home':
				return [
					'/preprocessing/BIBLIO_WEB_TIMELINE.html',
					'/preprocessing/COLLECTIONS_WEB_TIMELINE.html',
					'/preprocessing/DESCRIPTION_WEB_TIMELINE.html',
				]
			default:
				return []
		}
	}

	const getIconForType = (databaseType: string) => {
		switch (databaseType) {
			case 'Archive':
				return {
					icon: archiveIcon,
					bgColor: 'bg-blue-900/80',
					keyName: 'REFD',
					key: 'REFD',
					database: archives.database_name,
					description_keyname: message.description,
					description_key: 'scope',
					title_key: 'title',
				}
			case 'Library':
				return {
					icon: libraryIcon,
					bgColor: 'bg-red-600/90',
					keyName: message.accessionNumber,
					key: 'ACCESSION_NUMBER',
					database: library.database_name,
					description_keyname: message.generalNote,
					description_key: 'gen_note',
					title_key: 'all_title_word_occurrence',
				}
			case 'Museum':
				return {
					icon: museumIcon,
					bgColor: 'bg-yellow-400/90',
					keyName: message.accessionNumber,
					key: 'ACCESSION_NUMBER',
					database: museum.database_name,
					description_keyname: message.description,
					description_key: 'description',
					title_key: 'legal_title',
				}
		}
	}

	const handleMouseDown = (e: { currentTarget: any; pageX: number }) => {
		setIsDragging(true)
		const slider = e.currentTarget
		setStartX(e.pageX - slider.offsetLeft)
		setScrollLeft(slider.scrollLeft)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleWheel = (e: { preventDefault: () => void; deltaY: any }) => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft += e.deltaY
		}
	}

	return (
		<div className="w-full relative md:flex my-2">
			<div className="absolute top-3 right-0 z-40 w-[5px] h-[100px] bg-gray-600" />
			<div className="absolute top-3 left-0 z-40 w-[5px] h-[100px] bg-gray-600" />
			<div className="absolute top-[45%] z-0 w-full h-[7px] bg-gray-400" />
			<div
				ref={scrollContainerRef}
				className="w-full relative flex items-center h-40 justify-around overflow-x-auto px-2 cursor-grab active:cursor-grabbing"
				onMouseDown={handleMouseDown}
				onWheel={handleWheel}>
				{data.map((item: any, idx: number) => {
					if (item.century) {
						count++
						return (
							<div
								key={idx}
								className="z-10 pr-1 mb-[15px] w-[20px] h-[110px] mb-1 mx-1">
								<div className="text-left text-[10px] w-[25px] h-[20px] font-bold bottom-[10px]">
									{count % 2 === 1 && item.century}
								</div>
								<div className="w-[5px] h-[70px] cursor-pointer transition-transform bg-gray-400" />
								<div className="text-left text-[10px] w-[25px] h-[20px] top-[5px] font-bold">
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
						return (
							<div
								key={idx}
								className="relative flex flex-col items-center w-full min-w-[10px]">
								<Popover.Root
									open={openPopoverId === idx}
									onOpenChange={(open) => setOpenPopoverId(open ? idx : null)}>
									<Popover.Trigger
										className="z-10 w-[5px] h-[50px] cursor-pointer hover:scale-150 bg-gray-400 focus:outline-none"
										onMouseEnter={() => setOpenPopoverId(idx)}>
										<div className="w-full h-full" />
									</Popover.Trigger>
									<Popover.Content
										onMouseLeave={() => setOpenPopoverId(null)}
										side="top"
										align="center"
										className="p-4 bg-white shadow-lg rounded-xl z-10 focus:outline-none"
										sideOffset={40}>
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
														className="w-full h-full object-contain rounded-t-lg"
													/>
												</div>
											)}
											<table className="w-full text-sm">
												<tbody>
													<tr className="border-b">
														<td className="font-semibold">Type</td>
														<td>{item.database_type}</td>
													</tr>
													<tr className="border-b">
														<td className="font-semibold">{keyName}</td>
														<td className="max-w-[200px] overflow-x-auto custom-scrollbar whitespace-nowrap">
															{item.id}
														</td>
													</tr>
													<tr className="border-b">
														<td className="font-semibold py-1 pr-2">
															Date
														</td>
														<td>{item.date ?? 'n/a'}</td>
													</tr>
													<tr className="border-b">
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
														<tr className="border-b">
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
