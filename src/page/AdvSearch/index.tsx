import useConstants from '@/hooks/useConstants'
import Layout from '@/components/layouts'
import Hero from '@/components/common/Hero'
import SearchForm from '@/components/common/SearchForm'

const AdvSearch = () => {
    const {
		heading,
		heroBanner,
		browseByCategoryTitle,
		categoriesItems,
		searchURL,
	} = useConstants().home
	return (
		<Layout>
			<Hero className="" title={'adv'} backgroundImage={heroBanner} description="">
				<SearchForm className="w-full mt-6 max-w-2xl" inputName={'KEYWORD_CLUSTER'} />

				{/* <CommandDemo /> */}
			</Hero>
		</Layout>
	)
}

export default AdvSearch
