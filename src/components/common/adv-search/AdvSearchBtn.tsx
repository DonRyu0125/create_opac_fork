import { Button } from '@/components/ui/button'
import { TextSearch } from 'lucide-react'
import React from 'react'

const AdvSearchBtn = () => {
	return (
		<a href="/advanced-search.html">
			<Button variant={'default'} className="right-0 top-0 h-full bg-primary">
				<span className="block">
					<TextSearch className="w-4 h-4" />
				</span>
			</Button>
		</a>
	)
}

export default AdvSearchBtn
