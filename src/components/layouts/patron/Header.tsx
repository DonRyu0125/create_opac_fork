import { LanguageSelect } from '@/components/common/LanguageSelect'
import Link from '@/components/common/Link'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useConstants from '@/hooks/useConstants'
import { clearCookies, getCookieValue } from '@/lib/utils'
import { Home, PanelLeft, UserRound } from 'lucide-react'

const Header = () => {
	const { message } = useConstants()
	const home_url =
		'?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_CLIENT_PROFILE&EXP=patron_id+~3D+global(m2l_patron_id)'

	return (
		<header className="justify-between sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 pb-4 shadow-md sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="sm:max-w-xs">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href={getCookieValue('HOME_SESSID') + home_url}
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
							<Home className="h-5 w-5" />
							Patron Dashboard
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<Breadcrumb className="hidden md:flex">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link
								href={getCookieValue('HOME_SESSID') + home_url}
								className="flex no-underline">
								<Home className="mr-1 h-5 w-5" />
								Client Dashboard
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{/* <BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="#">Products</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>All Products</BreadcrumbPage>
					</BreadcrumbItem> */}
				</BreadcrumbList>
			</Breadcrumb>
			<div className={'flex'}>
				<div className={'mr-2'}>
					<LanguageSelect />
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="overflow-hidden rounded-full">
							<UserRound />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Patron Dashboard</DropdownMenuLabel>
						<DropdownMenuItem>
							<Link
								href={
									getCookieValue('HOME_SESSID') +
									'?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_CLIENT_PROFILE&EXP=patron_id+~3D+global(m2l_patron_id)'
								}>
								{message.dashboardHome}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Account Settings</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Search Database</DropdownMenuLabel>
						<DropdownMenuItem>
							<Link href="/">All</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/archives.html">Archives</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/museum.html">Museum</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/library.html">Library</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link onClick={clearCookies}>Logout</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}

export default Header
