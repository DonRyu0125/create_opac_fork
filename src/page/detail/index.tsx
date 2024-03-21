import Layout from '@/components/layouts'
import PageAction from '@/components/common/PageAction'
import RecordDetail from '@/components/common/RecordDetail'
import SearchForm from '@/components/common/SearchForm'
import ImageCarousel from '@/components/common/ImageCarousel'
import InfoTable from '@/components/common/InfoTable'
import RecordAction from '@/components/common/RecordAction'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import getJSONData from '@/hooks/getJSONData'
import DetailRecord from './DetailRecord'

const images = [
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/6_16/9a192748_4e41_4f04_a2de_a3bc0114cb3f/preview_00433935_001.jpg',
	},
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/6_16/ae91ce34_b9b4_44a4_9f0e_a3bc011460e8/preview_00433892_001.jpg',
	},
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_11/2_1/5bcca073_26c7_4e0f_bb70_a3d7001a1c24/preview_01081548_001.jpg',
	},
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/11_3/8dc66e9f_43e1_4170_956b_a3c1003d49ec/preview_00595099_001.jpg',
	},
	{
		src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_11/9_19/c4b282ba_d905_4cff_adcb_a3de0144bc78/preview_01466623_001.jpg',
	},
]
const Detail = () => {
	const { common, backToSummary,records } = getJSONData({ selector: '#xml_record' })

    // TODO: create placeholder component when there is no data
    if (!records || records.length === 0) return <></>
	return (
		<Layout>
			<div className="rounded-[0.5rem] border bg-background shadow-md md:shadow-xl h-full flex-col flex w-full my-12">
				<PageAction
					breadcrumbs={[
						{ label: 'Home', url: '/' },
						{
							label: 'Summary',
							url: backToSummary,
						},
						{
							label: 'Detail',
							active: true,
							url: '#',
						},
					]}>
					{/* <Button>
						<SlidersHorizontal className="mr-2 h-4 w-4" />
						Advanced Search
					</Button> */}
				</PageAction>
				<section>
					<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
						<div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
							<ImageCarousel
								items={images}
								renderItems={(image) => (
									<img
										alt="test"
										src={image.src}
										className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
									/>
								)}
							/>
							<div className=" grid gap-4 md:gap-10 items-start">
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
