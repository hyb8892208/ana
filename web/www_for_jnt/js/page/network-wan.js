function typechange(factory_mac, cf_ip, cf_mask, cf_gw)
{
	var type = document.getElementById('wan_type').value;
	if (type == 'static') {
		set_visible('field_wan_ipaddr', true);
		set_visible('field_wan_netmask', true);
		set_visible('field_wan_gateway', true);
		set_visible('mac_tr', true);

		obj = document.getElementById('wan_mac');
		obj.disabled = 'disabled';
		obj.value = factory_mac;

		obj = document.getElementById('wan_ipaddr');
		obj.readOnly = false;
		obj.value = cf_ip;

		obj = document.getElementById('wan_netmask');
		obj.readOnly = false;
		obj.value = cf_mask;

		obj = document.getElementById('wan_gateway');
		obj.readOnly = false;
		obj.value = cf_gw;
	} else if(type == 'dhcp'){
		set_visible('field_wan_ipaddr', false);
		set_visible('field_wan_netmask', false);
		set_visible('field_wan_gateway', false);
		set_visible('mac_tr', true);
	} else {
		set_visible('field_wan_ipaddr', false);
		set_visible('field_wan_netmask', false);
		set_visible('field_wan_gateway', false);
		set_visible('mac_tr', false);

		obj = document.getElementById('wan_mac');
		obj.disabled = 'disabled';
		obj.value = factory_mac;
	}
}
function check()
{
	var wan_type = document.getElementById("wan_type").value;

	var wan_mac = document.getElementById("wan_mac").value;
	var wan_ipaddr = document.getElementById("wan_ipaddr").value;
	var wan_netmask = document.getElementById("wan_netmask").value;
	var wan_gateway = document.getElementById("wan_gateway").value;

	if(wan_type == 'static') {
		if(!check_ip(wan_ipaddr)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("cwan_ipaddr").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("cwan_ipaddr").innerHTML = '';
		}

		if(!check_ip(wan_netmask)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("cwan_netmask").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("cwan_netmask").innerHTML = '';
		}

		if (wan_gateway != '') {
			if(!check_ip(wan_gateway)) {
				var rstr = language('js check ip','Please input a valid IP address!');
				document.getElementById("cwan_gateway").innerHTML = con_str(rstr);
				return false;
			} else {
				document.getElementById("cwan_gateway").innerHTML = '';
			}
		}
	}

	if(limit_string_length()){
		return false;
	}
	
	return true;
}
function limit_string_length(){
	if(check_string_length('wan_ipaddr')){
		return true;
	}
	
	if(check_string_length('wan_netmask')){
		return true;
	}
	
	if(check_string_length('wan_gateway')){
		return true;
	}
	
	return false;
}
function onload_show(){
	$(":checkbox").iButton();
}
/***************************SHOW NETWORK WAN BEGIN*******************************/
(function(){
	/* IPv4 Settings begin */
	$("#lang_interface").html(language('Interface'));
	$("#lang_interface_help").html(language('Interface help','The name of network interface.'));
	$("#lang_type").html(language('Type'));
	$("#lang_type_help").html(language('Type help@network-lan','The method to get IP.<br/>Factory: Getting IP address by Slot Number(System-->Information to check slot number).<br/>Static: manually set up your gateway IP.<br/>DHCP: automatically get IP from your local LAN.'));
	$("#lang_static").html(language('Static'));
	$("#lang_dhcp").html(language('DHCP'));
	$("#lang_disable").html(language('Disable'));
	$("#lang_mac").html(language('MAC'));
	$("#lang_mac_help").html(language('MAC help','Physical address of your network interface.'));
	/* IPv4 Settings end */
	
	/* IPv4 Settings begin */
	$("#lang_address").html(language('Address'));
	$("#lang_address_help").html(language('Address help','The IP address of your gateway.'));
	$("#lang_netmask").html(language('Netmask'));
	$("#lang_netmask_help").html(language('Netmask help','The subnet mask of your gateway.'));
	$("#lang_default_gateway").html(language('Default Gateway'));
	$("#lang_default_gateway_help").html(language('Default Gateway help','Default gateway IP addrress.'));
	/* IPv4 Settings end */
	
	/* other info */
	$("#wan_ipv4_li").html(language('WAN IPv4'));
	$("#ipv4_settings_li").html(language('IPv4 Settings'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function network_show(wan_data){
	//wan_gateway
	if(wan_data['_portname'] != ''){
		var network_name = wan_data['_portname'];
	}else{
		var network_name = '';
	}
	
	if(wan_data['_mac'] != null){
		var cf_mac = wan_data['_mac'];
	}else{
		var cf_mac = '';
	}
	
	if(wan_data['_ipaddr'] != null){
		var cf_ip = wan_data['_ipaddr'];
	}else{
		var cf_ip = '';
	}
	
	if(wan_data['_netmask'] != null){
		var cf_mask = wan_data['_netmask'];
	}else{
		var cf_mask = '';
	}
	
	if(wan_data['_gateway'] != null){
		var cf_gw = wan_data['_gateway'];
	}else{
		var cf_gw = '';
	}
	
	/* LAN IPv4 begin */
	//value
	document.getElementById('network_name').innerHTML = network_name;
	document.getElementById('wan_mac').value = cf_mac;
	
	//select
	if(wan_data['_type'] == 0){
		var type_val = 'factory';
	}else if(wan_data['_type'] == 1){
		var type_val = 'static';
	}else if(wan_data['_type'] == 2){
		var type_val = 'dhcp';
	}else{
		var type_val = 'disable';
	}
	document.getElementById('wan_type').value = type_val;
	/* LAN IPv4 end */
	
	/* IPv4 Settings begin */
	//value
	document.getElementById('wan_ipaddr').value = cf_ip;
	document.getElementById('wan_netmask').value = cf_mask;
	document.getElementById('wan_gateway').value = cf_gw;
	/* IPv4 Settings end */
	
	/* other handle */
	typechange(cf_mac, cf_ip, cf_mask, cf_gw);
	$("#wan_type").click(function(){
		typechange(cf_mac, cf_ip, cf_mask, cf_gw);
	});
}

object.AGNetworkWanGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var content = data_temp['_wan'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	network_show(content);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				network_save();
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
/***************************SHOW NETWORK WAN END*******************************/



/***************************SAVE NETWORK WAN BEGIN*******************************/
function network_save(){
	var _type = document.getElementById('wan_type').value;
	if(_type == 'factory'){
		var type_val = 0;
	}else if(_type == 'static'){
		var type_val = 1;
	}else if(_type == 'dhcp'){
		var type_val = 2;
	}else{//disabled or unknow
		var type_val = 3;
	}
	
	var _mac = document.getElementById('wan_mac').value;
	var _ipaddr = document.getElementById('wan_ipaddr').value;
	var _netmask = document.getElementById('wan_netmask').value;
	var _gateway = document.getElementById('wan_gateway').value;
	var portname = document.getElementById('network_name').innerHTML;
	
	var networkwan = new AST_NetworkWan();
	networkwan._mac = _mac;
	networkwan._ipaddr = _ipaddr;
	networkwan._netmask = _netmask;
	networkwan._gateway = _gateway;
	networkwan._type = type_val;
	networkwan._portname = portname;
	
	var NetworkWanSave = new AST_NetworkWanSave();
	NetworkWanSave._wan = networkwan;
	
	object.AGNetworkWanSave(save_succeed_back, save_error_back, NetworkWanSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-wan.html?save=true';
	}else{
		alert(language('save failed'));
	}
}

function save_error_back(data){
	save_click_flag = 0;
}
/***************************SAVE NETWORK WAN END*******************************/