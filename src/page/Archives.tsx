import useConstants from '@/hooks/useConstants'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/SearchForm'
import Layout from '../components/layouts'
import { SetStateAction, useState } from 'react'
import AdvancedSearchForm from '@/components/common/advanced-search/AdvancedSearchForm'
import { getSearchURL } from '@/lib/utils'
import AdvanceSearchButton from '@/components/common/advanced-search/AdvancedSearchButton'
import { UNION_SEARCH_CL } from './Home'
import Section from '@/components/common/Section'
import EventCalendar from '@/components/common/event-calendar'

const Archives = () => {
	const [showAdvSearch, setShowAdvSearch] = useState(false)
	const { message } = useConstants()
	const { heroBanner, searchURL, title, database_name, rsvp } = useConstants().archives
	return (
		<Layout>
			<Hero className={''} title={title} backgroundImage={heroBanner} description="">
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
					fitlerOption={rsvp.filterOption}
				/>
			</Section>
		</Layout>
	)
}
export default Archives
