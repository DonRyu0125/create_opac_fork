import useConstants from '@/hooks/useConstants'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/SearchForm'
import Layout from '../components/layouts'
import { SetStateAction, useState } from 'react'
import { Button } from '@/components/ui/button'
import { TextSearch } from 'lucide-react'
import AdvancedSearchForm from '@/components/common/advanced-search/AdvancedSearchForm'
import { getSearchURL } from '@/lib/utils'
import AdvanceSearchButton from '@/components/common/advanced-search/AdvancedSearchButton'
import { UNION_SEARCH_CL } from './Home'
const Museum = () => {
    const [showAdvSearch, setShowAdvSearch] = useState(false)
	const {
		heroBanner,
		searchURL,
		title,
		database_name
	} = useConstants().museum
	return (
		<Layout>
			<Hero
				className={""}
				title={title}
				backgroundImage={heroBanner}
				description="">
				<div className={'w-full mx-auto flex space-x-4 justify-center mt-6 max-w-2xl'}>
					<SearchForm inputName={UNION_SEARCH_CL} action={getSearchURL(searchURL)} />
					<AdvanceSearchButton setShowAdvSearch={setShowAdvSearch}/>
				</div>
			</Hero>
			{showAdvSearch && (
				<AdvancedSearchForm
					database_name={database_name}
					url={getSearchURL(searchURL)}
				/>
			)}
		</Layout>
	)
}

export default Museum
