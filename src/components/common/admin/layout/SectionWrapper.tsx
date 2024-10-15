import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { ChevronDown, Trash } from 'lucide-react'
import React, { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string
	onRemove?: () => void
	defaultCollapseMode?: boolean
}

const SectionWrapper = ({ children, className, onRemove, defaultCollapseMode = false }: Props) => {
	return (
		<Collapsible defaultOpen={!defaultCollapseMode}>
			<div className={cn('rounded border-blue-950 border-2  p-4', className)}>
				<div className="flex flex-row w-full justify-between">
					<CollapsibleTrigger asChild>
						<Button variant="outline">
							<ChevronDown />
						</Button>
					</CollapsibleTrigger>
					{onRemove && (
						<Button variant="destructive" className="w-min" onClick={onRemove}>
							<Trash className="h-4 w-4 " />
						</Button>
					)}
				</div>
				<CollapsibleContent> {children}</CollapsibleContent>
			</div>
		</Collapsible>
	)
}

export default SectionWrapper
