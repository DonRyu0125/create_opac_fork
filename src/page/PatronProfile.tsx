import { useState, useEffect } from 'react'
import PatronLayout from '@/components/layouts/patron'
import useJSONData from '@/hooks/useJSONData'
import clientProfileJSON from '@/constants/en/client-profile.json'
import { getCookieValue } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import {
	ArrowDown,
	ArrowUp,
	MoreHorizontal,
	Users,
	Eye,
	MessageSquare,
	BarChart3,
	Heart,
  ShoppingBag,
	Copyright,
	Copy,
	BookMarked,
	Lightbulb,
	MessageCircleMore,
	CalendarDays
} from 'lucide-react'
import axios from 'axios'
// import { ClipLoader } from 'react-spinners'
interface ApiData {
  id: number
  title: string
}
const PatronProfile = () => {
  const [data, setData] = useState<ApiData[][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
	const { records } = useJSONData({ selector: '#xml_record' })
	const [activeButton, setActiveButton] = useState(null)

	const profileList = clientProfileJSON.database
	const m2l_patron_id = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
  const home_session = getCookieValue('HOME_SESSID')
	// Handle button click
	const handleClick = (id: any) => {
		setActiveButton(id) // Set the clicked button as active
	}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          home_session + "?COMMANDSEARCH&DATABASE=ENQUIRIES_VIEW&EXP=ENQ_USER_ID%2020240001",
          home_session + "?SEARCH&DATABASE=COMMENTS_VIEW&EXP=CREATOR_ID%2020240001",
        ]

        const requests = urls.map(url => fetch(url).then(res => res.json()))
        const results = await Promise.all(requests)

        setData(results)
      } catch (error) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
	return (
		<PatronLayout>
			<div className="container flex flex-col gap-8 p-6">
				<div className="flex flex-wrap gap-2 sm:gap-4">
					{profileList.map((button) => (
						<a
							key={button.id}
							href={getCookieValue('HOME_SESSID') + button.url + (button.db != "SHOWORDERLIST" ? m2l_patron_id : "")}
							onClick={() => handleClick(button.id)}
							className={`px-3 py-2 text-sm shadow sm:px-4 sm:py-2 sm:text-base text-accent-foreground bg-white text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>
							{button.label}
						</a>
					))}
				</div>
				<div className="mb-4 rounded-lg bg-white p-6 shadow">
					<h1 className="text-3xl font-semibold text-gray-800">
						{' '}
						Welcome {records[0]?.full_name || 'User'}!
					</h1>
					<p className="mt-2">
						You have completed <span className="font-medium text-blue-600">70%</span> of
						your goal this week!{' '}
						<span className="text-gray-600">
							Start a new goal and improve your result.
						</span>
					</p>
				</div>
				{/* Stats Grid */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-blue-100 p-2">
									<ShoppingBag className="h-4 w-4 text-blue-500" />
								</div>
								<span className="text-sm text-gray-500">Orders</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">30.2K</h3>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-green-100 p-2">
									<Copyright className="h-4 w-4 text-green-500" />
								</div>
								<span className="text-sm text-gray-500">Copyright Requests</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">9.2K</h3>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-red-100 p-2">
									<Copy className="h-4 w-4 text-red-500" />
								</div>
								<span className="text-sm text-gray-500">Reproductions</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">1.2K</h3>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-purple-100 p-2">
									<BookMarked className="h-4 w-4 text-purple-500" />
								</div>
								<span className="text-sm text-gray-500">Bookmarks</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">18.2K</h3>
							</div>
						</div>
					</div>

          <div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-amber-100 p-2">
									<Lightbulb className="h-4 w-4 text-amber-500" />
								</div>
								<span className="text-sm text-gray-500">Enquiries</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">18.2K</h3>
							</div>
						</div>
					</div>

          <div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-orange-100 p-2">
									<MessageCircleMore className="h-4 w-4 text-orange-500" />
								</div>
								<span className="text-sm text-gray-500">Crowdsource</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">18.2K</h3>
							</div>
						</div>
					</div>

          <div className="rounded-lg bg-white p-6 shadow">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-center gap-2">
								<div className="rounded-full bg-pink-100 p-2">
									<CalendarDays className="h-4 w-4 text-pink-500" />
								</div>
								<span className="text-sm text-gray-500">Calendar</span>
							</div>
							<div className="flex items-baseline justify-center">
								<h3 className="text-2xl font-bold">18.2K</h3>
							</div>
						</div>
					</div>


				</div>

				{/* Recent Media Section */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-medium">
							<span>Preview</span>
						</h2>
						<button className="rounded-md p-2 hover:bg-gray-100">
							<MoreHorizontal className="h-5 w-5 text-gray-500" />
						</button>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{[
							'/placeholder.svg?height=400&width=400',
							'/placeholder.svg?height=400&width=400',
							'/placeholder.svg?height=400&width=400',
							'/placeholder.svg?height=400&width=400',
						].map((src, index) => (
							<div key={index} className="overflow-hidden rounded-lg bg-white shadow">
								<div className="aspect-square relative">
									<img
										src={src}
										alt={`Recent media ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-4">
									<div className="flex items-center justify-between text-sm text-gray-500">
										<div className="flex items-center gap-2">
											<Heart className="h-4 w-4" />
											2.3K
											<MessageSquare className="h-4 w-4 ml-2" />
											900
										</div>
										<span>23 days ago</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Follower Growth Section */}
				<div className="rounded-lg bg-white p-6 shadow">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-medium">Follower Growth</h2>
						<button className="rounded-md p-2 hover:bg-gray-100">
							<MoreHorizontal className="h-5 w-5 text-gray-500" />
						</button>
					</div>
					<div className="mt-4">
						<div className="space-y-4">
							<div>
								<h3 className="text-4xl font-bold">4,829</h3>
								<p className="text-sm text-gray-500">
									Gained Followers (last 360 days)
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-green-500" />
									<span className="text-sm">
										You have a 20% Growth compare to last year
									</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-orange-500" />
									<span className="text-sm">
										You have reached 10% of your follower goal
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PatronLayout>
	)
}

export default PatronProfile
