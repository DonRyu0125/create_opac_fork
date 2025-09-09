import Section from '../common/Section'
import { useState } from 'react'
import { Button } from '../ui/button'
import useConstants from '@/hooks/useConstants'
import { getSessionID } from '@/lib/utils'

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
// http://test.opac.minisisinc.com/scripts/mwimain.dll/Q1UHD4OZHHIJKF?UNIONSEARCH&SHOWSINGLE=Y&SIMPLE_EXP=Y&ERRMSG=[MESSAGES]no-record.html&REPORT=WEB_UNION_SUM&APPLICATION=UNION_VIEW&DATABASE=DESCRIPTION_WEB
// https://lmawebtest.minisisinc.com/scripts/mwimain.dll/vLgKEGGHIJK8?SEARCH&NEW=Y&EXP=TITLE1+R&DATABASE=LMA_DESCRIPTION2&REPORT=DESC_WEB_SL&SIMPLE_EXP=Y

const CategoryByTitle = () => {
	const [active, setActive] = useState<string | null>(null)
	const { message } = useConstants()
	// SEARCH&NEW=Y&EXP=TITLE1+Q&DATABASE=LMA_DESCRIPTION2&REPORT=DESC_WEB_SL&SIMPLE_EXP=Y
	const handleClick = (letter: string) => {
		let HOME_SESSID = getSessionID()
		window.location.href = `${HOME_SESSID}?SEARCH&NEW=Y&EXP=TITLE+Q&DATABASE=DESCRIPTION_WEB&REPORT=WEB_UNION_SUM`
	}

	return (
		<div className="w-full p-4 mx-auto space-y-4 rounded mt-8">
			<div className={'font-bold'}>{message.browseByTitle}</div>
			<div className="w-full flex justify-evenly">
				{letters.map((l) => (
					<Button
						key={l}
						variant={active === l ? 'outline' : 'default'}
						size="sm"
						className="w-[40px]"
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
