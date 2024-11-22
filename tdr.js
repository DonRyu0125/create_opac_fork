/*
  M3 Online Data Entry
  Interface Handling
  v2.0

  Jon West - MINISIS Inc
  February 2015
*/

// RL-2020-11-10
// declare global constants
const MAX_WEB_CHARS = 62;
const MAX_BYTE2_VALUE = (256 - MAX_WEB_CHARS);
const CURRENTUSER_KW = "currentUser";
const USERWELCOME_KW = "userWelcome";

// rl-2020-09-29
var currentAppInterface = null;

function ApplicationInterface(record, params) {
    var app_interface = this;

    // RL-2020-09-29
    this.app_record = record;

    // rl-2020-09-29
    currentAppInterface = this;

    // rl-2020-09-29
    this.readonly_record = false;
    if (record.readonly_flag != undefined) {
        this.readonly_record = record.readonly_flag;
    }

    // RL-2020-12-10
    if (popupWindow()) {
        if (typeof parent.modal_skip_record_link != 'undefined') {
            parent.modal_skip_record_link = site_params.skip_link;
        }

        // remove links in modal dialog
        removeModalLinks(false);
    }

    params = (typeof params !== 'undefined') ? params : {
        'form_container': '#data_entry_forms',
        'overlay': '#temporary_overlay',
        'group_title': 'li.repeating_group_title',
        'group_container': 'fieldset.repeating_group',
        'group_occurrence': 'li.repeating_group_current_occurrence',
        'group_total_occurrences': 'li.repeating_group_total_occurrences',
        'browse_field_container': '[class*=validated_field]',
        'r_field': 'div.repeating_field input',
        'r_field_container': 'div.repeating_field',
        'r_field_occurrence': 'li.current_occurrence',
        'r_field_total_occurrences': 'li.total_occurrences',
        'context_menu': 'ul#repeating_menu',
        'record_image': 'div.img_container img',
        'image_group': 'image_group',
        'tooltip_elements': '#data_entry_forms label, #CANCEL_MOVE, #MOVE_BUTTON, #GET_LOC_BTN',
        'image_virtual_directory': '[M2AIMAGE]',
        'image_url_path': 'https://fordm2a.minisisinc.com/m2aonline/m2aimage/',
        'contains_image': 'fieldset.contains_image div.image input',
        'base_url': 'https://fordm2a.minisisinc.com/m2aonline/scripts/mwimain.dll/144',
        'sessid': $.cookie('HOME_SESSID'),
        'valtable_view_links': {
            'm2a': '/DES_VALTAB/WEB_VALTABLE_DET_REP/REFD%20%3D%3D%20',
            'acc': '/ACC_VALTAB/WEB_VALTABLE_DET_REP/ACCNO%20%3D%3D%20',
            'enq': '/M2A_ENQUIRIES/WEB_VALTABLE_DET_REP/ENQUIRY_NUMBER%20%3D%3D%20',
            'org': '/M2A_ORGANIZATIONS/WEB_VALTABLE_DET_REP/ORG_ID%20%3D%3D%20',
            'people': '/M2A_PEOPLE/WEB_VALTABLE_DET_REP/PERSON_ID%20%3D%3D%20',
            'loc': '/M2A_LOCATIONS/WEB_VALTABLE_DET_REP/CURATORS_CODE%20%3D%3D%20',
            'loans': '/M2A_LOAN_OUT/WEB_VALTABLE_DET_REP/CURATORS_CODE%20%3D%3D%20',
            'schedule': '/M2A_SCHEDULE_VAL/WEB_VALTABLE_DET_REP/SCHEDULE_ID%20%3D%3D%20',
            'color': '/M2A_COLOR/WEB_VALTABLE_DET_REP/LOOKUP_FIELD%20%3D%3D%20',
            'place': '/M2A_PLACE/WEB_VALTABLE_DET_REP/PLACE%20%3D%3D%20',
            'design': '/M2A_DESIGN/WEB_VALTABLE_DET_REP/DESIGN_CONCEPT%20%3D%3D%20',
            'publication': '/M2A_PUBLICATION/WEB_VALTABLE_DET_REP/PUBLICATION%20%3D%3D%20',
            'fordmake': '/M2A_MAKE/WEB_VALTABLE_DET_REP/LOOKUP_FIELD%20%3D%3D%20',
            'fordmodel': '/M2A_MODEL/WEB_VALTABLE_DET_REP/LOOKUP_FIELD%20%3D%3D%20',
            'mformat': '/M2A_MFORMAT/WEB_VALTABLE_DET_REP/LOOKUP_FIELD%20%3D%3D%20',
            'fordformat': '/M2A_FORMAT/WEB_VALTABLE_DET_REP/LOOKUP_FIELD%20%3D%3D%20',
            'restrictions': '/M2A_RES_VALTAB/WEB_VALTABLE_DET_REP/REST_ID%20%3D%3D%20'
        },
        'valtable_query_links': {
            'm2a': '/DES_VALTAB?DIRECTSEARCH',
            'acc': '/ACC_VALTAB?DIRECTSEARCH',
            'enq': '/M2A_ENQ_VALTAB?DIRECTSEARCH',
            'color': '/M2A_COLOR_VALTAB?DIRECTSEARCH',
            'nomenclature': '/M2A_NOMENCLATURE?DIRECTSEARCH',
            'fordsub': '/M2A_FORD_SUBJECT?DIRECTSEARCH',
            'org': '/M2A_ORG_VALTAB?DIRECTSEARCH',
            'people': '/M2A_PEOPLE_VALTAB?DIRECTSEARCH',
            'loc': '/M2A_LOCATION_VALTAB?DIRECTSEARCH',
            'loans': '/M2A_LOAN_OUT_VALTAB?DIRECTSEARCH',
            'restrictions': '/M2A_RES_VALTAB?DIRECTSEARCH',
            'schedule': '/M2A_SCHED_VALTAB?DIRECTSEARCH',
            'matthes': '/M2A_MATTHES?DIRECTSEARCH',
            'medium': '/M2A_MEDIUM?DIRECTSEARCH'
        },

        // RL-2020-09-29
        'record_image2': 'div.img_container2 img',
        'image_group_repeating': 'Y',

        // RL-2020-11-10
        'has_image_holder': 'fieldset.has_image_holder div.image input',

        // RL-2020-11-10 RL-2021-01-07
        'tdr_map':
        {
            'Images': // 'Images' matches data-group-title attribute value in fieldset tag
            {
                "group_mnemonic": "REQ_IMAGE_GRP",
                "group_repeating": "Y",
                "map":
                    [
                        { "Source": "Thumbnail", "Target": "REQ_IMAGE_LOW" },
                        { "Source": "Access", "Target": "REQ_IMAGE_HIGH" },
                    ]
            },

            'Media': // 'Media' matches data-group-title attribute value in fieldset tag
            {
                "group_mnemonic": "A_MEDIA_REF_GRP",
                "group_repeating": "Y",
                "map":
                    [
                        { "Source": "Thumbnail", "Target": "A_MEDIA_LOW_RES" },
                        { "Source": "Access", "Target": "A_MEDIA_HIGH_RES" },
                        { "Source": "AssetName", "Target": "A_MEDIA_IMG_CAPT" }
                    ]
            },

            'Audio':  // 'Audio' matches data-group-title attribute value in fieldset tag
            {
                "group_mnemonic": "AUDIO_REF_GRP",
                "group_repeating": "Y",
                "map":
                    [
                        { "Source": "Thumbnail", "Target": "AUDIO_REFERENCE" },
                        { "Source": "Access", "Target": "AUDIO_TDR_ACCESS" },
                        { "Source": "Original", "Target": "AUDIO_TDR_ORIGIN" },
                        { "Source": "Preservation", "Target": "AUDIO_TDR_PRESER" },
                        { "Source": "Thumbnail", "Target": "AUDIO_TDR_THUMB" },
                        { "Source": "Ocr", "Target": "AUDIO_REF_OCR" },
                        { "Source": "AssetName", "Target": "AUDIO_REF_NOTES" }
                    ]
            },

            'Video':  // 'Video' matches data-group-title attribute value in fieldset tag
            {
                "group_mnemonic": "VIDEO_REF_GRP",
                "group_repeating": "Y",
                "map":
                    [
                        { "Source": "Thumbnail", "Target": "VIDEO_REFERENCE" },
                        { "Source": "Access", "Target": "VIDEO_TDR_ACCESS" },
                        { "Source": "Original", "Target": "VIDEO_TDR_ORIGIN" },
                        { "Source": "Preservation", "Target": "VIEDO_TDR_PRESER" },
                        { "Source": "Thumbnail", "Target": "VIDEO_TDR_THUMB" },
                        { "Source": "Ocr", "Target": "VIDEO_REF_OCR" },
                        { "Source": "AssetName", "Target": "VIDEO_REF_NOTES" }
                    ]
            },

            'Notes':  // 'Notes' matches data-group-title attribute value in fieldset tag
            {
                "group_mnemonic": "TEXT_REF_GRP",
                "group_repeating": "Y",
                "map":
                    [
                        { "Source": "Thumbnail", "Target": "TEXT_REFERENCE" },
                        { "Source": "Access", "Target": "TEXT_TDR_ACCESS" },
                        { "Source": "Original", "Target": "TEXT_TDR_ORIGIN" },
                        { "Source": "Preservation", "Target": "TEXT_TDR_PRESER" },
                        { "Source": "Thumbnail", "Target": "TEXT_TDR_THUMB" },
                        { "Source": "Ocr", "Target": "TEXT_REF_OCR" },
                        { "Source": "AssetName", "Target": "TEXT_REF_NOTES" }
                    ]
            }
        }
    };
    this.interface_params = $.extend(true, {}, params);


    /*****
     **
     **  populateForm : returns true when operation is complete.
     **
     **  notes:
     **    - This is used to initially populate a form when a page is first loaded.
     **    - For populating individual groups and fields, the appropriate `populateGroup`
     **      and `populateField` functions should be used instead.
     **
     *****/
    this.populateForm = function () {
        // Handle fields outside of any groups:
        $(params.form_container + ' :input').each(function () {
            if (!app_interface.isInGroup('#' + $(this).attr('id'))) {
                if (app_interface.isRepeatingField('#' + $(this).attr('id'))) {
                    app_interface.populateField($(this).attr('id'), '1');
                } else {
                    app_interface.populateField($(this).attr('id'), '0');
                }
            }
        });

        // Handle fields inside of groups:
        $(params.group_container).each(function () {
            var group_id = $(this).attr('id');
            var total_occurrences = app_interface.getTotalOccurrences(group_id);

            total_occurrences = (total_occurrences > 0) ? total_occurrences : 1;
            $('#' + group_id).find(params.group_total_occurrences).first().text(total_occurrences);

            app_interface.populateGroup(group_id, '1');
        });

        // Handle record image (if applicable):
        if ($(params.record_image).length > -1) {
            app_interface.handleImages();
        }

        if ($(params.contains_image).length > -1) {
            $(params.contains_image).each(function () {
                app_interface.updateImages($(this));
            });
        }

        // RL-2020-11-10
        if ($(params.has_image_holder).length > -1) {
            $(params.has_image_holder).each(function () {
                app_interface.updateImages($(this));
            });
        }

        // Check for active restrictions:
        app_interface.handleActiveRestrictions();

        // Load tooltips:
        app_interface.loadTooltips();

        return true;
    };


    /*****
     **
     **  populateGroup : returns true when a group's data has been put into the appropriate form fields,
     **                  or false if there was no appropriate data found for the request.
     **
     **  params:
     **    - group_id : String value representing the groups ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **    - occurrence : String/Int value representing the desired group occurrence
     **
     **  notes:
     **    - Child groups are automatically handled by this
     **    - If an occurrence exceeding the amount of total occurrences by 1 is requested, it's assumed
     **      that a new occurrence is being created, and the form is setup appropriately.
     **
     *****/
    this.populateGroup = function (group_id, occurrence) {
        // RL-2020-09-29
        if (group_id == null) {
            return true;
        }

        var parent_group = app_interface.getGroupParent(group_id);
        var group = record.getGroup(group_id.toLowerCase(), occurrence, parent_group);

        if (group) {
            var total_occurrences = app_interface.getTotalOccurrences(group_id);

            $('#' + group_id).find(params.group_occurrence).first().text(occurrence);
            $('#' + group_id).find(params.group_total_occurrences).first().text(total_occurrences);

            $('#' + group_id + ' :input').each(function () {
                if ($(this).closest(params.group_container).attr('id') === group_id) {
                    app_interface.populateField($(this).attr('id'), '1');
                }
            });

            $('#' + group_id + ' ' + params.group_container).each(function () {
                var child_group_id = $(this).attr('id');
                if (app_interface.occurrenceExists(child_group_id, '1')) {
                    app_interface.populateGroup(child_group_id, '1');
                } else {
                    app_interface.clearGroup(child_group_id);
                }
            });
            return true;
        } else {
            if (parseInt(occurrence) === app_interface.getTotalOccurrences(group_id) + 1) {
                app_interface.clearGroup(group_id);
                $('#' + group_id).find(params.group_occurrence).first().text(occurrence);
                $('#' + group_id).find(params.group_total_occurrences).first().text(occurrence);
                return true;
            }
        }

        return false;
    };


    /*****
     **
     **  populateField : returns true when a field's data has been put into the appropriate form fields,
     **                  or false when no suitable data was found.
     **
     **  params:
     **    - field_id : String value representing the groups ID in the HTML, eg: 'SRC_CON_ALIAS'
     **    - occurrence : String/Int value representing the desired group occurrence. eg: '1', or '0' for elementary fields
     **
     **  notes:
     **    - Repeating fields are automatically handled by this
     **    - If an occurrence exceeding the amount of total occurrences by 1 is requested, it's assumed
     **      that a new occurrence is being created, and the form is setup appropriately.
     **
     *****/
    this.populateField = function (field_id, occurrence) {
        // RL-2020-09-29
        if (field_id == null) {
            return true;
        }

        xml_field_id = field_id.toLowerCase();
        form_field_id = (field_id[0] === '#') ? field_id : '#' + field_id;

        // rl-2020-09-29
        // check to see input file is read-only
        var readonly_field = false;
        if (this.readonly_record) {
            readonly_field = true;
        }
        else {
            readonly_field = checkReadOnly('body');
            if (!readonly_field) {
                readonly_field = checkReadOnly(form_field_id);
            }
        }

        if (readonly_field) {
            if ($(form_field_id).is("input") || $(form_field_id).is("textarea")) {
                if ($(form_field_id).hasClass('checkbox')) {
                    $(form_field_id).prop('disabled', true);
                }
                else {
                    $(form_field_id).prop('readonly', true);
                }
            }
            else {
                $(form_field_id).prop('disabled', true);
            }
        }

        var parent_group = app_interface.getGroupParent(field_id);
        var total_occurrences;
        if (record.getElement(xml_field_id, occurrence, parent_group)) {
            if ($(form_field_id).attr('type') === 'hidden' && $(form_field_id).hasClass('checkbox')) {
                if (record.getElement(xml_field_id, occurrence, parent_group).text().toUpperCase() === 'X') {
                    $(form_field_id).val('X');
                    var check_element = $(form_field_id).parents('span.check').find('i').first();
                    check_element.removeClass('fa-square-o').addClass('fa-check-square');
                }
            } else {
                // unescape HTML in record to prevent double escaping:
                var field_val = $.trim(htmlUnescape(record.getElement(xml_field_id, occurrence, parent_group).text()));
                record.updateElement(record.getElement(xml_field_id, occurrence, parent_group), field_val);

                //detailed report unicode
                // var parsedhtml = $.parseHTML(field_val);
                $(form_field_id).val(field_val);
                // $(form_field_id).val(parsedhtml[0].data);
            }

            total_occurrences = record.getOccurrenceCount(xml_field_id, parent_group);
        } else {
            if (parseInt(occurrence) === app_interface.getTotalOccurrences(field_id) + 1) {
                $(form_field_id).val('');
                total_occurrences = record.getOccurrenceCount(xml_field_id, parent_group) + 1;
            } else if (parseInt(occurrence) === 0) {
                $(form_field_id).val('');
            } else {
                return false;
            }
        }

        if (app_interface.isRepeatingField(form_field_id)) {
            total_occurrences = (total_occurrences > 0) ? total_occurrences : 1;
            $(form_field_id).closest(params.r_field_container).find(params.r_field_occurrence).first().text(occurrence);
            $(form_field_id).closest(params.r_field_container).find(params.r_field_total_occurrences).first().text(total_occurrences);
        }

        return true;
    };


    /*****
     **
     **  getGroupParent : returns either the group's parent, or 'undefined'.
     **
     **  params:
     **    - group_id : String value representing the groups ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **
     **  notes:
     **    - This is going to get the exact group (or repeating fields parent group) parent based on the currently displayed HTML
     **
     *****/
    this.getGroupParent = function (group_id) {
        // Get the total depth of the current group by seeing how many parents that have the 'group_container' selector
        var total_parents = $('#' + group_id).parents(params.group_container).length - 1;

        // If the total_parents is less than 0, that group is at the root of the record
        if (total_parents >= 0) {
            // if there is more than one parent, we're going to traverse the currently displayed HTML to find the groups current parent:
            var group_parents = [];

            $('#' + group_id).parents(params.group_container).each(function () {
                group_parents.push({
                    'group_id': $(this).attr('id').toLowerCase(),
                    'group_occ': $(this).find(params.group_occurrence).first().text()
                });
            });

            // Now that we have a list of all of the group's parents, we need to get each parent group from the XML starting with the deepest ancestor.
            // We're going to do this until we either run out of parents, which will make `current_parent` equal to the XML group of the requested ID.
            // If a parent along the way doesn't exist, it will need to be created based on the last requested `current_parent` as the group parent.
            var current_parent;
            for (var i = total_parents; i >= 0; i--) {
                if (typeof group_parents[i] !== 'undefined') {
                    if (!record.getGroup(group_parents[i].group_id, group_parents[i].group_occ, current_parent)) {
                        if (group_parents[i].group_occ > 1) {
                            if (record.getGroup(group_parents[i].group_id, parseInt(group_parents[i].group_occ - 1), current_parent)) {
                                current_parent = record.getGroup(group_parents[i].group_id, parseInt(group_parents[i].group_occ - 1), current_parent).parent();
                            } else {
                                console.log("SOMETHING WENT TERRIBLY WRONG!");
                            }
                        }
                        record.addGroup(group_parents[i].group_id, group_parents[i].group_occ, current_parent, true); // RL-2020-12-21
                    }
                    current_parent = record.getGroup(group_parents[i].group_id, group_parents[i].group_occ, current_parent);
                }
            }

            return current_parent;

        } else {
            // returning undefined would let the getGroup() function use undefined, which sets the parent group to the root of the record
            return undefined;
        }
    };


    /*****
     **
     **  getTotalOccurrences : returns an integer value for the total amount of occurrences for a group or repeating field.
     **
     **  params:
     **    - id : String value representing a group, or repeating field's ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **
     *****/
    this.getTotalOccurrences = function (id) {
        return record.getOccurrenceCount(id.toLowerCase(), app_interface.getGroupParent(id));
    }


    /*****
     **
     **  getCurrentOccurrence : returns an integer value for the currently displayed occurrences for a group or repeating field.
     **
     **  params:
     **    - id : String value representing a group, or repeating field's ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **
     *****/
    this.getCurrentOccurrence = function (id) {
        var element_type = ($(params.form_container).find('#' + id).closest(params.r_field_container).length > 0) ? 'field' : 'group';

        if (element_type === 'field') {
            return parseInt($(params.form_container).find('#' + id).closest(params.r_field_container).find(params.r_field_occurrence).first().text());
        } else {
            return parseInt($(params.form_container).find('#' + id).find(params.group_occurrence).first().text());
        }
    }


    /*****
     **
     **  occurrenceExists : returns a boolean based on whether the occurrence is found or not.
     **
     **  params:
     **    - element_id : String value representing the groups ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **    - occurrence : String/Int value representing the desired group occurrence
     **
     *****/
    this.occurrenceExists = function (element_id, occurrence) {
        var element_type = ($(params.form_container).find('#' + element_id).closest(params.r_field_container).length > 0) ? 'field' : 'group';
        var parent_group = app_interface.getGroupParent(element_id);

        switch (element_type) {
            case 'group':
                if (record.getGroup(element_id.toLowerCase(), occurrence, parent_group)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'field':
                if (record.getElement(element_id.toLowerCase(), occurrence, parent_group)) {
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                return false;
        }
    }


    /*****
     **
     **  isRepeatingField : returns a boolean based on if the passed field_id represents a repeating field in the data
     **
     **  params:
     **    - field_id : String value representing a field's ID in the HTML, eg: 'ACCESSION_NUMBER'
     **
     *****/
    this.isRepeatingField = function (field_id) {
        return ($(field_id).parents(params.r_field_container).length > 0);
    };


    /*****
     **
     **  isInGroup : returns a boolean based on if the passed field_id is contained within a group or not
     **
     **  params:
     **    - element_id : String value representing a field's ID in the HTML, eg: '#ACCESSION_NUMBER'
     **
     *****/
    this.isInGroup = function (element_id) {
        return $(element_id).parents(params.group_container).length > 0;
    };

    /*****
     **
     **  groupIsPopulated : returns a boolean based on if there are any populated elements contained within `group_id`.
     **
     **  params:
     **    - group_id : String value representing a group's ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **
     *****/
    this.groupIsPopulated = function (group_id) {
        var populated_fields = 0;
        $('#' + group_id).find(':input').each(function () {
            if ($.trim($(this).val()).length > 0) {
                populated_fields++;
            }
        });
        if (populated_fields > 0) {
            return true;
        } else {
            return false;
        }
    };


    /*****
     **
     **  clearGroup : clears a group's HTML fields and occurrences.
     **
     **  params:
     **    - group_id : String value representing a group's ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **
     *****/
    this.clearGroup = function (group_id) {
        // rl-2020-09-29
        // check to see input file is read-only
        var readonly_field = false;
        if (this.readonly_record) {
            readonly_field = true;
        }
        else {
            readonly_field = checkReadOnly('body');
        }

        $(params.form_container).find('#' + group_id).find(':input').each(function () {
            if ($(this).attr('type') === 'checkbox') {
                $(this).prop('checked', 'false');
            }
            $(this).val('');

            // RL-2020-09-29
            if (readonly_field) {
                if ($(this).is("input") || $(this).is("textarea")) {
                    $(this).prop('readonly', true);
                }
                else {
                    $(this).prop('disabled', true);
                }
            }
        });

        app_interface.resetOccurrences(group_id);
    }

    /*****
     **
     **  resetOccurrences : resets occurrences for a passed group or repeating field to '1'.
     **
     **  params:
     **    - element_id : String value representing a repeating field, or a group's ID in the HTML, eg: 'ACQ_SOURCE_GRP'
     **
     *****/
    this.resetOccurrences = function (element_id) {
        var element_type = ($(params.form_container).find('#' + element_id).closest(params.r_field_container).length > 0) ? 'field' : 'group';

        if (element_type === 'field') {
            var field = $(params.form_container).find('#' + element_id).closest(params.r_field_container);
            field.find(params.r_field_occurrence).first().text('1');
            field.find(params.r_field_total_occurrences).first().text('1');
        } else {
            var group = $(params.form_container).find('#' + element_id);
            group.find(params.group_occurrence).each(function () {
                $(this).text('1');
            });
            group.find(params.group_total_occurrences).each(function () {
                $(this).text('1');
            });
            group.find(params.r_field_occurrence).each(function () {
                $(this).text('1');
            });
            group.find(params.r_field_total_occurrences).each(function () {
                $(this).text('1');
            });
        }
    }


    /*****
     **
     **  handleImages : returns false if image is not present in the record, otherwise it will replace the placeholder
     **                 image with the first image in the record.
     **
     *****/
    this.handleImages = function () {
        // RL-2020-09-29
        var h_image = false;
        if ($(params.record_image).length > 0) {
            h_image = record.getPrimaryImage();
        }

        if (h_image != false) {
            // populate first image
            if (h_image.image) {
                if (h_image.image.text().indexOf(params.image_virtual_directory) > -1) {
                    h_image.image.text(h_image.image.text().replace(params.image_virtual_directory, params.image_url_path));
                }

                $(params.record_image).attr('src', h_image.image.text());

                if (h_image.caption) {
                    $(params.record_image).attr('alt', h_image.caption.text());
                } else {
                    $(params.record_iamge).attr('alt', '');
                }

                h_image = false;
                if ($(params.record_image2).length > 0) {
                    h_image = record.getSecondImage();
                    if (h_image != false) {
                        // populate second image
                        if (h_image.image.text().indexOf(params.image_virtual_directory) > -1) {
                            h_image.image.text(h_image.image.text().replace(params.image_virtual_directory, params.image_url_path));
                        }

                        $(params.record_image2).attr('src', h_image.image.text());

                        if (h_image.caption) {
                            $(params.record_image2).attr('alt', h_image.caption.text());
                        }
                        else {
                            $(params.record_iamge2).attr('alt', '');
                        }
                    }
                }
            }
            else {
                return false; // Image not present
            }
        }
        else {
            return false;
        }

        return true;
    };


    /*****
     **
     **  getPreviousGroupOccurrence : either populates the form with the previous occurrence of a group, or returns
     **                               false if the current group is the first group.
     **
     **  params:
     **    - calling_field : jQuery object representing the clicked link requesting the previous group occurrence
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **
     *****/
    this.getPreviousGroupOccurrence = function (calling_field) {
        var group_id = $(calling_field).closest(params.group_container).first().attr('id');
        var current_occurrence = parseInt($('#' + group_id).find(params.group_occurrence).first().text());

        if (current_occurrence > 1) {
            app_interface.populateGroup(group_id, current_occurrence - 1);

            if ($('#' + group_id).hasClass('contains_image')) {
                app_interface.updateImages($('#' + group_id).find('.file_attachment input').first().attr('id'));
            }
            else { // RL-2020-11-10
                if ($('#' + group_id).hasClass('has_image_holder')) {
                    app_interface.updateImages($('#' + group_id).find('.file_attachment input').first().attr('id'));
                }
            }
        } else {
            return false;
        }
    };


    /*****
     **
     **  getNextGroupOccurrence : either populates the form with the next occurrence of a group, or returns
     **                           false if the current group is the last occurrence, and is empty.
     **
     **  params:
     **    - calling_field : jQuery object representing the clicked link requesting the previous group occurrence
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **
     *****/
    this.getNextGroupOccurrence = function (calling_field) {
        var group_id = $(calling_field).closest(params.group_container).first().attr('id');
        var current_occurrence = parseInt($('#' + group_id).find(params.group_occurrence).first().text());
        var total_occurrences = app_interface.getTotalOccurrences(group_id);

        if (current_occurrence < total_occurrences || (current_occurrence === total_occurrences && app_interface.groupIsPopulated(group_id))) {
            app_interface.populateGroup(group_id, current_occurrence + 1);

            if ($('#' + group_id).hasClass('contains_image')) {
                app_interface.updateImages($('#' + group_id).find('.file_attachment input').first().attr('id'));
            }
            else {   // RL-2020-11-10
                if ($('#' + group_id).hasClass('has_image_holder')) {
                    app_interface.updateImages($('#' + group_id).find('.file_attachment input').first().attr('id'));
                }
            }
        } else {
            return false;
        }
    };


    /*****
     **
     **  getPreviousFieldOccurrence : either populates the form with the previous occurrence of a field, or returns
     **                               false if the current field is the first occurrence.
     **
     **  params:
     **    - calling_field : jQuery object representing the clicked link requesting the previous field occurrence
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **
     *****/
    this.getPreviousFieldOccurrence = function (calling_field) {
        var field_id = $(calling_field).closest(params.r_field_container).find(':input').first().attr('id');
        var current_occurrence = parseInt($('#' + field_id).closest(params.r_field_container).find(params.r_field_occurrence).first().text());

        if (current_occurrence > 1) {
            app_interface.populateField(field_id, current_occurrence - 1);
        } else {
            return false;
        }
    };


    /*****
     **
     **  getNextFieldOccurrence : either populates the form with the next occurrence of a field, or returns false
     **                           if the current field is the last occurrence, and is empty (and not protected).
     **
     **  params:
     **    - calling_field : jQuery object representing the clicked link requesting the previous field occurrence
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **
     *****/
    this.getNextFieldOccurrence = function (calling_field) {
        var field_id = $(calling_field).closest(params.r_field_container).find(':input').first().attr('id');
        var current_occurrence = parseInt($('#' + field_id).closest(params.r_field_container).find(params.r_field_occurrence).first().text());
        var total_occurrences = app_interface.getTotalOccurrences(field_id);

        if (current_occurrence < total_occurrences) {
            app_interface.populateField(field_id, current_occurrence + 1);
        } else {
            if ($('#' + field_id).val() !== "" && ($('#' + field_id).attr('readonly') !== 'readonly' || ($('#' + field_id).parents('.file_attachment').length > 0 || $('#' + field_id).parents('.validated_table').length > 0))) {
                $('#' + field_id).closest(params.r_field_container).find(params.r_field_occurrence).first().text(current_occurrence + 1);
                $('#' + field_id).closest(params.r_field_container).find(params.r_field_total_occurrences).first().text(total_occurrences + 1);
                $('#' + field_id).val('');
            } else {
                return false;
            }
        }
    };


    /*****
     **
     **  updateField : returns true if the record has been successfully updated with the new field value
     **
     **  params:
     **    - calling_field : jQuery object representing the form field which has been changed
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **
     *****/
    this.updateField = function (calling_field) {
        if (calling_field.parents(params.group_container).length > 0) {
            var parent_group = app_interface.getGroupParent(calling_field.attr('id'));

            // If this is false, a new group/occurrence must be created:
            if (!parent_group) {
                var new_group_id = calling_field.closest(params.group_container).attr('id');
                var new_group_occurrence = calling_field.closest(params.group_container).find(params.group_occurrence).first().text();
                var new_group_parent = calling_field.closest(params.group_container).parents(params.group_container).first();
                var new_group_parent_occ = new_group_parent.find(params.group_occurrence).first().text();

                if (new_group_parent.length === 0) {
                    new_group_parent = undefined;
                }

                record.addGroup(new_group_id,
                    new_group_occurrence,
                    record.getGroup(new_group_parent.attr('id').toLowerCase(), new_group_parent_occ),

                    true); // RL-2020-12-21
                parent_group = app_interface.getGroupParent(calling_field.attr('id'));
            }
        }
        var occurrence = (app_interface.isRepeatingField('#' + calling_field.attr('id'))) ? calling_field.closest(params.r_field_container).find(params.r_field_occurrence).first().text() : '0';
        var field_is_repeating = (parseInt(occurrence) > 0) ? true : false;
        var field = record.getElement(calling_field.attr('id').toLowerCase(), occurrence, parent_group);
        var field_value = $.trim(calling_field.val());

        if (field) {
            record.updateElement(field, field_value);
        } else {
            record.addElement(calling_field.attr('id').toLowerCase(), field_value, field_is_repeating, parent_group);
        }
    };





    /*****
     **
     **  contextMenu : creates and displays an HTML menu for selecting tasks for repeating groups and fields (move/remove occurrences)
     **
     **  params:
     **    - calling_field : jQuery object representing the element which has called for the context menu to be displayed over.
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **    - If the context menu does not exist in the HTML, it will be created.
     **
     *****/
    this.contextMenu = function (calling_field, mouse_position) {
        if (!calling_field.hasClass('relative')) calling_field.addClass('relative');

        var field_type = (calling_field.closest(params.r_field_container).length > 0) ? 'field' : 'group';
        var element_id = (field_type === 'field') ? calling_field.attr('id') : element_id = calling_field.closest(params.group_container).first().attr('id');
        var current_occurrence = app_interface.getCurrentOccurrence(element_id);
        var total_occurrences = app_interface.getTotalOccurrences(element_id);
        var html_overlay = $('<div id="' + params.overlay.split('#').pop() + '"/>');

        var createContextMenu = function () {
            var context_menu_type = params.context_menu.split('#').shift();
            var context_menu_name = params.context_menu.split('#').pop();
            var built_context_menu = $("<" + context_menu_type + " id='" + context_menu_name + "'/>");

            $('body').append(built_context_menu);
            return $('body').find(params.context_menu);
        };

        var setupContextMenu = function (context_menu) {
            context_menu.attr('data-current_occ', current_occurrence);
            context_menu.attr('data-total_occ', total_occurrences);
            context_menu.attr('data-element', element_id);
            context_menu.attr('data-fld_type', field_type);
            context_menu.append($('<li id="move_occ"><a href="#">Move Occurrence</a></li>'));
            context_menu.append($('<li id="remove_occ"><a href="#">Remove Occurrence</a></li>'));
            context_menu.css({
                'top': mouse_position.y,
                'left': mouse_position.x,
                'z-index': '99999'
            });

            $('body').append(html_overlay);
            context_menu.show('100');
        };

        var context_menu = ($(params.context_menu).length === 0) ? createContextMenu() : $('body').find(params.context_menu);
        setupContextMenu(context_menu);

    };

    /*****
     **
     **  clearContextMenu : removes a previously displayed context menu from the DOM
     **
     **  params:
     **    - calling_field : jQuery object representing the element which has called for the context menu to be removed.
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **
     *****/
    this.clearContextMenu = function (calling_field) {
        var context_menu = $('body').find(params.context_menu);
        context_menu.hide('100');
        $(params.overlay).hide('100').remove();
        context_menu.remove();
        if (calling_field.hasClass('relative')) calling_field.removeClass('relative');
    };


    /*****
     **
     **  removeOccurrence : removes an occurrence of a field or group from the XML and from the HTML
     **
     **  params:
     **    - calling_field : jQuery object representing the element which has called for the occurrence to be removed.
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **    - If the context menu does not exist in the HTML, it will be created.
     **
     *****/
    this.removeOccurrence = function (calling_field) {
        var context_menu = calling_field.parents(params.context_menu).first();
        var current_occurrence = context_menu.data('current_occ');
        var total_occurrences = context_menu.data('total_occ');
        var field_type = context_menu.data('fld_type');
        var element_id = context_menu.data('element');
        var element_xml_id = element_id.toLowerCase();
        var group_parent = app_interface.getGroupParent(element_id);
        var populate, remove, clearOccurrence, occurrence;

        if (field_type === 'group') {
            populate = 'app_interface.populateGroup';
            removeOccurrence = 'record.removeGroupOccurrence';
            clearOccurrence = 'app_interface.clearGroup(element_id)';
            occurrence = record.getGroup(element_xml_id, current_occurrence, group_parent);
        } else {
            populate = 'app_interface.populateField';
            removeOccurrence = 'record.removeElement';
            clearOccurrence = '$("#" + element_id).val("")';
            occurrence = record.getElement(element_xml_id, current_occurrence, group_parent);
        }

        if (app_interface.occurrenceExists(element_id, current_occurrence)) {
            eval(removeOccurrence + '(occurrence)');
            record.sortOccurrences(element_xml_id, group_parent);

            if (current_occurrence === total_occurrences && total_occurrences > 1) {
                eval(populate + '(element_id, parseInt(current_occurrence) - 1)');
            }
            else if (app_interface.occurrenceExists(element_id, current_occurrence)) {
                eval(populate + '(element_id, current_occurrence)');
            }
            else {
                eval(clearOccurrence);
            }

            // RL-2020-12-21
            if (field_type === 'group' && $(params.record_image).length > -1) {
                if ($(params.contains_image).length > -1) {
                    $(params.contains_image).each(function () {
                        app_interface.updateImages($(this));
                    });
                }

                // RL-2020-11-10
                if ($(params.has_image_holder).length > -1) {
                    $(params.has_image_holder).each(function () {
                        app_interface.updateImages($(this));
                    });
                }

                app_interface.handleImages();
            }
        } else {
            return false;
        }
    };


    /*****
     **
     **  moveOccurrence :
     **
     **  params:
     **    - calling_field : jQuery object representing the element which has called for the occurrence to be moved.
     **
     **  notes:
     **    - This will not be called internally, it is used by the outer-most application javascript file.
     **    - If the context menu does not exist in the HTML, it will be created.
     **
     *****/
    this.moveOccurrence = function (calling_field) {
        var new_occurrence;
        var context_menu = calling_field.parents(params.context_menu).first();
        var current_occurrence = context_menu.data('current_occ');
        var total_occurrences = context_menu.data('total_occ');
        var field_type = context_menu.data('fld_type');
        var element_id = context_menu.data('element');
        var element_xml_id = element_id.toLowerCase();
        var group_parent = app_interface.getGroupParent(element_id);
        var skip_move = false;
        var occnum = 0;

        do {
            new_occurrence = prompt('Enter a new position for this occurrence: ');
            // RL-2020-12-21
            if (new_occurrence == null) {
                skip_move = true;
                break;
            }
            var valid_occurrence = false;
            if (!isNaN(new_occurrence)) {
                occnum = parseInt(new_occurrence, 10);
                if (occnum > 0 && occnum <= total_occurrences) {
                    valid_occurrence = true;
                }
            }

            if (!valid_occurrence) {
                alert("You've entered an invalid occurrence number.  Please try again.");
            }
        } while (!valid_occurrence);

        // RL-2020-12-21
        if (!skip_move && occnum != current_occurrence) {
            if (field_type === 'group') {
                var group = record.getGroup(element_xml_id, current_occurrence, group_parent);
                record.moveOccurrence(group, new_occurrence);
            } else {
                var element = record.getElement(element_xml_id, current_occurrence, group_parent);
                record.moveOccurrence(element, new_occurrence);
            }

            record.sortOccurrences(element_xml_id, group_parent);

            if (field_type === 'group') {
                app_interface.populateGroup(element_id, new_occurrence);

                // RL-2020-12-21
                if ($(params.record_image).length > -1) {
                    if ($(params.contains_image).length > -1) {
                        $(params.contains_image).each(function () {
                            app_interface.updateImages($(this));
                        });
                    }

                    // RL-2020-11-10
                    if ($(params.has_image_holder).length > -1) {
                        $(params.has_image_holder).each(function () {
                            app_interface.updateImages($(this));
                        });
                    }

                    app_interface.handleImages();
                }
            }
            else {
                app_interface.populateField(element_id, new_occurrence);
            }
        }
    };



    /**
     **  getValidatedTable : handles loading validated table records into the currently-being-edited record.
     **/
    this.getValidatedTable = function (calling_field) {
        var database = calling_field.attr('class').split('load_').pop();
        if (typeof database === 'undefined') {
            return false;
        }

        // RL-2020-09-29
        var formdata = $(calling_field).parents('.field_container').first().data('formfield');
        if (formdata == null) {
            formdata = 'N';
        }
        else {
            formdata = formdata.toUpperCase();
        }

        // rl-changed-20200511
        var class_name = calling_field.context.className;
        if (typeof class_name == 'undefined') {
            class_name = "";
        }

        // calculate modal window width/height KN 2021-03-02
        var dialog_width = window.innerWidth - 8; // leave spaces in left and right margin  
        var dialog_height = window.innerHeight - 13; // leave spaces in top and bottom margin

        var caller_map = $(calling_field).parents('.field_container').first().data('map');
        var map = eval('record.params.maps.' + caller_map);
        var calling_element_id = calling_field.parents('div.field_container').find(':input').first().attr('id');
        var parent_group = app_interface.getGroupParent(calling_element_id, true);
        if (typeof parent_group !== 'undefined') {
            var parent_group_id = parent_group.parent().prop('tagName').toUpperCase();
            var parent_group_occurrence = parent_group.attr('occ');
        }
        // rl changed-20200511
        if (class_name != "load") {
            $record = record;
            $map = map;
            $parent_group_id = parent_group_id;
            $tmp_data = [];
            $is_done = false;
            // if upload, do not create colorbox because it is created in the upLoadFile method
            // RL-2020-09-29
            var url =
                params.base_url +
                eval("params.valtable_query_links." + database) +
                "&KEEP_HOME_SESS=Y";
            $.colorbox({
                iframe: true,
                href: url,
                // NW 2021-03-11, width/height changes
                width: dialog_width,
                height: dialog_height,
                onCleanup: function () {
                    if (typeof $tmp_data !== "undefined") {
                        // RL-2020-09-29
                        if (formdata == "Y") {
                            record.recordToForm($tmp_data, map);
                        } else {
                            if ($is_done) {
                                $tmp_data.map((el, index) => {
                                    if (index === 0) {
                                        record.remap(el, map, parent_group);
                                        app_interface.populateGroup(
                                            parent_group_id,
                                            parent_group_occurrence
                                        );
                                    } else {
                                        let num_occ = record.getOccurrenceCount(
                                            parent_group_id,
                                            null
                                        );

                                        while (parent_group_occurrence <= num_occ) {
                                            app_interface.populateGroup(
                                                parent_group_id,
                                                parent_group_occurrence
                                            );
                                            $(".next").click();
                                            parent_group = app_interface.getGroupParent(
                                                calling_element_id,
                                                true
                                            );
                                            if (typeof parent_group !== "undefined") {
                                                parent_group_id = parent_group
                                                    .parent()
                                                    .prop("tagName")
                                                    .toUpperCase();
                                                parent_group_occurrence = parent_group.attr("occ");
                                            }
                                        }
                                        record.remap(el, map, parent_group);
                                        app_interface.populateGroup(
                                            parent_group_id,
                                            parent_group_occurrence
                                        );

                                        console.log(parent_group, parent_group_occurrence);
                                    }
                                });
                            }
                        }
                    }
                },
                onClosed: function () {
                    sessionStorage.removeItem("pagination_checker");
                    if (typeof parent_group !== "undefined") {
                    } else {
                        console.log(calling_element_id);
                        app_interface.populateField(calling_element_id);
                    }
                    delete $record;
                    delete $map;
                    delete $parent_group_id;
                    delete $tmp_data;
                    delete $is_done
                },
            });
        }
    };

    /**
     **  loadExternalLink : handles launching media and external links.
     **/
    this.loadExternalLink = function (calling_field) {
        var caller_value = $(calling_field).parents('.field_container').first().find('input[type=text]').val();
        if (caller_value.indexOf(params.image_virtual_directory) > -1) {
            caller_value = caller_value.replace(params.image_virtual_directory, params.image_url_path);
        }

        window.open(caller_value);
    };

    /**
     **  loadValidatedTableRecord : handles loading in validated table records based on their unique ID.
     **/
    this.loadValidatedTableRecord = function (calling_field) {
        var database = calling_field.attr('class').split('view_').pop();
        var field_id;

        if (typeof database === 'undefined') {
            return false;
        } else if (database === 'link') {
            app_interface.loadExternalLink(calling_field);
            return false;
        }

        var url = params.base_url + eval('params.valtable_view_links.' + database);

        if (database === 'loc' || database == 'm2a' || database == 'acc') {
            field_id = $.trim(calling_field.parents(params.browse_field_container).first().find('input[type=text]').first().val());
        } else {
            field_id = $.trim(calling_field.parents(params.browse_field_container).first().find('input[id$=_ID]').first().val());
        }

        // If no ID is present, don't load a colorbox that's going to fail:
        if (field_id.length > 0) {
            url += field_id;
        } else {
            return false;
        }

        url += "?COMMANDSEARCH";

        var colorbox_params = {
            href: url,
            iframe: true,
            width: '900px',
            height: '600px',
        };

        $.colorbox(colorbox_params);
    };



    /*
      Validated Table Fields
  
      - Fields coming from a validated list which don't have full online data entry capabilities are
        pulled up in the same way as form "browse" buttons in query forms.
  
      - The user clicks on the field which is linked to a validated table, and a browse window pops
        up, allowing them to click on the value they would like to enter, and then the value populates
        the field in the record.
  
      - In the HTML forms, two new attributes are added to the fields,  data-val-database, and
        data-val-field.
  
      - data-val-database contains the database name of the validated field (ie VAL_USER)
  
      - data-val-field contains the name of the validated field in the database (ie LOOKUP_FIELD).
    */
    this.loadValidatedTableField = function (calling_field) {
        if ($(calling_field).hasClass('browse_trigger')) {
            target_field = calling_field.parents('.validated_table').find('input[type=text]').first();
        } else {
            target_field = calling_field;
        }
        var calling_database = target_field.data('val-database');
        var val_field = target_field.data('val-field');
        var title = target_field.siblings('label').first().text();
        var repeating = app_interface.isRepeatingField(target_field.attr('id'));

        $(calling_field).colorbox({
            href: function () {
                return params.sessid + "/FIRST?INDEXLIST&WINDOW=" + name + "&DATABASE=" + calling_database + "&KEYNAME=" + val_field + "&TITLE=" + title;
            },
            transition: "elastic",
            iframe: true,
            width: "900px",
            height: "600px",
            onClosed: function () {
                if (typeof tmp_val !== 'undefined') {
                    $(target_field).val(tmp_val);
                    app_interface.updateField($(target_field));
                    tmp_val = undefined;  // RL-20230223
                }
            }
        });
    };


    // RL-2020-11-10

    /**
     **  deleteTDRBookmark - remove TDR bookmark
     **/
    this.deleteTDRBookmark = function (bookmark_id) {
        // get access token
        var token_result = app_interface.getAccessToken();
        var delete_ok = 0;

        if (Object.keys(token_result).length > 0) {
            var token_type = token_result["token_type"];
            var access_token = token_result["access_token"];

            if (access_token != null && token_type != null) {
                var bookmark_url = general_parms.tdr_parms.tdr_api +
                    general_parms.tdr_parms.delete_bookmark_ep +
                    "/" + bookmark_id;
                var request_headers = {};
                request_headers["Authorization"] = token_type + " " + access_token;
                request_headers["Content-Type"] = "application/x-www-form-urlencoded";
                request_headers["Accept"] = "application/json";

                // send request to delete TDR bookmark
                $.ajax({
                    async: false,
                    type: "delete",
                    dataType: "json",
                    headers: request_headers,
                    url: bookmark_url,
                    success: function (data) {
                        delete_ok = 1;
                    },
                    error: function (xhr, status, error) {
                        delete_ok = -1;
                    }
                });
            }
        }
    }

    /**
     **  setImagefield - save image path to field of record object
     **/
    this.setImagefield = function (image_path, thumbnail_image_path, calling_field) {
        if (calling_field.parents('div.file_attachment').length > 0) {
            // add image field inside image grouped field structure
            if (typeof image_path != 'undefined') {
                var calling_element = $(calling_field).parents('div.file_attachment').find('input[type=text]').first();
                calling_element.val(image_path);
                calling_element.change();
            }
        }
        else {
            // add image field without image grouped field structure
            var repeating = true;
            if (!params.hasOwnProperty('image_group_repeating')
                || params.image_group_repeating.toUpperCase() != 'Y') {
                repeating = false;
            }

            // primary record image
            if (!record.getGroup(params.image_group, 1)) {
                record.addGroup(params.image_group, 1, null, repeating);
            }

            var has_thumbnail = true;
            if (thumbnail_image_path == null) {
                thumbnail_image_path = image_path;
                has_thumbnail = false;
            }

            var image_occ_group = record.getGroup(params.image_group, 1);  // <group_name occ="1">
            var image_group = image_occ_group.parent();                    // <group_name>
            var image_element = record.getElement('a_media_thumb', 1, image_group);
            if (image_element && image_element.length > 0) {
                record.updateElement(image_element, thumbnail_image_path, 1);
            }
            else {
                record.addElement('a_media_thumb', thumbnail_image_path, false, image_occ_group);
            }
            if (has_thumbnail) {
                // add access path
                image_element = record.getElement('image_tdr_access', 1, image_group);
                if (image_element && image_element.length > 0) {
                    record.updateElement(image_element, image_path, 1);
                }
                else {
                    record.addElement('image_tdr_access', image_path, false, image_occ_group);
                }
            }
        }
    }

    /**
     **  setAllImagefield - save image property fields to field of record object
     **/
    this.setAllImagefield = function (data_group, calling_field, first_instance) {
        var ix = 0;
        var media_type = "Image Reference";
        var group_fieldset = null;
        if (calling_field.parents('fieldset').length > 0) {
            group_fieldset = calling_field.parents('fieldset')[0];
            if ($(group_fieldset).data('group-title') != null) {
                media_type = $(group_fieldset).data('group-title');
            }
        }

        if (first_instance) {
            if (calling_field.parents('div.file_attachment').length > 0) {
                // add image field inside image grouped field structure
                for (ix = 0; ix < params.tdr_map[media_type].map.length; ix++) {
                    var from_field_value = data_group[params.tdr_map[media_type].map[ix].Source];
                    if (from_field_value == null) {
                        from_field_value = "";
                    }
                    var seek_element = $('body').find('#' + params.tdr_map[media_type].map[ix].Target);
                    var calling_element = $(seek_element).first();
                    if (calling_element != null) {
                        calling_element.val(from_field_value);
                        calling_element.change();
                    }
                }
            }
        }
        else {
            var numocc = 0;
            var repeating = true;
            if (params.tdr_map[media_type].group_repeating.toUpperCase() != 'Y') {
                repeating = false;
            }

            // count # of image grouped field
            numocc = record.getOccurrenceCount(params.tdr_map[media_type].group_mnemonic.toLowerCase()) + 1;
            if (record.addGroup(params.tdr_map[media_type].group_mnemonic, numocc, null, repeating)) {
                var image_occ_group = record.getGroup(params.tdr_map[media_type].group_mnemonic, numocc);
                if (image_occ_group != false) {
                    for (ix = 0; ix < params.tdr_map[media_type].map.length; ix++) {
                        var from_field_value = data_group[params.tdr_map[media_type].map[ix].Source];
                        if (from_field_value == null) {
                            from_field_value = "";
                        }
                        record.addElement(params.tdr_map[media_type].map[ix].Target.toLowerCase(), from_field_value, false, image_occ_group);
                    }
                }
            }

            // update grouped field occurrence count
            var group_id = params.tdr_map[media_type].group_mnemonic;  // params.image_group;
            if (group_fieldset != null) {
                group_id = group_fieldset.id;
            }
            group_id = group_id.toUpperCase();
            $('#' + group_id).find(params.group_total_occurrences).first().text(numocc);
        }
    }

    /**
     **  TdrItems2Record - save TDR items to fields of record object
     **/
    this.TdrItems2Record = function (data, calling_field) {

        if (calling_field.parents('div.file_attachment').length > 0) {
            // add image field inside image grouped field;
            var first_instance = true;
            for (ix = 0; ix < data.length; ix++) {
                app_interface.setAllImagefield(data[ix], calling_field, first_instance);
                first_instance = false;
            }
        }
        else {
            var thumbnail_image_path = data[0]['Thumbnail'];
            var image_path = data[0]['Access'];

            app_interface.setImagefield(image_path, thumbnail_image_path, calling_field);
        }
    }

    /**
     **  saveTDRitems - save bookmarked TDR items in record object
     **/
    this.saveTDRitems = function (bookmark_id, calling_field) {
        // get access token
        var token_result = app_interface.getAccessToken();

        // Is access token empty?
        if (Object.keys(token_result).length <= 0) {
            alert("Unable to connect to TDR server.");
        }
        else {
            var token_type = token_result["token_type"];
            var access_token = token_result["access_token"];

            if (access_token == null || token_type == null) {
                alert("Unable to acquire access token.");
            }
            else {
                var request_headers = {};
                request_headers["Authorization"] = token_type + " " + access_token;
                request_headers["Content-Type"] = "application/x-www-form-urlencoded";
                var bookmark_url = general_parms.tdr_parms.tdr_api +
                    general_parms.tdr_parms.bookmark_endpoint +
                    "/" + bookmark_id;

                // send request to retrieve bookmarked items
                $.ajax({
                    async: false,
                    type: "get",
                    dataType: "json",
                    headers: request_headers,
                    url: bookmark_url,
                    success: function (data) {
                        if (data.length > 0) {
                            app_interface.TdrItems2Record(data, calling_field);
                        }
                    },
                    error: function (xhr, status, error) {
                        if (xhr.status == 400) {
                            alert("No item is bookmarked.");
                        }
                        else {
                            alert("Unable to obtain boomarked items" + "\n" + "xhr: " + xhr + '\n' + "status: " + status + '\n' + "error: " + error);
                        }
                    }
                });
            }
        }
    }

    /**
     **  uploadFile
     **/
    this.uploadFile = function (calling_field) {
        var calling_element, url, accession_number;
        var colorbox_params = 0;
        if (record.getElement('accession_number', 0)) {
            accession_number = record.getElement('accession_number', 0).text();
        }
        else {
            accession_number = autoGeneratedAccessionNumber();
        }

        var handleFileUpload = function () {
            // RL-2020-11-10
            if (typeof $tmp != 'undefined' && $tmp == "$browse_TDR_items") {
                app_interface.showTdrModalDialog(0, 0, calling_field, app_interface.saveTDRitems);
            }
            else {
                // RL-2020-11-10
                app_interface.setImagefield($tmp, null, calling_field);
            }

            // RL-2020-11-10
            if (typeof $tmp != 'undefined') {
                delete $tmp;
            }

            // RL-2020-09-29
            app_interface.handleImages();
        };

        // RL-2020-09-29 RL-2021-01-07
        url = params.sessid + "?get&file=[m2aford]upload.html&parm1=" + accession_number + "&parm2=" + params.image_virtual_directory;

        // RL-2020-09-29
        $(calling_field).colorbox({
            href: url,
            transition: "elastic",
            iframe: true,
            width: "1200px",
            height: "800px",
            onClosed: function () {
                handleFileUpload();
            }
        });
    };

    /**
     **  downloadFile
     **/
    this.downloadFile = function (calling_field) {
        var file_url = $(calling_field).parent('div').find(':input').first().val();

        if (file_url.length == 0) {
            return false;
        } else if (file_url.indexOf("[M2A_IMAGE]") >= 0) {
            file_url = file_url.replace("[FTemporary Element not set by upload.php]", "/m2aonline/m2aimage/");
        } else if (file_url.indexOf("F:\\M2AFORD\\M2A\\IMAGES\\") >= 0) {
            file_url = file_url.replace("F:\\M2AFORD\\M2A\\IMAGES\\", "/m2aonline/m2aimage/");
        }

        window.open(file_url);
    };



    /**
     **  loadNewFormPage
     **/
    this.loadNewFormPage = function (calling_field) {
        var new_form_url = calling_field.attr('href');

        $(params.form_container).load(new_form_url, function () {
            app_interface.populateForm();
        });

        return false;
    };


    /**
     ** toggleMenu (for toggling between museum, archives,library)
     **/
    this.toggleMenu = function (visible_menu) {
        visible_menu = '#' + visible_menu;

        if (!$(visible_menu).is(':visible')) {
            $(visible_menu).show();
        }

        $('ul[id^=primary_worksheet_]').not(visible_menu).hide();
    };


    /**
     **  handleActiveRestrictions
     **/
    this.handleActiveRestrictions = function () {
        var res_icon = $('a[data-form=restrictions]').find('i.fa-warning');

        if (record.hasActiveRestrictions() && res_icon) {
            res_icon.addClass('active');
        } else if (res_icon) {
            res_icon.removeClass('active');
        } else {
            return false;
        }

        return true;
    };



    /**
     **  loadTooltips
     **/
    this.loadTooltips = function (calling_field) {
        // RL-202-12-21
        var tooltip = $('.tooltipstered');
        if (tooltip.length > 0) {
            $('.tooltipstered').tooltipster('destroy');
        }

        $(params.tooltip_elements).tooltipster({
            animation: 'fade',
            delay: 200,
            theme: 'tooltipster-default',
            touchDevices: false,
            trigger: 'hover'
        });

        $(params.tooltip_elements).each(function () {
            var field_name = $(this).attr('for');
            if (typeof tooltips[field_name] != undefined) {
                $(this).tooltipster('content', tooltips[field_name]);
            }
        });
    };

    /**
     **  Set As Default Address
     **/
    this.setDefaultAddress = function (calling_field) {
        if (typeof record.setDefaultAddress !== 'undefined') {
            var address_group_id = calling_field.parents(params.group_container).first().attr('id').toLowerCase();
            var address_group_occurrence = app_interface.getCurrentOccurrence(address_group_id.toUpperCase());
            var address_group = record.getGroup(address_group_id, address_group_occurrence);

            if (address_group) {
                record.setDefaultAddress(address_group);
                alert("Default address has been set");
            } else {
                console.log("ERROR");
            }
        }
    };


    /**
     **  saveRecord
     **/
    this.saveRecord = function (form_action, form) {
        if (typeof form_action === 'undefined' || typeof form === 'undefined') {
            return false;
        }
        record.prepareSubmission(undefined, $(form));

        if (typeof record_unlocked != 'undefined') {
            // Is record_unlocked defined in core_interface_handleing.js
            record_unlocked = true;
        }

        // RL-2020-12-10
        if (popupWindow() && typeof parent.already_unlocked != 'undefined') {
            parent.already_unlocked = true;
        }

        // RL-2020-11-10
        if (enable_tree && form_action.indexOf("?SAVETREE") > 0) {
            return saveTreeRecord(form_action, form); // Goes to m2atree_scripts.html
        }
        else {
            // RL-2020-12-10
            if (popupWindow()) {
                submitModalForm(form_action, form);
            }
            else {
                $(form).attr('action', form_action);
                $(form).submit();
            }
        }
    };


    /**
     **  updateImages
     **
     **  Notes:
     **  - This is going to be called whenever an image is uploaded to a group designated with '.contains_image' or '.has_image_holder'
     **  - It will replace the default placeholder image with the image that has just been uploaded.
     **/
    this.updateImages = function (calling_field) {
        if (typeof calling_field === 'string') {
            calling_field = (calling_field.indexOf('#') > -1) ? calling_field : '#' + calling_field;
        }

        if ($(calling_field).parents('.contains_image').length > 0) {
            var image_src = $(calling_field).val();

            if (image_src.length > 0) {
                if (image_src.indexOf(params.image_virtual_directory) > -1) {
                    image_src = image_src.replace(params.image_virtual_directory, params.image_url_path);
                }

                $(calling_field).parents('.contains_image').find('img.field_img').attr('src', image_src);
            } else {
                $(calling_field).parents('.contains_image').find('img.field_img').attr('src', '/m2aonline/assets/img/image-placeholder.png');
            }
        }
        else {  // RL-2020-11-10
            if ($(calling_field).parents('.has_image_holder').length > 0) {
                var image_src = $(calling_field).val();

                if (image_src.length > 0) {
                    if (image_src.indexOf(params.image_virtual_directory) > -1) {
                        image_src = image_src.replace(params.image_virtual_directory, params.image_url_path);
                    }

                    $(calling_field).parents('.has_image_holder').find('img.field_img').attr('src', image_src);
                } else {
                    $(calling_field).parents('.has_image_holder').find('img.field_img').attr('src', '/m2aonline/assets/img/image-placeholder.png');
                }
            }
        }
    };




    /**
     **
     **  Set Current Location
     **
     **/
    this.setCurrentLocation = function () {
        if (record.getGroup('current_loc_info')) {
            var current_location_grp = record.getGroup('current_loc_info', 1);
            var current_location = record.getElement('curators_code', 0, current_location_grp);

            if (record.getElement('c_cur_code')) {
                record.updateElement(record.getElement('c_cur_code'), current_location.text());
            } else {
                record.addElement('c_cur_code', current_location.text(), false);
            }

            app_interface.populateField('C_CUR_CODE');
        } else {
            return false;
        }
    };




    /**
     **
     **  Cancel Move
     **
     **/
    this.cancelMove = function (calling_field) {
        var current_occurrence = app_interface.getCurrentOccurrence('PLANNED_LOC_GRP');
        var planned_loc_grp = record.getGroup('planned_loc_grp', current_occurrence);

        if (record.getElement('moved_flag', 0, planned_loc_grp)) {
            var moved_flag = record.getElement('moved_flag', 0, planned_loc_grp);
            record.updateElement(moved_flag, 'Cancelled');
        } else {
            record.addElement('moved_flag', 'Cancelled', false, planned_loc_grp);
        }

        app_interface.populateField('MOVED_FLAG', 0);
    };


    /**
     **
     **  Perform Move
     **
     **/
    this.performMove = function (calling_field) {
        // change moved_flag of current occurrence to "planned"
        // remap current group of planned move to current location
        var current_locations; // will hold the parent group of planned moves
        var current_occurrence = app_interface.getCurrentOccurrence('PLANNED_LOC_GRP');
        var planned_loc_grp = record.getGroup('planned_loc_grp', current_occurrence);
        var planned_loc_grp_copy = planned_loc_grp.clone();

        // RL-2020-12-21
        var move_flag = record.getElement('moved_flag', 0, planned_loc_grp);
        if (move_flag != false && move_flag.text() == 'Moved') {
            alert("Planned movement is already moved.");
        }
        else {
            if (record.getElement('moved_flag', 0, planned_loc_grp)) {
                moved_flag = record.getElement('moved_flag', 0, planned_loc_grp);
                record.updateElement(moved_flag, 'Moved');
            } else {
                record.addElement('moved_flag', 'Moved', false, planned_loc_grp);
            }

            app_interface.populateField('MOVED_FLAG', 0);

            // remap current group to current location:
            if (record.getGroup('current_loc_info')) {
                current_locations = record.getGroup('current_loc_info').parent();
                var new_occurrence_number = current_locations.children().length + 1;
                record.addGroup('current_loc_info', new_occurrence_number, current_locations, true);  // RL-2020-12-21
                current_location_group = record.getGroup('current_loc_info', new_occurrence_number);
                record.remap(planned_loc_grp_copy, record.params.maps.perform_movement, current_location_group);

                // move the new occurrence to the front
                record.moveOccurrence(current_location_group, 1);
            } else {
                record.addGroup('current_loc_info', 1, null, true);  // RL-2020-12-21
                current_locations = record.getGroup('current_loc_info'); // sets to the new occurrence
                record.remap(planned_loc_grp_copy, record.params.maps.perform_movement, current_locations);
            }

            // populate group
            app_interface.populateGroup('CURRENT_LOC_INFO', 1);

            // update current location
            app_interface.setCurrentLocation();
            app_interface.populateField('c_cur_code', 0);
        }
    };

    // rl-2020-09-29

    /**
    **
    **  return read-only record flag
    **
    **/
    this.readonlyRecord = function () {
        return this.readonly_record;
    };

    // RL-2020-09-29
    /**
    **
    **  call server to obtain AI value and return AI value as function return value
    **
    **/

    function read_n_save_ai_value(ai_scheme_name, ai_field_id) {
        var get_ai_url = getCookie("HOME_SESSID") + "?GETAIVALUE&NAME=" + ai_scheme_name;

        $.ajax({
            async: true,
            type: "get",
            dataType: "xml",
            url: get_ai_url,
            success: function (data) {
                if (jQuery.isXMLDoc(data)) {
                    var xml_value = getXmlFieldValue(data, "error_code");
                    if (xml_value != "0") {
                        alert("Unable to obtain Auto-Increment number because of error " + xml_value);
                    }
                    else {
                        // extract AI value
                        xml_value = getXmlFieldValue(data, "value");
                        if (xml_value != '') {
                            // save AI value in target field
                            var ai_field = document.getElementById(ai_field_id);
                            ai_field.value = xml_value;
                            $(ai_field).change();
                        }
                    }
                }
                else {
                    var msg = "Unable to obtain Auto-Increment number because result is malformed XML response.";

                    if (data == null) {
                        alert(msg);
                    }
                    else {
                        alert(msg + "\n" + data);
                    }
                }
            },
            error: function (xhr, status, error) {
                alert("Unable to obtain Auto-Increment number" + "\n" + "xhr: " + xhr + '\n' + "status: " + status + '\n' + "error: " + error);
            }
        });
    }

    /*****
    **
    **  RetrieveSetAiValue : retrive AI value from server and save it in specified input tag
    **
    **  params:
    **    - caller : an HTML select element
    **
     *****/
    this.RetrieveSetAiValue = function (caller) {
        var ai_parm_name = $(caller).data('ai');
        if (ai_parm_name != '') {
            if (currentAppInterface != undefined && currentAppInterface != null) {
                var ai_params = eval('currentAppInterface.app_record.params.' + ai_parm_name);

                // get AI field ID
                var ai_field_id = ai_params.ai_field;
                if (ai_field_id != null) {
                    // get AI value
                    if (ai_params[caller.value] != null) {
                        read_n_save_ai_value(ai_params[caller.value], ai_field_id);
                    }
                }
            }
        }
    };


    // RL-2020-11-10

    /*****
    **
    **  getAccessToken : get titan access token for discover page
    **
    **  params:
    **    - none
    **
     *****/
    this.getAccessToken = function () {
        var token_result = {};
        var token_url = general_parms.tdr_parms.tdr_api + general_parms.tdr_parms.login_endpoint;

        // prepare form data
        var grant_type = "password";
        var username = decode_string(general_parms.tdr_parms.username);
        var userpassword = decode_string(general_parms.tdr_parms.userpassword);
        var form_data = 'grant_type=' + grant_type + "&username=" + username + "&password=" + userpassword;

        $.ajax({
            async: false,
            type: "POST",
            url: token_url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: form_data,
            processData: false,
            cache: false,
            timeout: 30000,
            success: function (data) {
                token_result = data;
            },
            error: function (e) {
                alert("Error is encountered while obtaining access token.");
            }
        });

        return token_result;
    }


    // RL-2020-11-10

    /*****
    **
    **  showTdrModalDialog : show web page in iframe modal dialog
    **
    **  params:
    **    - dialog_width : dialog width in pixels. If zero, screen width is assumed
    **    - dialog_height : dialog hieght in pixels. If zero, screen height is assumed.
    **    - calling_feld : an HTML DOM element where image reference is added.
    **    - closeFunc : callback function which saves image path of bookmarked items in record object.
    **
     *****/
    this.showTdrModalDialog = function (dialog_width, dialog_height, calling_field, closeFunc) {
        // ensure mandatory parameters are defined
        if (typeof general_parms == 'undefined'
            || typeof general_parms.tdr_parms == 'undefined'
            || general_parms.tdr_parms.tdr_api == null
            || general_parms.tdr_parms.tdr_ui == null
            || general_parms.tdr_parms.login_endpoint == null
            || general_parms.tdr_parms.search_endpoint == null
            || general_parms.tdr_parms.bookmark_endpoint == null
            || general_parms.tdr_parms.delete_bookmark_ep == null
            || general_parms.tdr_parms.username == null
            || general_parms.tdr_parms.userpassword == null) {
            alert("Madnatoy TDR parameter is missing.");
        }
        else {
            if (dialog_width == 0) {
                // calculate modal window width
                dialog_width = window.innerWidth - 8; // leave spaces in left and right margin
            }

            if (dialog_height == 0) {
                // calculate modal window height
                dialog_height = window.innerHeight - 13;  // leave spaces in top and bottom margin
            }

            // get user name
            var user_name = $.cookie('USERNAME');
            if (user_name == null || user_name == "") {
                user_name = "M2A";
            }

            // get current time in seconds
            var today = new Date();
            var year = (today.getFullYear()).toString();
            var month = (today.getMonth() + 1).toString();
            var day = (today.getDate()).toString();
            var hour = (today.getHours()).toString();
            var minute = (today.getMinutes()).toString();
            var second = (today.getSeconds()).toString();
            if (today.getMonth() + 1 < 10) {
                month = "0" + month;
            }
            if (today.getDate() < 10) {
                day = "0" + day;
            }
            if (today.getHours() < 10) {
                hour = "0" + hour;
            }
            if (today.getMinutes() < 10) {
                minute = "0" + minute;
            }
            if (today.getSeconds() < 10) {
                second = "0" + second;
            }

            // geenrate bookmark ID
            var bookmark_id = user_name + "_" + year + month + day + "_" + hour + minute + second;

            var login_url = encode_string(general_parms.tdr_parms.tdr_api + general_parms.tdr_parms.login_endpoint);
            var search_url = encode_string(general_parms.tdr_parms.tdr_ui + general_parms.tdr_parms.search_endpoint);
            var discovery_url = general_parms.tdr_parms.tdr_ui + "/m2a-search.html" +
                "?US=" + general_parms.tdr_parms.username +
                "&PW=" + general_parms.tdr_parms.userpassword +
                "&LO=" + login_url +
                "&SE=" + search_url +
                "&BI=" + bookmark_id +
                general_parms.tdr_parms.search_endpoint +
                "/" + bookmark_id;

            $.colorbox({
                iframe: true,
                href: discovery_url,
                transition: "elastic",
                width: dialog_width,
                height: dialog_height,
                title: "<span style='color:black;'>Click <i class='fa fa-times-circle-o'></i> to save bookmarked items</span>",
                onClosed: function () {
                    if (closeFunc != null) {
                        // call app_interface.saveTDRitems method
                        closeFunc(bookmark_id, calling_field);

                        // remove bookmark
                        app_interface.deleteTDRBookmark(bookmark_id);

                        // RL-2020-11-10
                        app_interface.handleImages();   // update tombstone image
                    }
                    // parent.$.colorbox.close();
                }
            });
        }
    }
}


// RL-2020-11-09

// decode web character string
function decode_string(input_string)  // decode_string
{
    var result_string;
    var temp_array = [];
    var ix;
    var temp_ix;
    var char_value;
    var char_size;
    var numchar;
    var limit;
    var leng;

    // undo MWI encoding
    leng = input_string.length;
    ix = 0;
    temp_ix = 0;
    while (ix < leng) {
        char_value = input_string.charCodeAt(ix);
        if (get_multipler(char_value) != 0) {
            if (ix + 1 < leng) {
                char_value = decode_web_char(char_value, input_string.charCodeAt(ix + 1));
                char_size = 2;
            }
            else {
                char_value = decode_web_char(char_value, 0);
                char_size = 1;
            }
        }
        else {
            char_value = decode_web_char(char_value, 0);
            char_size = 1;
        }

        if (char_value != -1) {
            temp_array[temp_ix] = char_value;
            temp_ix++;
        }
        ix += char_size;
    }

    // undo MINISIS encoding
    leng = temp_ix;
    numchar = (leng - 1) / 2;
    limit = temp_array[leng - 1] - 65;   // 65 = "A"
    if (limit != numchar) {
        result_string = input_string;
    }
    else {
        limit = Math.floor(limit / 2);
        temp_ix = ((numchar - 1) * 2);
        for (ix = 0; ix < limit; ix++) {
            // swap character
            char_value = temp_array[ix * 2];
            temp_array[ix * 2] = temp_array[temp_ix];
            temp_array[temp_ix] = char_value;
            temp_ix -= 2;
        }

        result_string = "";
        for (ix = 0; ix < numchar; ix++) {
            // convert two byte value to one byte value
            char_value = temp_array[ix * 2] - (ix * 2) - 1 - 48;  // 48 = "0"
            char_value += (temp_array[ix * 2 + 1] - (ix * 2) - 2 - 48) * 16;  // 48 = "0"
            result_string = result_string + String.fromCharCode(char_value);
        }
    }

    return result_string;
}

// map multipler symbol character to multipler value
function get_multipler(char_value) {
    if (char_value == 124) {         // "|"
        return 62;
    }
    else if (char_value == 63) {     // "?"
        return 124;
    }
    else if (char_value == 64) {     // "@"
        return 186;
    }
    else if (char_value == 91) {     // "["
        return 248;
    }

    return 0;
}

// decode base62 web character to base256 character
function decode_web_char(char1, char2)   // decode_web_char
{
    var char_value = -1;

    var multipler = get_multipler(char1);
    if (multipler != 0) {
        char_value = map_web_char(char2);
        if (char_value >= MAX_BYTE2_VALUE) {
            char_value = -1;
        }
        if (char_value != -1) {
            char_value += multipler;
        }
    }
    else {
        char_value = map_web_char(char1);
    }

    return char_value;
}

// map base62 character code to base256 character code
function map_web_char(web_char)   // map_web_char
{
    var base256_charvalue;

    if (web_char >= 48 && web_char <= 57) {  // 0-9
        // code range 0-9
        base256_charvalue = web_char - 48;
    }
    else if (web_char >= 65 && web_char <= 90) {   // A-Z
        // code range 10-35
        base256_charvalue = 10 + (web_char - 65);
    }
    else if (web_char >= 97 && web_char <= 122) {  // a-z
        // code range 36-61
        base256_charvalue = 36 + (web_char - 97);
    }
    else {
        // invalid base-62 characters
        base256_charvalue = -1;
    }

    return base256_charvalue;
}

// map escaped url characters
function map_escaped_chars(input_string) {
    // map ~2f to /
    input_string = input_string.replace(/\//g, "~2f");
    // map ~22 to "
    input_string = input_string.replace(/\"/g, "~22");
    // map ~3a to :
    input_string = input_string.replace(/:/g, "~3a");
    // map ~20 to space
    input_string = input_string.replace(/ /g, "~20");

    return input_string;
}

// encode_string()
// Purpose: convert plan-text string to web character string
function encode_string(input_string) {
    // convert plan-text string to MINISIS encoded string
    var minisis_encoded_string = minisis_encoding(input_string);

    // covert MINISIS encoded sting to web-encoded string
    var web_string = web_encoding(minisis_encoded_string);

    // return web-encoded string
    return web_string;
}

// minisis_encoding()
// Purpose: encode plan-text to minisis encoded string
// Processing: It splits byte into two 4bit value, add sum value to 4bit value, swap values and add check digit.
function minisis_encoding(input_string) {
    var mEncodedString = "";
    var ix = 0;
    var limit = 0;
    var last_loc = 0;
    var value1 = 0;
    var value2 = 0;
    var charvalue;
    var temp_array = [];
    var string_leng = input_string.length;

    // input string size must be less than or equal to 96 character
    if (string_leng <= 96) {
        // split byte to 2 4bit byte and then add sum value
        for (ix = 0; ix < string_leng; ix++) {
            charvalue = input_string.charCodeAt(ix);
            value2 = Math.floor(charvalue / 16);
            value1 = charvalue % 16;
            temp_array[ix * 2] = (value1 + (ix * 2) + 1 + 48);  // 48 = character code of "0"
            temp_array[ix * 2 + 1] = (value2 + (ix * 2) + 2 + 48);
        }

        // swap characters
        limit = Math.floor(string_leng / 2);
        last_loc = (string_leng * 2) - 2;
        for (ix = 0; ix < limit; ix++) {
            value1 = temp_array[ix * 2];
            temp_array[ix * 2] = temp_array[last_loc];
            temp_array[last_loc] = value1;
            last_loc -= 2;
        }

        // set check digit
        temp_array[string_leng * 2] = string_leng + 65;  // 65 = character code "A"

        // covert byte array to string
        limit = string_leng * 2 + 1;
        for (ix = 0; ix < limit; ix++) {
            mEncodedString = mEncodedString + String.fromCharCode(temp_array[ix]);
        }
    }

    return mEncodedString;
}

// web_encoding()
// Purpose: encode text string to web encoded string
// Processing: It maps 256base character code to one or more 62base character codes
function web_encoding(input_string) {
    var base62_code = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var multipler_char = "|?@[";
    var wEncodedString = "";
    var web_char_string = "";
    var charvalue = 0;
    var ix = 0;
    var multipler = 0;
    var string_leng = input_string.length;

    for (ix = 0; ix < string_leng; ix++) {
        charvalue = input_string.charCodeAt(ix);
        if (charvalue < MAX_WEB_CHARS) {
            web_char_string = String.fromCharCode(base62_code.charCodeAt(charvalue));
        }
        else {
            multipler = Math.floor(charvalue / MAX_WEB_CHARS) - 1;
            web_char_string = String.fromCharCode(multipler_char.charCodeAt(multipler));
            web_char_string = web_char_string + String.fromCharCode(base62_code.charCodeAt(charvalue % MAX_WEB_CHARS));
        }
        wEncodedString = wEncodedString + web_char_string;
    }

    return wEncodedString;
}

// RL-2021-01-07
// auto-generated access number
function autoGeneratedAccessionNumber() {
    now = new Date();
    var dd = now.getDate();
    var mm = now.getMonth() + 1;
    var yyyy = now.getFullYear();

    if (dd < 10) {
        dd = 0 + dd
    }

    if (mm < 10) {
        mm = 0 + mm
    }

    currentTime = yyyy + '.' + mm + '.' + dd;
    randomNum = '';
    randomNum += Math.round(Math.random() * 9);
    randomNum += Math.round(Math.random() * 9);
    randomNum += now.getTime();

    return currentTime + '.' + randomNum.substr(0, 5);
}