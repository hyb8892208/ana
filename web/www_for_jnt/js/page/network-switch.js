function firewall_change(sw){
	if (sw) {
		set_visible('ip_list',true);
	} else {
		set_visible('ip_list',false);
	}
}

function white_change(sw){
	if (sw) {
		set_visible('white_list_ctl',true);
	} else {
		set_visible('white_list_ctl',false);
	}
}

function black_change(sw){
	if (sw) {
		set_visible('black_list_ctl',true);
	} else {
		set_visible('black_list_ctl',false);
	}
}

function check(){
	//white list check
	var str = document.getElementById("white_ip").value;
	var white_array = str.split(",");
	for (var i=0;i<white_array.length;i++) {
		var ip = white_array[i];
		if(!check_domain(ip) ) {
			if (ip != "") {
				document.getElementById("white_tips").innerHTML = con_str(language('Invalid IP address. Please check the ip input, and note that they are separated only by ",".'));
				document.getElementById("black_tips").innerHTML = '';
				return false;
			}
		}
	}

	//black list check
	var str = document.getElementById("black_ip").value;
	var white_array = str.split(",");
	for (var i=0;i<white_array.length;i++) {
		var ip = white_array[i];
		if(!check_domain(ip) ) {
			if (ip != "") {
				document.getElementById("black_tips").innerHTML = con_str(language('Invalid IP address. Please check the ip input, and note that they are separated only by ",".'));
				document.getElementById("white_tips").innerHTML = '';
				return false;
			}
		}
	}
	return true;
}

function onload_show(){
	$("#firewall_sw").iButton();
	$("#ping_sw").iButton();
	$("#white_sw").iButton();
	$("#black_sw").iButton();
}
/*********************************************************************************/
(function(){
	$("#lang_firewall_settings").html(language('Firewall Settings'));
	$("#lang_firewall_enable").html(language('Firewall Enable'));
	$("#lang_firewall_enable_help").html(language('Firewall help', 'ON(enabled),OFF(disabled)'));
	$("#lang_ping_enable").html(language('Ping Enable'));
	$("#lang_ping_enable_help").html(language('Ping help', 'ON(enabled),OFF(disabled)'));
	$("#lang_white_list_settings").html(language('White List Settings'));
	$("#lang_white_list_enable").html(language('White List Enable'));
	$("#lang_white_list_enable_help").html(language('White List help', 'ON(enabled),OFF(disabled)'));
	$(".lang_list_ip_settings").html(language('List IP Settings'));
	$("#lang_list_ip_settings_help").html(language('Ping help', 'ON(enabled),OFF(disabled)'));
	$("#lang_black_list_settings").html(language('Black List Settings'));
	$("#lang_black_list_enable").html(language('Black List Enable'));
	$("#lang_black_list_enable_help").html(language('Black List help', 'ON(enabled),OFF(disabled)'));
	$("#lang_list_ip_settings_help").html(language('Ping help', 'ON(enabled),OFF(disabled)'));
	$("#lang_save").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_network_switch(switch_data){
	if(switch_data['_firewall'] == 0){
		document.getElementById('firewall_sw').checked = true;
		set_visible('ip_list',true);
	}else{
		set_visible('ip_list',false);
	}
	
	if(switch_data['_ping'] == 0){
		document.getElementById('ping_sw').checked = true;
	}
	
	if(switch_data['_wenable'] == 0){
		document.getElementById('white_sw').checked = true;
		set_visible('white_list_ctl',true);
	}else{
		set_visible('white_list_ctl',false);
	}
	
	if(switch_data['_benable'] == 0){
		document.getElementById('black_sw').checked = true;
		set_visible('black_list_ctl',true);
	}else{
		set_visible('black_list_ctl',false);
	}
	
	$("#white_ip").val(switch_data['_wip']);
	$("#black_ip").val(switch_data['_bip']);
}

object.AGNetworkFirewallGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var switch_data = data_temp['_firewall'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	show_network_switch(switch_data);
	footer();
	
	onload_show();
	
	$("#lang_save").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_network_switch();
			}
		}
	});
	
	//demo_enable
	if(demo_enable == 1){
		$(".save_input").attr('disabled','disabled');
	}
}

function error_back(data){
	window.location.href = 'error.html';
}
/*********************************************************************************/
function save_network_switch(){
	var UcpNetworkSwitch  = new AST_UcpNetworkSwitch();
	
	if(document.getElementById('firewall_sw').checked == true){
		var firewall = 0;
	}else{
		var firewall = 1;
	}
	UcpNetworkSwitch._firewall = firewall;
	
	if(document.getElementById('ping_sw').checked == true){
		var ping = 0;
	}else{
		var ping = 1;
	}
	UcpNetworkSwitch._ping = ping;
	
	if(document.getElementById('white_sw').checked == true){
		var white_sw = 0;
	}else{
		var white_sw = 1;
	}
	UcpNetworkSwitch._wenable = white_sw
	
	var white_ip = document.getElementById('white_ip').value;
	UcpNetworkSwitch._wip = white_ip;
	
	if(document.getElementById('black_sw').checked == true){
		var black_sw = 0;
	}else{
		var black_sw = 1;
	}
	UcpNetworkSwitch._benable = black_sw;
	
	var black_ip = document.getElementById("black_ip").value;
	UcpNetworkSwitch._bip = black_ip;
	
	object.AGNetworkFirewallsave(save_succeed_back, save_error_back, UcpNetworkSwitch);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-switch.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}