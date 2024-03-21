import InfoTable from '@/components/common/InfoTable'
import RecordAction from '@/components/common/RecordAction'
import RecordDetail from '@/components/common/RecordDetail'
import getJSONData from '@/hooks/getJSONData'
import { getFieldDataByLabel } from '@/lib/record'
import React from 'react'
import {  DBFields } from '../../types/record';

type Props = {}

const DetailRecord = (props: Props) => {
    const { records } = getJSONData({ selector: '#xml_record' })
    const record = records[0]
    const database = record.database_name
    const title = getFieldDataByLabel(record, database, "Title") || 'Untitled'
    const recordData: DBFields<"COLLECTIONS"> = record.record 
    recordData
	return (
		<>
			<RecordDetail heading={title} subHeading="by Author Jane">
				<div className="flex flex-col space-y-4">
					<InfoTable
						rowsData={[
							{
								label: 'Title',
								value: recordData.sisn,
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
