function onload_show(){
	$("#tr069_sw").iButton();
	$("#periodic_enable").iButton();
}

function check(){
	var periodic_interval = document.getElementById('periodic_interval').value;
	document.getElementById('cperiodic_interval').innerHTML = '';
	if(periodic_interval < 60 || periodic_interval > 7200){
		document.getElementById('periodic_interval').focus();
		document.getElementById('cperiodic_interval').innerHTML = con_str(language('Periodic inform interval help','Range:60-7200'));
		return false;
	}
	
	return true;
}

/***********************************************************************************/
(function(){
	$("#lang_tr069_settings").html(language('TR069 Settings'));
	$("#lang_tr069").html(language('TR069'));
	$("#lang_tr069_help").html(language('TR069 help','TR069'));
	$("#lang_server").html(language('Server@tr069','Server'));
	$("#lang_server_help").html(language('Server@tr069 help','Server'));
	$("#lang_username").html(language('Username'));
	$("#lang_username_help").html(language('Username help','Username'));
	$("#lang_password").html(language('Password'));
	$("#lang_password_help").html(language('Password help','Password'));
	$("#lang_provisioning_code").html(language('Provisioning code'));
	$("#lang_provisioning_code_help").html(language('Provisioning code help','Provisioning code'));
	$("#lang_model_name").html(language('Model Name'));
	$("#lang_model_name_help").html(language('Model Name help','Model Name'));
	$("#lang_periodic_inform_enable").html(language('Periodic inform enable'));
	$("#lang_periodic_inform_enable_help").html(language('Periodic inform enable help','Periodic inform enable'));
	$("#lang_periodic_inform_interval").html(language('Periodic inform interval'));
	$("#lang_periodic_inform_interval_help").html(language('Periodic inform interval help','Periodic inform interval'));
	$(".lang_second").html(language('Second'));
	$("#lang_connection_request_url").html(language('Connection request URL'));
	$("#lang_connection_request_url_help").html(language('Connection request URL help', 'Connection request URL'));
	$("#lang_connection_request_username").html(language('Connection request username'));
	$("#lang_connection_request_username_help").html(language('Connection request username help', 'Connection request username'));
	$("#lang_connection_request_password").html(language('Connection request password'));
	$("#lang_connection_request_password_help").html(language('Connection request password help', 'Connection request password'));
	$("#lang_connection_status").html(language('Connection Status'));
	$("#lang_connection_status_help").html(language('Connection Status',"Connection status"));
	$("#lang_save").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
		get_state();
	}else{
		object.AGAdvTr069GetStatus(state_success_back_open, state_error_back_open);
	}
}());
/***********************************************************************************/
function show_tr069(general_data){
	var enabled = general_data['_enabled'];
	if(enabled == 1){
		document.getElementById('tr069_sw').checked = true;
	}
	
	var server = general_data['_acsurl'];
	document.getElementById('server').value = server;
	
	var username = general_data['_acsusername'];
	document.getElementById('username').value = username;
	
	var _password = general_data['_acspassword'];
	document.getElementById('password').value = _password;
	
	var provisioningcode = general_data['_provisioningcode'];
	document.getElementById('provisioning_code').value = provisioningcode;
	
	var modelname = general_data['_modelname'];
	document.getElementById('model_name').value = modelname;
	
	var periodicenable = general_data['_periodicenable'];
	if(periodicenable == 1){
		document.getElementById('periodic_enable').checked = true;
	}
	
	var periodicinterval = general_data['_periodicinterval'];
	document.getElementById('periodic_interval').value = periodicinterval;
	
	var requesturl = general_data['_requesturl'];
	document.getElementById('connection_request_url').value = requesturl;
	
	var requestusername = general_data['_requestusername'];
	document.getElementById('connection_request_username').value = requestusername;
	
	var requestpasswd = general_data['_requestpasswd'];
	document.getElementById('connection_request_password').value = requestpasswd;
}

object.AGAdvTr069Get(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var general_data = data_temp['_general'];
	
	header(data_temp['_combuf']);
	show_tr069(general_data);
	footer();
	
	$("#lang_save").click(function(){
		if(check() && save_only_once()){
			$("#loading_image").show();
			save_tr069();
		}
	});
	
	onload_show();
}

function error_back(data){
	window.location.href = 'error.html';
}
/***********************************************************************************/
function save_tr069(){
	var General = new AST_AdvTr069General();
	
	if(document.getElementById('tr069_sw').checked){
		var enable = 1;
	}else{
		var enable = 0;
	}
	General._enabled = enable;
	
	var server = document.getElementById('server').value;
	General._acsurl = server;
	
	var username = document.getElementById('username').value;
	General._acsusername = username;
	
	var _password = document.getElementById('password').value;
	General._acspassword = _password;
	
	var provisioningcode = document.getElementById('provisioning_code').value;
	General._provisioningcode = provisioningcode;
	
	var modelname = document.getElementById('model_name').value;
	General._modelname = modelname;
	
	if(document.getElementById('periodic_enable').checked){
		var periodic_enable = 1;
	}else{
		var periodic_enable = 0;
	}
	General._periodicenable = periodic_enable;
	
	var periodicinterval = document.getElementById('periodic_interval').value;
	General._periodicinterval = periodicinterval;
	
	var requesturl = document.getElementById('connection_request_url').value;
	General._requesturl = requesturl;
	
	var requestusername = document.getElementById('connection_request_username').value;
	General._requestusername = requestusername;
	
	var requestpasswd = document.getElementById('connection_request_password').value;
	General._requestpasswd = requestpasswd;
	
	var AdvTr069Save = new AST_AdvTr069Save();
	AdvTr069Save._general = General;
	
	object.AGAdvTr069Save(save_succeed_back, save_error_back, AdvTr069Save);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-tr069.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/***********************************************************************************/
var times = 0;
var interval;
var connect_ok = "<span style='color:green'>"+language('connected')+"</span>";
function get_state(){
	$(".connect").html('<img src="/images/loading.gif" />');
	interval = setInterval(function(){object.AGAdvTr069GetStatus(state_success_back, state_error_back);}, 10000);
}

function state_success_back_open(data){
	var result = data['_tr069status'];
	
	if(result == 200){
		$(".connect").html(connect_ok);
	}else{
		var str = language("Failed to connect");
		var connect_no = "<span style='color:red'>"+str+"</span>";
		$(".connect").html(connect_no);
	}
}

function state_success_back(data){
	var result = data['_tr069status'];
	
	if(result == 200){
		$(".connect").html(connect_ok);
		window.clearInterval(interval);
	}else if(result == 0){
		$(".connect").html('<img src="/images/loading.gif" />');
		
		times++;
	}else if(times >= 30){
		var str = language("Connection timed out");;
		window.clearInterval(interval);
	}else{
		var str = language("Failed to connect");
		var connect_no = "<span style='color:red'>"+str+"</span>";
		$(".connect").html(connect_no);
	}
}

function state_error_back_open(data){
	alert("Get State Error");
}
function state_error_back(data){
	alert("Get State Error");
}