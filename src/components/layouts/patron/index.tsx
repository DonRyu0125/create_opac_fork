import ScrollToTopButton from '@/components/common/ScrollToTop'
import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import useJSONData from '@/hooks/useJSONData'
import clientProfileJSON from '@/constants/en/client-profile.json'
import { getCookieValue } from '@/lib/utils'

type PatronLayoutProps = {
	children?: React.ReactNode
}

const PatronLayout = ({ children }: PatronLayoutProps) => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const profileList = clientProfileJSON.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
			{/* <Sidebar /> */}
			<div className="min-h-screen flex flex-col relative">
				<Header />
				<main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 pb-4">
					<div className="container flex flex-col gap-8 p-6">
						<div className="flex flex-wrap gap-2 sm:gap-4">
							{profileList.map((button) => (
								<a
									key={button.id}
									href={
										getCookieValue('HOME_SESSID') +
										button.url +
										(button.db !== 'SHOWORDERLIST' ? m2l_patron_id : '')
									}
									onClick={() => handleClick(button.id)}
									className={`px-3 py-2 text-sm shadow sm:px-4 sm:py-2 sm:text-base text-accent-foreground bg-white text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>
									{button.label}
								</a>
							))}
						</div>
					</div>
					{children}
				</main>
				<ScrollToTopButton />
			</div>
		</div>
	)
}

export default PatronLayout
