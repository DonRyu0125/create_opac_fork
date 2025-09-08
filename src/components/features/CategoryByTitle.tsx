import Section from '../common/Section'
import { useState } from 'react'
import { Button } from '../ui/button'
import useConstants from '@/hooks/useConstants'

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const CategoryByTitle = () => {
	const [active, setActive] = useState<string | null>(null)
	const { message } = useConstants()
	const handleClick = (letter: string) => {
		const url = `https://search.lma.gov.uk/captains-registers-pdfs/captains-registers-u.pdf`
		setActive(letter)
		if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer')
	}
	return (
		<div className="w-full p-4 mx-auto space-y-4 rounded mt-8">
			<div className={'font-bold'}>{message.browseByTitle}</div>
			<div className="grid grid-cols-7 sm:grid-cols-8 md:grid-cols-13 gap-2">
				{letters.map((l) => (
					<Button
						key={l}
						variant={active === l ? 'outline' : 'default'}
						size="sm"
						className="w-full"
						aria-pressed={active === l}
						onClick={() => handleClick(l)}>
						{l}
					</Button>
				))}
			</div>
		</div>
	)
}

export default CategoryByTitle
