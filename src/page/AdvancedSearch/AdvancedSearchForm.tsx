import React, { useState } from 'react'
import AdvancedSearchInput from './AdvancedSearchInput'
import { CircleMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useConstants from '@/hooks/useConstants'

type FieldObject = {
    field: string;
    keyword: string;
    boolean?: string;
};

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

const Advanced_Search_Boolean = {
	And:"and",
	Or:"or",
	Not:"not"
}

export type Adv_Search_Type = keyof typeof Advanced_Search_Boolean

const AdvancedSearchForm = ({ database_name, url }: Advanced_Search_Props) => {
	const { message, home } = useConstants()

	const [searchExp, setSearchExp] = useState<FieldObject[]>([
		{ field: 'REFD', keyword: '', boolean: Advanced_Search_Boolean.And },
		{ field: 'REFD', keyword: '', boolean: Advanced_Search_Boolean.And },
		{ field: 'REFD', keyword: '' },
	])

	const updateField = (key:string, value:string, index:string) => {
		const newSearchExp: any = [...searchExp]
		newSearchExp[index][key] = value
		setSearchExp(newSearchExp)
	}

	const removeField = (index:number) => {
		const newSearchExp = [...searchExp]
		newSearchExp.splice(index, 1)
		if (newSearchExp.length > 0) {
			newSearchExp[newSearchExp.length - 1].boolean = undefined
		}
		setSearchExp(newSearchExp)
	}

	const addField = () => {
		const newSearchExp = [...searchExp]
		newSearchExp[newSearchExp.length - 1].boolean = 'and'
		newSearchExp.push({ field: 'REFD', keyword: '', boolean: 'and', remove: true })
		setSearchExp(newSearchExp)
	}

	const resetFields = () => {
		setSearchExp([
			{ field: 'REFD', keyword: '', boolean: 'and' },
			{ field: 'REFD', keyword: '', boolean: 'and' },
			{ field: 'REFD', keyword: '' },
		])
	}

	const submitSearch = () => {
		// let data = searchExp.filter((e) => e.keyword !== "");
		// let len = data.length;
		// data = data
		//   .map(
		// 	(exp, index) =>
		// 	  `${exp.field} ${exp.keyword} ${exp.boolean && index !== len - 1 ? exp.boolean : ""}`
		//   )
		//   .join(" ");
		// document.getElementById('advancedSearchInput').value = 'title ontario'
		// document.getElementById('advancedSearchForm').submit()
	}

	return (
		<div className={'w-full h-full flex flex-col justify-center items-center bg-slate-300'}>
			<form
				method="POST"
				id="advancedSearchForm"
				action={`${url}&database=${database_name}`}
				className={'w-full h-full '}>
				<input name="QUERY_EXPRESSION" hidden id="advancedSearchInput" />
			</form>
			{searchExp.map((exp, index) => (
				<div className={'w-full flex items-center'}>
					<AdvancedSearchInput updateField={updateField} exp={exp} index={index} />
					{index >= 3 ? (
						<CircleMinus
							className="dynamic-delete-button"
							type="minus-circle-o"
							onClick={(_) => {
								removeField(index)
							}}
						/>
					) : (
						<span className="dynamic-delete-button" style={{ width: '24px' }}></span>
					)}
				</div>
			))}
			<Button onClick={addField}>
				Add field
			</Button>
			<Button
				variant={'default'}
				className="w-4/6 mt-10"
				onClick={submitSearch}>
				<span className=" block">Search</span>
			</Button>
		</div>
	)
}

export default AdvancedSearchForm
