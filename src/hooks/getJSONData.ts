import { GenericObject, deepSearchKey } from '@/lib/record'
import { useEffect, useState } from 'react'
import X2JS from 'x2js'
import summary from '../samples/summary.json'
import { FilterItem } from '@/types/filter'
import { Pagination } from '@/types/pagination'
import { Record } from '@/types/record'
type Props = {
	selector?: string
	defaultData?: GenericObject
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
	if (!id) return null
	const xml = getRecordXML(id)
	if (xml) {
		try {
			const x2js = new X2JS({
				arrayAccessFormPaths: ['xml.xml_record', 'xml.div.xml.filter.item_group'],
			})
			const xmlString = new XMLSerializer().serializeToString(xml)
			const json = x2js.xml2js(xmlString) as GenericObject
			console.log(json)
			return json
		} catch (error) {
			console.log(error)
		}
	}
	return null
}

const getJSONData = ({ selector, defaultData }: Props) => {
	const [data] = useState<GenericObject | null>(
		defaultData && !selector ? defaultData : selector ? getDataFromXML(selector) : null
	)

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

	const getBackToSummary = (): string => {
		if (!data) return ''
		const url = deepSearchKey(data, 'back_to_summary')[0]
		if (!url) return ''

		return url.a.__href
	}

	const common = getCommonFields()
	const pagination = getPaginations()
	const filter = getFilter()
	const records = getRecords()
	const backToSummary = getBackToSummary()

	return { data, common, pagination, filter, records, backToSummary }
}

export default getJSONData
