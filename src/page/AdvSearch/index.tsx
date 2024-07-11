import useConstants from '@/hooks/useConstants'
import Layout from '@/components/layouts'
import Hero from '@/components/common/Hero'
import SearchForm from '@/components/common/SearchForm'
import AdvSearchInput from '@/components/common/adv-search/AdvSearchInput'

const AdvSearch = () => {
	const { heading, heroBanner, browseByCategoryTitle, categoriesItems, searchURL } =
		useConstants().home

	const getSearchURL = () => {
		return ''
	}
	return (
		<Layout>
			<div className={'w-full h-full min-h-[475px] flex justify-center items-center'}>
				<form method="POST" action={getSearchURL()} className={'w-3/4 h-full'}>
					<AdvSearchInput inputName="asd" />
					<AdvSearchInput inputName="asd" />
					<AdvSearchInput inputName="asd" />
					<AdvSearchInput inputName="asd" />
				</form>
			</div>
		</Layout>
	)
}

export default AdvSearch
