import Layout from '@/components/layouts'
import PageHeader from '@/components/common/PageHeader'
import useJSONData from '@/hooks/useJSONData'
import AdvanceSearchForm from './AdvancedSearchForm'

const AdvancedSearch = () => {
	const { common } = useJSONData({ selector: '#xml_record' })

	return (
		<Layout>
			<div className={'w-full flex items-center justify-center'}>
				<PageHeader heading={'Advanced Search'} />
			</div>
			<AdvanceSearchForm database_name={''} url={''} />
		</Layout>
	)
}

export default AdvancedSearch
