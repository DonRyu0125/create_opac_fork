import React, { useRef, useState } from 'react'
import AdvancedSearchInput from './AdvancedSearchInput'
import { CircleMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export type FieldObject = {
	field: string
	keyword: string
	boolean?: string
	remove?: boolean
}

type Advanced_Search_Props = {
	database_name: string
	url: string
}

export const STATUS_TYPE = {
	Invalid: 'Invalid',
	Success: 'Success',
	Confirm: 'Confirm',
	Cancel: 'Cancel',
	OutDate: 'OutDate',
	InList: 'InList', // Already registered
	Full: 'Full', // Fully registered
	Expired: 'Expired',
} as const

export const ADVANCED_SEARCH_BOOLEAN = {
	AND: 'AND',
	OR: 'OR',
	NOT: 'NOT',
}

export type Adv_Search_Type = keyof typeof ADVANCED_SEARCH_BOOLEAN

const AdvancedSearchForm = ({ database_name, url }: Advanced_Search_Props) => {
	const [searchExp, setSearchExp] = useState<FieldObject[]>([
		{ field: '', keyword: '', boolean: ADVANCED_SEARCH_BOOLEAN.AND },
		{ field: '', keyword: '', boolean: ADVANCED_SEARCH_BOOLEAN.AND },
		{ field: '', keyword: '' },
	])
	const formRef = useRef<HTMLFormElement>(null)
	const inputRef = useRef<any>(null)

	const updateField = (key: string, value: string, index: string) => {
		const newSearchExp: any = [...searchExp]
		newSearchExp[index][key] = value
		setSearchExp(newSearchExp)
	}

	const removeField = (index: number) => {
		const newSearchExp = [...searchExp]
		newSearchExp.splice(index, 1)
		if (newSearchExp.length > 0) {
			newSearchExp[newSearchExp.length - 1].boolean = undefined
		}
		setSearchExp(newSearchExp)
	}

	const addField = () => {
		const newSearchExp = [...searchExp]
		newSearchExp[newSearchExp.length - 1].boolean = ADVANCED_SEARCH_BOOLEAN.AND
		newSearchExp.push({ field: '', keyword: '', remove: true })
		setSearchExp(newSearchExp)
	}

	const resetFields = () => {
		setSearchExp([
			{ field: '', keyword: '', boolean: ADVANCED_SEARCH_BOOLEAN.AND },
			{ field: '', keyword: '', boolean: ADVANCED_SEARCH_BOOLEAN.AND },
			{ field: '', keyword: '' },
		])
	}

	const submitSearch = () => {
		let data = searchExp.filter((e) => e.keyword !== '')
		if (data.length < 1) {
			toast({
				title: 'Please enter your search!',
			})
		}
		let len = data.length
		let qry = data
			.map(
				(exp, index) =>
					`${exp.field} ${exp.keyword} ${exp.boolean && index !== len - 1 ? exp.boolean : ''}`
			)
			.join(' ')

		inputRef.current.value = qry
		formRef.current?.submit()
	}

	return (
		<div
			className={
				'w-full h-full min-h-[100vh] my-8 flex flex-col justify-center items-center'
			}>
			<div className={'w-5/6 flex flex-col justify-center items-center bg-slate-200 py-11'}>
				<h2 className={'text-4xl'}>Advanced Search</h2>
				<form
					ref={formRef}
					method="POST"
					id="advancedSearchForm"
					action={`${url}`}
					className={'hidden '}>
					<input name="QUERY_EXPRESSION" ref={inputRef} hidden id="advancedSearchInput" />
				</form>
				<div className={'w-4/6'}>
					{searchExp.map((exp, index) => (
						<div className={'w-full flex items-center justify-center'} key={index}>
							<AdvancedSearchInput
								updateField={updateField}
								exp={exp}
								index={index}
								database_name={database_name}
							/>
							{index >= 3 ? (
								<CircleMinus
									key={index}
									className="dynamic-delete-button"
									type="minus-circle-o"
									onClick={(_) => {
										removeField(index)
									}}
								/>
							) : (
								<span
									className="dynamic-delete-button"
									style={{ width: '24px' }}></span>
							)}
						</div>
					))}
				</div>
				<Button onClick={addField}>Add field</Button>
				<div className="w-4/6 mt-10 flex justify-between">
					<Button variant={'default'} className={'w-[45%]'} onClick={submitSearch}>
						<span className=" block">Search</span>
					</Button>
					<Button variant={'default'} className={'w-[45%]'} onClick={resetFields}>
						<span className=" block">Clear</span>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AdvancedSearchForm
