import Hero from '@/components/common/Hero'
import HomeSearchForm from '@/components/common/search-form/HomeSearchForm'
import Layout from '@/components/layouts'
import useConstants from '@/hooks/useConstants'
import { getSearchURL } from '@/lib/utils'
import { UNION_SEARCH_CL } from './Home'

const NoBookmarkRecord = () => {
	const { home, message } = useConstants()
	const { heroBanner, searchURL } = home
	return (
		<Layout>
			<Hero
				className=""
				title={message.noBookmark}
				backgroundImage={heroBanner}
				description="">
				<HomeSearchForm inputName={UNION_SEARCH_CL} action={getSearchURL(searchURL)} />
			</Hero>
		</Layout>
	)
}

export default NoBookmarkRecord
