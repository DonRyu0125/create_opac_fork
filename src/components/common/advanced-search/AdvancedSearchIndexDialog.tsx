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
import { Menu, Search, X } from 'lucide-react'
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
import { selected } from './AdvancedSearchInput'

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
	name: string
	bg: string
}

interface Adv_dialog {
	field: selected | undefined
	updateField: Function
	setText: (text: string) => void
	adv_search_index: number
}

const DEFAULT_OPTION_COLOR = 'bg-white'
const SELECT_OPTION_COLOR = 'bg-green-200'

const AdvancedSearchIndexDialog = ({
	field,
	updateField,
	setText,
	adv_search_index,
}: Adv_dialog) => {
	const { message } = useConstants()
	const [open, setOpen] = useState(false)
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
		let nOptions: option[] = list.cluster?.index_list?.option.map((item: string) => {
			return {
				name: item,
				bg: DEFAULT_OPTION_COLOR,
			}
		})

		setCluster(list.cluster)
		setOptions(nOptions ?? [])
	}

	const handleKeyvalueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyvalue(event.target.value)
	}

	const handleSubmit = () => {
		if (!userSelect) return toast({ title: `${message.advIdxSubmitWarnMsg}` })
		updateField('keyword', userSelect, adv_search_index)
		setText(userSelect)
		setOptions([])
		setKeyvalue('')
		setOpen(false)
	}

	const optionClick = (name: string, selected_key: number) => {
		let list = options
		let n_list = list.map((item, key) => {
			if (key === selected_key) {
				return {
					...item,
					bg: SELECT_OPTION_COLOR,
				}
			}
			return {
				...item,
				bg: DEFAULT_OPTION_COLOR,
			}
		})
		setOptions(n_list)
		setUserSelect(name)
	}

	const openDialog = () => {
		if (!field) return toast({ title: `${message.advIdxSelectWarnMsg}` })
		setOpen(true)
		getCluster(field.name)
	}

	return (
		<Dialog open={open}>
			<DialogTrigger asChild onClick={openDialog}>
				<Button
					className={
						'h-full w-[50px] px-0 flex items-center justify-center overflow-hidden ml-3 bg-opac-green '
					}>
					<Menu />
				</Button>
			</DialogTrigger>
			<DialogContent hideClose={'hidden'}>
				<div className={'w-full flex justify-center items-center relative'}>
					<DialogHeader className={'font-bold text-2xl'}>
						Browse Cluster for '{field?.label}'{' '}
					</DialogHeader>
					<button className={'absolute right-1'} onClick={() => setOpen(false)}>
						<X className={'h-6 w-6'} />
					</button>
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
						className="right-0 top-0 h-full bg-opac-green rounded-l-lg "
						type="submit">
						<span className="block">
							<Search className="w-4 h-4" />
						</span>
					</Button>
				</div>
				<div className={'flex w-full justify-between'}>
					<Button
						className={'min-w-[85px] font-bold'}
						onClick={() => pageAction(cluster.first_page)}>
						{message.fisrt}
					</Button>
					<Button
						className={'min-w-[85px] font-bold'}
						onClick={() => pageAction(cluster.last_page)}>
						{message.last}
					</Button>
				</div>
				<ScrollAreaRoot className={'w-full'}>
					<ScrollAreaViewport>
						<div className="py-[15px] px-5">
							{options?.length > 1 ? (
								options?.map((item: option, key) => (
									<div
										className={`${item.bg} cursor-pointer text-mauve12 text-[13px] leading-[18px] p-2.5 border-t border-t-mauve6`}
										onDoubleClick={handleSubmit}
										onClick={() => optionClick(item.name, key)}
										key={key}>
										{item.name}
									</div>
								))
							) : (
								<div>{message.NoKeyFound}</div>
							)}
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
					<Button
						onClick={() => pageAction(cluster.prev_page)}
						className={'min-w-[85px] font-bold'}>
						{message.previous}
					</Button>
					<Button
						className={'min-w-[85px] font-bold'}
						onClick={() => pageAction(cluster.next_page)}>
						{message.next}
					</Button>
				</div>

				<DialogFooter
					className={
						'relative w-full flex absolute bottom-1 relative md:justify-center md:items-center'
					}>
					<Button className={'min-w-[85px] font-bold'} onClick={handleSubmit}>
						{message.submit}
					</Button>
					<Button
						className={'absolute right-0 min-w-[85px] bg-red-600 font-bold'}
						onClick={() => setOpen(false)}>
						{message.close}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AdvancedSearchIndexDialog
