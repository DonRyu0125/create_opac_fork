import { GenericObject, deepSearchKey } from '@/lib/record'
import { useEffect, useState } from 'react'
import X2JS from 'x2js'
import summary from '../samples/summary.json'
import { FilterItem } from '@/types/filter'
import { Pagination } from '@/types/pagination'
import { Record } from '@/types/record'
type Props = {
	selector: string
}

const COMMON_FIELDS = [
	'session',
	'bookmark_count',
	'query_statement',
	'search_statement',
	'first_record_seq',
	'last_record_seq',
	'bookmark_url',
	'total_record',
] as const

type COMMON_FIELDS_TYPE = (typeof COMMON_FIELDS)[number]

type COMMON_FIELDS_OBJECT = {
	[key in COMMON_FIELDS_TYPE]?: string | number
}

export const getRecordXML = (id: string) => {
	return document.querySelector(id) || null
}

export const getDataFromXML = (id: string) => {
	const xml = getRecordXML(id)
	if (xml) {
		try {
			const x2js = new X2JS({
				arrayAccessFormPaths: ['xml_record'],
			})
			const xmlString = new XMLSerializer().serializeToString(xml)
			const json = x2js.xml2js(xmlString) as GenericObject

			return json
		} catch (error) {
			console.log(error)
		}
	}
	return null
}

const useXMLData = ({ selector }: Props) => {
	const [data, setData] = useState<GenericObject | null>(null)

	// const jsonData = getDataFromXML(selector)
	const jsonData = summary

	useEffect(() => {
		setData(jsonData)
	}, [])

	const getCommonFields = () => {
		const object: COMMON_FIELDS_OBJECT = {}
		if (!data) return object
		COMMON_FIELDS.map((key) => {
			const value = deepSearchKey(data, key)
			if (value?.length > 0) {
				object[key] = value[0] as string
			}
		})

		return object
	}

	const getPaginations = (): Pagination | null => {
		if (!data) return null

		const pagination: Pagination = deepSearchKey(data, 'pagination')[0]
		if (!pagination) {
			return null
		}

		return pagination
	}

	const getFilter = (): FilterItem[] => {
		if (!data) return []

		const filterList: FilterItem[] = deepSearchKey(data, 'filter')[0]
		if (!filterList) {
			return []
		}
		return filterList
	}

	const getRecords = (): Record[] => {
		if (!data) return []

		const records: Record[] = deepSearchKey(data, 'xml_record')[0]
		if (!records) {
			return []
		}
		return records
	}

	const common = getCommonFields()
	const pagination = getPaginations()
	const filter = getFilter()
	const records = getRecords()

	return { data, common, pagination, filter, records }
}

export default useXMLData
