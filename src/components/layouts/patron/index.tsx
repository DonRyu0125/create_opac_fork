import ScrollToTopButton from '@/components/common/ScrollToTop'
import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

type PatronLayoutProps = {
	children?: React.ReactNode
}

const PatronLayout = ({ children }: PatronLayoutProps) => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
			<Sidebar />
			<div className="min-h-screen flex flex-col sm:gap-4 sm:pt-4 sm:pl-14 relative">
				<Header />
				<main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 pb-4">
					{children}
				</main>
				<ScrollToTopButton />
			</div>
		</div>
	)
}

export default PatronLayout
