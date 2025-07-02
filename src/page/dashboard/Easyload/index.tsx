import PatronLayout from '@/components/layouts/patron'
import MainContent from './MainContent'
import { Home } from 'lucide-react'
import useConstants from '@/hooks/useConstants'

const EasyLoad = () => {
	const message = useConstants().message
	return (
		<PatronLayout mainHeading={<><Home className="mr-1 h-5 w-5" />{message.clientDashboard}</>} heading="Easy Load">
			<MainContent />
		</PatronLayout>
	)
}

export default EasyLoad
