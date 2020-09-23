function check(){
	var group_number = document.getElementById('group_number').value;
	
	document.getElementById('cgroup_number').innerHTML = '';
	if(group_number == ''){
		document.getElementById('cgroup_number').innerHTML = con_str('Can not be null');
		return false;
	}
	
	var flag = 0;
	$(".fxs_members").each(function(){
		if($(this).attr('checked') == 'checked'){
			flag = 1;
		}
	});
	document.getElementById('members_tip').innerHTML = '';
	if(flag == 0){
		document.getElementById('members_tip').innerHTML = '<font color=clred>* '+language('Must Set')+'</font>';
		return false;
	}
	
	return true;
}

function fxs_members_show(analog_data, members){
	var fxs_str = '';
	fxs_str += "<table cellpadding='0' cellspacing='0' style='border:none;' >";
	fxs_str += "<tr style='border:none;'>";
	fxs_str += "<td style='border:none;'>";
	fxs_str += "NO.";
	fxs_str += "</td>";
	fxs_str += "<td style='border:none;'>";
	fxs_str += "<input type='checkbox' name='selfxsall' class='selfxsall' />All";
	fxs_str += "</td>";
	fxs_str += "</tr>";
	
	var num = 1;
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] == 1){
			var value = 'fxs-'+analog_data[item]['_channel'];
			if(members != undefined){
				var m_temp = members.split(',');
			}else{
				var m_temp = '';
			}
			var checked = '';
			for(var itm in m_temp){
				if(m_temp[itm] == value){
					checked = 'checked';
					break;
				}
			}
			fxs_str += '<tr style=\"border:none;\">';
			fxs_str += '<td style=\"border:none;\">';
			fxs_str += num;
			fxs_str += '</td>';
			fxs_str += '<td style=\"border:none;\">';
			fxs_str += '<input type="checkbox" class="fxs_members" name="fxs_members" value="fxs-'+analog_data[item]['_channel']+'" '+checked+'>';
			fxs_str += 'S'+analog_data[item]['_channel'];
			fxs_str += '</td>';
			fxs_str += '</tr>';
			num++;
		}
	}
	
	fxs_str += "</table>";
	
	return fxs_str;
}
/*****************************SHOW ROUTING GROUPS Dial EDIT BEGIN*****************************/
(function(){
	$("routing_groups_li").html(language('Group Dial'));
	$("#lang_group_number").html(language('Group Number'));
	$("#lang_group_number_help").html(language('Group Number help','Group Number'));
	$("#lang_timeout").html(language('Timeout'));
	$("#lang_timeout_help").html(language('Timeout help','Timeout'));
	$("#lang_members").html(language('Members'));
	$("#lang_members_help").html(language('Members help','Members'));
	
	/* other info */
	var url = get_url_para();
	var edit = url['edit'];
	if(edit == 'edit'){
		$("#modify_a_group_h4").text(language('Modify a Group'));
	}else if(edit == 'new'){
		$("#modify_a_group_h4").text(language('Create a Group'));
	}
	$("#routing_groups_li").text(language('Routing Groups'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
}());

function group_dial_show(data_temp){
	group_data = data_temp['_group'];
	analog_data = data_temp['_Ana']['_item'];
	
	var group_number = group_data['_dialnumber'];
	var timeout = group_data['_dialtimeout'];
	var members = group_data['_members'];
	
	document.getElementById('group_number').value = group_number;
	document.getElementById('timeout').value = timeout;
	
	$("#span_fxs_members").html(fxs_members_show(analog_data, members));
	
	
	$(".selfxsall").click(function(){
		if($(this).attr('checked') == 'checked'){
			$(".fxs_members").attr('checked', 'checked');
		}else{
			$(".fxs_members").removeAttr('checked');
		}
	});
}

var url = get_url_para();
if(url['name'] != undefined){
	var section = url['name'];
}else{
	var section = '';
}
var edit = url['edit'];

if(edit = 'edit'){
	object.AGRoutingGroupsDialGetOne(succeed_back, error_back, section);
}else{
	object.AGRoutingGroupsDialGetOne(succeed_back, error_back, null);
}

function succeed_back(data){
	console.log(data);
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	footer();
	
	group_dial_show(data_temp);
	
	//save
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				group_dial_save();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*****************************SHOW ROUTING GROUPS Dial EDIT END*****************************/

/*****************************SAVE ROUTING GROUPS Dial EDIT BEGIN*****************************/
function group_dial_save(){
	var group_number = document.getElementById('group_number').value;
	var old_section = section;
	
	var FxsGroupDial = new AST_FxsGroupDial();
	
	var timeout = document.getElementById('timeout').value;
	
	var members = [];
	$(".fxs_members").each(function(){
		if($(this).attr('checked') == 'checked'){
			var value = $(this).val();
			if(value != ''){
				members.push(value);
			}
		}
	});
	var members_str = members.join(',');
	
	FxsGroupDial._dialnumber = group_number;
	FxsGroupDial._dialtimeout = timeout;
	FxsGroupDial._members = members_str;
	
	object.AGRoutingGroupsDialSave(save_succeed_back, save_error_back, old_section, group_number, FxsGroupDial);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		if(edit == 'new'){
			window.location.href = 'routing-ring-groups.html?new=true';
		}else{
			window.location.href = 'routing-ring-groups.html?save=true';
		}
	}
}

function save_error_back(){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*****************************SAVE ROUTING GROUPS Dial EDIT END*****************************/