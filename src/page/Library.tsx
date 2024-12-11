import Section from '@/components/common/Section'
import AdvanceSearchButton from '@/components/common/advanced-search/AdvancedSearchButton'
import AdvancedSearchForm from '@/components/common/advanced-search/AdvancedSearchForm'
import EventCalendar from '@/components/common/event-calendar'
import useConstants from '@/hooks/useConstants'
import { getSearchURL } from '@/lib/utils'
import { useState } from 'react'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/search-form/SearchForm'
import Layout from '../components/layouts'
import { UNION_SEARCH_CL } from './Home'

const Library = () => {
	const [showAdvSearch, setShowAdvSearch] = useState(false)
	const { message } = useConstants()
	const { heroBanner, searchURL, heading, database_name, rsvp } = useConstants().library
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
			<Section heading={`${message.calendar}`}>
				<EventCalendar
					databaseType={rsvp.filterDatabase}
					filterTypes={rsvp.filterTypes}
					filterOption={rsvp.filterOption}
				/>
			</Section>
		</Layout>
	)
}

export default Library
