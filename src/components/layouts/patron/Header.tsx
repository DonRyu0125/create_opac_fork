import { LanguageSelect } from '@/components/common/LanguageSelect'
import Link from '@/components/common/Link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useConstants from '@/hooks/useConstants'
import { clearCookies, getCookieValue } from '@/lib/utils'
import { Home, UserRound } from 'lucide-react'

const Header = () => {
	const { config, message } = useConstants()
	const { logo, siteName } = config

	return (
		<header className="flex justify-between bg-primary sticky top-0 z-30  items-center gap-4 border-b py-2">
			<div className="container flex justify-between items-center md:p-[21px]">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<a className="flex flex-row space-x-4 items-center" href="/">
									<img className="h-12" src={logo} alt="logo" loading="eager" />
									<h1 className="text-2xl font-bold text-opac-white">{siteName}</h1>
								</a>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className={'flex'}>
					<div className={'mr-2'}>
						<LanguageSelect />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
								<UserRound />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Your Account</DropdownMenuLabel>
							<DropdownMenuItem>
								<Link
									href={
										getCookieValue('HOME_SESSID') +
										'?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_CLIENT_PROFILE&EXP=patron_id+~3D+global(m2l_patron_id)'
									}
									className="no-underline ml-[0.5rem]">
									{message.dashboardHome}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href={
										getCookieValue('HOME_SESSID') +
										'?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_LIBRARY_CIRC_DASHBOARD&EXP=patron_id+~3D+global(m2l_patron_id)'
									}
									className="no-underline ml-[0.5rem]">
									{message.patronDashboard}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href={
										getCookieValue('HOME_SESSID') +
										'?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_CLIENT_ACC_SETTINGS&EXP=patron_id+~3D+global(m2l_patron_id)'
									}
									className="no-underline ml-[0.5rem]">
									{message.accountSettings}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Search Database</DropdownMenuLabel>
							<DropdownMenuItem>
								<Link href="/" className="no-underline ml-[0.5rem]">
									All
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/archives.html" className="no-underline ml-[0.5rem]">
									Archives
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/museum.html" className="no-underline ml-[0.5rem]">
									Museum
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/library.html" className="no-underline ml-[0.5rem]">
									Library
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link onClick={clearCookies} className="no-underline ml-[0.5rem]">
									Logout
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}

export default Header
