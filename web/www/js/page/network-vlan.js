function network_type_change(){
	var network_type = document.getElementById('network_type').value;
	if(network_type == '0'){
		$("#wan").hide();
	}else{
		$("#wan").show();
	}
}

function lan_typechange(data_temp)
{
	var factory_ip = '172.16.99.'+data_temp['_stacknum'];
	var factory_mask = '255.255.0.0';
	var factory_gw = '172.16.0.1';
	var lan_ip = data_temp['_lan']['_ipaddr'];
	var lan_mask = data_temp['_lan']['_netmask'];
	var lan_gw = data_temp['_lan']['_gateway'];
	var type = document.getElementById('lan_type').value;
	if(type == 0) {
		set_visible('field_lan_ipaddr', true);
		set_visible('field_lan_netmask', true);
		set_visible('field_lan_gateway', true);
		
		var obj = document.getElementById('lan_ipaddr');
		obj.readOnly = true;
		obj.value = factory_ip;

		var obj = document.getElementById('lan_netmask');
		obj.readOnly = true;
		obj.value = factory_mask;

		var obj = document.getElementById('lan_gateway');
		obj.readOnly = true;
		obj.value = factory_gw;
	} else if (type == 1) {
		set_visible('field_lan_ipaddr', true);
		set_visible('field_lan_netmask', true);
		set_visible('field_lan_gateway', true);

		var obj = document.getElementById('lan_ipaddr');
		obj.readOnly = false;
		obj.value = lan_ip;

		var obj = document.getElementById('lan_netmask');
		obj.readOnly = false;
		obj.value = lan_mask;

		var obj = document.getElementById('lan_gateway');
		obj.readOnly = false;
		obj.value = lan_gw;
	} else {
		set_visible('field_lan_ipaddr', false);
		set_visible('field_lan_netmask', false);
		set_visible('field_lan_gateway', false);
	}
}

function wan_typechange(data_temp)
{
	var wan_ip = data_temp['_wan']['_ipaddr'];
	var wan_mask = data_temp['_wan']['_netmask'];
	var wan_gw = data_temp['_wan']['_gateway'];
	
	var type = document.getElementById('wan_type').value;
	if (type == 1) {
		set_visible('field_wan_ipaddr', true);
		set_visible('field_wan_netmask', true);
		set_visible('field_wan_gateway', true);
		set_visible('mac_tr', true);

		var obj = document.getElementById('wan_ipaddr');
		obj.readOnly = false;
		obj.value = wan_ip;

		var obj = document.getElementById('wan_netmask');
		obj.readOnly = false;
		obj.value = wan_mask;

		var obj = document.getElementById('wan_gateway');
		obj.readOnly = false;
		obj.value = wan_gw;
	} else if(type == 2){
		set_visible('field_wan_ipaddr', false);
		set_visible('field_wan_netmask', false);
		set_visible('field_wan_gateway', false);
		set_visible('mac_tr', true);
	} else {
		set_visible('field_wan_ipaddr', false);
		set_visible('field_wan_netmask', false);
		set_visible('field_wan_gateway', false);
		set_visible('mac_tr', false);
	}
}
function reservedswchange(){
	var sw = document.getElementById('reserved_sw').checked;

	if(sw) {
		var obj = document.getElementById('reserved_ip');
		obj.disabled = false;

		var obj = document.getElementById('reserved_mask');
		obj.disabled = false;
	} else {
		var obj = document.getElementById('reserved_ip');
		obj.disabled = true;

		var obj = document.getElementById('reserved_mask');
		obj.disabled = true;
	}
}

function onload_func(){
	reservedswchange();
}

function check()
{
	var lan_type = document.getElementById("lan_type").value;

	var lan_mac = document.getElementById("lan_mac").value;
	var lan_ipaddr = document.getElementById("lan_ipaddr").value;
	var lan_netmask = document.getElementById("lan_netmask").value;
	var lan_gateway = document.getElementById("lan_gateway").value;
	var dns1 = document.getElementById("dns1").value;
	var dns2 = document.getElementById("dns2").value;
	var dns3 = document.getElementById("dns3").value;
	var dns4 = document.getElementById("dns4").value;

	if(lan_type == 'static') {
		if(!check_ip(lan_ipaddr)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("clan_ipaddr").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("clan_ipaddr").innerHTML = '';
		}

		if(!check_ip(lan_netmask)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("clan_netmask").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("clan_netmask").innerHTML = '';
		}

		if (lan_gateway != '') {
			if(!check_ip(lan_gateway)) {
				var rstr = language('js check ip','Please input a valid IP address!');
				document.getElementById("clan_gateway").innerHTML = con_str(rstr);
				return false;
			} else {
				document.getElementById("clan_gateway").innerHTML = '';
			}
		}
	}

	if(dns1 != '') {
		if(!check_ip(dns1)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("cdns1").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("cdns1").innerHTML = '';
		}
	}

	if(dns2 != '') {
		if(!check_ip(dns2)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("cdns2").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("cdns2").innerHTML = '';
		}
	}

	if(dns3 != '') {
		if(!check_ip(dns3)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("cdns3").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("cdns3").innerHTML = '';
		}
	}

	if(dns4 != '') {
		if(!check_ip(dns4)) {
			var rstr = language('js check ip','Please input a valid IP address!');
			document.getElementById("cdns4").innerHTML = con_str(rstr);
			return false;
		} else {
			document.getElementById("cdns4").innerHTML = '';
		}
	}

	if(limit_string_length()){
		return false;
	}
	
	return true;
}

function limit_string_length(){
	if(check_string_length('lan_mac')){
		return true;
	}
	
	if(check_string_length('lan_ipaddr')){
		return true;
	}
	
	if(check_string_length('lan_netmask')){
		return true;
	}
	
	if(check_string_length('lan_gateway')){
		return true;
	}
	
	if(check_string_length('dns1')){
		return true;
	}
	
	if(check_string_length('dns2')){
		return true;
	}
	
	if(check_string_length('dns3')){
		return true;
	}
	
	if(check_string_length('dns4')){
		return true;
	}
	
	return false;
}

function onload_show(){
	$(":checkbox").iButton(); 
	onload_func();
}
/***************************SHOW NETWORK BEGIN*******************************/
(function(){
	/* IPv4 Settings begin */
	$("#lang_lan_settings").html(language('Lan Settings'));
	$("#lang_wan_settings").html(language('Wan Settings'));
	$(".lang_network_type").html(language('Network Type'));
	$("#lang_network_type_help").html(language('Network Type help','Network Type'));
	$(".lang_type").html(language('Type'));
	$(".lang_type_help").html(language('Type help@network-lan','The method to get IP.<br/>Factory: Getting IP address by Slot Number(System-->Information to check slot number).<br/>Static: manually set up your gateway IP.<br/>DHCP: automatically get IP from your local LAN.'));
	$(".lang_factory").html(language('Factory'));
	$(".lang_static").html(language('Static'));
	$(".lang_dhcp").html(language('DHCP'));
	$(".lang_mac").html(language('MAC'));
	$(".lang_mac_help").html(language('MAC help','Physical address of your network interface.'));
	$(".lang_address").html(language('Address'));
	$(".lang_address_help").html(language('Address help','The IP address of your gateway.'));
	$(".lang_netmask").html(language('Netmask'));
	$(".lang_netmask_help").html(language('Netmask help','The subnet mask of your gateway.'));
	$(".lang_default_gateway").html(language('Default Gateway'));
	$(".lang_default_gateway_help").html(language('Default Gateway help','Default gateway IP addrress.'));
	/* IPv4 Settings end */
	
	/* DNS Servers begin */
	$(".lang_dns_server").html(language('DNS Server'));
	/* DNS Servers end */
	
	/* Reserved Access IP begin */
	$("#lang_enable").html(language('Enable'));
	$("#lang_enable_help").html(language('Enable help@network-lan','A switch to enable the reserved IP address or not.<br/>On(enabled),Off(disabled)'));
	$("#lang_reserved_address").html(language('Reserved Address'));
	$("#lang_reserved_address_help").html(language('Reserved Address help','The reserved IP address for this gateway.'));
	$("#lang_reserved_netmask").html(language('Reserved Netmask'));
	$("#lang_reserved_netmask_help").html(language('Reserved Netmask help','The subnet mask of the reserved IP address.'));
	/* Reserved Access IP end */
	
	/* other info */
	$("#lan_ipv4_li").html(language('LAN IPv4'));
	$("#ipv4_settings_li").html(language('IPv4 Settings'));
	$("#dns_servers_span").html(language('DNS Servers'));
	$("#dns_servers_span_help").html(language('DNS Servers help','A list of DNS IP address. <br/>Basically this info is from your local network service provider. '));
	$("#reserved_access_ip_span").html(language('Reserved Access IP'));
	$("#reserved_access_ip_span_help").html(language('Reserved Access IP help','A reserved IP address to access in case your gateway IP is not available.<br/>Remember to set a similar network segment with the following address of your local PC.'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function network_vlan_show(data_temp){
	var lan_data = data_temp['_lan'];
	var wan_data = data_temp['_wan'];
	var dns_data = data_temp['_dns'];
	var mac_data = data_temp['_factorymac'];
	var stacknum = data_temp['_stacknum']
	if(stacknum == 0){
		stacknum = 1;
	}
	var network_type = data_temp['_networktype'];
	var vlan_flag = data_temp['_vlanflag'];
	
	if(vlan_flag == 0){
		$("#lang_vlan").hide();
	}
	
	var lan_type = lan_data['_type'];
	
	if(lan_data['_mac'] != ''){
		var lan_mac = lan_data['_mac'];
	}else{
		var lan_mac = '';
	}
	
	if(lan_data['_ipaddr'] != null){
		var lan_ip = lan_data['_ipaddr'];
	}else{
		var lan_ip = '';
	}
	
	if(lan_data['_netmask'] != null){
		var lan_mask = lan_data['_netmask'];
	}else{
		var lan_mask = '';
	}
	
	if(lan_data['_gateway'] != null){
		var lan_gw = lan_data['_gateway'];
	}else{
		var lan_gw = '';
	}
	
	document.getElementById('lan_mac').value = lan_mac;
	document.getElementById('lan_type').value = lan_type;
	document.getElementById('lan_ipaddr').value = lan_ip;
	document.getElementById('lan_netmask').value = lan_mask;
	document.getElementById('lan_gateway').value = lan_gw;
	
	if(wan_data['_type'] == 1){
		var wan_type = wan_data['_type'];
	}else{
		var wan_type = 2;
	}
	
	if(wan_data['_mac'] != ''){
		var wan_mac = wan_data['_mac'];
	}else{
		var wan_mac = '';
	}
	
	if(wan_data['_ipaddr'] != null){
		var wan_ip = wan_data['_ipaddr'];
	}else{
		var wan_ip = '';
	}
	
	if(wan_data['_netmask'] != null){
		var wan_mask = wan_data['_netmask'];
	}else{
		var wan_mask = '';
	}
	
	if(wan_data['_gateway'] != null){
		var wan_gw = wan_data['_gateway'];
	}else{
		var wan_gw = '';
	}

	document.getElementById('wan_mac').value = wan_mac;
	document.getElementById('wan_type').value = wan_type;
	document.getElementById('wan_ipaddr').value = wan_ip;
	document.getElementById('wan_netmask').value = wan_mask;
	document.getElementById('wan_gateway').value = wan_gw;
	
	//dns
	if(dns_data['_dns1'] != null){
		var dns1 = dns_data['_dns1'];
	}else{
		var dns1 = '';
	}
	
	if(dns_data['_dns2'] != null){
		var dns2 = dns_data['_dns2'];
	}else{
		var dns2 = '';
	}
	
	if(dns_data['_dns3'] != null){
		var dns3 = dns_data['_dns3'];
	}else{
		var dns3 = '';
	}
	
	if(dns_data['_dns4'] != null){
		var dns4 = dns_data['_dns4'];
	}else{
		var dns4 = '';
	}
	document.getElementById('dns1').value = dns1;
	document.getElementById('dns2').value = dns2;
	document.getElementById('dns3').value = dns3;
	document.getElementById('dns4').value = dns4;
	
	if(lan_data['_rswitch'] != 1){
		var _reserved_sw_checked = false;
	}else{
		var _reserved_sw_checked = true;
	}
	var reserved_ip = '192.168.99.'+stacknum;
	var reserved_mask = '255.255.255.0';
	document.getElementById('reserved_ip').value = reserved_ip;
	document.getElementById('reserved_mask').value = reserved_mask;
	document.getElementById('reserved_sw').checked = _reserved_sw_checked;
	document.getElementById('network_type').value = network_type;
	
	/* other handle */
	network_type_change();
	$("#network_type").change(function(){
		network_type_change();
	});
	lan_typechange(data_temp);
	wan_typechange(data_temp);
	$("#lan_type").change(function(){
		lan_typechange(data_temp);
	});
	$("#wan_type").change(function(){
		wan_typechange(data_temp);
	});
}

object.AGNetworkGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	network_vlan_show(data_temp);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				network_vlan_save();
				
				var lan_ipaddr = document.getElementById('lan_ipaddr').value;
				
				if(lan_ipaddr != data_temp['_lan']['_ipaddr']){
					setTimeout(function(){window.location.href="http://"+lan_ipaddr},500);
				}
			}
		}
	});
	
	//demo_enable
	if(demo_enable == 1){
		$(".save_input").attr('disabled','disabled');
	}
}

function error_back(){
	window.location.href = 'error.html';
}
/***************************SHOW NETWORK END*******************************/

/***************************Save NETWORK BEGIN*******************************/
function network_vlan_save(){
	var network_type = document.getElementById('network_type').value;
	
	//lan
	var lan_type = document.getElementById('lan_type').value;
	var lan_mac = document.getElementById('lan_mac').value;
	var lan_ipaddr = document.getElementById('lan_ipaddr').value;
	var lan_mask = document.getElementById('lan_netmask').value;
	var lan_gateway = document.getElementById('lan_gateway').value;
	
	var NetworkLan = new AST_NetworkLan();
	NetworkLan._mac = lan_mac;
	NetworkLan._ipaddr = lan_ipaddr;
	NetworkLan._netmask = lan_mask;
	NetworkLan._gateway = lan_gateway;
	NetworkLan._type = lan_type;
	NetworkLan._portname = 'lan';
	
	//wan
	var wan_type = document.getElementById('wan_type').value;
	var wan_mac = document.getElementById('wan_mac').value;
	var wan_ipaddr = document.getElementById('wan_ipaddr').value;
	var wan_mask = document.getElementById('wan_netmask').value;
	var wan_gateway = document.getElementById('wan_gateway').value;
	
	var NetworkWan = new AST_NetworkWan();
	NetworkWan._mac = wan_mac;
	NetworkWan._ipaddr = wan_ipaddr;
	NetworkWan._netmask = wan_mask;
	NetworkWan._gateway = wan_gateway;
	NetworkWan._type = wan_type;
	NetworkWan._portname = 'wan';
	
	//dns
	var dns1 = document.getElementById('dns1').value;
	var dns2 = document.getElementById('dns2').value;
	var dns3 = document.getElementById('dns3').value;
	var dns4 = document.getElementById('dns4').value;
	
	var NetworkDns = new AST_NetworkDns();
	NetworkDns._dns1 = dns1;
	NetworkDns._dns2 = dns2;
	NetworkDns._dns3 = dns3;
	NetworkDns._dns4 = dns4;
	
	if(document.getElementById('reserved_sw').checked == true){
		var reserved_sw = 1;
	}else{
		var reserved_sw = 0;
	}
	NetworkLan._rswitch = reserved_sw;
	
	var NetworkSave = new AST_NetworkSave();
	NetworkSave._networktype = network_type;
	NetworkSave._lan = NetworkLan;
	NetworkSave._wan = NetworkWan;
	NetworkSave._dns = NetworkDns;
	
	object.AGNetworkSave(save_succeed_back, save_error_back, NetworkSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-vlan.html?save=true';
	}else{
		alert(language('save failed'));
	}
}

function save_error_back(){
	save_click_flag = 0;
}
/***************************Save NETWORK BEGIN*******************************/