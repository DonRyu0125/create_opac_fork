import { useState } from 'react'
import PatronLayout from '@/components/layouts/patron'
import ProfileTable, { ProfileData } from '@/components/common/client-profile/ProfileTable'
import useJSONData from '@/hooks/useJSONData'
import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Checkbox } from '@radix-ui/react-checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { getCookieValue, getHomeSessionID } from '@/lib/utils'
import clientProfileJSON from '@/constants/en/client-profile.json'
import axios from 'axios'
import { encodeURIStringToMinisisSpecialCharacter } from '@/lib/utils'

const Orders = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const profileList = clientProfileJSON.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	let reqData = records
	console.log(reqData)
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}

	const cancelRequest = (reqNumber: string) => {
		var cancelReq_url =
			getCookieValue('HOME_SESSID') +
			'?MANIPXMLRECORD&KEY=REQ_ORDER_NUM&VALUE=' +
			reqNumber +
			'&DATABASE=REQUEST_INFO'
		var xmlForm = '<?xml version="1.0" encoding="UTF-8"?>\n<RECORD>\n'
		xmlForm = xmlForm.concat('<REC_STATUS>Deleted</REC_STATUS>\n')
		axios({
			method: 'post',
			url: cancelReq_url,
			headers: {
				'Content-Type': 'text/xml',
			},
			data: xmlForm,
			timeout: 300000, // 5-minute timeout
		})
			.then((response) => {
				const parser = new DOMParser()
				const xmlDoc = parser.parseFromString(response.data, 'text/xml')
				const errorValue = xmlDoc.querySelector('error')?.textContent

				if (errorValue && parseInt(errorValue, 10) === 0) {
					// Reload the page if the status was successfully changed
					window.location.reload()
				}
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	const columns: ColumnDef<ProfileData>[] = [
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
			accessorKey: 'date_needed',
			header: 'Date',
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue('date_needed') ? row.getValue('date_needed') : 'N/A'}
				</div>
			),
		},
		{
			accessorKey: 'time_needed',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Time
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => (
				<div className="">
					{row.getValue('time_needed') ? row.getValue('time_needed') : 'N/A'}
				</div>
			),
		},
		{
			accessorKey: 'req_status',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Status
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="">{row.getValue('req_status')}</div>,
		},
		{
			accessorKey: 'req_item_id',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Reference No.
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => (
				<div className="underline">
					<a
						href={
							getHomeSessionID() +
							'/' +
							row.getValue('req_db_name') +
							'/' +
							(row.getValue('req_db_name') == 'DESCRIPTION_WEB'
								? 'REFD'
								: 'ACCESSION_NUMBER') +
							'/' +
							encodeURIStringToMinisisSpecialCharacter(row.getValue('req_item_id')) +
							'?JUMP'
						}>
						{row.getValue('req_item_id')}
					</a>
				</div>
			),
		},
		{
			accessorKey: 'req_title',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Title
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="">{row.getValue('req_title')}</div>,
		},
		{
			accessorKey: 'req_paid_amt',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Amount
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="">{row.getValue('req_paid_amt')}</div>,
		},
		{
			accessorKey: 'req_order_num',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Action
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => (
				<div className="">
					{row.getValue('rec_status') === 'Deleted' ? (
						<Button disabled>Cancelled</Button>
					) : row.getValue('req_status') === 'Retrieve' ||
					  row.getValue('req_status') === 'Prepared' ||
					  row.getValue('req_status') === 'Requested' ||
					  row.getValue('req_status') === 'Conservation' ? (
						<Button onClick={() => cancelRequest(row.getValue('req_order_num'))}>
							Cancel
						</Button>
					) : (
						<Button disabled>No Action</Button>
					)}
				</div>
			),
		},
		{
			accessorKey: 'rec_status',
			header: ({ column }) => {
				return <></>
			},
			cell: ({ row }) => <></>,
		},
		{
			accessorKey: 'req_db_name',
			header: ({ column }) => {
				return <></>
			},
			cell: ({ row }) => <></>,
		},
	]
	return (
		<PatronLayout>
			<div className="container flex flex-col gap-8 p-6">
				<div className="flex flex-wrap gap-2 sm:gap-4">
					{profileList.map((button) => (
						<a
							key={button.id}
							href={
								getCookieValue('HOME_SESSID') +
								button.url +
								(button.db !== 'SHOWORDERLIST' ? m2l_patron_id : '')
							}
							onClick={() => handleClick(button.id)}
							className={`px-3 py-2 text-sm shadow sm:px-4 sm:py-2 sm:text-base text-accent-foreground bg-white text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>
							{button.label}
						</a>
					))}
				</div>
				<h1 className="text-2xl font-bold">Orders</h1>

				<ProfileTable
					data={records}
					columns={columns}
					filterType={'req_title'}
					filterTypeShow=""
				/>
			</div>
		</PatronLayout>
	)
}

export default Orders
