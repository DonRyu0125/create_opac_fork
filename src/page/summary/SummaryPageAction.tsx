import CheckboxWithLabel from '@/components/common/CheckboxWithLabel'
import CollapseList from '@/components/common/CollapseList'
import DropdownSelect from '@/components/common/DropdownSelect'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { SummarySample } from '@/samples'
import { Label } from '@radix-ui/react-dropdown-menu'
import ViewBookmarks from '../bookmark/ViewBookmarks'

/**
 * This component contains:
 * - Filter
 * - Number of records per page
 * - Sort
 * - Bookmark
 */
const SummaryPageAction = () => {
	const { message } = useConstants()
	const { filter } = useJSONData({ selector: '#xml_record' })
	// const { filter } = useJSONData({ defaultData: SummarySample })
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-2">
				<Label>{message.recordPerPage}</Label>
				<DropdownSelect title={message.selectRecordsNumber} options={[]} />
			</div>
			<div className="flex flex-col space-y-2">
				<Label>{message.sortBy}</Label>
				<DropdownSelect title={message.sortBy} options={[]} />
			</div>
			<div className="flex items-center">
				<Label>{message.bookmark}</Label>
				<div className="flex-grow border-t border-gray-600 ml-[4px]"></div>
			</div>
			<div className="flex flex-col space-y-2">
				<ViewBookmarks/>
				<button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-gray-200">Print this page</button>
				<button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-gray-200">View bookmarks</button>
			</div>
			{filter && filter.length > 0 && (
				<div className="flex flex-col space-y-2">
					<Label>{message.filterBy}</Label>
					<div className="flex flex-col space-y-4">
						{filter.map((item, index) => (
							<CollapseList title={item._title} expand={index === 0} key={item._name}>
								<div className="space-y-3 border-t p-4">
									{item.item_group.map((option) => (
										<CheckboxWithLabel
											callback={() => {
												window.location.href = option.item_link
											}}
											label={`${option.item_value} (${option.item_frequency})`}
											checked={option.item_selected === 'Y'}
										/>
									))}
								</div>
							</CollapseList>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default SummaryPageAction
