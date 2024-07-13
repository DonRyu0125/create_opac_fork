import Layout from '@/components/layouts'
import PageHeader from '@/components/common/PageHeader'
import useJSONData from '@/hooks/useJSONData'
import AdvanceSearchForm from './AdvancedSearchForm'
import useConstants from '@/hooks/useConstants'

const AdvancedSearch = () => {
	const { database } = useConstants().advancedSearch
	const { message, home } = useConstants()
	const { searchURL: url } = home
	return (
		<Layout>
			<div className={'w-full flex items-center justify-center'}>
				<PageHeader heading={'Advanced Search'} />
			</div>
			<AdvanceSearchForm database_name={database} url={url} />
		</Layout>
	)
}

export default AdvancedSearch
