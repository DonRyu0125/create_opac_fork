import axios from 'axios'
import React, { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog'
import { Button } from '@/components/ui/button'
import { convertXMLToJson, getSessionID } from '@/lib/utils'
import { Menu } from 'lucide-react'
import {
	ScrollAreaCorner,
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from '@/components/ui/scrollArea'

const AdvancedSearchIndexDialog = ({ title }: any) => {
	const [keyvalue, setKeyvalue] = useState<string>('')
	const [option, setOption] = useState<string>('')

	const getIndexList = () => {
		let HOME_SESSID = getSessionID()
		axios({
			method: 'get',
			url: `${HOME_SESSID}/FIRST?INDEXLIST&KEYNAME=TITLE&DATABASE=DESCRIPTION_WEB&form=[INCLUDES]cluster.html`,
		}).then((res) => {
			let parser = new DOMParser()
			let xml = parser.parseFromString(res.data, 'text/xml')
			let xmlText = new XMLSerializer().serializeToString(xml)
			const conToJson = convertXMLToJson(xmlText)
			console.log('conToJson', conToJson)
			return conToJson
		})
	}

	const TAGS = Array.from({ length: 20 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
	return (
		<Dialog>
			<DialogTrigger asChild onClick={getIndexList}>
				<Button
					className={
						' h-full w-[50px] px-0 flex items-center justify-center overflow-hidden'
					}>
					<Menu />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>asd</DialogHeader>
				<ScrollAreaRoot>
					<ScrollAreaViewport>
						<div className="py-[15px] px-5">
							<div className="text-violet11 text-[15px] leading-[18px] font-medium">
								Tags
							</div>
							{TAGS.map((tag) => (
								<div
									className="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
									key={tag}>
									{tag}
								</div>
							))}
						</div>
					</ScrollAreaViewport>
					<ScrollAreaScrollbar orientation="vertical">
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
					<ScrollAreaScrollbar orientation="horizontal">
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
					<ScrollAreaCorner />
				</ScrollAreaRoot>
				<DialogFooter className={'w-full flex absolute bottom-1 relative'}></DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AdvancedSearchIndexDialog
