function typechange(factory_mac, factory_ip, factory_mask, factory_gw, cf_ip, cf_mask, cf_gw)
{
	var type = document.getElementById('lan_type').value;
	if(type == 'factory') {
		set_visible('field_lan_ipaddr', true);
		set_visible('field_lan_netmask', true);
		set_visible('field_lan_gateway', true);

		
		obj = document.getElementById('lan_mac');
		obj.disabled = 'disabled';
		obj.value = factory_mac;

		obj = document.getElementById('lan_ipaddr');
		obj.readOnly = true;
		obj.value = factory_ip;

		obj = document.getElementById('lan_netmask');
		obj.readOnly = true;
		obj.value = factory_mask;

		obj = document.getElementById('lan_gateway');
		obj.readOnly = true;
		obj.value = factory_gw;
	} else if (type == 'static') {
		set_visible('field_lan_ipaddr', true);
		set_visible('field_lan_netmask', true);
		set_visible('field_lan_gateway', true);

		obj = document.getElementById('lan_mac');
		obj.disabled = 'disabled';
		obj.value = factory_mac;

		obj = document.getElementById('lan_ipaddr');
		obj.readOnly = false;
		obj.value = cf_ip;

		obj = document.getElementById('lan_netmask');
		obj.readOnly = false;
		obj.value = cf_mask;

		obj = document.getElementById('lan_gateway');
		obj.readOnly = false;
		obj.value = cf_gw;
	} else {
		set_visible('field_lan_ipaddr', false);
		set_visible('field_lan_netmask', false);
		set_visible('field_lan_gateway', false);

		obj = document.getElementById('lan_mac');
		obj.disabled = 'disabled';
		obj.value = factory_mac;
	}
}
function reservedswchange()
{
	var sw = document.getElementById('reserved_sw').checked;

	if(sw) {
		obj = document.getElementById('reserved_ip');
		obj.disabled = false;

		obj = document.getElementById('reserved_mask');
		obj.disabled = false;
	} else {
		obj = document.getElementById('reserved_ip');
		obj.disabled = true;

		obj = document.getElementById('reserved_mask');
		obj.disabled = true;
	}
}

function onload_func()
{
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
/*******************************************************************************/
function onload_show(){
	$(":checkbox").iButton(); 
	onload_func();
}
/*******************************************************************************/


/***************************SHOW NETWORK LAN BEGIN*******************************/
(function(){
	/* IPv4 Settings begin */
	$("#lang_interface").html(language('Interface'));
	$("#lang_interface_help").html(language('Interface help','The name of network interface.'));
	$("#lang_type").html(language('Type'));
	$("#lang_type_help").html(language('Type help@network-lan','The method to get IP.<br/>Factory: Getting IP address by Slot Number(System-->Information to check slot number).<br/>Static: manually set up your gateway IP.<br/>DHCP: automatically get IP from your local LAN.'));
	$("#lang_factory").html(language('Factory'));
	$("#lang_static").html(language('Static'));
	$("#lang_dhcp").html(language('DHCP'));
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

function network_show(lan_data, mac_data, dns_data, stacknum){
	//lan
	if(lan_data['_portname'] != ''){
		var network_name = lan_data['_portname'];
	}else{
		var network_name = '';
	}
	
	if(lan_data['_mac'] != null){
		var cf_mac = lan_data['_mac'];
	}else{
		var cf_mac = '';
	}
	
	if(lan_data['_ipaddr'] != null){
		var cf_ip = lan_data['_ipaddr'];
	}else{
		var cf_ip = '';
	}
	
	if(lan_data['_netmask'] != null){
		var cf_mask = lan_data['_netmask'];
	}else{
		var cf_mask = '';
	}
	
	if(lan_data['_gateway'] != null){
		var cf_gw = lan_data['_gateway'];
	}else{
		var cf_gw = '';
	}
	
	if(lan_data['_rswitch'] != 1){
		var _reserved_sw_checked = false;
	}else{
		var _reserved_sw_checked = true;
	}
	
	//dns
	if(dns_data['_dns1'] != null){
		var cf_dns1 = dns_data['_dns1'];
	}else{
		var cf_dns1 = '';
	}
	
	if(dns_data['_dns2'] != null){
		var cf_dns2 = dns_data['_dns2'];
	}else{
		var cf_dns2 = '';
	}
	
	if(dns_data['_dns3'] != null){
		var cf_dns3 = dns_data['_dns3'];
	}else{
		var cf_dns3 = '';
	}
	
	if(dns_data['_dns4'] != null){
		var cf_dns4 = dns_data['_dns4'];
	}else{
		var cf_dns4 = '';
	}
	
	//lanfactorymac
	var factory_mac = mac_data;
	var factory_ip = '172.16.99.'+stacknum;
	var factory_mask = '255.255.0.0';
	var factory_gw = '172.16.0.1';
	
	var reserved_ip = '192.168.99.'+stacknum;
	var reserved_mask = '255.255.255.0';
	
	
	/* LAN IPv4 begin */
	//value
	document.getElementById('network_name').innerHTML = network_name;
	document.getElementById('lan_mac').value = cf_mac;
	
	//select
	if(lan_data['_type'] == 0){
		var type_val = 'factory';
	}else if(lan_data['_type'] == 1){
		var type_val = 'static';
	}else if(lan_data['_type'] == 2){
		var type_val = 'dhcp';
	}
	document.getElementById('lan_type').value = type_val;
	/* LAN IPv4 end */
	
	/* IPv4 Settings begin */
	//value
	document.getElementById('lan_ipaddr').value = cf_ip;
	document.getElementById('lan_netmask').value = cf_mask;
	document.getElementById('lan_gateway').value = cf_gw;
	/* IPv4 Settings end */
	
	/* DNS Servers begin */
	document.getElementById('dns1').value = cf_dns1;
	document.getElementById('dns2').value = cf_dns2;
	document.getElementById('dns3').value = cf_dns3;
	document.getElementById('dns4').value = cf_dns4;
	/* DNS Servers end */
	
	/* Reserved Access IP begin */
	//value
	document.getElementById('reserved_ip').value = reserved_ip;
	document.getElementById('reserved_mask').value = reserved_mask;
	
	//checked 
	document.getElementById('reserved_sw').checked = _reserved_sw_checked;
	/* Reserved Access IP end */
	
	/* other handle */
	typechange(factory_mac, factory_ip, factory_mask, factory_gw, cf_ip, cf_mask, cf_gw);
	$("#lan_type").click(function(){
		typechange(factory_mac, factory_ip, factory_mask, factory_gw, cf_ip, cf_mask, cf_gw);
	});
}

object.AGNetworkLanGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var lan_data = data_temp['_lan'];
	var dns_data = data_temp['_dns'];
	var mac_data = data_temp['_factorymac'];
	var stacknum = data_temp['_stacknum'];
	if(stacknum == 0){
		stacknum = 1;
	}
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	network_show(lan_data, mac_data, dns_data, stacknum);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				network_save(lan_data);
				
				var lan_ipaddr = document.getElementById("lan_ipaddr").value;
				setTimeout(function(){window.location.href="http://"+lan_ipaddr;},500);
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
/***************************SHOW NETWORK LAN END*******************************/


/***************************SAVE NETWORK LAN BEGIN*******************************/
function network_save(lan_data){
	/* lan begin */
	var _type = document.getElementById('lan_type').value;
	if(_type == 'factory'){
		var type_val = 0;
	}else if(_type == 'static'){
		var type_val = 1;
	}else if(_type == 'dhcp'){
		var type_val = 2;
	}
	
	var _mac = document.getElementById('lan_mac').value;
	var _ipaddr = document.getElementById('lan_ipaddr').value;
	var _netmask = document.getElementById('lan_netmask').value;
	var _gateway = document.getElementById('lan_gateway').value;
	if(document.getElementById('reserved_sw').checked == true){
		var _switch = 1;
	}else{
		var _switch = 0;
	}
	var portname = document.getElementById('network_name').innerHTML;
	
	
	var networklan = new AST_NetworkLan();
	networklan._mac = _mac;
	networklan._ipaddr = _ipaddr;
	networklan._netmask = _netmask;
	networklan._gateway = _gateway;
	networklan._type = type_val;
	networklan._rswitch = _switch;
	networklan._portname = portname;
	
	/* dns begin */
	var _dns1 = document.getElementById('dns1').value;
	var _dns2 = document.getElementById('dns2').value;
	var _dns3 = document.getElementById('dns3').value;
	var _dns4 = document.getElementById('dns4').value;
	
	var networkdns = new AST_NetworkDns();
	networkdns._dns1 = _dns1;
	networkdns._dns2 = _dns2;
	networkdns._dns3 = _dns3;
	networkdns._dns4 = _dns4;
	/* dns end */
	
	var NetworkLanSave = new AST_NetworkLanSave();
	NetworkLanSave._lan = networklan;
	NetworkLanSave._dns = networkdns;
	
	object.AGNetworkLanSave(save_succeed_back, save_error_back, NetworkLanSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-lan.html?save=true';
	}else{
		alert(language('save failed'));
	}
}

function save_error_back(data){
	save_click_flag = 0;
	//alert(language('save failed'));
}
/***************************SAVE NETWORK LAN END*******************************/