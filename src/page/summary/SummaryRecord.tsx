import DataWithLabel from '@/components/common/DataWithLabel'
import DetailInfoCard from '@/components/common/DetailInfoCard'
import InfoCard from '@/components/common/InfoCard'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import getJSONData from '@/hooks/getJSONData'
import {
	getListOfFields,
	getFieldDataByLabel,
	deepSearchKey,
	truncateString,
	copyRecordURL,
} from '@/lib/record'
import { cn } from '@/lib/utils'
import { viewAtom } from '@/store'
import { Separator } from '@/components/ui/separator'
import { ToastAction } from '@radix-ui/react-toast'
import { useAtom } from 'jotai'
import { Heart, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import Link from '@/components/common/Link'
import { Record } from '@/types/record'
import { SummarySample } from '@/samples'

const SummaryRecords = () => {
	const { records } = getJSONData({ selector: '#xml_record' })
	// const { records } = getJSONData({ defaultData: SummarySample })

	return (
		<>
			{records.map((e, i) => (
				<RecordView record={e} key={i} />
			))}
		</>
	)
}

const RecordAction = ({ record }: { record: Record }) => {
	const [like, setLike] = useState(false)
	const { toast } = useToast()
	const sisn = deepSearchKey(record, 'sisn')[0] as string
	const database = record.database_name

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => {
					setLike(true)
					toast({
						title: like
							? 'This record has already been marked'
							: 'Record has been bookmarked',
						action: <ToastAction altText="View bookmark">View bookmark</ToastAction>,
					})
				}}>
				<Heart
					className={cn('h-4 w-4 text-primary')}
					fill={like ? 'hsl(var(--opac-blue))' : 'rgb(0,0,0,0)'}
					stroke={like ? 'hsl(var(--opac-blue))' : 'hsl(var(--primary'}
				/>
			</Button>
			<Separator orientation="vertical" />
			<Button
				variant="ghost"
				size="icon"
				onClick={() => {
					copyRecordURL(database, sisn)
					toast({
						title: 'Record URL is copied',
					})
				}}>
				<Copy className="h-4 w-4 text-primary" />
			</Button>
			<Separator orientation="vertical" />
			<Button variant="ghost" size="icon">
				<Mail className="h-4 w-4 text-primary" />
			</Button>
		</>
	)
}

const RecordView = ({ record }: { record: Record }) => {
	const [view] = useAtom(viewAtom)
	const database = record.database_name
	const recordLink = record.record_link
	const listOfFields = getListOfFields(database)
	const title = getFieldDataByLabel(record, database, "Title") || 'Untitled'

	const thumbnail =
		record.media &&
		Array.isArray(record.media.im_access_link) &&
		record.media.im_access_link.length > 0 &&
		record.media.im_access_link[0]

	const getGridFields = () => {
		return listOfFields?.items
			?.filter((item) => item.grid === true)
			.map((item) => {
				const name = item.name || 'TITLE'
				const data = deepSearchKey(record, name)
				if (data?.length > 0 && item.label !== 'Title')
					return <DataWithLabel key={item.name} label={item.label || ''} items={data} />
			})
			.filter((item) => item)
	}

	const getListFields = () => {
		return listOfFields?.items
			?.map((item) => {
				const name = item.name || 'TITLE'
				const data = deepSearchKey(record, name)
				if (data?.length > 0 && item.label !== 'Title')
					return (
						<DataWithLabel
							className="flex-col items-start justify-start my-1"
							key={item.name}
							label={item.label || ''}
							items={data}
						/>
					)
			})
			.filter((item) => item)
	}

	if (view === 'grid') {
		return (
			<InfoCard
				className="border-primary"
				title={<Link href={recordLink}>{truncateString(title)}</Link>}
				description={getGridFields()}
				thumbnail={thumbnail || 'https://www.svgrepo.com/show/451131/no-image.svg'}
				footer={
					<div className="flex h-4 items-center space-x-4 w-full justify-evenly ">
						<RecordAction record={record} />
					</div>
				}
			/>
		)
	}

	return (
		<DetailInfoCard
			title={<Link href={recordLink}>{title}</Link>}
			className="col-span-3 border-primary"
			thumbnail={thumbnail || 'https://www.svgrepo.com/show/451131/no-image.svg'}
			footer={
				<div>
					<Separator />
					<div className="flex h-12 items-center space-x-4 w-full justify-evenly ">
						<RecordAction record={record} />
					</div>
				</div>
			}>
			<div className="mt-4">{getListFields()}</div>
		</DetailInfoCard>
	)
}

export default SummaryRecords
