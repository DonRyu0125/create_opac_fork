import React, { useEffect, useState } from 'react'
import Link from '../common/Link'
import { clearCookies, getCookieValue, isLogin } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import useConstants from '@/hooks/useConstants'

const LoginBtn = () => {
	const { message, config } = useConstants()
	const [login, setlogin] = useState(false)
	useEffect(() => {
		setlogin(isLogin())
	}, [])

	return (
		<>
			{login ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild className={'focus:outline-none focus:border-none'}>
						<button
							className={
								'bg-red text-lg font-bold flex items-center max-w-[250px] truncate'
							}>
							{message.welcome}, {getCookieValue('M2L_PATRON_NAME')}!
							<ChevronDown className={'h-4'} />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className={'w-full'}>
						<DropdownMenuLabel>{message.myAccount}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>{message.searchButton}</DropdownMenuItem>
						<DropdownMenuItem>{message.support}</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link onClick={clearCookies}>{message.logout}</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<li className="hover:border-b-opac-green">
					<Link
						className="transition no-underline  text-lg text-opac-white hover:text-opac-green"
						href={
							`${config.auth.url}`
						}>
						{message.logIn}
					</Link>
				</li>
			)}
		</>
	)
}

export default LoginBtn
