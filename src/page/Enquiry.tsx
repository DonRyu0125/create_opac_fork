import { useState } from 'react'
import PatronLayout from '@/components/layouts/patron'
import ProfileTable from '@/components/common/client-profile/ProfileTable'
import useJSONData from '@/hooks/useJSONData'
import { getCookieValue } from '@/lib/utils'
import axios from 'axios'

const Enquiry = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const [apiData, setApiData] = useState(null)
	const [loading, setLoading] = useState(false)

	// Handle button click
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}

	const fetchApiData = async (url: string) => {
		setLoading(true)
		try {
			const response = await axios.get(url)
			setApiData(response.data)
		} catch (error) {
			console.error('Error fetching data:', error)
			setApiData(null)
		}
		setLoading(false)
	}

	return (
		<PatronLayout>
			<h1 className="text-2xl font-bold">Enquiries</h1>

			<ProfileTable></ProfileTable>
		</PatronLayout>
	)
}

export default Enquiry
