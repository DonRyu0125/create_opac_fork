import { cn } from '@/lib/utils'
import React from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = ({ className, children, ...props }: LinkProps) => {
	return (
		<a
			className={cn('underline cursor-pointer text-primary hover:text-opac-green', className)}
			{...props}>
			{children}
		</a>
	)
}

export default Link
