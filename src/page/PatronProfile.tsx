import { useState } from 'react'
import PatronLayout from '@/components/layouts/patron'
import useJSONData from '@/hooks/useJSONData'
import clientProfileJSON from '@/constants/en/clientProfile.json'
import { getCookieValue } from '@/lib/utils'
import axios from 'axios'
// import { ClipLoader } from 'react-spinners'

const PatronProfile = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)

	const profileList = clientProfileJSON.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	// Handle button click
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}

	return (
		<PatronLayout>
			<h1 className="text-2xl font-bold mb-4">
				{m2l_patron_id} Welcome, {records[0]?.first_name || 'User'}
			</h1>

			<div className="flex space-x-4">
				{profileList.map((button) => (
					<a
						key={button.id}
						href={getCookieValue('HOME_SESSID') + button.url}
						onClick={() => handleClick(button.id)}
						className={`px-4 py-2 rounded ${
							activeButton === button.id ? 'bg-blue-500 text-white' : 'bg-gray-300'
						}`}>
						{button.label}
					</a>
				))}
			</div>
		</PatronLayout>
	)
}

export default PatronProfile
