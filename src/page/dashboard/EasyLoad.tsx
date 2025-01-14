import PatronLayout from '@/components/layouts/patron'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/providers/EasyloadAuthProvider'
import { Camera, Monitor, Search, Upload, Webcam } from 'lucide-react'

const TENANT =
	process.env.REACT_APP_EASYLOAD_TENANT || import.meta.env.VITE_REACT_APP_EASYLOAD_TENANT
const PASSWORD =
	process.env.REACT_APP_EASYLOAD_PASSWORD || import.meta.env.VITE_REACT_APP_EASYLOAD_PASSWORD

const EasyLoad = () => {
	const { authToken } = useAuth()

	return (
		<PatronLayout>
			<div className="container flex flex-col gap-8 p-6">
				<div className="flex flex-wrap gap-2 sm:gap-4">
					<Card className="w-full max-w-3xl mx-auto">
						<CardContent className="p-6">
							<Tabs defaultValue="search" className="space-y-6">
								<TabsList className="grid w-full grid-cols-5 rounded-lg bg-muted p-1 h-14">
									<TabsTrigger
										value="search"
										className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
										<Search className="h-5 w-5" />
									</TabsTrigger>
									<TabsTrigger
										value="upload"
										className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
										<Upload className="h-5 w-5" />
									</TabsTrigger>
									<TabsTrigger
										value="camera"
										className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
										<Camera className="h-5 w-5" />
									</TabsTrigger>
									<TabsTrigger
										value="screen"
										className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
										<Monitor className="h-5 w-5" />
									</TabsTrigger>
									<TabsTrigger
										value="capture"
										className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
										<Webcam className="h-5 w-5" />
									</TabsTrigger>
								</TabsList>

								<TabsContent
									value="search"
									className="p-4 bg-background rounded-lg shadow-inner">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											placeholder="Search by phrase or use * for all"
											className="pl-9 pr-4 py-2 w-full bg-muted"
										/>
									</div>
								</TabsContent>

								<TabsContent value="upload" className="p-4">
									<div className="text-center p-8 border-2 border-dashed rounded-lg">
										<Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
										<h3 className="font-medium mb-2">Upload Files</h3>
										<p className="text-sm text-muted-foreground mb-4">
											Drag and drop your files here or click to browse
										</p>
										<Button>Choose Files</Button>
									</div>
								</TabsContent>

								<TabsContent value="camera" className="p-4">
									<div className="text-center p-8 border-2 border-dashed rounded-lg">
										<Camera className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
										<h3 className="font-medium mb-2">Camera Access</h3>
										<p className="text-sm text-muted-foreground mb-4">
											Allow access to your camera to take photos
										</p>
										<Button>Enable Camera</Button>
									</div>
								</TabsContent>

								<TabsContent value="screen" className="p-4">
									<div className="text-center p-8 border-2 border-dashed rounded-lg">
										<Monitor className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
										<h3 className="font-medium mb-2">Screen Recording</h3>
										<p className="text-sm text-muted-foreground mb-4">
											Start recording your screen
										</p>
										<Button>Start Recording</Button>
									</div>
								</TabsContent>

								<TabsContent value="capture" className="p-4">
									<div className="text-center p-8 border-2 border-dashed rounded-lg">
										<Webcam className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
										<h3 className="font-medium mb-2">Screen Capture</h3>
										<p className="text-sm text-muted-foreground mb-4">
											Take a screenshot of your screen
										</p>
										<Button>Capture Screenshot</Button>
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</PatronLayout>
	)
}

export default EasyLoad
