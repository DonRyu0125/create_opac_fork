import { TreeView } from '@/components/tree-view'
import useJSONData from '@/hooks/useJSONData'
import { deepSearchKey } from '@/lib/record'
import { getJSONTree, TreeNode } from '@/lib/tree'
import { getSessionID } from '@/lib/utils'
import { useEffect, useState } from 'react'
import EmptyState from './empty-state'
import TreeSkeleton from './loading'

const DescriptionTree = ({ show = true }: { show?: boolean }) => {
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

	if (loading) return <TreeSkeleton />
	if (!tree) return <EmptyState />

	return (
		<TreeView
			data={tree}
			initialSelectedItemId={openKeyPath[0]}
			onSelectChange={(item) => {
				console.log({ item })
			}}
		/>
	)
}

export default DescriptionTree
