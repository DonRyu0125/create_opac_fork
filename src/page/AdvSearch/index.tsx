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
import AdvanceSearchForm from './AdvanceSearchForm'

const AdvSearch = () => {
	const { common } = useJSONData({ selector: '#xml_record' })
	

	return (
		<Layout>
			<PageHeader heading={'Advanced Search'} />
			<AdvanceSearchForm database_name={''} url={''}/>
		</Layout>
	)
}

export default AdvSearch
