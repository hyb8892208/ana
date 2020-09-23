function ssh_change(sw)
{
	document.getElementById('ssh_user').disabled = !sw;
	document.getElementById('ssh_password').disabled = !sw;
}
/**********************************************************************************/

function login_mode_change(web_server_port, web_server_https_port)
{
	if (document.getElementById("login_mode").value == "https") {
		document.getElementById("web_server_port").disabled=true;
		document.getElementById("web_server_port").style.backgroundColor="#E0E0E0";
		document.getElementById("web_server_https_port").value=web_server_https_port;
		document.getElementById("web_server_https_port").disabled=false;
		document.getElementById("web_server_https_port").style.backgroundColor='';
	}else if(document.getElementById("login_mode").value == "http") {
		document.getElementById("web_server_https_port").disabled=true;
		document.getElementById("web_server_https_port").style.backgroundColor="#E0E0E0";
		document.getElementById("web_server_port").value=web_server_port;
		document.getElementById("web_server_port").disabled=false;
		document.getElementById("web_server_port").style.backgroundColor='';
	} else {
		document.getElementById("web_server_https_port").value=web_server_https_port;
		document.getElementById("web_server_https_port").disabled=false;
		document.getElementById("web_server_https_port").style.backgroundColor='';
		document.getElementById("web_server_port").value=web_server_port;
		document.getElementById("web_server_port").disabled=false;
		document.getElementById("web_server_port").style.backgroundColor='';
	}
}

function onload_show(){
	$("#ssh_sw").iButton();
};

function check()
{
	var login_mode = document.getElementById("login_mode").value;
	var user = document.getElementById("user").value;
	var pw1 = document.getElementById("pw1").value;
	var pw2 = document.getElementById("pw2").value;
	var web_server_port = parseInt(document.getElementById("web_server_port").value);
	var web_server_https_port = parseInt(document.getElementById("web_server_https_port").value);

	document.getElementById("cuser").innerHTML = '';
	document.getElementById("cpw1").innerHTML = '';
	document.getElementById("cpw2").innerHTML = '';
	document.getElementById("cweb_server_port").innerHTML = '';
	document.getElementById("cweb_server_https_port").innerHTML = '';

	if(user == '' && pw1 != ''){
		var rstr = language('js check username 1');
		document.getElementById('cuser').innerHTML = con_str(rstr);
		return false;
	}
	
	if(pw1 == '' && user != ''){
		var rstr = language('password should not be null');
		document.getElementById('cpw1').innerHTML = con_str(rstr);
		return false;
	}
	
	if(pw2 == '' && pw1 != ''){
		var rstr = language('comfirm password should not be null');
		document.getElementById('cpw2').innerHTML = con_str(rstr);
		return false;
	}
	
	if(user != "" || pw1 != "" || pw2 != "") {
		if(!check_diyname(user)) {
			var rstr = language('js check diyname','Allowed character must be any of [-_+.<>&0-9a-zA-Z],1 - 32 characters.');
			document.getElementById("cuser").innerHTML = con_str(rstr);
			return false;
		}

		if(!check_diypwd(pw1)) {
			var rstr = language('js check diypwd','Allowed character must be any of [-_+.<>&0-9a-zA-Z],4 - 32 characters.');
			document.getElementById("cpw1").innerHTML = con_str(rstr);
			return false;
		}

		if(pw1 !== pw2) {
			document.getElementById("cpw2").innerHTML = con_str(language('Confirm Password warning@system-login web','This password must match the password above.'));
			return false;
		}
	}
	
	var deny_port_list = new Array(5038,5039,5040,5041,5042,5060,12345,12346,12347,12348,12349,8000,56888);
	var allow = true;
	var allow_https = true;
	for (var i in deny_port_list){
		if(web_server_port == deny_port_list[i]){
			allow = false;
			break;
		}
		if(web_server_https_port == deny_port_list[i]){
			allow_https = false;
			break;
		}
	}
	
	if((web_server_port < 1024 && web_server_port != 80 ) || web_server_port > 65535 || allow == false){
		document.getElementById("cweb_server_port").innerHTML = con_str(language('js webserver http port help','Range: 1024-65535, Default 80. Some ports are forbidding.'));
		return false;
	}
	if((web_server_https_port < 1024 && web_server_https_port != 443) || web_server_https_port > 65535 || allow_https == false){
		document.getElementById("cweb_server_https_port").innerHTML = con_str(language('js webserver https port help','Range: 1024-65535, Default 443. Some ports are forbidding.'));
		return false;
	}

	//ssh
	var ssh_sw = document.getElementById("ssh_sw").checked;
	var ssh_user = document.getElementById("ssh_user").value;
	var ssh_password = document.getElementById("ssh_password").value;

	document.getElementById("cssh_user").innerHTML = '';
	document.getElementById("cssh_password").innerHTML = '';

	if(ssh_sw) {
		if(ssh_user == ''){
			var rstr = language('js check username 1');
			document.getElementById('cssh_user').innerHTML = con_str(rstr);
			return false;
		}
		
		if(ssh_password == ''){
			var rstr = language('password should not be null');
			document.getElementById('cssh_password').innerHTML = con_str(rstr);
			return false;
		}
		
		if(!check_ssh_diyname(ssh_user)) {
			var rstr = language('js check ssh_diyname','Allowed character must be any of [-_+.<>&0-9a-zA-Z],1 - 25 characters.');
			document.getElementById("cssh_user").innerHTML = con_str(rstr);
			return false;	
		}

		if(ssh_user == 'root') {
			document.getElementById("cssh_user").innerHTML = con_str(language('User Name warning@system-login ssh',"Can't use 'root'"));
			return false;	
		}

		if(!check_diypwd(ssh_password)) {
			var rstr = language('js check diypwd','Allowed character must be any of [-_+.<>&0-9a-zA-Z],4 - 32 characters.');
			document.getElementById("cssh_password").innerHTML = con_str(rstr);
			return false;	
		}
	}

	return true;
}

$("#show_web_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#pw1").prop("type","text");
	}else{
		$("#pw1").prop("type","password");
	}
});

$("#show_con_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#pw2").prop("type","text");
	}else{
		$("#pw2").prop("type","password");
	}
});

$("#show_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#ssh_password").prop("type","text");
	}else{
		$("#ssh_password").prop("type","password");
	}
});
/**********************************************************************************/


/*********************************SHOW LOGIN BEGIN********************************/
(function(){
	$(".lang_user_name").html(language('User Name'));
	$("#lang_user_name_help").html(language('User Name help@system-login web', "NOTES: Your gateway doesn't have administration role. <br/>All you can do here is defining what username and password to manage your gateway.<br/>And it has all privileges to operate your gateway.<br/>User Name: Allowed characters \"-_+.<>&0-9a-zA-Z\".Length: 1-32 characters."));
	$(".lang_password").html(language('Password'));
	$(".lang_password_help").html(language('Password help@system-login web', 'Characters: Allowed characters "-_+.<>&0-9a-zA-Z".Length: 4-32 characters.'));
	$("#lang_confirm_password").html(language('Confirm Password'));
	$("#lang_confirm_password_help").html(language('Confirm Password help@system-login web',"Please input the same password as 'Password' above."));
	$("#lang_login_mode").html(language('Login Mode'));
	$("#lang_login_mode_help").html(language('Login Mode help',"Select the mode of login."));
	$(".lang_port").html(language('Port'));
	$("#lang_http_port").html(language('HTTP Port'));
	$("#lang_port_help").html(language('web server port help','Specify the web server port number.'));
	$("#lang_https_port").html(language('HTTPS Port'));
	$("#lang_https_port_help").html(language('web server port help',"Specify the web server port number."));
	$("#lang_enable").html(language('Enable'));
	$("#lang_enable_help").html(language('Enable help', 'ON(enabled),OFF(disabled)'));
	$("#lang_user_name_help_ssh").html(language('User Name help@system-login ssh', 'User Name: Allowed characters "-_+.<>&0-9a-zA-Z".Length: 1-25 characters.</br>Can\'t use \'root\'.'));
	$("#lang_port_help_ssh").html(language('Port help@system-login ssh', 'SSH login port number.'));
	$("#save_login").val(language("Save"));
	
	/* other info */
	$("#web_login_settings_li").text(language('Web Login Settings'));
	$("#ssh_login_settings_li").text(language('SSH Login Settings'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function login_show(ssh_data, web_data){
	var login_mode_val = web_data['_loginmode'];
	if(login_mode_val == 0){
		var login_mode = 'http_https';
	}else if(login_mode_val == 1){
		var login_mode = 'https';
	}else{
		var login_mode = 'http';
	}
	
	if(web_data['_port1'] != 0){
		var web_server_port = web_data['_port1'];
	}else{
		var web_server_port = 80;
	}
	if(web_data['_port2'] != 0){
		var web_server_https_port = web_data['_port2'];
	}else{
		var web_server_https_port = 443;
	}
	
	if(ssh_data['_sw'] == 0){
		var ssh_sw = true;
	}else{
		var ssh_sw = false;
	}
	
	var ssh_user = ssh_data['_user'];
	
	var ssh_password = ssh_data['_password'];
	
	/* Web Login Settings begin */
	//select
	document.getElementById('login_mode').value = login_mode;
	
	//value 
	document.getElementById('web_server_port').value = web_server_port;
	document.getElementById('web_server_https_port').value = web_server_https_port;
	/* Web Login Settings end */
	
	/* SSH Login Settings begin */
	//checked
	document.getElementById('ssh_sw').checked = ssh_sw;
	
	//value
	document.getElementById('ssh_user').value = ssh_user;
	document.getElementById('ssh_password').value = ssh_password;
	/* SSH Login Settings end */
	
	login_mode_change(web_server_port, web_server_https_port);
	$("#login_mode").change(function(){
		login_mode_change(web_server_port, web_server_https_port);
	});
	
	if(ssh_sw != ''){
		ssh_change(true);
	}else{
		ssh_change(false);
	}
}

object.AGSysLoginGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var web_data = data_temp['_general'];
	var ssh_data = data_temp['_ssh'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	login_show(ssh_data, web_data);
	footer();
	
	onload_show();
	
	$("#save_login").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				login_save();
			}
		}
	});
	
	//demo_enable
	if(document.getElementById('save_login') != null)
		document.getElementById('save_login').disabled = demo_enable == 1 ? true : false;
}

function error_back(data){
	window.location.href = 'error.html';
}
/***************************************SHOW LOGIN END*******************************************/


/***************************************SAVE LOGIN BEGIN*******************************************/
function login_save(){
	var syslogingeneral = new AST_SysLoginGeneral();
	var username = document.getElementById('user').value;
	syslogingeneral._username = username;
	var pwd = document.getElementById('pw1').value;
	syslogingeneral._password = pwd;
	var login_mode_val = document.getElementById('login_mode').value;
	if(login_mode_val == 'http_https'){
		var login_mode = 0;
	}else if(login_mode_val == 'https'){
		var login_mode = 1;
	}else{
		var login_mode = 2;
	}
	syslogingeneral._loginmode = login_mode;
	document.getElementById('login_type').value = login_mode;
	
	var port1 = document.getElementById('web_server_port').value;
	if(port1 == 0) port1 = 80;
	syslogingeneral._port1 = port1;
	var port2 = document.getElementById('web_server_https_port').value;
	if(port2 == 0) port2 = 443;
	syslogingeneral._port2 = port2;
	
	var sysloginssh = new AST_SysLoginSsh();
	var ssh_sw_val = document.getElementById('ssh_sw').checked;
	if(ssh_sw_val == true){
		var ssh_sw = 0;
	}else{
		var ssh_sw = 1;
	}
	sysloginssh._sw = ssh_sw;
	var ssh_user = document.getElementById('ssh_user').value;
	sysloginssh._user = ssh_user;
	var ssh_password = document.getElementById('ssh_password').value;
	sysloginssh._password = ssh_password;
	
	var SysLoginSave = new AST_SysLoginSave();
	SysLoginSave._general = syslogingeneral;
	SysLoginSave._ssh = sysloginssh;
	
	object.AGSysLoginSave(save_succeed_back, save_error_back, SysLoginSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		$("#lighttpd_restart").submit();
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/***************************************SAVE LOGIN END*******************************************/