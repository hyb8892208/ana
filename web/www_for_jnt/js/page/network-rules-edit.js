function check(all_rules, section)
{
	var name_ary = [];
	for(var item in all_rules){
		if(all_rules[item]['_section'] == section){continue;}
		name_ary.push(all_rules[item]['_section']);
	}
	var rule_name = document.getElementById('rule_name').value;
	var port1 = parseInt(document.getElementById('allow_port1').value);
	var port2 = parseInt(document.getElementById('allow_port2').value);
	var ip = document.getElementById('allow_ip').value;
	var mask = document.getElementById('allow_mask').value;
	
	// if(!check_routingname(rule_name)) {
		// document.getElementById("crule_name").innerHTML = con_str(language('js check rulename','Allowed character must be any of [0-9a-zA-Z`~!@#$%^*()_{}:|?-=.], 1-32 characters.'));
		// document.getElementById("cport").innerHTML = '';
		// document.getElementById("cip").innerHTML = '';
		// return false;
	// }
	
	document.getElementById('crule_name').innerHTML = '';
	for (var i in name_ary) 
	{
		if(name_ary[i] == rule_name) {
			document.getElementById('crule_name').innerHTML = con_str('Already exist.');
			return false;
		}
	}
	
	document.getElementById('cport').innerHTML = '';

	if (port1>port2) {
		document.getElementById("cport").innerHTML = con_str('The start port must smaller than the end port.');
		document.getElementById("cip").innerHTML = '';
		return false;			
	} 
	if ( (port1 < 0) || (port1 > 65535) || (port2<0) || (port2>65535)) {
		document.getElementById('cport').innerHTML = con_str('The range of port is 0~65535.Enter the port is invalid.');
		document.getElementById("cip").innerHTML = '';
		return false;
	}
	
	document.getElementById('cip').innerHTML = '';
	if(!check_domain(ip) ) {
		if (ip != "") {
			document.getElementById("cip").innerHTML = con_str(language('js check domain','Invalid domain or IP address.'));
			return false;
		} else {
			if (mask != "") {
				document.getElementById("cip").innerHTML = con_str('If IP is empty,mask should not be set.');
				return false;
			}
		}
	}
	if(ip == ''){
		document.getElementById("cip").innerHTML = con_str('IP can not be empty.');
		return false;
	}

	if (!check_domain(mask)) {
		if (mask != "") {
			mask = parseInt(mask);
			if (!isNaN(mask)) {
				if (mask <0 || mask >32) {
					document.getElementById("cip").innerHTML = con_str('The range of mask is 0~32,or be form of domain name.');
					return false;
				}
			} else {
				document.getElementById("cip").innerHTML = con_str('The type of mask should be domain name or number.');
				return false;
			}
		} 
	}

	return true;
}

function onload_func(){
	$("#float_button_3").mouseover(function(){
	  $("#float_button_3").css({opacity:"1",filter:"alpha(opacity=100)"});
	});
	$("#float_button_3").mouseleave(function(){
	  $("#float_button_3").css({opacity:"0.5",filter:"alpha(opacity=50)"});
	});
	float_sort_hide();
	var sort_info_top = $("#lps").offset().top;
	$("#sort_ag_cli").offset({top: sort_info_top });
	$("#sort_out").offset({top: sort_info_top });
	$("#sort_out").mouseover(function(){
		if($("#sort_out").offset().left <= 5){
			float_sort_on();
		}
	});
	$("#sort_ag_cli").mouseleave(function(){
		float_sort_hide();
	});
}
function float_sort_hide()
{
	$("#sort_ag_cli").stop().animate({left:"-198px"}, 300);
	$("#sort_out").stop().animate({left:"0px"}, 300);
};
function float_sort_on()
{
	$("#sort_ag_cli").animate({left:"0px"}, 300);
	$("#sort_out").animate({left:"198px"}, 300);
};

function onload_show(){
	$("#sort_info").css("height","120px");
	onload_func();
}
/*********************************************************************************/
(function(){
	var url = get_url_para();
	var edit = url['edit'];
	if(edit == 'new'){
		$("#lang_title").html(language('Create a Rule'));
	}else{
		$("#lang_title").html(language('Modify a Rule'));
	}
	
	$("#lang_security_rules").html(language('Security Rules'));
	$("#lang_rule_name").html(language('Rule Name'));
	$("#lang_rule_name_help").html(language('Rule Name help','The name of this rule.'));
	$("#lang_protocol").html(language('Protocol'));
	$("#lang_protocol_help").html(language('Protocol help','Choose the protocol.'));
	$("#lang_port").html(language('Port'));
	$("#lang_port_help").html(language('Port help','Input the range of port.'));
	$("#lang_ip_mask").html(language('IP / MASK'));
	$("#lang_ip_mask_help").html(language('IP help','The format of IP is IP/MASK.Confirm the range by IP and mask.'));
	$("#lang_actions").html(language('Actions'));
	$("#lang_actions_help").html(language('Actions help','Choose the firewall action.'));
	$("#lang_save").val(language('Save'));
	$("#lang_cancel").val(language('Cancel'));
}());

function show_network_rules(rules_data, all_rules){
	var name = rules_data['_name'];
	
	if(rules_data['_port1'] != 0){
		var port1 = rules_data['_port1'];
	}else{
		var port1 = '';
	}
	
	if(rules_data['_port2'] != 0){
		var port2 = rules_data['_port2'];
	}else{
		var port2 = '';
	}
	
	var ip = rules_data['_ip'];
	
	var mask = rules_data['_mask'];
	
	if(rules_data['_proto'] == 2){
		var protocol = 'ICMP';
	}else if(rules_data['_proto'] == 1){
		var protocol = 'UDP';
	}else{
		var protocol = 'TCP';
	}
	
	if(rules_data['_actions'] == 1){
		var actions = 'DROP';
	}else{
		var actions = 'ACCEPT';
	}
	
	document.getElementById('rule_name').value = name;
	document.getElementById('protocol').value = protocol;
	document.getElementById('allow_port1').value = port1;
	document.getElementById('allow_port2').value = port2;
	document.getElementById('allow_ip').value = ip;
	document.getElementById('allow_mask').value = mask;
	document.getElementById('actions').value = actions;
	
	/* sidebar begin */
	var sidebar_html = '';
	var item_color = '';
	for(var item in all_rules){
		if(section == all_rules[item]['_section']){
			item_color = 'color:#CD3278;';
		}else{
			item_color = 'color:LemonChiffon4;';
		}
		
		sidebar_html += '<li><a style="'+item_color+'" href="network-rules-edit.html?name='+all_rules[item]['_section']+'&edit=edit" >'+all_rules[item]['_section']+'</a></li>';
	}
	$("#sort_info").html(sidebar_html);
	/* sidebar begin */
	
}

var url = get_url_para();
var section = url['name'];
var order = url['order'];
if(section == undefined){
	section = '';
}
var edit = url['edit'];

object.AGNetworkRulesGetOne(succeed_back, error_back, section);

function succeed_back(data){
	var data_temp = data['_get'];
	var rules_data = data_temp['_rules'];
	var all_rules = data_temp['_sections']['_item'];
	
	header(data_temp['_combuf']);
	show_network_rules(rules_data, all_rules);
	footer();
	
	onload_show();
	
	$("#lang_save").click(function(){
		if(check(all_rules, section)){
			$("#loading_image").show();
			save_network_rules(rules_data);
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*********************************************************************************/
function save_network_rules(rules_data){
	var UcpNetworkRules = new AST_UcpNetworkRules();
	
	var new_name = document.getElementById('rule_name').value;
	UcpNetworkRules._name = new_name;
	
	if(section == ''){
		var old_name = new_name;
	}else{
		var old_name = section;
	}
	
	var protocol_val = document.getElementById('protocol').value;
	if(protocol_val == 'ICMP'){
		var protocol = 2;
	}else if(protocol_val == 'UDP'){
		var protocol = 1;
	}else{
		var protocol = 0;
	}
	UcpNetworkRules._proto = protocol;
	
	var port1_val = document.getElementById('allow_port1').value;
	if(port1_val != ''){
		var port1 = port1_val;
	}else{
		var port1 = 0;
	}
	UcpNetworkRules._port1 = port1;
	
	var port2_val = document.getElementById('allow_port2').value;
	if(port2_val != ''){
		var port2 = port2_val;
	}else{
		var port2 = 0;
	}
	UcpNetworkRules._port2 = port2;
	
	var ip = document.getElementById('allow_ip').value;
	UcpNetworkRules._ip = ip;
	
	var mask = document.getElementById('allow_mask').value;
	UcpNetworkRules._mask = mask;
	
	var actions_val = document.getElementById('actions').value;
	if(actions_val == 'DROP'){
		var actions = 1;
	}else{
		var actions = 0;
	}
	UcpNetworkRules._actions = actions;
	
	if(order == undefined){
		order = rules_data['_order'];
	}
	UcpNetworkRules._order = order;
	
	object.AGNetworkRulesSave(save_succeed_back, save_error_back, old_name, new_name, UcpNetworkRules);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-rules.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}