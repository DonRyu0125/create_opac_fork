import { config } from '@/constants'
import { Button } from '../ui/button'
import Link from '../common/Link'
import { ThemeToggler } from '../common/ThemeToggler'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import MobileMenu from './MobileMenu'
const Header = () => {
	const { logo, navigations, siteName } = config

	return (
		<header className=" bg-primary  mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex h-16 items-center justify-between max-w-screen-xl mx-auto">
				<div className="flex-1 md:flex md:items-center md:gap-12">
					<a className="block text-teal-600" href="/">
						<span className="sr-only">Home</span>
						<img className="h-12" src={logo} alt="logo" />
					</a>
				</div>

				<div className="">
					<nav className="hidden md:block">
						<ul className="flex items-center gap-6 text-sm ">
							{navigations.map((nav) => (
								<li key={nav.title}>
									<Link
										className="transition no-underline text-md text-opac-white hover:text-opac-green"
										href={nav.url}>
										{nav.title}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex md:hidden items-center gap-4">
						{/* <ThemeToggler /> */}
						<MobileMenu />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
