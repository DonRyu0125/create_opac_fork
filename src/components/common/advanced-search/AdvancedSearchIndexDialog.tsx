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
import { toast } from '@/components/ui/use-toast'

interface ClusterData {
	index_list: {
		option: string[]
	}
	first_page: string
	prev_page: string
	next_page: string
	last_page: string
	keyname: string
	find: string
}

type option = {
	index: string
	bg: string
}

const AdvancedSearchIndexDialog = ({ field, updateField, setText, index }: any) => {
	const { message } = useConstants()
	const [cluster, setCluster] = useState<ClusterData>({
		index_list: {
			option: [],
		},
		first_page: '',
		prev_page: '',
		next_page: '',
		last_page: '',
		keyname: '',
		find: '',
	})
	const [options, setOptions] = useState<option[]>([])
	const [keyvalue, setKeyvalue] = useState<string>('')
	const [userSelect, setUserSelect] = useState('')

	const getCluster = async (field: string) => {
		let HOME_SESSID = getSessionID()
		if (!field) return toast({ title: `${message.advWarnMsg}` })
		await axios
			.get(
				`${HOME_SESSID}/FIRST?INDEXLIST&KEYNAME=${field}&DATABASE=DESCRIPTION_WEB&form=[INCLUDES]cluster.html`
			)
			.then((res) => {
				updateClusterList(res)
			})
	}

	const getClusterBySearch = (keyvalue: string, keyname: string, url: string) => {
		let data = `KEYNAME=${keyname}&KEYVALUE=${keyvalue}`
		axios.post(url, data).then((res) => {
			updateClusterList(res)
		})
	}

	const pageAction = (url: string) => {
		url = url.replace(/--/g, '')
		axios
			.get(url)
			.then((res) => {
				if (url !== '#' && res.data && res.data !== '') {
					updateClusterList(res)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const updateClusterList = (res: any) => {
		let parser = new DOMParser()
		let xml = parser.parseFromString(res.data, 'text/xml')
		let xmlText = new XMLSerializer().serializeToString(xml)
		const list = convertXMLToJson(xmlText)
		let nOptions = list.cluster?.index_list?.option.map((item: string) => {
			return {
				index: item,
				bg: 'bg-white',
			}
		})

		setCluster(list.cluster)
		setOptions(nOptions)
	}

	const handleKeyvalueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyvalue(event.target.value)
	}

	const handleSubmit = () => {
		if (!userSelect) return toast({ title: `${message.advWarnMsg}` })
		updateField('field', userSelect, index)
		setText(userSelect)
		setOptions([])
		setKeyvalue('')
	}

	const optionClick = (index: string, key: number) => {
		setUserSelect(index)
	}

	return (
		<Dialog>
			<DialogTrigger asChild onClick={() => getCluster(field)}>
				<Button
					className={
						'h-full w-[50px] px-0 flex items-center justify-center overflow-hidden ml-3 bg-opac-green'
					}>
					<Menu />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className={'w-full flex justify-center items-center font-bold'}>
					<DialogHeader>Browse Clusture for '{field}' </DialogHeader>
				</div>
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
						onClick={() => getClusterBySearch(keyvalue, cluster.keyname, cluster.find)}
						className="right-0 top-0 h-full bg-opac-green rounded-l-lg"
						type="submit">
						<span className="block">
							<Search className="w-4 h-4" />
						</span>
					</Button>
				</div>
				<div className={'flex w-full justify-between'}>
					<Button onClick={() => pageAction(cluster.first_page)}>{message.fisrt}</Button>
					<Button onClick={() => pageAction(cluster.last_page)}>{message.last}</Button>
				</div>
				<ScrollAreaRoot className={'w-full'}>
					<ScrollAreaViewport>
						<div className="py-[15px] px-5">
							{/* <div className="text-violet11 text-[15px] leading-[18px] font-medium">
								Tags
							</div> */}
							{options.map((item: option, key) => (
								<div
									className={`${item} cursor-pointer text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6`}
									onDoubleClick={handleSubmit}
									onClick={() => optionClick(item.index, key)}
									key={key}>
									{item.index}
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
					<Button onClick={() => pageAction(cluster.prev_page)}>
						{message.previous}
					</Button>
					<Button onClick={() => pageAction(cluster.next_page)}>{message.next}</Button>
				</div>
				<DialogFooter className={'w-full flex absolute bottom-1 relative md:justify-center md:items-center'}>
					<Button onClick={handleSubmit}>{message.submit}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AdvancedSearchIndexDialog
