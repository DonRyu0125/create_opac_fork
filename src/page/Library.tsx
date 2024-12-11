import useConstants from '@/hooks/useConstants'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/search-form/SearchForm'
import Layout from '../components/layouts'
import { SetStateAction, useState } from 'react'
import AdvancedSearchForm from '@/components/common/advanced-search/AdvancedSearchForm'
import { getSearchURL } from '@/lib/utils'
import AdvanceSearchButton from '@/components/common/advanced-search/AdvancedSearchButton'
import { UNION_SEARCH_CL } from './Home'
import Section from '@/components/common/Section'
import EventCalendar from '@/components/common/event-calendar'
import InterativeMap from '@/components/common/interativeMap'

const Library = () => {
	const [showAdvSearch, setShowAdvSearch] = useState(false)
	const { message } = useConstants()
	const { heroBanner, searchURL, heading, database_name, rsvp, enableRSVP,enableMap } =
		useConstants().library
	return (
		<Layout>
			<Hero className={''} title={heading} backgroundImage={heroBanner} description="">
				<div className={'w-full mx-auto flex space-x-4 justify-center mt-6 max-w-2xl'}>
					<SearchForm inputName={UNION_SEARCH_CL} action={getSearchURL(searchURL)} />
					<AdvanceSearchButton setShowAdvSearch={setShowAdvSearch} />
				</div>
			</Hero>
			{showAdvSearch && (
				<AdvancedSearchForm search_database={database_name} url={getSearchURL(searchURL)} />
			)}
			{enableRSVP && (
				<Section heading={`${message.calendar}`}>
					<EventCalendar
						databaseType={rsvp.filterDatabase}
						filterTypes={rsvp.filterTypes}
						filterOption={rsvp.filterOption}
					/>
				</Section>
			)}
			{enableMap && (
				<Section heading={`${message.map}`}>
					<InterativeMap DB_TYPE={'BIBLIO_WEB'} />
				</Section>
			)}
		</Layout>
	)
}

export default Library
