type Props = {
	heading: string
	subHeading?: string
}

const SectionHeader = ({ heading, subHeading }: Props) => {
	return (
		<div className="bg-[#3f4d5e] text-white font-bold px-4 py-2 w-full  rounded-t-md">
			{heading}
		</div>
	)
}

export default SectionHeader
