'use client'

import { Button } from '@/components/ui/button'
import { FileText, HelpCircle, Share2, Printer, ArrowLeft } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function NavigationSideBar() {
	return (
		<div className="w-full  space-y-3">
			<nav className="grid gap-2">
				<Button
					variant="ghost"
					className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground group transition-all duration-300">
					<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
					Return to Search Results
				</Button>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground group relative transition-all duration-300">
								<FileText className="mr-2 h-4 w-4" />
								PDF List of This Collection
								<HelpCircle className="ml-2 h-4 w-4 opacity-70" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Download a PDF list of all items in this collection</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Button
					variant="ghost"
					className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground group transition-all duration-300">
					<Share2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-45" />
					Share This Page
				</Button>

				<Button
					variant="ghost"
					className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground group transition-all duration-300">
					<Printer className="mr-2 h-4 w-4" />
					Print Page
				</Button>
			</nav>
		</div>
	)
}
