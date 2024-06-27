import { Record } from '@/types/record'
import axios from 'axios'

export const bookmarkSelect = async (session: string, recd: Record) => {
	const { database_name, record } = recd
	debugger
	return axios({
		method: 'post',
		url: `${session}?ADDSELECTION&COOKIE=BOOKMARK`,
		data: `mcheckbox_${record.sisn}=${record.sisn}-${database_name}`,
	})
}
