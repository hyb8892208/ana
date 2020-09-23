function cancel(){
	window.location.href = "routing-groups.html";
}
function typechange()
{
	var type = document.getElementById('type').value;
	if(type == 'sip') {
		set_visible('span_fxo_members', false);
		set_visible('span_sip_members', true);	
		
		$("#policy").html(
			"<option value='ascending' >"+language("Ascending")+"</option>"+
			"<option value='descending' >"+language("Descending")+"</option>"+
			"<option value='ringall' >"+language("Ringall")+"</option>"
		);
	} else {
		set_visible('span_sip_members', false);
		set_visible('span_fxo_members', true);	
		
		$("#policy").html(
			"<option value='ascending' >"+language("Ascending")+"</option>"+
			"<option value='descending' >"+language("Descending")+"</option>"+
			"<option value='roundrobin' >"+language("Roundrobin")+"</option>"+
			"<option value='reverseroundrobin' >"+language("Reverse Roundrobin")+"</option>"
		);
	}
}

function onload_func()
{
}

function check(all_group_data)
{
	var name_ary = [];
	for(var item in all_group_data){
		if(all_group_data[item]['_section'] == section){continue;}
		name_ary.push(all_group_data[item]['_section']);
	}
	var group_name = document.getElementById('group_name').value;

	document.getElementById('cgroup_name').innerHTML = '';
	for (var i in name_ary)
	{
		if(name_ary[i] == group_name) {
			document.getElementById('cgroup_name').innerHTML = con_str('Already exist.');
			return false;
		}
	}
	
	if (group_name==''){
		 document.getElementById('cgroup_name').innerHTML = '<font color=clred>* '+language('Must Set')+'</font>';
		 return false;
	}
	
	var type = document.getElementById('type').value;
	var flag = 0;
	if(type == 'fxo'){
		$(".fxo_members").each(function(){
			if($(this).attr('checked') == 'checked'){
				flag = 1;
			}
		});
	}else if(type == 'sip'){
		$(".sip_members").each(function(){
			if($(this).attr('checked') == 'checked'){
				flag = 1;
			}
		});
	}
	if(flag == 0){
		document.getElementById('members_tip').innerHTML = '<font color=clred>* '+language('Must Set')+'</font>';
		return false;
	}
	
	return true;
}
/********************************************************************************************/


/*****************************SHOW ROUTING GROUPS EDIT BEGIN*****************************/
(function(){
	$("#lang_group_name").html(language('Group Name'));
	$("#lang_group_name_help").html(language('Group Name help',"The name of this route. Should be used to describe what types of calls this route matches(for example, 'sip1TOport1' or 'port1TOsip2')."));
	$("#lang_type").html(language('Type'));
	$("#lang_type_help").html(language('Type help'));
	$("#lang_policy").html(language('Policy'));
	$("#lang_policy_help").html(language('Policy help'));
	$("#lang_members").html(language('Members'));
	$("#lang_members_help").html(language('Members help'));
	
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

function fxo_member_show(analog_data, members){
	var fxo_str = '';
	fxo_str += "<table cellpadding='0' cellspacing='0' style='border:none;' >";
	fxo_str += "<tr style='border:none;'>";
	fxo_str += "<td style='border:none;'>";
	fxo_str += "NO.";
	fxo_str += "</td>";
	fxo_str += "<td style='border:none;'>";
	fxo_str += "<input type='checkbox' name='selfxoall' class='selfxoall' />All";
	fxo_str += "</td>";
	fxo_str += "</tr>";
	
	var num = 1;
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] == 2){
			var value = 'fxo-'+analog_data[item]['_channel'];
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
			fxo_str += '<tr style=\"border:none;\">';
			fxo_str += '<td style=\"border:none;\">';
			fxo_str += num;
			fxo_str += '</td>';
			fxo_str += '<td style=\"border:none;\">';
			fxo_str += '<input type="checkbox" class="fxo_members" name="fxo_members" value="fxo-'+analog_data[item]['_channel']+'" '+checked+'>';
			fxo_str += 'fxo-'+analog_data[item]['_channel'];
			fxo_str += '</td>';
			fxo_str += '</tr>';
			num++;
		}
	}
	
	fxo_str += "</table>";
	
	return fxo_str;
}

function sip_member_show(sip_data, members){
	var sip_str = '';
	sip_str += "<table  cellpadding=\"0\" cellspacing=\"0\" style=\"border:none;\" >";

	sip_str += "<tr style=\"border:none;\">";
	sip_str += "<td style=\"border:none;\">";
	sip_str += "NO.";
	sip_str += "</td>";
	sip_str += "<td style=\"border:none;\">";
	sip_str += "<input type='checkbox' name='selsipall' class='selsipall' />All";
	sip_str += "</td>";
	sip_str += "</tr>";
	
	var num = 1;
	for(var item in sip_data){
		var value = 'sip-'+sip_data[item]['_section'];
		if(members != undefined){
			var m_temp = members.split(',');
		}else{
			var m_temp = '';
		}
		var checked = '';
		for(var itm in m_temp){
			if(m_temp[itm] == value){
				checked = 'checked';
			}
		}
		sip_str += '<tr style=\"border:none;\">';
		sip_str += '<td style=\"border:none;\">';
		sip_str += num;
		sip_str += '</td>';
		sip_str += '<td style=\"border:none;\">';
		sip_str += '<input type="checkbox" class="sip_members" name="sip_members" value="'+value+'" '+checked+'>';
		sip_str += value;
		sip_str += '</td>';
		sip_str += '</tr>';
		num++;
	}
	sip_str += '</table>';
	
	return sip_str;
}

function group_show(group_data, analog_data, sip_data){
	var s_order = '';
	if(group_data['_order'] != 0 && group_data['_order'] != undefined){
		s_order = group_data['_order'];
	}else if(_order != undefined){
		s_order = _order;
	}
	
	//value
	document.getElementById('group_name').value = section;
	document.getElementById('order').value = s_order;
	
	//select
	if(_Define['type'] == 2 || group_data['_type'] == 0){
		var type_val = 'sip';
	}else{
		var type_val = 'fxo';
	}
	document.getElementById('type').value = type_val;
	
	typechange();
	if(group_data['_policy'] == 4){
		var policy_val = 'ringall';
	}else if(group_data['_policy'] == 3){
		var policy_val = 'reverseroundrobin';
	}else if(group_data['_policy'] == 2){
		var policy_val = 'roundrobin';
	}else if(group_data['_policy'] == 1){
		var policy_val = 'descending';
	}else{
		var policy_val = 'ascending';
	}
	
	document.getElementById('policy').value = policy_val;
	
	$("#span_fxo_members").html(fxo_member_show(analog_data, group_data['_members']));
	$("#span_sip_members").html(sip_member_show(sip_data, group_data['_members']));
	
	$(".selfxoall").click(function(){
		if($(this).attr('checked') == 'checked'){
			$(".fxo_members").attr('checked', 'checked');
		}else{
			$(".fxo_members").removeAttr('checked');
		}
	});
	$(".selsipall").click(function(){
		if($(this).attr('checked') == 'checked'){
			$(".sip_members").attr('checked', 'checked');
		}else{
			$(".sip_members").removeAttr('checked');
		}
	});
	
	if(_Define['type'] == 2){
		$("#type_fxo").hide();
	}
}

var url = get_url_para();
if(url['name'] != undefined){
	var section = url['name'];
}else{
	var section = '';
}
var edit = url['edit'];
var _order = url['order'];

if(edit == 'edit'){
	object.AGRoutingGroupGetOne(succeed_back, error_back, section);
}else if(edit == 'new'){
	object.AGRoutingGroupGetNew(succeed_back, error_back);
}

function succeed_back(data){
	var data_temp = data['_get'];
	var group_data = data_temp['_group'];
	if(group_data == undefined){
		group_data = [];
		group_data[section] = [];
	}
	var analog_data = data_temp['_ana']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	var all_group_data = data_temp['_groups']['_item'];
	
	header(data_temp['_combuf']);
	footer();
	
	group_show(group_data, analog_data, sip_data);
	
	onload_func();
	
	//save
	$(".save_input").click(function(){
		if(check(all_group_data)){
			if(save_only_once()){
				$("#loading_image").show();
				group_save();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*****************************SHOW ROUTING GROUPS EDIT END*****************************/


/*****************************SAVE ROUTING GROUPS EDIT BEGIN*****************************/
function group_save(){
	var group_name = document.getElementById('group_name').value;
	var new_section = group_name;
	var old_section = section;
	
	var RoutingGroup = new AST_RoutingGroup();
	
	var order = document.getElementById('order').value;
	RoutingGroup._order = order;
	
	var type = document.getElementById('type').value;
	if(type == 'sip'){
		var type_val = 0;
	}else if(type == 'fxo'){
		var type_val = 1;
	}
	RoutingGroup._type = type_val;
	
	var policy = document.getElementById('policy').value;
	if(policy == 'ascending'){
		var policy_val = 0;
	}else if(policy == 'descending'){
		var policy_val = 1;
	}else if(policy == 'roundrobin'){
		var policy_val = 2;
	}else if(policy == 'reverseroundrobin'){
		var policy_val = 3;
	}else if(policy == 'ringall'){
		var policy_val = 4;
	}
	RoutingGroup._policy = policy_val;
	
	if(type == 'fxo'){
		var member_type = 'fxo_members';
	}else if(type == 'sip'){
		var member_type = 'sip_members';
	}
	
	var members = '';
	$("."+member_type).each(function(){
		if($(this).attr('checked') == 'checked'){
			var value = $(this).val();
			if(value != ''){
				members += value+',';
			}
		}
	});
	members=members.substring(0,members.length-1);
	RoutingGroup._members = members;
	RoutingGroup._section = '';
	
	object.AGRoutingGroupSave(save_succeed_back, save_error_back, old_section, new_section, RoutingGroup);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		if(edit == 'new'){
			window.location.href = 'routing-groups.html?new=true';
		}else{
			window.location.href = 'routing-groups.html?save=true';
		}
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*****************************SAVE ROUTING GROUPS EDIT END*****************************/