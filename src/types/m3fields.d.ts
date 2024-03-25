export interface M3Fields {
	sisn: string
	accession_number: string
	collection: string
	on_display: string
	early: string
	legal_title: string
	number_of_parts: string
	object_name_grp: {
		object_name_grp_occurrence: {
			object_name: string
			_occ: string
		}
	}
	object_status: string
	primary: string
	cur_grp: {
		cur_grp_occurrence: {
			cur_grp_curator: string
			_occ: string
		}
	}
	obj_description: string
	assoc_person_grp: {
		assoc_person_grp_occurrence: {
			assoc_forename?: string
			assoc_full_id: string
			assoc_surname?: string
			assoc_title?: string
			assoc_fullname?: string
			_occ: string
		}[]
	}
	assoc_org_grp: {
		assoc_org_grp_occurrence: {
			org_assoc: string
			assoc_org_id: string
			_occ: string
		}
	}
	dimensions_info: {
		dimensions_info_occurrence: {
			dimension_notes: string
			dim_source: string
			_occ: string
		}
	}
	other_num_group: {
		other_num_group_occurrence: {
			other_number: string
			_occ: string
		}
	}
	label_txt_group: {
		label_txt_group_occurrence: {
			public: string
			_occ: string
		}
	}
	acq_date: string
	acq_method: string
	acq_source_grp: {
		acq_source_grp_occurrence: {
			acq_source: string
			acq_source_id?: string
			acq_org_id?: string
			acq_source_org?: string
			_occ: string
		}[]
	}
	planned_loc_grp: {
		planned_loc_grp_occurrence: {
			plnd_cur_code: string
			plnd_bldg: string
			moved_flag?: string
			plnd_access?: string
			plnd_loc_type?: string
			pland_remov_date?: string
			plnd_move_ex?: string
			_occ: string
		}[]
	}
	current_loc_info: {
		current_loc_info_occurrence: {
			curators_code: string
			building: string
			floor?: string
			room?: string
			position?: string
			location_date?: string
			movement_author?: string
			movement_ref_num?: string
			loc_access?: string
			location_type?: string
			move_ex?: string
			_occ: string
		}[]
	}
	conserve_info: {
		conserve_info_occurrence: {
			exam_treat: string
			condition: string
			condn_chk_person: string
			cond_chk_notes: string
			_occ: string
		}
	}
	c_bldg: string
	c_loc_date: string
	c_move_ex: string
	p_cur_code: string
	p_bldg: string
	p_flr: string
	p_bu: string
	p_ma: string
	p_r_date: string
	p_move_ex: string
	tree_id: string
	material_group: {
		material_group_occurrence: {
			material: string
			_occ: string
		}[]
	}
	discipline: string
	c_cur_code: string
	old_sisn: string
	record_number: string
	assoc_whole: {
		assoc_whole_occurrence: {
			_occ: string
			__text: string
		}[]
	}
}
