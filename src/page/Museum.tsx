import useConstants from '@/hooks/useConstants'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/search-form/SearchForm'
import Layout from '../components/layouts'
import { SetStateAction, useState } from 'react'
import AdvancedSearchForm from '@/components/common/advanced-search/AdvancedSearchForm'
import { cn, getSearchURL } from '@/lib/utils'
import AdvanceSearchButton from '@/components/common/advanced-search/AdvancedSearchButton'
import { UNION_SEARCH_CL } from './Home'
import EventCalendar from '@/components/common/event-calendar'
import Section from '@/components/common/Section'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import Slide from '@/components/common/slide'
import ThumbnailCard from '@/components/common/ThumbnailCard'
import { Card } from '@/components/ui/card'
const Museum = () => {
	const [showAdvSearch, setShowAdvSearch] = useState(false)
	const { message } = useConstants()
	const {
		heroBanner,
		searchURL,
		heading,
		database_name,
		rsvp,
		enableCategoriesItems,
		featuredCollection,
		enableFeaturedCollection,
		categoriesItems,
		enableRSVP,
		browseByCategoryTitle,
	} = useConstants().museum
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

			{enableFeaturedCollection && (
				<Section heading={message.featuredCollections}>
					<BentoGrid className="mx-auto">
						{featuredCollection.map((item, i) => (
							<BentoGridItem
								onClick={() => {
									window.location.href = `${getSearchURL(`UNIONSEARCH&SIMPLE_EXP=Y&ERRMSG=[MESSAGES]no-record.html&REPORT=WEB_UNION_SUM&APPLICATION=UNION_VIEW&exp=${item.url}`)}`
								}}
								key={i}
								title={item.title}
								description={item.description}
								header={
									<img
										src={item.thumbnail}
										className="w-full object-cover max-h-[170px]"
										alt={item.title}
									/>
								}
								className={cn(
									i === 3 || i === 6 ? 'md:col-span-2' : '',
									'bg-primary'
								)}
							/>
						))}
					</BentoGrid>
				</Section>
			)}

			{enableCategoriesItems && (
				<Section heading={browseByCategoryTitle}>
					<Slide
						itemsPerSlide={{ lg: 4 }}
						items={categoriesItems}
						renderItem={(item, index: any) => (
							<Card
								className="max-w-md mx-auto shadow-xl border-none cursor-pointer"
								key={index}>
								<ThumbnailCard
									title={item.title}
									url={`${getSearchURL(`UNIONSEARCH&SIMPLE_EXP=Y&ERRMSG=[MESSAGES]no-record.html&REPORT=WEB_UNION_SUM&APPLICATION=UNION_VIEW&exp=${item.url}`)}`}
									thumbnail={item.thumbnail}
								/>
							</Card>
						)}
					/>
				</Section>
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
		</Layout>
	)
}

export default Museum
