import ScrollToTopButton from '@/components/common/ScrollToTop'
import React from 'react'
import Header from './Header'

type AdminLayoutProps = {
	children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
			<Header />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 grid-cols-1 pb-4">
				{children}
			</main>
			<ScrollToTopButton />
		</div>
	)
}

export default AdminLayout
