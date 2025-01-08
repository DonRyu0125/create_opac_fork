import { TreeView, TreeDataItem } from '@/components/tree-view'
import useJSONData from '@/hooks/useJSONData'
import { deepSearchKey } from '@/lib/record'
import { getJSONTree, TreeNode, TreeResponse } from '@/lib/tree'
import { getSessionID } from '@/lib/utils'
import { useEffect, useState } from 'react'

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

const DescriptionTree = ({ show = true }: { show: boolean }) => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [loading, setLoading] = useState(true)
	const [tree, setTree] = useState<TreeNode | undefined>()

	const [openKeyPath, setOpenKeyPath] = useState<string[]>([])
	const record = records[0]
	const database = record.database_name
	const refd = deepSearchKey(record, 'refd')[0]
	useEffect(() => {
		const sessionID = getSessionID()
		if (show && sessionID) {
			getJSONTree(sessionID, database, refd)
				.then((res) => {
					if (!res || res.noTree) {
						return
					}
					const { tree, openKeyPath } = res

					setTree(tree)

					setOpenKeyPath(openKeyPath.reverse())
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [database, refd, show])

	console.log({ tree })

	return (
		<TreeView
			data={data}
			initialSelectedItemId={'5'}
			onSelectChange={(item) => {
				console.log({ item })
			}}
		/>
	)
}

export default DescriptionTree
