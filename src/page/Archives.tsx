import AdvanceSearchButton from '@/components/common/advanced-search/AdvancedSearchButton'
import AdvancedSearchForm from '@/components/common/advanced-search/AdvancedSearchForm'
import InterativeMap from '@/components/common/interativeMap'
import HomeSearchForm from '@/components/common/search-form/HomeSearchForm'
import Section from '@/components/common/Section'
import Categories from '@/components/features/Categories'
import FeaturedCollection from '@/components/features/FeaturedCollection'
import RSVPCalendar from '@/components/features/RSVPCalendar'
import useConstants from '@/hooks/useConstants'
import { getSearchURL } from '@/lib/utils'
import { useState } from 'react'
import Hero from '../components/common/Hero'
import Layout from '../components/layouts'
import { MainPageProps, UNION_SEARCH_CL } from './Home'

const Archives = ({ previewMode = false, previewData }: MainPageProps) => {
	const [showAdvSearch, setShowAdvSearch] = useState(false)
	const { message } = useConstants()
	const {
		heroBanner,
		searchURL,
		heading,
		database_name,
		enableFeaturedCollection,
		enableCategoriesItems,
		enableRSVP,
		enableMap,
	} = useConstants().archives
	return (
		<Layout>
			<Hero className={''} title={heading} backgroundImage={heroBanner} description="">
				<div className={'w-full mx-auto flex space-x-4 justify-center mt-6 max-w-2xl'}>
					<HomeSearchForm
						inputName={UNION_SEARCH_CL}
						action={getSearchURL(searchURL)}
						append={<AdvanceSearchButton setShowAdvSearch={setShowAdvSearch} />}
					/>
				</div>
			</Hero>
			{showAdvSearch && (
				<AdvancedSearchForm search_database={database_name} url={getSearchURL(searchURL)} />
			)}
			{enableFeaturedCollection && (
				<FeaturedCollection
					page={'archives'}
					previewData={previewData}
					previewMode={previewMode}
				/>
			)}

			{enableCategoriesItems && (
				<Categories page={'archives'} previewData={previewData} previewMode={previewMode} />
			)}

			{enableRSVP && (
				<RSVPCalendar
					page={'archives'}
					previewData={previewData}
					previewMode={previewMode}
				/>
			)}
			{enableMap && (
				<Section heading={`${message.map}`}>
					<InterativeMap DB_TYPE={'DESCRIPTION_WEB'} />
				</Section>
			)}
		</Layout>
	)
}
export default Archives
