import useConstants from '@/hooks/useConstants'
import Layout from '@/components/layouts'
import Hero from '@/components/common/Hero'
import SearchForm from '@/components/common/SearchForm'
import AdvSearchInput from '@/components/common/adv-search/AdvSearchInput'
import { Label } from '@radix-ui/react-label'
import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import useJSONData from '@/hooks/useJSONData'

const AdvSearch = () => {
	const { message, home } = useConstants()
	const { common } = useJSONData({ selector: '#xml_record' })
	const { searchURL: url } = home
	const { session } = common

	const getSearchURL = () => {
		const domSessionId = document.querySelector('#session-id')?.textContent
		if (document && domSessionId) {
			return url.replace('/SCRIPTS/MWIMAIN.DLL', `${domSessionId}`)
		}
		if (session && session !== '') {
			return url.replace('/SCRIPTS/MWIMAIN.DLL', `${session}`)
		}
		return url
	}
	return (
		<Layout>
			<div
				className={'w-full h-full min-h-[475px] flex flex-col justify-center items-center'}>
				<PageHeader heading={'Advanced Search'} />
				<form method="POST" action={getSearchURL()} className={'w-3/4 h-full '}>
					<AdvSearchInput />
					{/* <AdvSearchInput /> */}
					<Button
						variant={'default'}
						className="right-0 top-0 h-full bg-opac-green"
						type="submit">
						{/* <span className="hidden md:block"> {message.searchButton}</span> */}
						<span className=" block">
							asd
						</span>
					</Button>
				</form>
			</div>
		</Layout>
	)
}

export default AdvSearch
