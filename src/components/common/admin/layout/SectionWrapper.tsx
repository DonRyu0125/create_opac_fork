import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Trash } from 'lucide-react'
import React, { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string
	onRemove?: () => void
}

const SectionWrapper = ({ children, className, onRemove }: Props) => {
	return (
		<div className={cn('rounded border-blue-950 border-2  p-4', className)}>
			<div className="flex flex-col w-full items-end">
				{onRemove && (
					<Button className="w-min" onClick={onRemove}>
						<Trash className="h-4 w-4 " />
					</Button>
				)}
			</div>
			{children}
		</div>
	)
}

export default SectionWrapper
