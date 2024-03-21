import CheckboxWithLabel from '@/components/common/CheckboxWithLabel'
import CollapseList from '@/components/common/CollapseList'
import DropdownSelect from '@/components/common/DropdownSelect'
import useJSONData from '@/hooks/useJSONData'
import { SummarySample } from '@/samples'
import { Label } from '@radix-ui/react-dropdown-menu'

/**
 * This component contains:
 * - Filter
 * - Number of records per page
 * - Sort
 * - Bookmark
 */
const SummaryPageAction = () => {
	const { filter } = useJSONData({ selector: '#xml_record' })
	// const { filter } = useJSONData({ defaultData: SummarySample })

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-2">
				<Label>Record per page</Label>
				<DropdownSelect title={'Select records number'} options={[]} />
			</div>
			<div className="flex flex-col space-y-2">
				<Label>Sort by</Label>
				<DropdownSelect title={'Sort by'} options={[]} />
			</div>

			{filter && filter.length > 0 && (
				<div className="flex flex-col space-y-2">
					<Label>Filter by</Label>
					<div className="flex flex-col space-y-4">
						{filter.map((item, index) => (
							<CollapseList title={item._title} expand={index === 0} key={item._name}>
								<div className="space-y-3  border-t p-4">
									{item.item_group.map((option) => (
										<CheckboxWithLabel
											callback={() => {
												window.location = option.item_link
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
