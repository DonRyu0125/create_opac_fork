import InfoTable from '@/components/common/InfoTable'
import RecordAction from '@/components/common/RecordAction'
import RecordDetail from '@/components/common/RecordDetail'
import getJSONData from '@/hooks/getJSONData'
import { getFieldDataByLabel, getFieldsFromRecord, getListOfFields } from '@/lib/record'
import React from 'react'
import {  DBFields } from '../../types/record';

type Props = {}

const DetailRecord = (props: Props) => {
    const { records } = getJSONData({ selector: '#xml_record' })
    const record = records[0]
    const database = record.database_name
    const title = getFieldDataByLabel(record, database, "Title") || 'Untitled'
    const recordData: DBFields<"COLLECTIONS"> = record.record 


	const detailFields = getFieldsFromRecord(record,
		(item) => item.detail,
		(data, item) => ({label:item.label, value: data}))

	return (
		<>
			<RecordDetail heading={title} subHeading={recordData.collection}>
				<div className="flex flex-col space-y-4">
					<InfoTable
						rowsData={detailFields}
                        renderRow={(row) => <div>{row.value}</div>}
					/>

					<RecordAction />
				</div>
			</RecordDetail>
		</>
	)
}

export default DetailRecord
