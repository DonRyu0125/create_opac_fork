import { db } from '@/db/client'
import { useLiveQuery } from 'dexie-react-hooks'

export const useLanguage = () => {
	const languageArray = useLiveQuery(() => db.language.toArray())

	const languageCode =
		(languageArray && Array.isArray(languageArray) && languageArray[0]?.code) || 'EN'
	return languageCode
}
