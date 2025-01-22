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

const Enquiries = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const [apiData, setApiData] = useState(null)
	const [loading, setLoading] = useState(false)
	const profileList = clientProfileJSON.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	// Handle button click
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
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
			accessorKey: 'enq_id',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Enquiry #
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="capitalize"><a className="font-bold underline" href={getHomeSessionID() + "?changesinglerecord&database=ENQUIRIES_VIEW&DE_FORM=[OPAC_ENQUIRY]de_enquiryreplyform.html&EXP=ENQ_ID%20" + row.getValue('enq_id')}>{row.getValue('enq_id')}</a></div>,
		},
		{
			accessorKey: 'enq_topic',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Topic
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="">{row.getValue('enq_topic')}</div>,
		},
		{
			accessorKey: 'enq_title',
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
			cell: ({ row }) => <div className="">{row.getValue('enq_title')}</div>,
		},
		{
			accessorKey: 'enq_create_date',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Date Created
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="">{row.getValue('enq_create_date')}</div>,
		},
		{
			accessorKey: 'enq_status',
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
			//bg-red-200 text-red-600 - delete
			//bg-green-200 text-green-600 - active
			//bg-orange-200 text-orange-600 - closed
			//bg-blue-200 text-blue-600 - request
			cell: ({ row }) => <div className=""><span className={(row.getValue('enq_status') == "Request" ? "bg-blue-200 text-blue-800" : row.getValue('enq_status') == "Active" ? "bg-green-200 text-green-800" : row.getValue('enq_status') == "Closed" ? "bg-orange-200 text-yellow-800" : row.getValue('enq_status') == "Deleted" ? "bg-red-200 text-red-800" : "") + " font-medium me-2 px-2.5 py-0.5 rounded-full"}>{row.getValue('enq_status')}</span></div>,
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
								(button.db != 'SHOWORDERLIST' ? m2l_patron_id : '')
							}
							onClick={() => handleClick(button.id)}
							className={`px-3 py-2 text-sm shadow sm:px-4 sm:py-2 sm:text-base text-accent-foreground bg-white text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>
							{button.label}
						</a>
					))}
				</div>
				<h1 className="text-2xl font-bold">Enquiries</h1>

				<ProfileTable
					data={records}
					columns={columns}
					filterType={'enquiry'}
					filterTypeShow=""
				/>
			</div>
		</PatronLayout>
	)
}

export default Enquiries
