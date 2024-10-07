// import PatronForm from '@/components/common/patron/PatronForm'
import PatronLayout from '@/components/layouts/patron'
import useJSONData from '@/hooks/useJSONData'
const PatronProfile = () => {
        const { common, pagination, backToSummary, data, records } = useJSONData({ selector: '#xml_record' })
        console.log(records)
	return (
                <PatronLayout>
                        Hi {records[0].first_name},
                </PatronLayout>
	)
}
export default PatronProfile
