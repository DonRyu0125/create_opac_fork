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
import { deepSearchKey } from '@/lib/record'
import useXMLData from '@/hooks/useXMLData'
import { useMetadata } from '@/hooks/useMetadata'

const RecordAction = () => {
	const [like, setLike] = useState(false)
	return (
		<>
			<Button variant="ghost" size="icon" onClick={() => setLike(!like)}>
				<Heart
					className={cn('h-4 w-4 text-primary')}
					fill={like ? 'hsl(var(--primary))' : 'rgb(0,0,0,0)'}
				/>
			</Button>
			<Separator orientation="vertical" />
			<Button variant="ghost" size="icon">
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
	const [data] = useAtom(pageData)
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

			<div className="flex flex-col space-y-2">
				<Label>Filter by</Label>
				<div className="flex flex-col space-y-4">
					<CollapseList title="Date" expand={true}>
						<div className="space-y-3  border-t p-4">
							<CheckboxWithLabel label="1994" checked />
							<CheckboxWithLabel label="1995" />
							<CheckboxWithLabel label="1996" />
							<CheckboxWithLabel label="1997" />
						</div>
					</CollapseList>
				</div>
			</div>
		</div>
	)
}

const RecordView = ({ record }) => {
	const [view] = useAtom(viewAtom)
	const title = deepSearchKey(record, 'legal_title')
	const description = deepSearchKey(record, 'obj_description')
	const id = deepSearchKey(record, 'accession_number')
	if (view === 'grid') {
		return (
			<InfoCard
				className="border-primary"
				title={title.map((e) => (
					<Link href="/">{e}</Link>
				))}
				description={`ID:${id[0]}`}
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
			title={title.map((e) => (
				<Link href="/">{e}</Link>
			))}
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
			<div className="mt-4">
				<DataWithLabel label={'Date'} items={['1242']} />
				<DataWithLabel label={'Reference Code'} items={[id[0]]} />
				<DataWithLabel label={'Level'} items={['Item']} />
				<DataWithLabel label={'Scope'} items={['1242']} />
			</div>
		</DetailInfoCard>
	)
}
export const SummaryRecords = ({ records }) => {
	if (!records) return null
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

	const { data, common } = useXMLData({ selector: '#xml_record' })

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
						<Button>
							<SlidersHorizontal className="mr-2 h-4 w-4" />
							Advanced Search
						</Button>
						<Separator orientation="vertical" />
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
								<SummaryRecords records={deepSearchKey(data, 'record')} />
							</div>

							<div className="col-span-4 mt-4">
								<PagePagination
									previous="/"
									next={'/'}
									items={[
										{ url: '12', active: true },
										{ url: '12' },
										{ url: '41' },
									]}
									renderItem={(_, index) => <span key={index}>{index + 1}</span>}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default Summary
