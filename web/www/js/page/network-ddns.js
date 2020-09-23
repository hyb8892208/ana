function onload_func()
{
	ddnschange();
}

function typechange(host, userid, userpwd)
{
	var type = document.getElementById('type').value;
	if (type == 'inadyn') {
		document.getElementById('host').value = host['inadyn'];
		document.getElementById('userid').value = userid['inadyn'];
		document.getElementById('userpwd').value = userpwd['inadyn'];
	} else {
		document.getElementById('host').value = host['phddns'];
		document.getElementById('userid').value = userid['phddns'];
		document.getElementById('userpwd').value = userpwd['phddns'];
	}
}

function ddnschange()
{
	var ddns_checked = document.getElementById('ddns').checked;
	if (ddns_checked) {
		document.getElementById('type').disabled = false;
		document.getElementById('host').disabled = false;
		document.getElementById('userid').disabled = false;
		document.getElementById('userpwd').disabled = false;
	} else {
		document.getElementById('type').disabled = true;
		document.getElementById('host').disabled = true;
		document.getElementById('userid').disabled = true;
		document.getElementById('userpwd').disabled = true;
	}
}

function trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function check()
{
	var ddns_checked = document.getElementById('ddns').checked;
	var host = document.getElementById('host').value;
	var userid = document.getElementById('userid').value;
	var userpwd = document.getElementById('userpwd').value;

	if (!ddns_checked) {
		return true;
	}

	host = trim(host);
	userid = trim(userid);
	userpwd = trim(userpwd);

	if (host.length == 0) {
		document.getElementById('chost').innerHTML = con_str('Please input a domain');
		document.getElementById('host').value = '';
		return false;
	} else {
		document.getElementById('chost').innerHTML = '';
	}
	if (userid.length == 0) {
		document.getElementById('cuserid').innerHTML = con_str('Please input a user name');
		document.getElementById('userid').value = '';
		return false;
	} else {
		document.getElementById('cuserid').innerHTML = '';
	}
	if (userpwd.length == 0) {
		document.getElementById('cuserpwd').innerHTML = con_str('Please input a user password');
		document.getElementById('userpwd').value = '';
		return false;
	} else {
		document.getElementById('cuserpwd').innerHTML = '';
	}
	
	if(limit_string_length()){
		return false;
	}

	return true;
}

function limit_string_length(){
	if(check_string_length('userid')){
		return true;
	}
	
	if(check_string_length('userpwd')){
		return true;
	}
	
	if(check_string_length('host')){
		return true;
	}
	
	return false;
}
/*******************************************************************************/
function onload_show(){
	$("#ddns").iButton(); 
	onload_func();
}

$("#show_userpwd").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#userpwd").prop("type","text");
	}else{
		$("#userpwd").prop("type","password");
	}
});
/*******************************************************************************/


/*****************************SHOW NETWORK DDNS BEGIN*****************************/
(function(){
	$("#lang_ddns").html(language('DDNS'));
	$("#lang_ddns_help").html(language('DDNS help','Enable/Disable DDNS (dynamic domain name server). <br/>'));
	$("#lang_type").html(language('Type'));
	$("#lang_type_help").html(language('Type help@network-ddns','Set the type of DDNS server. <br/>'));
	$("#lang_username").html(language('User Name'));
	$("#lang_username_help").html(language('User Name help@network-ddns','Your DDNS account\'s login name.<br/>'));
	$("#lang_password").html(language('Password'));
	$("#lang_password_help").html(language('Password help@network-ddns','Your DDNS account\'s password.<br/>'));
	$("#lang_your_domain").html(language('Your domain'));
	$("#lang_your_domain_help").html(language('Your domain help','The domain to which your web server will belong.<br/>'));
	
	/* other info */
	$("#ddns_settings_li").text(language('DDNS Settings'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function ddns_show(general_data, com_data){
	
	var ddns = general_data['_ddns'];
	
	if(general_data['_type'] == 1){
		var type = 'phddns';
	}else{
		var type = 'inadyn';
	}
	
	var host = [];
	host['inadyn'] = com_data[0]['_host'];
	host['phddns'] = com_data[1]['_host'];
	
	var userid = [];
	userid['inadyn'] = com_data[0]['_userid'];
	userid['phddns'] = com_data[1]['_userid'];
	
	var userpwd = [];
	userpwd['inadyn'] = com_data[0]['_passwd'];
	userpwd['phddns'] = com_data[1]['_passwd'];
	
	if(ddns==1){var _ddns_checked = true;}else{var _ddns_checked = false;}
	
	//value
	document.getElementById('userid').value = userid[type];
	document.getElementById('userpwd').value = userpwd[type];
	document.getElementById('host').value = host[type];
	
	//select
	document.getElementById('type').value = type;
	
	//checked
	document.getElementById('ddns').checked = _ddns_checked;
	
	/* other handle */
	typechange(host, userid, userpwd);
	$("#type").change(function(){
		typechange(host, userid, userpwd);
	});
}

object.AGNetworkDdnsGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var general_data = data_temp['_general'];
	var com_data = data_temp['_com']['_item'];
	
	header(data_temp['_combuf']);
	ddns_show(general_data, com_data);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				ddns_save();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*****************************SHOW NETWORK DDNS END*****************************/


/*****************************SAVE NETWORK DDNS BEGIN*****************************/
function ddns_save(){
	var networkddnscom = new AST_NetworkDdnsCom();
	var networkddnsgeneral = new AST_NetworkDdnsGeneral();
	
	if(document.getElementById('ddns').checked == true){
		var sw = 0;
	}else{
		var sw = 1;
	}
	networkddnsgeneral._ddns = sw;
	
	var type_val = document.getElementById('type').value;
	if(type_val == 'phddns'){
		var type = 1;
	}else{
		var type = 0;
	}
	var host = document.getElementById('host').value;
	var userid = document.getElementById('userid').value;
	var userpwd = document.getElementById('userpwd').value;
	networkddnsgeneral._type = type;
	networkddnscom._host = host;
	networkddnscom._userid = userid;
	networkddnscom._passwd = userpwd;
	
	var NetworkDdnsSave = new AST_NetworkDdnsSave();
	NetworkDdnsSave._general = networkddnsgeneral;
	NetworkDdnsSave._com = networkddnscom;
	
	object.AGNetworkDdnsGetSave(save_succeed_back, save_error_back, NetworkDdnsSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-ddns.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*****************************SAVE NETWORK DDNS END*****************************/