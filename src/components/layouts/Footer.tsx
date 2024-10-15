import { CONSTANTS } from '@/constants'
import { getJSONType } from '@/lib/utils'
import { HeroHighlight } from '../ui/hero-highlight'
const Footer = () => {
	const { siteName } = getJSONType(CONSTANTS.EN.config)

	return (
		<footer className="w-full bg-black mx-auto">
			<HeroHighlight containerClassName="h-32">
				<div className="sm:flex sm:items-center sm:justify-between">
					<p className="text-center text-white mx-auto">
						{siteName} &copy; {new Date().getFullYear()}
					</p>
				</div>
			</HeroHighlight>
		</footer>
	)
}

export default Footer
