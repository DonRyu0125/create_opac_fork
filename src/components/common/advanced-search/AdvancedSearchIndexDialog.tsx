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
import { Menu, Search } from 'lucide-react'
import {
	ScrollAreaCorner,
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from '@/components/ui/scrollArea'
import useConstants from '@/hooks/useConstants'
import { Input } from '@/components/ui/input'

const AdvancedSearchIndexDialog = ({ title }: any) => {
	const {advancedSearch, message} = useConstants()
	const [cluster, setCluster] = useState([])
	const [options, setOptions] = useState([])
	const [keyvalue, setKeyvalue] = useState<string>('')

	const getCluster = async (field: string) => {
		let HOME_SESSID = getSessionID()
		await axios
			.get(
				`${HOME_SESSID}/FIRST?INDEXLIST&KEYNAME=${field}&DATABASE=DESCRIPTION_WEB&form=[INCLUDES]cluster.html`
			)
			.then((res) => {
				let list = updateClusterList(res)
				setCluster(list.cluster)
				setOptions(list.cluster.index_list.option)
			})
	}

	const getClusterBySearch = (keyvalue: string, keyname: string, url: string) => {
		let data = `KEYNAME=${keyname}&KEYVALUE=${keyvalue}`
		axios.post(url, data).then((res) => {
			let list = updateClusterList(res)
			setCluster(list.cluster)
			setOptions(list.cluster.index_list.option)
		})
	}

	const pageAction = (url: string) => {
		return axios.get(url)
	}

	const updateClusterList = (res: any) => {
		let parser = new DOMParser()
		let xml = parser.parseFromString(res.data, 'text/xml')
		let xmlText = new XMLSerializer().serializeToString(xml)
		const conToJson = convertXMLToJson(xmlText)
		console.log('conToJson',conToJson.cluster.keyname)
		return conToJson
	}

	const handleKeyvalueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyvalue(event.target.value)
	}

	return (
		<Dialog>
			<DialogTrigger asChild onClick={() => getCluster('TITLE')}>
				<Button
					className={
						' h-full w-[50px] px-0 flex items-center justify-center overflow-hidden'
					}>
					<Menu />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Browse</DialogHeader>
				<div className={'flex'}>
					<div className="w-full relative">
						<Input
							required
							className={
								'w-full rounded-none pl-4 border-2 py-3 bg-transparent border-opac-green text-black rounded-l-md ring-inset'
							}
							name="keyvalue"
							onChange={handleKeyvalueChange}
							placeholder={message.searchPlaceholder}
							type="search"
						/>
					</div>
					<Button
						variant={'default'}
						onClick={() =>
							 getClusterBySearch(keyvalue, cluster.keyname, cluster.find)
						}
						className="right-0 top-0 h-full bg-opac-green rounded-l-lg"
						type="submit">
						<span className="block">
							<Search className="w-4 h-4" />
						</span>
					</Button>
				</div>

				<div className={'flex w-full justify-between'}>
					<Button>{message.fisrt}</Button>
					<Button>{message.last}</Button>
				</div>
				<ScrollAreaRoot className={'w-full'}>
					<ScrollAreaViewport>
						<div className="py-[15px] px-5">
							<div className="text-violet11 text-[15px] leading-[18px] font-medium">
								Tags
							</div>
							{options.map((tag) => (
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
				<div className={'flex w-full justify-between'}>
					<Button>{message.previous}</Button>
					<Button>{message.next}</Button>
				</div>
				<DialogFooter className={'w-full flex absolute bottom-1 relative'}>
					<Button>{message.submit}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AdvancedSearchIndexDialog
