import Layout from '../components/layouts'
import PageHeader from '../components/common/PageHeader'
import DropdownSelect from '../components/common/DropdownSelect'
import CollapseList from '../components/common/CollapseList'
import CheckboxWithLabel from '../components/common/CheckboxWithLabel'
import { Label } from '../components/ui/label'
import InfoCard from '../components/common/InfoCard'
import PageAction from '../components/common/PageAction'
import Link from '../components/common/Link'
import { pageData, viewAtom } from '../store'
import { useAtom } from 'jotai'
import DetailInfoCard from '../components/common/DetailInfoCard'
import DataWithLabel from '../components/common/DataWithLabel'
import ViewToggle from '../components/common/ViewToggle'
import PagePagination from '../components/common/PagePagination'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { ChevronRight, Copy, Heart, Mail, SlidersHorizontal } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { deepSearchKey, getListOfFields, getTitleField, truncateString } from '@/lib/record'
import useXMLData from '@/hooks/useXMLData'
import { Record } from '@/types/record'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import SkeletonCard from '@/components/common/SkeletonCard'

const RecordAction = () => {
	const [like, setLike] = useState(false)
	const { toast } = useToast()

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
const SummaryPageAction = () => {
	const { filter } = useXMLData({ selector: '#xml_record' })
	console.log(filter)
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-2">
				<Label>Record per page</Label>
				<DropdownSelect title={'Select records number'} options={[]} />
			</div>
			<div className="flex flex-col space-y-2">
				<Label>Sort by</Label>
				<DropdownSelect title={'Sort by'} options={[]} />
			</div>

			{filter && filter.length > 0 && (
				<div className="flex flex-col space-y-2">
					<Label>Filter by</Label>
					<div className="flex flex-col space-y-4">
						{filter.map((item, index) => (
							<CollapseList title={item._title} expand={index === 0} key={item._name}>
								<div className="space-y-3  border-t p-4">
									{item.item_group.map((option) => (
										<CheckboxWithLabel
											label={`${option.item_value} (${option.item_frequency})`}
											checked={option.item_selected === 'Y'}
										/>
									))}
								</div>
							</CollapseList>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

const RecordView = ({ record }: { record: Record }) => {
	const [view] = useAtom(viewAtom)
	const database = record.database_name
	const listOfFields = getListOfFields(database)
	const { name } = getTitleField(database)
	const title = name ? deepSearchKey(record, name)[0] : 'Untitled'

	const getGridFields = () => {
		return listOfFields?.items
			?.filter((item) => item.grid === true)
			.map((item) => {
				const name = item.name || 'TITLE'
				const data = deepSearchKey(record, name)
				if (data?.length > 0 && item.label !== 'Title')
					return <DataWithLabel key={item.name} label={item.label} items={data} />
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
							label={item.label}
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
				title={<Link href="/">{truncateString(title)}</Link>}
				description={getGridFields()}
				thumbnail="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				footer={
					<div className="flex h-4 items-center space-x-4 w-full justify-evenly ">
						<RecordAction />
					</div>
				}
			/>
		)
	}

	return (
		<DetailInfoCard
			title={<Link href="/">{title}</Link>}
			className="col-span-3 border-primary"
			thumbnail="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			footer={
				<div>
					<Separator />
					<div className="flex h-12 items-center space-x-4 w-full justify-evenly ">
						<RecordAction />
					</div>
				</div>
			}>
			<div className="mt-4">{getListFields()}</div>
		</DetailInfoCard>
	)
}
export const SummaryRecords = () => {
	const { records } = useXMLData({ selector: '#xml_record' })

	if (!records) return new Array(24).fill(1).map((_, i) => <SkeletonCard key={i} />)
	return (
		<>
			{records.map((e, i) => (
				<RecordView record={e} key={i} />
			))}
		</>
	)
}

const Summary = () => {
	const [mobileFilter, setMobileFilter] = useState(false)

	const { data, common, pagination } = useXMLData({ selector: '#xml_record' })

	if (!data) return <></>
	return (
		<Layout>
			<div className="rounded-sm border border-primary bg-background shadow-md md:shadow-xl h-full flex-col flex w-full my-12">
				<PageAction
					breadcrumbs={[
						{ label: 'Home', url: '/' },
						{
							label: 'Summary',
							url: '/summary',
							active: true,
						},
					]}>
					<div className="flex w-full flex-row space-x-2 justify-end">
						{/* <Button>
							<SlidersHorizontal className="mr-2 h-4 w-4" />
							Advanced Search
						</Button> */}
						{/* <Separator orientation="vertical" /> */}
						<ViewToggle />
					</div>
				</PageAction>

				<section>
					<div className="mx-auto  py-4   sm:py-12  container flex flex-col">
						<PageHeader
							heading={`${common.total_record} results for "${common.search_statement}"`}
							subHeading={`Displaying ${common.first_record_seq}-${common.last_record_seq} of ${common.total_record}`}
						/>
						<div className="mt-8 block lg:hidden">
							<Button
								className="flex cursor-pointer items-center gap-2 border-b "
								onClick={() => setMobileFilter(true)}>
								<span className="font-medium"> Filters & Sorting </span>
								<ChevronRight className="h-4 w-4" />
							</Button>
							<Sheet open={mobileFilter} onOpenChange={setMobileFilter}>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Filters & Sorting</SheetTitle>
									</SheetHeader>
									<div className="mt-6">
										<SummaryPageAction />
									</div>
								</SheetContent>
							</Sheet>
						</div>

						<div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 ">
							<div className="hidden space-y-4 lg:block col-span-1">
								<SummaryPageAction />
							</div>
							<div className="col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
								<SummaryRecords />
							</div>

							{pagination?.a && pagination.a.length > 0 && (
								<div className="col-span-4 mt-4">
									<PagePagination
										items={pagination.a.map((item) => ({
											url: item._href,
											active: item.b !== undefined,
										}))}
										renderItem={(_, index) => (
											<span key={index}>{index + 1}</span>
										)}
									/>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default Summary
