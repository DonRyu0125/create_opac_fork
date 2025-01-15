import PatronLayout from '@/components/layouts/patron'
import MainContent from './MainContent'

const EasyLoad = () => {
	return (
		<PatronLayout>
			<div className="container flex flex-col gap-8 p-6">
				<div className="flex flex-wrap gap-2 sm:gap-4">
					<MainContent />
				</div>
			</div>
		</PatronLayout>
	)
}

export default EasyLoad
