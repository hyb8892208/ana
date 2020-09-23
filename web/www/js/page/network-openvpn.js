function trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isAllowFile(file_id)
{
	var x = document.getElementById(file_id).value;
	if(x=="")
	{
		alert(language('Select File alert','Please select your file first!'));
		return false;
	}

	if(!g_bAllowFile){
		alert("Uploaded max file is 40M!");
		return false;
	}
	
	if(!gb_Filename){
		alert('The format of the upload file should be like this "xxxx.tar.gz".');
		return false;
	}

	return true;
}

function upload_cfg_file2()
{
	if(!isAllowFile('upload_cfg_file')) {
		return false;
	}

	if( ! confirm(language('File Upload confirm','Are you sure to upload configuration files?\nThis will damage the structure of your original configuration files.'))) {
		return false;
	}

	return true;
}

function openvpn_switch_show(){
	if(document.getElementById('openvpn_switch').checked){
		$("#openvpn_show").show();
	}else{
		$("#openvpn_show").hide();
	}
}

$("#openvpn_switch").change(function(){
	if($(this).prop("checked")){
		$("#openvpn_show").show();
	}else{
		$("#openvpn_show").hide();
	}
});

function upload_report(tip){
	var html_str = '';
	if(tip == 'true'){
		html_str = '<br/>';
		html_str += '<b>'+language('Report')+'</b>';
		html_str += '<table style="width:100%;font-size:12px;border:1px solid rgb(59,112,162);">';
		html_str += '<tbody>';
		html_str += '<tr style="background-color:#D0E0EE;height:26px;">';
		html_str += '<td align="center" style="width:100%"><b>'+language("OpenVPN Configuration Files Upload")+'</b></td>';
		html_str += '</tr>';
		html_str += '<tr align="left" style="background-color: rgb(232, 239, 247);">';
		html_str += '<td>'+language("Configuration Files Uploading")+' ......<br>'+language('Configuration Files Upload check',"Checking configuration version....<br>")+language('Configuration Files Upload update',"Updating configuration files....<br>")+language('Stop OpenVPN',"Stoping OpenVPN....<br>")+language('Start OpenVPN',"Starting OpenVPN....<br>")+'</td>';
		html_str += '</tr>';
		html_str += '<tr style="background-color:#D0E0EE;height:26px;">';
		html_str += '<th style="width:100%">'+language('Result')+'</th>';
		html_str += '</tr>';
		html_str += '<tr align="left" style="background-color: rgb(232, 239, 247);">';
		html_str += '<td>'+language("Configuration Files Upload Succeeded")+'</td>';
		html_str += '</tr>';
		html_str += '</tbody>';
		html_str += '</table>';
	}else{
		html_str = '<br/>';
		html_str += '<b>'+language('Report')+'</b>';
		html_str += '<table style="width:100%;font-size:12px;border:1px solid rgb(59,112,162);">';
		html_str += '<tbody>';
		html_str += '<tr style="background-color:#D0E0EE;height:26px;">';
		html_str += '<th style="width:100%">'+language('Result')+'</th>';
		html_str += '</tr>';
		html_str += '<tr align="left" style="background-color: rgb(232, 239, 247);">';
		html_str += '<td>'+language("Configuration Files Upload Failed")+'</td>';
		html_str += '</tr>';
		html_str += '</tbody>';
		html_str += '</table>';
	}
	
	$("#div_pptpvpn_tab").after(html_str);
}
/***********************************************************************************/

function vpntypechange()
{
	var type = document.getElementById('vpn_type').value;

	if(type == 'zerovpn'){
		set_visible('div_zerovpn_tab', true);
		set_visible('div_pptpvpn_tab', false);
		set_visible('div_openvpn', false);
		set_visible('tr_pptp', false);
		set_visible('div_l2tpvpn_tab', false);
	}else if(type == 'openvpn') {
		set_visible('div_openvpn', true);
		set_visible('div_pptpvpn_tab', false);
		set_visible('div_zerovpn_tab', false);
		set_visible('tr_pptp', false);
		set_visible('div_l2tpvpn_tab', false);
	} else if (type == 'pptpvpn') {
		set_visible('div_pptpvpn_tab', true);
		set_visible('div_openvpn', false);
		set_visible('div_zerovpn_tab', false);
		set_visible('tr_pptp', true);
		set_visible('div_l2tpvpn_tab', false);
	}else if(type == 'l2tpvpn'){
		set_visible('div_pptpvpn_tab', false);
		set_visible('div_openvpn', false);
		set_visible('div_zerovpn_tab', false);
		set_visible('tr_pptp', false);
		set_visible('div_l2tpvpn_tab', true);
	} else {
		set_visible('div_openvpn', false);
		set_visible('div_pptpvpn_tab', false);
		set_visible('div_zerovpn_tab', false);
		set_visible('tr_pptp', false);
		set_visible('div_l2tpvpn_tab', false);
	}
}

var g_bAllowFile = false;
var gb_Filename = false;
function checkFileChange(obj)
{
	var filesize = 0;
	var  Sys = {};

	if(navigator.userAgent.indexOf("MSIE")>0){
		Sys.ie=true;
	} else
	{  
		Sys.firefox=true;
	}
	
	if(Sys.firefox){  
		filesize = obj.files[0].size;  
	} else if(Sys.ie){
		try {
			obj.select();
			var realpath = document.selection.createRange().text;
			var fileobject = new ActiveXObject ("Scripting.FileSystemObject");
			var file = fileobject.GetFile (realpath);
			var filesize = file.Size;
		} catch(e){
			alert("Please allow ActiveX Scripting File System Object!");
			return false;
		}
	}

	if(filesize > 1000*1000*40) {
		alert("Uploaded max file is 40M!");
		g_bAllowFile = false;
		return false;
	}
	g_bAllowFile = true;
	
	if(obj.files[0].name.indexOf('.tar.gz') == -1 && obj.files[0].name.indexOf('.ovpn') == -1){
		alert('The format of the upload file should be like this "xxxx.tar.gz" or "xxxx.ovpn";');
		gb_Filename = false;
		return false;
	}
	gb_Filename = true;
	
	return true;
}

function onload_func()
{
	vpntypechange();
}
function onload_show(){
	$("#openvpn_switch").iButton();
	$("#l2tp_enable").iButton();
	onload_func();
	openvpn_switch_show();
}

function check(){
	if(limit_string_length()){
		return false;
	}
	
	return true;
}

function limit_string_length(){
	if(check_string_length('pptp_server')){
		return true;
	}
	
	if(check_string_length('pptp_account')){
		return true;
	}
	
	if(check_string_length('pptp_password')){
		return true;
	}
	
	if(check_string_length('pptp_domain')){
		return true;
	}
	
	if(check_string_length('openvpn_account')){
		return true;
	}
	
	if(check_string_length('openvpn_password')){
		return true;
	}
	
	if(check_string_length('server_ip')){
		return true;
	}
	
	if(check_string_length('server_port')){
		return true;
	}
	
	return false;
}

$("#show_openvpn_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#openvpn_password").prop("type","text");
	}else{
		$("#openvpn_password").prop("type","password");
	}
});

$("#show_pptp_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#pptp_password").prop("type","text");
	}else{
		$("#pptp_password").prop("type","password");
	}
});

/***********************************************************************************/

/**************************SHOW NETWORK OPENVPN BEGIN******************************/
(function(){
	/* VPN Settings begin */
	$("#lang_vpntype").html(language('VPNType'));
	$("#lang_vpntype_help").html(language('Type help@network-openvpn','The type of VPN.<br/>OpenVPN: openvpn.<br/>PPTP VPN: pptp vpn.<br/>None: None.'));
	$("#lang_openvpn").html(language('OpenVPN'));
	$("#lang_pptp_vpn").html(language('PPTP VPN'));
	$("#lang_zero_vpn").html(language('Zerotier VPN'));
	$("#lang_l2tp_vpn").html(language('L2TP VPN'));
	$("#lang_none").html(language('None'));
	/* VPN Settings end */
	
	/* OpenVPN Settings begin */
	$("#lang_upload_configuration").html(language('Upload Configuration'));
	$("#lang_file_upload").val(language('File Upload'));
	$("#helpinfo").html(language('OpenVPN Configuration Files help'));
	$("#lang_sample_configuration").html(language('Sample Configuration'));
	$("#lang_sample_configuration_help").html(language('OpenVPN Sample Configuration help','It\'s just a sample configuration which help you to refer to the format. <br/>'));
	$("#lang_download_samples").val(language('Download Samples'));
	$("#lang_openvpn_switch").html(language('Switch'));
	$("#lang_openvpn_switch_help").html(language('Switch help','Switch'));
	$("#lang_openvpn_account").html(language('Account'));
	$("#lang_openvpn_account_help").html(language('Account help','Account'));
	$("#lang_openvpn_password").html(language('Password','Password'));
	$("#lang_openvpn_password_help").html(language('Password help', 'Password'));
	$("#lang_server_ip").html(language('Server IP'));
	$("#lang_server_ip_help").html(language('Server IP help', 'Server IP'));
	$("#lang_server_port").html(language('Server Port'));
	$("#lang_server_port_help").html(language('Server Port help', 'Server Port'));
	$(".lang_connection_status").html(language('Connection Status'));
	/* OpenVPN Settings end */
	
	/* PPTP VPN Settings begin */
	$(".lang_server").html(language('Server'));
	$("#lang_pptp_vpn_help").html(language('PPTP VPN Configuration help','The pptp\'s server ip address.'));
	$("#lang_account").html(language('Account'));
	$("#lang_account_help").html(language('PPTP VPN Account help','pptp vpn account'));
	$(".lang_password").html(language('Password'));
	$(".lang_password_help").html(language('PPTP VPN Password help','pptp vpn password'));
	$("#lang_domain").html(language('Domain'));
	$("#lang_domain_help").html(language('PPTP VPN Domain help','pptp server domain'));
	$("#lang_use_mppe").html(language('Use MPPE', 'Use MPPE'));
	$("#lang_use_mppe_help").html(language('PPTP VPN MPPE help','Use MPPE or not'));
	/* PPTP VPN Settings end */
	
	//ZERO VPN
	$("#lang_ID").html(language('Network ID'));
	$("#lang_ID_help").html(language('Network ID'));
	
	//L2TP VPN
	$("#lang_enable").html(language('Enable'));
	$("#lang_enable_help").html(language('Enable help','Enable'));
	$("#lang_l2tp_server_help").html(language('Server help', 'Server'));
	$("#lang_username").html(language('Username'));
	$("#lang_username_help").html(language('Username help',"Username"));
	$("#lang_ipsec").html(language('IPSec'));
	$("#lang_ipsec_help").html(language('IPSec help',"IPSec"));
	$("#lang_ipsec_password").html(language('IPSec Password'));
	$("#lang_ipsec_password_help").html(language('IPSec Password help',"IPSec Password"));
	
	/* other info */
	$("#vpn_setting_li").text(language('VPN Settings'));
	$("#openvpn_settings_h4").text(language('OpenVPN Settings'));
	$("#pptp_vpn_settings_h4").text(language('PPTP VPN Settings'));
	$("#zero_vpn_settings_h4").text(language('Zerotier VPN Settings'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function openvpn_show(vpn_data){
	if(vpn_data['_vpntype'] == 3){
		var type = 'zerovpn';
	}else if(vpn_data['_vpntype'] == 2){
		var type = 'openvpn';
	}else if(vpn_data['_vpntype'] == 1){
		var type = 'pptpvpn';
	}else if(vpn_data['_vpntype'] == 4){
		var type = 'l2tpvpn';
	}else if(vpn_data['_vpntype'] == 0){
		var type = 'nonevpn';
	}
		
	//select
	document.getElementById('vpn_type').value = type;
	
	/* VPN Settings begin */
	if(vpn_data['_openvpnEncSw'] == 1){
		var _switch = true;
	}else{
		var _switch = false;
	}
	
	var openvpn_username = '';
	if(vpn_data['_openvpnUsername'] != ''){
		openvpn_username = vpn_data['_openvpnUsername'];
	}
	
	var openvpn_password = '';
	if(vpn_data['_openvpnPasswd'] != ''){
		openvpn_password = vpn_data['_openvpnPasswd'];
	}
	
	var openvpn_serverip = '';
	if(vpn_data['_openvpnServer'] != ''){
		openvpn_serverip = vpn_data['_openvpnServer'];
	}
	
	var openvpn_port = '';
	if(vpn_data['_openvpnPort'] != ''){
		openvpn_port = vpn_data['_openvpnPort'];
	}
	
	document.getElementById('openvpn_switch').checked = _switch;
	document.getElementById('openvpn_account').value = openvpn_username;
	document.getElementById('openvpn_password').value = openvpn_password;
	document.getElementById('server_ip').value = openvpn_serverip;
	document.getElementById('server_port').value = openvpn_port;
	/* VPN Settings end */
	
	/* PPTP VPN Settings begin */
	//value
	if(vpn_data['_pptpMppe'] == 1){
		var _pptp_mppe_checked = true;
	}else{
		var _pptp_mppe_checked = false;
	}
	
	var domain = '';
	if(vpn_data['_pptpDomain'] != ''){
		domain = vpn_data['_pptpDomain'];
	}
	
	var serverip = '0.0.0.0';
	if(vpn_data['_pptpServer'] != ''){
		serverip = vpn_data['_pptpServer'];
	}
	
	var account = 'test';
	if(vpn_data['_pptpAccount'] != ''){
		account = vpn_data['_pptpAccount'];
	}
	
	var _password = 'test';
	if(vpn_data['_pptpPasswd'] != ''){
		_password = vpn_data['_pptpPasswd'];
	}
	
	document.getElementById('pptp_server').value = serverip;
	document.getElementById('pptp_account').value = account;
	document.getElementById('pptp_password').value = _password;
	document.getElementById('pptp_domain').value = domain;
	
	//checked
	document.getElementById('pptp_mppe').checked = _pptp_mppe_checked;
	/* PPTP VPN Settings end */
	
	//ZERO VPN Settings
	var zero_id = vpn_data['_zerovpnNetworkID'];
	
	document.getElementById('zero_id').value = zero_id;
	
	//L2TP VPN Settings
	if(vpn_data['_l2tpvpnSw'] == 1){
		var l2tpvpnSw = true;
	}else{
		var l2tpvpnSw = false;
	}
	
	var l2tpvpnServer = '';
	if(vpn_data['_l2tpvpnServer'] != ''){
		l2tpvpnServer = vpn_data['_l2tpvpnServer'];
	}
	
	var l2tpvpnUsername = '';
	if(vpn_data['_l2tpvpnUsername'] != ''){
		l2tpvpnUsername = vpn_data['_l2tpvpnUsername'];
	}
	
	var l2tpvpnPassword = '';
	if(vpn_data['_l2tpvpnPasswd'] != ''){
		l2tpvpnPassword = vpn_data['_l2tpvpnPasswd'];
	}
	
	if(vpn_data['_l2tpvpnIpsecSw'] == 1){
		var l2tpvpnIpsecSw = true;
	}else{
		var l2tpvpnIpsecSw = false;
	}
	
	var l2tpvpnIpsecPasswd = '';
	if(vpn_data['_l2tpvpnIpsecPasswd'] != ''){
		l2tpvpnIpsecPasswd = vpn_data['_l2tpvpnIpsecPasswd'];
	}
	
	document.getElementById('l2tp_enable').checked = l2tpvpnSw;
	document.getElementById('l2tp_server').value = l2tpvpnServer;
	document.getElementById('l2tp_username').value = l2tpvpnUsername;
	document.getElementById('l2tp_password').value = l2tpvpnPassword;
	document.getElementById('ipsec').checked = l2tpvpnIpsecSw;
	document.getElementById('ipsec_password').value = l2tpvpnIpsecPasswd;
}

object.AGNetworkOpenvpnGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var vpn_data = data_temp['_vpn'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	openvpn_show(vpn_data);
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
	
	//OPENVPN
	if(url_para['save'] == 'true' && $("#vpn_type").val() == 'openvpn'){
		object.AGNetworkVPNGetConnectStatus(openvpn_succeed_back, openvpn_error_back, 'openvpn');
	}else{
		object.AGNetworkVPNGetConnectStatus(openvpn_succeed_back_first, openvpn_error_back_first, 'openvpn');	
	}
	
	//PPTPVPN
	if(url_para['save'] == 'true' && $("#vpn_type").val() == 'pptpvpn'){
		object.AGNetworkVPNGetConnectStatus(pptpvpn_succeed_back, pptpvpn_error_back, 'pptpvpn');
	}else{
		object.AGNetworkVPNGetConnectStatus(pptpvpn_succeed_back_first, pptpvpn_error_back_first, 'pptpvpn');
	}
	
	//ZEROVPN
	if(url_para['save'] == 'true' && $("#vpn_type").val() == 'zerovpn'){
		object.AGNetworkVPNGetConnectStatus(zerovpn_succeed_back, zerovpn_error_back, 'zerovpn');
	}else{
		object.AGNetworkVPNGetConnectStatus(zerovpn_succeed_back_first, zerovpn_error_back_first, 'zerovpn');
	}
	
	//L2TPVPN
	if(url_para['save'] == 'true'  && $("#vpn_type").val() == 'l2tpvpn'){
		object.AGNetworkVPNGetConnectStatus(l2tpvpn_succeed_back, l2tpvpn_error_back, 'l2tpvpn');
	}else{
		object.AGNetworkVPNGetConnectStatus(l2tpvpn_succeed_back_first, l2tpvpn_error_back_first, 'l2tpvpn');
	}
	if(data_temp['_combuf']['_features']['_SNMP'] == 0){
		$("#lang_l2tp_vpn").hide();
	}
}

function error_back(data){
	window.location.href = 'error.html';
}
/**************************SHOW NETWORK OPENVPN END******************************/

/**************************SAVE NETWORK OPENVPN BEGIN******************************/
function network_save(){
	var NetworkOpenvpn = new AST_NetworkOpenvpn();
	var vpn_type_val = document.getElementById('vpn_type').value;
	if(vpn_type_val == 'zerovpn'){
		var vpn_type = 3;
	}else if(vpn_type_val == 'openvpn'){
		var vpn_type = 2;
	}else if(vpn_type_val == 'pptpvpn'){
		var vpn_type = 1;
	}else if(vpn_type_val == 'l2tpvpn'){
		var vpn_type = 4;
	}else{
		var vpn_type = 0;
	}
	NetworkOpenvpn._vpntype = vpn_type;
	
	//pptp
	var pptp_server = document.getElementById('pptp_server').value;
	NetworkOpenvpn._pptpServer = pptp_server;
	var pptp_account = document.getElementById('pptp_account').value;
	NetworkOpenvpn._pptpAccount = pptp_account;
	var pptp_password = document.getElementById('pptp_password').value;
	NetworkOpenvpn._pptpPasswd = pptp_password;
	var pptp_domain = document.getElementById('pptp_domain').value;
	NetworkOpenvpn._pptpDomain = pptp_domain;
	if(document.getElementById('pptp_mppe').checked == true){
		var pptp_mppe = 1;
	}else{
		var pptp_mppe = 0;
	}
	NetworkOpenvpn._pptpMppe = pptp_mppe;
	
	//openvpn
	if(document.getElementById('openvpn_switch').checked == true){
		var openvpn_switch = 1;
	}else{
		var openvpn_switch = 0;
	}
	NetworkOpenvpn._openvpnEncSw = openvpn_switch;
	
	var openvpn_username = document.getElementById('openvpn_account').value;
	NetworkOpenvpn._openvpnUsername = openvpn_username;
	var openvpn_password = document.getElementById('openvpn_password').value;
	NetworkOpenvpn._openvpnPasswd = openvpn_password;
	var server_ip = document.getElementById('server_ip').value;
	NetworkOpenvpn._openvpnServer = server_ip;
	var server_port = document.getElementById('server_port').value;
	NetworkOpenvpn._openvpnPort = server_port;
	
	//zerovpn
	var zero_id = document.getElementById('zero_id').value;
	NetworkOpenvpn._zerovpnNetworkID = zero_id;
	
	//l2tpvpn
	if(document.getElementById('l2tp_enable').checked == true){
		var l2tp_enable = 1;
	}else{
		var l2tp_enable = 0;
	}
	NetworkOpenvpn._l2tpvpnSw = l2tp_enable;
	
	var l2tp_server = document.getElementById('l2tp_server').value;
	NetworkOpenvpn._l2tpvpnServer = l2tp_server;
	
	var l2tp_username = document.getElementById('l2tp_username').value;
	NetworkOpenvpn._l2tpvpnUsername = l2tp_username;
	
	var l2tp_password = document.getElementById('l2tp_password').value;
	NetworkOpenvpn._l2tpvpnPasswd = l2tp_password;
	
	if(document.getElementById('ipsec').checked == true){
		var ipsec_sw = 1;
	}else{
		var ipsec_sw = 0;
	}
	NetworkOpenvpn._l2tpvpnIpsecSw = ipsec_sw;
	
	var ipsec_password = document.getElementById('ipsec_password').value;
	NetworkOpenvpn._l2tpvpnIpsecPasswd = ipsec_password;
	
	object.AGNetworkOpenvpnSave(save_succeed_back, save_error_back, NetworkOpenvpn);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-openvpn.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/**************************SAVE NETWORK OPENVPN END******************************/

/**************************UPLOAD FILE BEGIN******************************/
var url_para = get_url_para();
if(url_para['type'] == 'upload'){
	upload_report(url_para['tip']);
}
/**************************UPLOAD FILE END******************************/

/**************************GET VPN Status BEGIN******************************/
//openvpn
function openvpn_succeed_back_first(data){
	if(data['_connectsta'] == 1){
		$(".openvpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(data['_connectsta'] == 0){
		$(".openvpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

var openvpn_time = 0;
function openvpn_succeed_back(data){
	if(data['_connectsta'] == 1){
		$(".openvpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(openvpn_time < 30){
		openvpn_time++;
		$(".openvpn_connect").html('<img src="/images/loading.gif"/>');
		setTimeout(function(){object.AGNetworkVPNGetConnectStatus(openvpn_succeed_back, openvpn_error_back, 'openvpn');},1000);
	}else if(openvpn_time >=30){
		$(".openvpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

function openvpn_error_back(){}
function openvpn_error_back_first(){}

//pptpvpn
function pptpvpn_succeed_back_first(data){
	if(data['_connectsta'] == 1){
		$(".pptpvpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(data['_connectsta'] == 0){
		$(".pptpvpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

var pptpvpn_time = 0;
function pptpvpn_succeed_back(data){
	if(data['_connectsta'] == 1){
		$(".pptpvpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(pptpvpn_time < 20){
		pptpvpn_time++;
		$(".pptpvpn_connect").html('<img src="/images/loading.gif"/>');
		setTimeout(function(){object.AGNetworkVPNGetConnectStatus(pptpvpn_succeed_back, pptpvpn_error_back, 'pptpvpn');},1000);
	}else if(pptpvpn_time >=20){
		$(".pptpvpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

function pptpvpn_error_back(){}
function pptpvpn_error_back_first(){}

//zerovpn
function zerovpn_succeed_back_first(data){
	if(data['_connectsta'] == 1){
		$(".zerovpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(data['_connectsta'] == 0){
		$(".zerovpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

var zerovpn_time = 0;
function zerovpn_succeed_back(data){
	if(data['_connectsta'] == 1){
		$(".zerovpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(zerovpn_time < 20){
		zerovpn_time++;
		$(".zerovpn_connect").html('<img src="/images/loading.gif"/>');
		setTimeout(function(){object.AGNetworkVPNGetConnectStatus(zerovpn_succeed_back, zerovpn_error_back, 'zerovpn');},1000);
	}else if(zerovpn_time >=20){
		$(".zerovpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

function zerovpn_error_back(){}
function zerovpn_error_back_first(){}

//l2tpvpn
function l2tpvpn_succeed_back_first(data){
	if(data['_connectsta'] == 1){
		$(".l2tpvpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(data['_connectsta'] == 0){
		$(".l2tpvpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

var l2tpvpn_time = 0;
function l2tpvpn_succeed_back(data){
	if(data['_connectsta'] == 1){
		$(".l2tpvpn_connect").html("<span style='color:green;'>"+language('Connected')+"</span>");
	}else if(l2tpvpn_time < 20){
		l2tpvpn_time++;
		$(".l2tpvpn_connect").html('<img src="/images/loading.gif"/>');
		setTimeout(function(){object.AGNetworkVPNGetConnectStatus(l2tpvpn_succeed_back, l2tpvpn_error_back, 'l2tpvpn');},1000);
	}else if(l2tpvpn_time >=20){
		$(".l2tpvpn_connect").html("<span style='color:red'>"+language('Failed to connect')+"</span>");
	}
}

function l2tpvpn_error_back(){}
function l2tpvpn_error_back_first(){}
/**************************GET VPN Status END******************************/