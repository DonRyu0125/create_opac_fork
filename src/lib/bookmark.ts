import { Record } from '@/types/record'
import axios from 'axios'

export const bookmarkSelect = async (recd: Record) => {
	const { database_name, record_link, record } = recd
	return axios({
		method: 'post',
		url: `${record_link.split('?')[0]}?ADDSELECTION&COOKIE=BOOKMARK`,
		data: `mcheckbox_${record.sisn}=${record.sisn}-${database_name}`,
	}).then((res) => res)
}
