import useConstants from '@/hooks/useConstants'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/SearchForm'
import Section from '../components/common/Section'
import Slide from '../components/common/Slide'
import ThumbnailCard from '../components/common/ThumbnailCard'
import Layout from '../components/layouts'
import { Card } from '../components/ui/card'
import EventCalendar from '@/components/common/event-calendar/EventCalendar'
import AdvanceSearchButton from './AdvancedSearch/AdvancedSearchButton'

const Description = () => {
	return (
		<Layout>
			<Hero
				className=""
				title={'Search the Description'}
				backgroundImage={'ads'}
				description="">
				<div className={'w-full mx-auto flex space-x-4 justify-center mt-6 max-w-2xl'}>
					<SearchForm inputName={'KEYWORD_CLUSTER'} />
					<AdvanceSearchButton />
				</div>
				{/* <CommandDemo /> */}
			</Hero>
		</Layout>
	)
}
export default Description
