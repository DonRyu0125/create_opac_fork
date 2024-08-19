import Link from '../common/Link'
import MobileMenu from './MobileMenu'
import useConstants from '@/hooks/useConstants'
import { LanguageSelect } from '../common/LanguageSelect'
import LoginBtn from './LoginBtn'

const Header = () => {
	const { logo, navigations, auth } = useConstants().config
	return (
		<header className=" w-full bg-primary  mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex h-16 items-center justify-between max-w-screen-xl mx-auto">
				<div className="flex-1 md:flex md:items-center md:gap-12">
					<a className="block text-teal-600" href="https://www.sfopho.com">
						<span className="sr-only ">Home</span>
						<img className="h-12" src={logo} alt="logo" />
					</a>
				</div>
				<div className="md:flex md:items-center md:gap-12">
					<nav aria-label="Global" className="hidden md:block">
						<ul className="flex items-center gap-6 text-sm ">
							{navigations.map((nav) => (
								<li key={nav.title} className="hover:border-b-opac-green">
									<Link
										className="transition no-underline  text-lg text-opac-white hover:text-opac-green"
										href={nav.url}>
										{nav.title}
									</Link>
								</li>
							))}
							{auth.login && <LoginBtn />}
						</ul>
					</nav>
					<LanguageSelect />
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
