import { useState } from 'react'
import { BookOpen, Clock, Truck, FileText, Bell, Home, ClockAlert, CircleDollarSign } from 'lucide-react'
import { NotificationBanner } from './NotificationBanner'
import PatronLayout from '../patron'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { StatCardProps } from '@/page/dashboard/PatronProfile'
import { getCookieValue } from '@/lib/utils'
import { colorClasses } from '@/page/dashboard/constants'

// Mock data for the dashboard
const patronData = {
	name: 'Sarah Johnson',
	notifications: [
		{
			id: 1,
			message: "Your book 'The Great Gatsby' is due in 2 days",
			type: 'warning' as const,
		},
		{
			id: 2,
			message: "Your hold on 'Dune' is now available for pickup",
			type: 'success' as const,
		},
	],
	stats: {
		checkedOut: 3,
		onHold: 2,
		inTransit: 1,
		onRequest: 0,
	},
}

export default function LibraryDashboard() {
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { message, patronLibraryCirculation } = useConstants()
	const libraryProfileList = patronLibraryCirculation.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	const [notifications, setNotifications] = useState(patronData.notifications)

	// const dismissNotification = (id: number) => {
	// 	setNotifications(notifications.filter((n) => n.id !== id))
	// }

	const statCards = [
		{
			icon: <FileText className="h-4 w-4" />,
			label: libraryProfileList[3].label,
			color: 'purple',
			value: record.wait_count,
			link: libraryProfileList[3].url,
		},
		{
			icon: <Clock className="h-4 w-4" />,
			label: libraryProfileList[1].label,
			color: 'amber',
			value: record.hold_count,
			link: libraryProfileList[1].url,
		},
		{
			icon: <Truck className="h-4 w-4" />,
			label: libraryProfileList[2].label,
			color: 'green',
			value: record.transit_count,
			link: libraryProfileList[2].url,
		},
		{
			icon: <BookOpen className="h-4 w-4" />,
			label: libraryProfileList[0].label,
			color: 'blue',
			value: record.circ_count,
			link: libraryProfileList[0].url,
		},
	]

	function StatCard({ icon, label, value, color }: StatCardProps) {
		return (
			<div className="rounded-md bg-white p-6 shadow">
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-center gap-2">
						<div className={`rounded-full p-2 ${colorClasses[color as keyof typeof colorClasses]}`}>{icon}</div>
						<span className="text-sm text-gray-500">{label}</span>
					</div>
					<div className="flex items-baseline justify-center">
						<h3 className="text-2xl font-bold">{value || 0}</h3>
					</div>
				</div>
			</div>
		)
	}

	return (
		<PatronLayout
			isLibrary={true}
			mainHeading={
				<>
					<BookOpen className="mr-1 h-5 w-5" />
					<h2 className="text-lg font-semibold text-gray-900">Library Portal</h2>
				</>
			}>
			<div className="mb-4 rounded-md bg-white p-6 shadow">
				<h1 className="text-3xl font-semibold text-gray-800">
					{message.welcome} {records[0]?.patron_name || 'User'}!
				</h1>
				<p className="mt-2">{records[0].P_BLK_MESSAGE || message.welcomeMessageLibrary}</p>
			</div>

			<div className="mb-4 rounded-md bg-white p-3 shadow">
				<div className={'pb-2 text-lg font-semibold text-gray-900'}>Your Library Materials</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{statCards.map((card, index) => (
						<a
							href={getCookieValue('HOME_SESSID') + card.link + (card.label == 'Bookmarks' || 'Library Portal' ? '' : m2l_patron_id)}
							className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50">
							<StatCard key={index} icon={card.icon} label={card.label} color={card.color} value={card.value} />
						</a>
					))}
				</div>
			</div>

			<div className="mb-4 rounded-md bg-white p-3 shadow">
				<div className={'pb-2 text-lg font-semibold text-gray-900'}>Current Notices</div>
				<div className={'grid gap-2 grid-cols-2'}>
					<a href={''} className=" transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50">
						<StatCard key={0} icon={<CircleDollarSign />} label={'Fines Due'} color={'red'} value={record.fine_due} />
					</a>
					<a href={''} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50">
						<StatCard key={0} icon={<ClockAlert />} label={'Overdue Items'} color={'orange'} value={record.overdue_items} />
					</a>
				</div>
			</div>

			{/* {notifications.length > 0 && (
				<div className="mb-8">
					<div className="flex items-center gap-2 mb-4">
						<Bell className="h-5 w-5 text-gray-600" />
						<h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
					</div>
					<div className="space-y-3">
						{notifications.map((notification, index) => (
							<NotificationBanner
								key={index}
								message={notification.message}
								type={notification.type}
								onDismiss={() => dismissNotification(notification.id)}
							/>
						))}
					</div>
				</div>
			)} */}

			{/* Recent Activity Section */}
			{/* <div className="mb-8">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between py-3 border-b border-gray-100">
							<div className="flex items-center gap-3">
								<BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />
								<div>
									<p className="font-medium text-gray-900">Checked out "The Midnight Library"</p>
									<p className="text-sm text-gray-500">Due: March 15, 2024</p>
								</div>
							</div>
							<span className="text-sm text-gray-400 whitespace-nowrap ml-4">2 days ago</span>
						</div>

						<div className="flex items-center justify-between py-3 border-b border-gray-100">
							<div className="flex items-center gap-3">
								<Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
								<div>
									<p className="font-medium text-gray-900">Placed hold on "Project Hail Mary"</p>
									<p className="text-sm text-gray-500">Position: 3 in queue</p>
								</div>
							</div>
							<span className="text-sm text-gray-400 whitespace-nowrap ml-4">1 week ago</span>
						</div>

						<div className="flex items-center justify-between py-3">
							<div className="flex items-center gap-3">
								<BookOpen className="h-5 w-5 text-green-500 flex-shrink-0" />
								<div>
									<p className="font-medium text-gray-900">Returned "Atomic Habits"</p>
									<p className="text-sm text-gray-500">Returned on time</p>
								</div>
							</div>
							<span className="text-sm text-gray-400 whitespace-nowrap ml-4">2 weeks ago</span>
						</div>
					</div>
				</div>
			</div> */}
		</PatronLayout>
	)
}
