import { useState } from 'react'
import PatronLayout from '@/components/layouts/patron'
import ProfileTable, { ProfileData } from '@/components/common/client-profile/ProfileTable'
import useJSONData from '@/hooks/useJSONData'
import { convertToArr, convertXMLToJson, getCookieValue, getSessionID } from '@/lib/utils'
import axios from 'axios'
import {
	FUNC_LOC_P_GRP,
	MWI_RESFUL_RES,
	MWI_XML_DATA_INDEX,
	SISN,
	TAG_DB,
	TAG_FUNC_DATE,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_END_T,
	TAG_FUNC_LOC,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_START_T,
	TAG_NAME,
} from '@/components/common/event-calendar/Constants'
import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import useConstants from '@/hooks/useConstants'
import { AlertDialog } from '@radix-ui/react-alert-dialog'
import RadixAlertDialog from '@/components/common/RadixAlertDialog'

interface TagFunction {
	[key: string]: any;
}


const Calendar = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [loading, setLoading] = useState(true)
	const message = useConstants().message

	const columns: ColumnDef<ProfileData>[] = [
		{
			accessorKey: TAG_NAME.toLocaleLowerCase(),
			header: message.event,
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue(TAG_NAME.toLocaleLowerCase())}</div>
			),
		},
		{
			accessorKey: TAG_FUNC_DATE.toLocaleLowerCase(),
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						{message.date}
						<CaretSortIcon className="h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue(TAG_FUNC_DATE.toLocaleLowerCase())}</div>
			),
		},
		{
			accessorKey: TAG_FUNC_START_T.toLocaleLowerCase(),
			header: message.start,
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue(TAG_FUNC_START_T.toLocaleLowerCase())}
				</div>
			),
		},
		{
			accessorKey: TAG_FUNC_END_T.toLocaleLowerCase(),
			header: message.end,
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue(TAG_FUNC_END_T.toLocaleLowerCase())}</div>
			),
		},
		{
			accessorKey: TAG_FUNC_LOC.toLocaleLowerCase(),
			header: message.location,
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue(TAG_FUNC_LOC.toLocaleLowerCase())}</div>
			),
		},
		{
			accessorKey: ' ',
			header: '',
			cell: ({ cell }) => {
				return (
					<RadixAlertDialog
						DeleteButton={
							<button
								className="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none hover:bg-red5 focus:shadow-[0_0_0_2px] focus:shadow-red7"
								onClick={() => cancelEvent(cell.row.original,cell.row.original.sisn)}>
								{message.yes} {message.cancel}
							</button>
						}
						InitialButton={<Button variant={'danger'}>{message.cancel}</Button>}
					/>
				)
			},
		},
	]

	const cancelEvent = async (event:TagFunction, sisnValue: number) => {
		console.log('sisnValue', sisnValue)
		console.log('event', event)

		const occ_num = await getOCCNumber(event, sisnValue)

		console.log('-',occ_num)
	}

	const getOCCNumber = async (event:TagFunction, sisnValue: number) => {
		let HOME_SESSID = getSessionID()

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=${TAG_DB}&READ=Y&KEY=${SISN}&VALUE=${sisnValue}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((res) => {
				const conToJson: any = convertXMLToJson(res.data)
				const jsonObj = conToJson[MWI_RESFUL_RES].record
				const loc_group = convertToArr(jsonObj.TAG_FUNC_LOC_GRP)
				const dte_group = convertToArr(loc_group[MWI_XML_DATA_INDEX].TAG_FUNC_DTE_GRP)
				let TAG_FUNC_LOC_OCC = 0
				let TAG_FUNC_DTE_OCC = 0

				loc_group?.forEach((elm) => {
					const funcLoc = elm?.TAG_FUNC_LOC
					if (funcLoc === event[TAG_FUNC_LOC]) {
						TAG_FUNC_LOC_OCC = elm._occ // regards as Occurence number of the repeating field
					}
				})

				dte_group?.forEach((elm) => {
					const funcDate = elm?.TAG_FUNC_DATE
					const funcTimeStart = elm?.TAG_FUNC_START_T
					if (
						funcDate === event[TAG_FUNC_DATE] &&
						funcTimeStart === event[TAG_FUNC_START_T]
					) {
						TAG_FUNC_DTE_OCC = elm._occ
					}
				})

				return { occ1: TAG_FUNC_LOC_OCC, occ2: TAG_FUNC_DTE_OCC }
			})
			.catch((error) => {
				console.error('Getting record error', error)
				return { occ1: 0, occ2: 0 }
			})
	}

	const removeRecord = async (HOME_SESSID: string | boolean, PatronInfo: any) => {
		let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
    <RECORD>
      <${TAG_FUNC_LOC_GRP} occ="${PatronInfo?.occ1}" op="chg">
        <${TAG_FUNC_DTE_GRP} occ="${PatronInfo?.occ2}" op="chg">
          <${FUNC_LOC_P_GRP} op="del" search="${PatronInfo?.TAG_FUNC_P_ID}">
          </${FUNC_LOC_P_GRP}>
        </${TAG_FUNC_DTE_GRP}>
      </${TAG_FUNC_LOC_GRP}>
    </RECORD>`

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=${TAG_DB}&READ=N&KEY=${SISN}&VALUE=${PatronInfo?.SISN}`,
				xmlFormDelete,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((res) => {
				return HOME_SESSID
			})
			.catch((error) => {
				return ''
			})
	}

	return (
		<PatronLayout>
			<h1 className="text-2xl font-bold">{message.calendar}</h1>
			<ProfileTable
				data={records}
				columns={columns}
				filterType={TAG_NAME.toLocaleLowerCase()}
				filterTypeShow={message.event}
			/>
		</PatronLayout>
	)
}

export default Calendar
