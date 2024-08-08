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
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button'
import { convertXMLToJson, getSessionID } from '@/lib/utils'
import { Menu } from 'lucide-react'

const AdvancedSearchIndexDialog = ({ title }: any) => {
	const [keyvalue, setKeyvalue] = useState<string>("");
	const [option, setOption] = useState<string>("");


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
			console.log('conToJson',conToJson)
			return conToJson
		})
	}

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
			<DialogHeader>

			</DialogHeader>
			<DialogContent>
				<DialogFooter className={'w-full flex absolute bottom-1 relative'}></DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AdvancedSearchIndexDialog
