import { useState } from 'react'
import PatronLayout from '@/components/layouts/patron'
import ProfileTable from '@/components/common/client-profile/ProfileTable'
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
	TAG_FUNC_LOC,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_START_T,
} from '@/components/common/event-calendar/Constants'
import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Checkbox } from '@radix-ui/react-checkbox'
import { ColumnDef } from '@tanstack/react-table'

const Calendar = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const [apiData, setApiData] = useState(null)
	const [loading, setLoading] = useState(false)

	const data: Payment[] = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com',
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'success',
			email: 'Abe45@gmail.com',
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'processing',
			email: 'Monserrat44@gmail.com',
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'success',
			email: 'Silas22@gmail.com',
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'failed',
			email: 'carmella@hotmail.com',
		},
	]

	 type Payment = {
		id: string
		amount: number
		status: 'pending' | 'processing' | 'success' | 'failed'
		email: string
	}

	 const columns: ColumnDef<Payment>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'status',
			header: 'Status2',
			cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
		},
		{
			accessorKey: 'email',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Email
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
		},
		{
			accessorKey: 'amount',
			header: () => <div className="text-right">Amount</div>,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue('amount'))

				// Format the amount as a dollar amount
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(amount)

				return <div className="text-right font-medium">{formatted}</div>
			},
		}
	]

	const getOCCNumber = async (event) => {
		let HOME_SESSID = getSessionID()

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=${TAG_DB}&READ=Y&KEY=${SISN}&VALUE=${sisnNumber}`,
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
			<h1 className="text-2xl font-bold">Calendar</h1>
			<ProfileTable data={data} columns={columns}/>
		</PatronLayout>
	)
}

export default Calendar
 