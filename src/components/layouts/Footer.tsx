import { CONSTANTS } from '@/constants'
import { getJSONType } from '@/lib/utils'

const Footer = () => {
	const { logo, siteName } = getJSONType(CONSTANTS.EN.config)

	return (
		<footer className="bg-black mx-auto  px-4 py-8 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center sm:justify-between">
				<p className="text-center text-white mx-auto">
					{siteName} &copy; {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	)
}

export default Footer
