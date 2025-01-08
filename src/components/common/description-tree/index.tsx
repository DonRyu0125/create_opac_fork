import { TreeView, TreeDataItem } from '@/components/tree-view'
import { Button } from '@/components/ui/button'
import useJSONData from '@/hooks/useJSONData'
import { deepSearchKey } from '@/lib/record'
import { getJSONTree, TreeNode, TreeResponse } from '@/lib/tree'
import { getSessionID } from '@/lib/utils'
import { Link } from 'lucide-react'
import { useEffect, useState } from 'react'

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

	if (!tree) return null
	return (
		<TreeView
			data={tree}
			initialSelectedItemId={'5'}
			onSelectChange={(item) => {
				console.log({ item })
			}}
		/>
	)
}

export default DescriptionTree
