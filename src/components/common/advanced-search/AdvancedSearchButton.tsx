import { Button } from '@/components/ui/button'
import { TextSearch } from 'lucide-react'
import React from 'react'

interface ShowAdvSearch {
	setShowAdvSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const AdvanceSearchButton: React.FC<ShowAdvSearch> = ({ setShowAdvSearch }: any) => {
	return (
		<Button
			variant={'default'}
			className="right-0 top-0 h-full w-full max-w-[130px] bg-primary flex justify-center items-center "
			onClick={() => setShowAdvSearch((prev: boolean) => !prev)}>
			<div className={'text-sm '}>
				<TextSearch />
			</div>
			<div className={'text-base'}>Advanced</div>
		</Button>
	)
}

export default AdvanceSearchButton
