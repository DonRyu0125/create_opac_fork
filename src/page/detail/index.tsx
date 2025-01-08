import ImageCarousel, { ImageProps, VideoProps } from '@/components/common/ImageCarousel'
import PageAction from '@/components/common/PageAction'
import SearchForm from '@/components/common/search-form/SearchForm'
import Layout from '@/components/layouts'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import DetailRecord from './DetailRecord'

const Detail = () => {
	const { backToSummary, records, getMedia, common } = useJSONData({ selector: '#xml_record' })
	const images =
		getMedia(records[0], 'im_access_link')?.map((e) => ({
			src: e.includes('[MEDIA]') ? e.replace('[MEDIA]', '/media/') : e,
		})) || []
	const videos: VideoProps[] =
		getMedia(records[0], 'vd_access_link')?.map((e) => ({
			type: 'video',
			width: 1280,
			height: 720,
			sources: [
				{
					src: e.includes('[MEDIA]') ? e.replace('[MEDIA]', '/media/') : e,
					type: 'video/mp4',
				},
			],
		})) || []
	const { message } = useConstants()
	// TODO: create placeholder component when there is no data

	if (!records || records.length === 0) return <></>
	return (
		<Layout>
			<div className="rounded-[0.5rem] border bg-background shadow-md md:shadow-xl h-full flex-col flex w-full my-12">
				<PageAction
					breadcrumbs={[
						{ label: message.home, url: '/' },
						{
							label: `${records[0].database_name === 'SELECTION_LIST' ? message.bookmarkPage : message.summaryPage}`,
							url: backToSummary,
						},
						{
							label: message.detailPage,
							active: true,
							url: '#',
						},
					]}>
					{/* <Button>
						<SlidersHorizontal className="mr-2 h-4 w-4" />
						Advanced Search
					</Button> */}
					<div className="flex w-full flex-row space-x-2 justify-end">
						{/* <Button>
							<SlidersHorizontal className="mr-2 h-4 w-4" />
							Advanced Search
						</Button> */}
						{/* <Separator orientation="vertical" /> */}
						<SearchForm
							className="w-[450px] m-0"
							inputStyle="text-black"
							inputName={'KEYWORD_CLUSTER'}
							action={`${common.session}?UNIONSEARCH&SIMPLE_EXP=Y&ERRMSG=[MESSAGES]no-record.html&REPORT=WEB_UNION_SUM&APPLICATION=UNION_VIEW&DATABASE=${records[0].database_name}`}
						/>
					</div>
				</PageAction>
				<section>
					<div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
						<div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-8 items-start p-4 mx-auto ">
							<div className="max-w-[700px] text-center mx-auto">
								{images && images.length > 0 ? (
									<ImageCarousel
										items={[...images, ...videos]}
										renderItems={(item) => {
											if (!(item as ImageProps).src) {
												const video = item as VideoProps
												return (
													<img
														alt={'video thumbnail'}
														src={
															'https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif'
														}
														className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
													/>
												)
											}

											const image = item as ImageProps
											return (
												<img
													alt={image.caption}
													src={image.src}
													className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
												/>
											)
										}}
									/>
								) : (
									<>
										<img
											alt={message.noMediaFound}
											src={'https://placehold.co/250x250'}
											className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
										/>
										<span>{message.noMediaFound}</span>
									</>
								)}
							</div>
							<div className="w-full lg:w-1/2 grid gap-4 md:gap-10 items-start ">
								<DetailRecord />
							</div>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default Detail
