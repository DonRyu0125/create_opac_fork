import { TreeView, TreeDataItem } from '@/components/tree-view'

const data: TreeDataItem[] = [
	{
		id: '1',
		name: 'Item 1',
		children: [
			{
				id: '2',
				name: 'Item 1.1',
				children: [
					{
						id: '3',
						name: 'Item 1.1.1',
					},
					{
						id: '4',
						name: 'Item 1.1.2',
					},
				],
			},
			{
				id: '5',
				name: 'Item 1.2',
			},
		],
	},
	{
		id: '6',
		name: 'Item 2',
	},
]

const DescriptionTree = () => {
	return <TreeView  data={data} />
}

export default DescriptionTree
