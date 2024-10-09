import EventCalendar from '@/components/common/event-calendar'
import HoverCard from '@/components/common/HoverCard'
import Masonry from '@/components/common/Masonry'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import useConstants from '@/hooks/useConstants'
import { cn, getSearchURL, truncateWords } from '@/lib/utils'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/SearchForm'
import Section from '../components/common/Section'
import Slide from '../components/common/Slide'
import ThumbnailCard from '../components/common/ThumbnailCard'
import Layout from '../components/layouts'
import { Card } from '../components/ui/card'

export const UNION_SEARCH_CL = 'KEYWORD_CLUSTER'
const pics = [
	'https://picsum.photos/865/1194',
	'https://picsum.photos/1268/454',
	'https://picsum.photos/504/673',
	'https://picsum.photos/1181/329',
	'https://picsum.photos/1125/731',
]

const Home = () => {
	const {
		heading,
		heroBanner,
		browseByCategoryTitle,
		categoriesItems,
		searchURL,
		rsvp,
		featuredCollection,
	} = useConstants().home
	const { message } = useConstants()
	return (
		<Layout>
			<Hero className="" title={heading} backgroundImage={heroBanner} description="">
				<div className={'w-full mx-auto flex space-x-4 justify-center mt-6 max-w-2xl'}>
					<SearchForm inputName={UNION_SEARCH_CL} action={getSearchURL(searchURL)} />
				</div>
				{/* <CommandDemo /> */}
			</Hero>

			<Section heading={message.featuredCollections}>
				<BentoGrid className="max-w-4xl mx-auto">
					{featuredCollection.map((item, i) => (
						<BentoGridItem
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
							className={cn(i === 3 || i === 6 ? 'md:col-span-2' : '', 'bg-primary')}
						/>
					))}
				</BentoGrid>
			</Section>
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
								url={item.url}
								thumbnail={item.thumbnail}
							/>
						</Card>
					)}
				/>
			</Section>
			<Section heading={`${message.calendar}`}>
				<EventCalendar
					databaseType={rsvp.filterDatabase}
					filterTypes={rsvp.filterTypes}
					filterOption={rsvp.filterOption}
				/>
			</Section>

			{/* <Section
        className='bg-secondary'
        heading={'Browse by area'}
        subHeading='Area Category'
      >
        <Map />
      </Section> */}
			{/* <Section heading={'Recent additions'}>
				<Masonry
					items={pics}
					renderItem={(item, index) => (
						<HoverCard
							description="More than 100,000 archival photos, maps, documents, and oral histories, as well as over 5,000 artifacts are at your fingertips. Browse the categories, neighbourhoods, "
							key={index}
							title={truncateWords('Test', 10)}
							thumbnail={item}
							url={''}
						/>
					)}
				/>
			</Section> */}
		</Layout>
	)
}

export default Home
