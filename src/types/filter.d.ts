export interface ItemGroup {
	item_value: string
	item_frequency: string
	item_link: string
	item_selected: 'Y' | 'N'
}

export interface FilterItem {
	item_group: ItemGroup[]
	_name: string
	_title: string
}
