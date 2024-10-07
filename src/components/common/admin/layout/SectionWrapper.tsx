import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string
}

const SectionWrapper = ({ children, className }: Props) => {
	return <div className={cn('rounded border-blue-950 border-2  p-4', className)}>{children}</div>
}

export default SectionWrapper
