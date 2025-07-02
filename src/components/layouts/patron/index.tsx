import ScrollToTopButton from '@/components/common/ScrollToTop'
import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import useJSONData from '@/hooks/useJSONData'
import { getCookieValue } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import useConstants from '@/hooks/useConstants'
import Footer from '../patron/Footer'
import Link from '@/components/common/Link'
import { Home } from 'lucide-react'

type PatronLayoutProps = {
	children?: React.ReactNode
	activeSection?: string
	heading? :string
	mainHeading?:any
}

const PatronLayout = ({ children, activeSection, heading,mainHeading }: PatronLayoutProps) => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}
	const { message, clientProfile } = useConstants()
	const profileList = clientProfile.database
	const home_url = '?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_CLIENT_PROFILE&EXP=patron_id+~3D+global(m2l_patron_id)'
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
			{/* <Sidebar /> */}
			<div className="flex-1 flex flex-col relative">
				<Header />

				<div className="pt-3 flex justify-center items-center  rounded-md bg-primary-soft">
					<Link href={getCookieValue('HOME_SESSID') + home_url} className="flex items-center no-underline text-lg  w-[1400px] px-6 ">
					   {mainHeading}
					</Link>
				</div>

				<div className="flex justify-center items-center py-4 bg-primary-soft">
					<div className="flex flex-wrap gap-2 sm:gap-4 px-4">
						{profileList.map((button) => (
							<a
								key={button.id}
								href={getCookieValue('HOME_SESSID') + button.url + (button.db !== 'SHOWORDERLIST' ? m2l_patron_id : '')}
								onClick={() => handleClick(button.id)}
								className={buttonVariants({ variant: 'outline' })}>
								{button.label}
							</a>
						))}
						{/* Calendar profile list need different url so it is separated from the profilelist, 20240207 Don Ryu */}
						<a
							key={'Calendar'}
							href={`/scripts/mwimain.dll/144/WEB_CALENDAR/WEB_CALENDAR_PROFILE?commandsearch&exp=%2B%2B%40&EXP=TAG_FUNC_P_ID%20${m2l_patron_id}&M_GVAR1=USER_ID:${m2l_patron_id}`}
							className={buttonVariants({ variant: 'outline' })}>
							{message.calendar}
						</a>
					</div>
				</div>
				<main className="container grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 pb-4 mt-3">
					{heading && <h1 className="text-2xl font-bold">{heading}</h1>}
					{children}
				</main>
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	)
}

export default PatronLayout
