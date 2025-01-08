import { TreeView, TreeDataItem } from '@/components/tree-view'
import useJSONData from '@/hooks/useJSONData'
import { deepSearchKey } from '@/lib/record'
import { getJSONTree } from '@/lib/tree'
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
	const record = records[0]
	const database = record.database_name
	const refd = deepSearchKey(record, 'refd')[0]
	useEffect(() => {
		const sessionID = getSessionID()
		if (show && sessionID) {
			getJSONTree(sessionID, database, refd)
				.then((res) => {
					let { tree, openKeyPath, noTree } = res
					console.log({ res })
					// setLoading(true)
					// if (noTree) {
					// 	return
					// }
					// setOpenKeyPath(openKeyPath.reverse())
					// setTreeData(tree)
				})
				.then((err) => {})
		}
	}, [database, refd, show])

	return <TreeView data={data} />
}

export default DescriptionTree
