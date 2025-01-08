import { TreeView } from '@/components/tree-view'
import useJSONData from '@/hooks/useJSONData'
import { deepSearchKey } from '@/lib/record'
import { getJSONTree, TreeNode } from '@/lib/tree'
import { getSessionID } from '@/lib/utils'
import { useEffect, useState } from 'react'
import EmptyState from './empty-state'
import TreeSkeleton from './loading'

const DescriptionTree = ({
	loading = true,
	tree,
	selectedId,
}: {
	loading: boolean | undefined
	tree: TreeNode | undefined
	selectedId: string | undefined
}) => {
	if (loading) return <TreeSkeleton />
	if (!tree) return <EmptyState />

	return (
		<TreeView
			data={tree}
			initialSelectedItemId={selectedId}
			onSelectChange={(item) => {
				console.log({ item })
			}}
		/>
	)
}

export default DescriptionTree
