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
	const { home, archives, museum, library, message, clientProfile } = useConstants()

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	const dismissNotification = (id: number) => {
		setNotifications(notifications.filter((n) => n.id !== id))
	}

	const statsData = [
		{
			title: 'Checked Out',
			count: patronData.stats.checkedOut,
			icon: BookOpen,
			color: 'bg-blue-500',
		},
		{
			title: 'On Hold',
			count: patronData.stats.onHold,
			icon: Clock,
			color: 'bg-amber-500',
		},
		{
			title: 'In Transit',
			count: patronData.stats.inTransit,
			icon: Truck,
			color: 'bg-green-500',
		},
		{
			title: 'On Request',
			count: patronData.stats.onRequest,
			icon: FileText,
			color: 'bg-purple-500',
		},
	]

	return (
		<PatronLayout mainHeading={<><Home className="mr-1 h-5 w-5" />{message.clientDashboard}</>} heading="Library" >
			{/* Main Content Container */}
			<div className="flex-1 lg:flex lg:flex-col">


				{/* Main Content */}
				<main className="flex-1 p-4 lg:p-6">
					{/* Welcome Section */}
					<div className="mb-6">
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back, {patronData.name}!</h1>
						<p className="text-gray-600">Here's an overview of your library account</p>
					</div>

					{/* Rest of the content remains the same */}
					{/* Notifications Section */}
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

					{/* Stats Section */}
					<div className="mb-8">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{statsData.map((stat) => (
								<StatsCard key={stat.title} title={stat.title} count={stat.count} icon={stat.icon} color={stat.color} />
							))}
						</div>
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
				</main>
			</div>
		</PatronLayout>
	)
}
