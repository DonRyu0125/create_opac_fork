import Link from '@/components/common/Link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getCookieValue } from '@/lib/utils'
import {
	Home,
	Settings,
	ShoppingBag,
	Copyright,
	Copy,
	BookMarked,
	Lightbulb,
	MessageCircleMore,
	CalendarDays
} from 'lucide-react'

type Props = {}

const Sidebar = (props: Props) => {
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]

	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 shadow-md flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={getCookieValue('HOME_SESSID') + "?SEARCH&DATABASE=CLIENT_VIEW&REPORT=WEB_CLIENT_PROFILE&EXP=patron_id+~3D+global(m2l_patron_id)"}
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
							<Home className="h-5 w-5" />
							<span className="sr-only">Patron Dashboard</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Patron Dashboard</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<ShoppingBag className="h-5 w-5" />
							<span className="sr-only">Orders</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Orders</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<Copyright className="h-5 w-5" />
							<span className="sr-only">Copyright</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Copyright</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full border-cyan-600 hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<Copy className="h-5 w-5" />
							<span className="sr-only">Copy</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Copy</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<BookMarked className="h-5 w-5" />
							<span className="sr-only">Bookmarks</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Bookmarks</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={getCookieValue('HOME_SESSID') + "?SEARCH&DATABASE=ENQUIRIES_VIEW&REPORT=WEB_ENQ_PROFILE&EXP=ENQ_PATRON_ID%20" + m2l_patron_id}
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<Lightbulb className="h-5 w-5" />
							<span className="sr-only">Inquiries</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Inquiries</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<MessageCircleMore className="h-5 w-5" />
							<span className="sr-only">Crowdsource</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Crowdsource</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground rounded-full hover:bg-neutral-200 hover:text-slate-700 md:h-8 md:w-8">
							<CalendarDays className="h-5 w-5" />
							<span className="sr-only">Calendar</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Calendar</TooltipContent>
				</Tooltip>
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
							<Settings className="h-5 w-5" />
							<span className="sr-only">Settings</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Settings</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	)
}

export default Sidebar
