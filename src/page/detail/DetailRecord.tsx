import InfoTable from '@/components/common/InfoTable'
import RecordAction from '@/components/common/RecordAction'
import RecordDetail from '@/components/common/RecordDetail'
import React from 'react'

type Props = {}

const DetailRecord = (props: Props) => {
	return (
		<>
			<RecordDetail heading={'A test record'} subHeading="by Author Jane">
				<div className="flex flex-col space-y-4">
					<InfoTable
						rowsData={[
							{
								label: 'Title',
								value: 'The Adventures of Fictional Book',
							},
							{ label: 'Author', value: 'John Authorson' },
							{ label: 'Genre', value: 'Fantasy' },
							{ label: 'Published Year', value: 2022 },
							{ label: 'ISBN', value: '978-1-2345-6789-0' },
							{ label: 'Available Copies', value: 10 },
							{
								label: 'Description',
								value: 'A captivating tale of imagination and wonder.',
							},
						]}
						renderRow={(row) => row.value}
					/>

					<RecordAction />
				</div>
			</RecordDetail>
		</>
	)
}

export default DetailRecord
