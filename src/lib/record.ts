/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldsJson, Items } from '@/types/fieldsjson.d.ts'
import { fields } from '@/constants/index'
import axios, { AxiosResponse } from 'axios'
import copy from 'copy-to-clipboard'
import { Record } from '@/types/record'
const DEFAULT_DETAIL_REPORT = 'WEB_UNION_DETAIL'
const DEFAULT_SUM_REPORT = 'WEB_UNION_SUM'
const WEB_DNS = 'http://opactemplate.minisisinc.com'

export type GenericObject = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export function deepSearchKey<T extends GenericObject>(obj: T, targetKey: string): any[] {
	const result: any[] = []

	function search(obj: GenericObject, targetKey: string) {
		for (const key in obj) {
			if (key.toLowerCase() === targetKey.toLowerCase()) {
				result.push(obj[key])
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				search(obj[key], targetKey)
			}
		}
	}

	search(obj, targetKey)
	return result
}

export const getListOfFields = (database: string) => {
	const databaseFields = (fields as FieldsJson).find((f) => f.database === database)
	return databaseFields
}


export const getFieldsFromRecord = (record: Record, filterFn: (e:Items) => boolean, componentFn: (data: any[], item:Items)=>React.ReactNode | object | null ) => {
	const database = record.database_name;
	const listOfFields = getListOfFields(database)
	return listOfFields?.items
			?.filter((item:Items)=>filterFn(item))
			.map((item:Items) => {
				const name = item.name || 'TITLE'
				const data = deepSearchKey(record, name)
				if (data?.length > 0 && item.label !== 'Title')
					return componentFn(data,item)
			})
			.filter((item:Items) => item)
	
}
export const getFieldDataByLabel = (record: Record, database: string, label = 'Title') => {
	const fieldLabel = getListOfFields(database)?.items?.filter((e) => e.label === label)[0]?.name
	return fieldLabel ? deepSearchKey(record, fieldLabel)[0] : null
}

export const truncateString = (text: string, maxChars = 50, postfix = '...') => {
	return text.length < maxChars ? text : text.substring(0, maxChars) + postfix
}

export const bookmarkRecord = async (sessionId: string, database: string, sisn: string) => {
	return axios({
		method: 'post',
		url: `${sessionId}?ADDSELECTION&COOKIE=BOOKMARK`,
		data: `mcheckbox_${sisn}=${sisn}-${database}`,
	})
		.then((res) => res)
		.catch((err) => {
			console.error('Error while bookmarking record', err)
		})
}

export const getRecordPermalink = (
	database: string,
	sisn: string,
	report = DEFAULT_DETAIL_REPORT,
	lang = 144
) => {
	return `${WEB_DNS}/scripts/mwimain.dll/${lang}/${database}/${report}?sessionsearch&exp=SISN+${sisn}`
}

export const copyRecordURL = (database: string, sisn: string, report = DEFAULT_DETAIL_REPORT) => {
	try {
		const url = getRecordPermalink(database, sisn, report)
		copy(url)
	} catch (error) {
		console.error(error)
	}
}
