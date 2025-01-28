import React, { useState, useEffect, useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import archiveIcon from '../../../assets/icons/archive.png'
import libraryIcon from '../../../assets/icons/library.png'
import museumIcon from '../../../assets/icons/museum.png'
import dummy from './dummy_100.json'
import { getImage } from '@/lib/utils'
import axios from 'axios'
import X2JS from 'x2js'
import Spinner from '../event-calendar/Spinner'
import useConstants from '@/hooks/useConstants'

interface DataType {
	LEGAL_TITLE: string
	sisn: string
	TIME_INDEX: string
	DATE: string
	ID: string
	DATABASE_TYPE: string
	IMAG_URL: string
	CENTURY?: string
}

const Timeline = ({ DB_TYPE }: { DB_TYPE?: string }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const { message } = useConstants()

	useEffect(() => {
		// fetch_get()
	}, [])

	const fetch_get = async () => {
		setLoading(true)
		const baseURL =
			'/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&APPLICATION=UNION_VIEW&REPORT=WEB_UNION_SUM_TIMELINE&EXP=UNION_TIME_CL%20%40'
		const databaseParam = DB_TYPE ? `&DATABASE=${DB_TYPE}` : ''
		const url = `${baseURL}${databaseParam}`
		try {
			const response = await axios.get(url, {
				headers: {
					Accept: 'application/xml',
				},
				responseType: 'text',
			})

			const x2js = new X2JS()
			const jsonData: any = x2js.xml2js(response.data)

			const records = jsonData?.xml?.record.map((record: DataType) => ({
				...record,
				TIME_INDEX: record.TIME_INDEX.split('--')[0],
			}))
			setData(records)
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error fetching or converting XML:', error.message)
			} else {
				console.error('Unknown error:', error)
			}
		}
		setLoading(false)
	}

	const getIconForType = (databaseType: string) => {
		switch (databaseType) {
			case 'Archive':
				return {
					icon: archiveIcon,
					bgColor: 'bg-blue-900/80',
					keyName: 'REFD',
					key: 'REFD',
					database:'DESCRIPTION_WEB'
				}
			case 'Library':
				return {
					icon: libraryIcon,
					bgColor: 'bg-red-600/90',
					keyName: 'Accession Number',
					key: 'ACCESSION_NUMBER',
					database:'BIBLO_WEB'
				}
			case 'Museum':
				return {
					icon: museumIcon,
					bgColor: 'bg-yellow-400/90',
					keyName: 'Accession Number',
					key: 'ACCESSION_NUMBER',
					database:'COLLECTIONS_WEB'
				}
		}
	}

	function addCenturies(items: any[]) {
		let centuries: any[] = []
		let currentCenturyLabel: string | null = null

		items.forEach((item) => {
			const timeIndex = parseInt(item.TIME_INDEX)
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
				centuries.push({ CENTURY: centuryLabel })
				currentCenturyLabel = centuryLabel
			}

			centuries.push(item)
		})

		return centuries
	}
	let count = 0
	return (
		<div className="w-full relative md:flex my-2">
			{loading && (
				<div className="absolute w-full h-full bg-primary opacity-25" style={{ zIndex: 9 }}>
					<Spinner height={'h-full'} spinHeight={'h-10'} spinWidth={'w-10'} />
				</div>
			)}
			<div className={`absolute top-3 right-0 z-40 w-[5px] h-[100px] bg-gray-600 `}></div>
			<div className={`absolute top-3 left-0 z-40 w-[5px] h-[100px] bg-gray-600 `}></div>
			<div
				className={`w-full relative flex items-center h-36 justify-around overflow-x-auto px-2`}>
				{addCenturies(dummy).map((item: DataType, idx: number) => {
					if (item.CENTURY) {
						count++
						return (
							<div
								className={
									'z-10 pr-1 mb-[15px] w-[20px] h-[110px] flex flex-col justify-between mb-1'
								}>
								<div className="text-left text-xs w-[52px] h-[20px]">
									{count % 2 === 1 && item.CENTURY}
								</div>
								<div
									className={`w-[4px] h-[90px] cursor-pointer transition-transform bg-gray-400 `}></div>
								<div className="text-left text-xs w-[52px] h-[20px] mt-1">
									{count % 2 === 0 && item.CENTURY}
								</div>
							</div>
						)
					} else {
						const { key, keyName,database }: any = getIconForType(item?.DATABASE_TYPE)
						const timeIndex = parseInt(item?.TIME_INDEX)
						return (
							<div
								key={idx}
								className="relative flex flex-col items-center w-full min-w-[10px]">
								<div
									className={`absolute z-0 w-full h-[5px] ${timeIndex >= 10000 ? 'bg-gray-200' : 'bg-gray-300'}  top-[40%]`}
								/>
								<Popover.Root key={item.sisn}>
									<Popover.Trigger
										className={`z-10 w-[5px] h-[50px]  cursor-pointer transition-transform hover:scale-150 bg-gray-400`}></Popover.Trigger>
									<Popover.Content
										side="top"
										align="center"
										className="p-4 bg-white shadow-lg rounded-xl z-10"
										sideOffset={40}>
										<div key={item.sisn} className="mb-4">
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${database}&language=144&REPORT=WEB_UNION_DETAIL&EXP=${key}%20${item.ID}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600 border-b pb-2">
														{item.LEGAL_TITLE ?? 'n/a'}
													</h3>
												</a>
												{item?.IMAG_URL && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={getImage(item.IMAG_URL)}
															alt="Library"
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
															<td>{item.DATABASE_TYPE}</td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold">
																{keyName}
															</td>
															<td>{item.ID}</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																{message.date}
															</td>
															<td>{item.DATE ?? 'n/a'}</td>
														</tr>
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
