import useConstants from '@/hooks/useConstants'
import Hero from '../components/common/Hero'
import SearchForm from '../components/common/SearchForm'
import Layout from '../components/layouts'
import AdvanceSearchButton from './AdvancedSearch/AdvancedSearchButton'
import AdvancedSearchForm from './AdvancedSearch/AdvancedSearchForm'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TextSearch } from 'lucide-react'

const Description = () => {
	const [showAdvSearch, setShowAdvSearch] = useState(false)
	const {
		heading,
		heroBanner,
		browseByCategoryTitle,
		categoriesItems,
		searchURL,
		// eventCalendar,
	} = useConstants().home
	return (
		<Layout>
			<Hero
				className=""
				title={'Search the Description'}
				backgroundImage={heroBanner}
				description="">
				<div className={'w-full mx-auto flex space-x-4 justify-center mt-6 max-w-2xl'}>
					{showAdvSearch ? (
						<AdvancedSearchForm
							database_name={'DESCRIPTION'}
							url={'http://test.opac.minisis.com/'}
						/>
					) : (
						<SearchForm inputName={'KEYWORD_CLUSTER'} />
					)}
					<Button
						variant={'default'}
						className="right-0 top-0 bg-primary h-[40px]"
						onClick={()=>setShowAdvSearch((prev) => !prev)}>
						<span className="block">
							<TextSearch className="w-4 h-4" />
						</span>
					</Button>
				</div>

				{/* <CommandDemo /> */}
			</Hero>
		</Layout>
	)
}
export default Description
