import useConstants from '@/hooks/useConstants'
import Layout from '@/components/layouts'
import Hero from '@/components/common/Hero'
import SearchForm from '@/components/common/SearchForm'
import { Label } from '@radix-ui/react-label'
import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import useJSONData from '@/hooks/useJSONData'
import { useState } from 'react'
import { CircleMinus, Icon } from 'lucide-react'
import AdvanceSearchForm from './AdvancedSearchForm'

const AdvancedSearch = () => {
	const { common } = useJSONData({ selector: '#xml_record' })

	return (
		<Layout>
			<div className={'w-full flex items-center justify-center h-[100px]'}>
				<PageHeader heading={'Advanced Search'} />
			</div>
			<AdvanceSearchForm database_name={''} url={''} />
		</Layout>
	)
}

export default AdvancedSearch
