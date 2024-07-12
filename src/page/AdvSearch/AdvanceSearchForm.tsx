import React, { useState } from 'react'
import AdvanceSearchInput from './AdvanceSearchInput'
import { CircleMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useConstants from '@/hooks/useConstants'
type Advanced_Search_Props = {
	database_name: string
	url: string
}

const AdvanceSearchForm = ({ database_name, url }: Advanced_Search_Props) => {
	const { message, home } = useConstants()
	const { searchURL: url } = home
	const { session } = common

	const [searchExp, setSearchExp] = useState([
		{ field: 'REFD', keyword: '', boolean: 'and' },
		{ field: 'REFD', keyword: '', boolean: 'and' },
		{ field: 'REFD', keyword: '' },
	])

	const updateField = (key, value, index) => {
		const newSearchExp: any = [...searchExp]
		newSearchExp[index][key] = value
		setSearchExp(newSearchExp)
	}

	const removeField = (index) => {
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

	// exp kc wildcard
	//

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
		<div className={'w-full h-full min-h-[475px] flex flex-col justify-center items-center'}>
			<form
				method="POST"
				id="advancedSearchForm"
				action={`${url}&database=${database_name}`}
				className={'w-3/4 h-full '}>
				<input name="QUERY_EXPRESSION" hidden id="advancedSearchInput" />
			</form>
			{searchExp.map((exp, index) => (
				<>
					<AdvanceSearchInput updateField={updateField} exp={exp} index={index} />
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
				</>
			))}
			<Button
				variant={'default'}
				className="right-0 top-0 h-full bg-opac-green"
				onClick={submitSearch}>
				<span className=" block">Search</span>
			</Button>
			<Button style={{ width: 200, marginTop: '40px' }} onClick={addField}>
				Add field
			</Button>
		</div>
	)
}

export default AdvanceSearchForm
