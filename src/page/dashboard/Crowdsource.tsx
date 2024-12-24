import ProfileTable, { ProfileData } from '@/components/common/client-profile/ProfileTable'
import PatronLayout from '@/components/layouts/patron'
import { Button } from '@/components/ui/button'
import clientProfileJSON from '@/constants/en/client-profile.json'
import useJSONData from '@/hooks/useJSONData'
import { getCookieValue } from '@/lib/utils'
import { Checkbox } from '@radix-ui/react-checkbox'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

const Crowdsource = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const profileList = clientProfileJSON.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]

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
			accessorKey: 'comments_date',
			header: 'Date',
			cell: ({ row }) => <div className="capitalize">{row.getValue('comments_date')}</div>,
		},
		{
			accessorKey: 'creator_id',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Creator
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('creator_id')}</div>,
		},
		{
			accessorKey: 'comments_item_id',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Item-ID
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('comments_item_id')}</div>,
		},
		{
			accessorKey: 'comments',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Comment
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('comments')}</div>,
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
				<h1 className="text-2xl font-bold">Crowdsource</h1>

				<ProfileTable
					data={records}
					columns={columns}
					filterType={'comments'}
					filterTypeShow=""
				/>
			</div>
		</PatronLayout>
	)
}

export default Crowdsource
