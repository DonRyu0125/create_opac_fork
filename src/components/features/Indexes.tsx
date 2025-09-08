import React from 'react'
import Section from '../common/Section'
import useConstants from '@/hooks/useConstants'
import { Button } from '../ui/button'

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const Indexes = () => {
	const [active, setActive] = React.useState<string | null>(null)

	const handleClick = (letter: string) => {
		const url = `/pdf/${letter.toLowerCase()}.pdf`
		setActive(letter)
		if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer')
	}
	return (
		<Section heading={'Index'}>
			<div className="w-full max-w-3xl mx-auto space-y-4">
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
		</Section>
	)
}

export default Indexes
