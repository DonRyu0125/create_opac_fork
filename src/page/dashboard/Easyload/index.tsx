import PatronLayout from '@/components/layouts/patron'
import MainContent from './MainContent'
import clientProfileJSON from '@/constants/en/client-profile.json'
import { getCookieValue, getPatronID } from '@/lib/utils'
import { useState } from 'react'

const EasyLoad = () => {
	const [activeButton, setActiveButton] = useState(null)
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}
	const m2l_patron_id = getPatronID()

	const profileList = clientProfileJSON.database
	return (
		<PatronLayout>
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
				<h1 className="text-2xl font-bold">Easy Upload</h1>
				<MainContent />
			</div>
		</PatronLayout>
	)
}

export default EasyLoad
