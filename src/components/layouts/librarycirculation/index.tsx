'use client'

import { useState } from 'react'
import { BookOpen, Clock, Truck, FileText, Bell, Home } from 'lucide-react'
import { CustomSidebar } from './CustomSidebar'
import { DesktopHeader } from './DesktopHeader'
import { MobileHeader } from './MobileHeader'
import { NotificationBanner } from './NotificationBanner'
import { StatsCard } from './StatsCard'
import PatronLayout from '../patron'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { StatCardProps } from '@/page/dashboard/PatronProfile'
import { getCookieValue } from '@/lib/utils'

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
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [notifications, setNotifications] = useState(patronData.notifications)
	const { records } = useJSONData({ selector: '#xml_record' })
	const { home, archives, museum, library, message, clientProfile } = useConstants()
	const profileList = clientProfile.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	const dismissNotification = (id: number) => {
		setNotifications(notifications.filter((n) => n.id !== id))
	}

	const statCards = [
		{
			icon: <BookOpen className="h-4 w-4" />,
			label: 'Checked Out',
			color: 'blue',
			value: patronData.stats.checkedOut,
			link: profileList[0].url,
		},
		{
			icon: <Clock className="h-4 w-4" />,
			label: 'On Hold',
			color: 'amber',
			value: patronData.stats.onHold,
			link: profileList[1].url,
		},
		{
			icon: <Truck className="h-4 w-4" />,
			label: 'In Transit',
			color: 'green',
			value: patronData.stats.inTransit,
			link: profileList[2].url,
		},
		{
			icon: <FileText className="h-4 w-4" />,
			label: 'On Request',
			color: 'purple',
			value: patronData.stats.onRequest,
			link: profileList[3].url,
		},
	]

	function StatCard({ icon, label, value, color }: StatCardProps) {
		const colorClasses = {
			blue: 'bg-blue-100 text-blue-500',
			green: 'bg-green-100 text-green-500',
			red: 'bg-red-100 text-red-500',
			purple: 'bg-purple-100 text-purple-500',
			amber: 'bg-amber-100 text-amber-500',
			orange: 'bg-orange-100 text-orange-500',
			pink: 'bg-pink-100 text-pink-500',
			violet: 'bg-violet-100 text-violet-500',
			yellow: 'bg-yellow-100 text-yellow-500',
			rose: 'bg-rose-100 text-rose-500',
			indigo: 'bg-indigo-100 text-indigo-500',
		} as const

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
			mainHeading={
				<>
					<BookOpen className="mr-1 h-5 w-5" />
					{'Library Portal'}
				</>
			}>
			<div className="mb-4 rounded-md bg-white p-6 shadow">
				<h1 className="text-3xl font-semibold text-gray-800">
					{message.welcome} {records[0]?.full_name || 'User'}!
				</h1>
				<p className="mt-2">{message.welcomeMessage}</p>
			</div>

			{notifications.length > 0 && (
				<div className="mb-8">
					<div className="flex items-center gap-2 mb-4">
						<Bell className="h-5 w-5 text-gray-600" />
						<h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
					</div>
					<div className="space-y-3">
						{notifications.map((notification) => (
							<NotificationBanner
								key={notification.id}
								message={notification.message}
								type={notification.type}
								onDismiss={() => dismissNotification(notification.id)}
							/>
						))}
					</div>
				</div>
			)}

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{statCards.map((card, index) => (
					<a
						href={getCookieValue('HOME_SESSID') + card.link + (card.label == 'Bookmarks' || 'Library Circulation' ? '' : m2l_patron_id)}
						className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50">
						<StatCard key={index} icon={card.icon} label={card.label} color={card.color} value={card.value} />
					</a>
				))}
			</div>

			{/* Recent Activity Section */}
			<div className="mb-8">
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
			</div>
		</PatronLayout>
	)
}
