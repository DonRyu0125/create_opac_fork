import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { generateTDRIframeURL } from '@/lib/tdr'
import { useState } from 'react'

type TDRLinkingProps = { onAssetsSelect: (source: string) => void }

const TDRLinking = ({ onAssetsSelect }: TDRLinkingProps) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						onClick={() => {
							if (!open) {
								setOpen(true)
							}
						}}>
						Link from TDR
					</Button>
				</DialogTrigger>
				<DialogContent className=" max-w-full w-fit h-fit">
					<DialogHeader>
						<DialogTitle>Search from TDR Portal</DialogTitle>
					</DialogHeader>
					<iframe
						width={1440}
						height={900}
						title="TDR Portal"
						src={generateTDRIframeURL()}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default TDRLinking
