function selAllRead(value)
{
	document.getElementById("system_r").checked = value;
	document.getElementById("call_r").checked = value;
	document.getElementById("log_r").checked = value;
	document.getElementById("verbose_r").checked = value;
	document.getElementById("agent_r").checked = value;
	document.getElementById("user_r").checked = value;
	document.getElementById("config_r").checked = value;
	document.getElementById("dtmf_r").checked = value;
	document.getElementById("reporting_r").checked = value;
	document.getElementById("cdr_r").checked = value;
	document.getElementById("dialplan_r").checked = value;
}

function selAllWrite(value)
{
	document.getElementById("system_w").checked = value;
	document.getElementById("call_w").checked = value;
	document.getElementById("log_w").checked = value;
	document.getElementById("verbose_w").checked = value;
	document.getElementById("command_w").checked = value;
	document.getElementById("agent_w").checked = value;
	document.getElementById("user_w").checked = value;
	document.getElementById("config_w").checked = value;
	document.getElementById("reporting_w").checked = value;
	document.getElementById("originate_w").checked = value;
}

function check()
{
	if(!document.getElementById("enable_ami").checked){
		return true;
	}

	var port = document.getElementById("port").value;
	var name = document.getElementById("name").value;
	var secret = document.getElementById("secret").value;
	var deny = document.getElementById("deny").value;
	var permit = document.getElementById("permit").value;

	if(!check_networkport(port)) {
		var rstr = language('js check networkport','Please input valid port number (1-65535)');
		return false;
	} else {
	}

	if(!check_diyname(name)) {
		var rstr = language('js check diyname','Allowed character must be any of [-_+.<>&0-9a-zA-Z],1 - 32 characters.');
		document.getElementById("cname").innerHTML = con_str(rstr);
		return false;
	} else {
		document.getElementById("cname").innerHTML = '';
	}
	
	if(!check_diypwd(secret)) {
		var rstr = language('js check diypwd','Allowed character must be any of [-_+.<>&0-9a-zA-Z],4 - 32 characters.');
		document.getElementById("csecret").innerHTML = con_str(rstr);
		return false;
	} else {
		document.getElementById("csecret").innerHTML = '';
	}
	
	if(limit_string_length()){
		return false;
	}
		
	return true;
}

function enable_ami_change()
{
	var sw = document.getElementById('enable_ami').checked;

	if(sw) {
		set_visible('field_manager', true);
		set_visible('field_rights', true);
		set_visible('field_port', true);

	} else {
		set_visible('field_manager', false);
		set_visible('field_rights', false);
		set_visible('field_port', false);

	}
}

function onload_func()
{
	enable_ami_change();
}

function limit_string_length(){
	if(check_string_length('secret')){
		return true;
	}
	
	return false;
}
/***********************************************************************/
function onload_show(){
	$("#enable_ami").iButton();
	onload_func();
}

$("#show_secret").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#secret").prop("type","text");
	}else{
		$("#secret").prop("type","password");
	}
});
/***********************************************************************/

/**************************SHOW ADV ASTAPI BRGIN**************************/
(function(){
	/* General begin */
	$("#lang_enable").html(language('Enable'));
	$("#lang_port").html(language('Port'));
	$("#lang_port_help").html(language('Port help@adv-astapi','Network port number.'));
	$("#lang_manager_name").html(language('Manager Name'));
	$("#lang_manager_name_help").html(language('Manager Name help','Name of the manager without space.'));
	$("#lang_manager_secret").html(language('Manager secret'));
	$("#lang_manager_secret_help").html(language('Manager secret help','Password for the manager.<br/>Characters: Allowed characters \'-_+.<>&0-9a-zA-Z\'.Length: 4-32 characters.'));
	$("#lang_deny").html(language('Deny'));
	$("#lang_deny_help").html(language('Deny help@adv-astapi','If you want to deny many hosts or networks, use char & as separator.<br/>Example: 0.0.0.0/0.0.0.0 or 192.168.1.0/255.255.255.0&10.0.0.0/255.0.0.0'));
	$("#lang_permit").html(language('Permit'));
	$("#lang_permit_help").html(language('Permit help@adv-astapi','If you want to permit many hosts or networks, use char & as separator.<br/>Example: 0.0.0.0/0.0.0.0 or 192.168.1.0/255.255.255.0&10.0.0.0/255.0.0.0'));
	$(".lang_read").html(language('read'));
	$(".lang_write").html(language('write'));
	$("#lang_system").html(language('System'));
	$("#lang_system_help").html(language('System help@adv-astapi','General information about the system and ability to run system management commands, <br/>such as Shutdown, Restart, and Reload.'));
	$("#lang_call").html(language('Call'));
	$("#lang_call_help").html(language('Call help@adv-astapi','Information about channels and ability to set information in a running channel.'));
	$("#lang_log").html(language('Log'));
	$("#lang_log_help").html(language('Log help@adv-astapi','Logging information.  Read-only. (Defined but not yet used.)'));
	$("#lang_verbose").html(language('Verbose'));
	$("#lang_verbose_help").html(language('Verbose help@adv-astapi','Verbose information.  Read-only. (Defined but not yet used.)'));
	$("#lang_command").html(language('Command'));
	$("#lang_command_help").html(language('Command help@adv-astapi','Permission to run CLI commands.  Write-only.'));
	$("#lang_agent").html(language('Agent'));
	$("#lang_agent_help").html(language('Agent help@adv-astapi','Information about queues and agents and ability to add queue members to a queue.'));
	$("#lang_user").html(language('User'));
	$("#lang_user_help").html(language('User help@adv-astapi','Permission to send and receive UserEvent.'));
	$("#lang_config").html(language('Config'));
	$("#lang_config_help").html(language('Config help@adv-astapi','Ability to read and write configuration files.'));
	$("#lang_dtmf").html(language('DTMF'));
	$("#lang_dtmf_help").html(language('DTMF help@adv-astapi','Receive DTMF events.  Read-only.'));
	$("#lang_reporting").html(language('Reporting'));
	$("#lang_reporting_help").html(language('Reporting help@adv-astapi','Ability to get information about the system.'));
	$("#lang_cdr").html(language('CDR'));
	$("#lang_cdr_help").html(language('CDR help@adv-astapi','Output of cdr_manager, if loaded.  Read-only.'));
	$("#lang_dialplan").html(language('Dialplan'));
	$("#lang_dialplan_help").html(language('Dialplan help@adv-astapi','Receive NewExten and VarSet events.  Read-only.'));
	$("#lang_originate").html(language('Originate'));
	$("#lang_originate_help").html(language('Originate help@adv-astapi','Permission to originate new calls.  Write-only.'));
	$("#lang_all").html(language('All'));
	$("#lang_all_help").html(language('All help@adv-astapi','Select all or deselect all.'));
	/* General end */
	
	/* other info */
	$("#general_li").text(language('General'));
	$("#manager_li").text(language('Manager'));
	$("#rights_li").text(language('Rights'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());
	

function astapi_show(general_data){
	var read = [];
	read['all'] = false;
	var all_flag = 1;
	for(var i=0;i<general_data['_read'].length;i++){
		if(general_data['_read'][i] == 1){
			var temp = true;
		}else{
			if(i!=4 && i!=12){
				all_flag = 0;
			}
			var temp = false;
		}
		switch(i){
			case 0:
				read['system'] = temp;
				break;
			case 1:
				read['call'] = temp;
				break;
			case 2:
				read['log'] = temp;
				break;
			case 3:
				read['verbose'] = temp;
				break;
			case 4:
				read['command'] = temp;
				break;
			case 5:
				read['agent'] = temp;
				break;
			case 6:
				read['user'] = temp;
				break;
			case 7:
				read['config'] = temp;
				break;
			case 8:
				read['dtmf'] = temp;
				break;
			case 9:
				read['reporting'] = temp;
				break;
			case 10:
				read['cdr'] = temp;
				break;
			case 11:
				read['dialplan'] = temp;
				break;
			case 12:
				read['originate'] = temp;
				break;
		}
	}
	if(all_flag){
		read['all'] = true;
	}
	
	var write = [];
	write['all'] = false;
	all_flag = 1;
	for(var i=0;i<general_data['_write'].length;i++){
		if(general_data['_write'][i] == 1){
			var temp = true;
		}else{
			if(i!=8 && i!=10 && i!= 11){
				all_flag = 0;
			}
			var temp = false;
		}
		switch(i){
			case 0:
				write['system'] = temp;
				break;
			case 1:
				write['call'] = temp;
				break;
			case 2:
				write['log'] = temp;
				break;
			case 3:
				write['verbose'] = temp;
				break;
			case 4:
				write['command'] = temp;
				break;
			case 5:
				write['agent'] = temp;
				break;
			case 6:
				write['user'] = temp;
				break;
			case 7:
				write['config'] = temp;
				break;
			case 8:
				write['dtmf'] = temp;
				break;
			case 9:
				write['reporting'] = temp;
				break;
			case 10:
				write['cdr'] = temp;
				break;
			case 11:
				write['dialplan'] = temp;
				break;
			case 12:
				write['originate'] = temp;
				break;
		}
	}
	if(all_flag){
		write['all'] = true;
	}
	
	var name = general_data['_username'];
	var secret = general_data['_secret'];
	var deny = general_data['_deny'];
	deny = deny.substring(0,deny.length-1);
	var permit = general_data['_permit'];
	permit = permit.substring(0,permit.length-1);
	
	/* General begin */
	//checked
	if(general_data['_enabled']==1){var _enable_ami_checked = true;}else{var _enable_ami_checked = false;}
	document.getElementById('enable_ami').checked = _enable_ami_checked;
	/* General end */
	
	/* Manager begin */
	//value
	document.getElementById('name').value = name;
	document.getElementById('secret').value = secret;
	document.getElementById('deny').value = deny;
	document.getElementById('permit').value = permit;
	/* Manager end */
	
	/* Rights begin */
	//checked
	document.getElementById('system_r').checked = read['system'];
	document.getElementById('system_w').checked = write['system'];
	document.getElementById('call_r').checked = read['call'];
	document.getElementById('call_w').checked = write['call'];
	document.getElementById('log_r').checked = read['log'];
	document.getElementById('log_w').checked = write['log'];
	document.getElementById('verbose_r').checked = read['verbose'];
	document.getElementById('verbose_w').checked = write['verbose'];
	document.getElementById('command_w').checked = write['command'];
	document.getElementById('agent_r').checked = read['agent'];
	document.getElementById('agent_w').checked = write['agent'];
	document.getElementById('user_r').checked = read['user'];
	document.getElementById('user_w').checked = write['user'];
	document.getElementById('config_r').checked = read['config'];
	document.getElementById('config_w').checked = write['config'];
	document.getElementById('dtmf_r').checked = read['dtmf'];
	document.getElementById('reporting_r').checked = read['reporting'];
	document.getElementById('reporting_w').checked = write['reporting'];
	document.getElementById('cdr_r').checked = read['cdr'];
	document.getElementById('dialplan_r').checked = read['dialplan'];
	document.getElementById('originate_w').checked = write['originate'];
	document.getElementById('all_r').checked = read['all'];
	document.getElementById('all_w').checked = write['all'];
	/* Rights end */
}

object.AGAdvAstapiGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var general_data = data_temp['_general'];
	
	header(data_temp['_combuf']);
	astapi_show(general_data);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				astapi_save();
			}
		}
	});
	
}

function error_back(data){
	window.location.href = 'error.html';
}
/**************************SHOW ADV ASTAPI END**************************/


/**************************SAVE ADV ASTAPI BRGIN**************************/
function astapi_save(){
	var advastgeneral = new AST_AdvAstGeneral();
	
	var enabled_val = document.getElementById('enable_ami').checked;
	if(enabled_val == true){
		var enabled = 1;
	}else{
		var enabled = 0;
	}
	advastgeneral._enabled = enabled;
	var name = document.getElementById('name').value;
	advastgeneral._username = name;
	var secret = document.getElementById('secret').value;
	advastgeneral._secret = secret;
	var deny = document.getElementById('deny').value;
	advastgeneral._deny = deny;
	var permit = document.getElementById('permit').value;
	advastgeneral._permit = permit;
	
	var read = '';
	if(document.getElementById('system_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('call_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('log_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('verbose_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('command_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('agent_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('user_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('config_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('dtmf_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('reporting_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('cdr_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('dialplan_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	if(document.getElementById('originate_r').checked == true){
		read += '1';
	}else{
		read += '0';
	}
	advastgeneral._read = read;
	
	var write = '';
	if(document.getElementById('system_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('call_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('log_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('verbose_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('command_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('agent_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('user_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('config_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('dtmf_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('reporting_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('cdr_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('dialplan_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	if(document.getElementById('originate_w').checked == true){
		write += '1';
	}else{
		write += '0';
	}
	advastgeneral._write = write;
	
	var AdvAstSave = new AST_AdvAstSave();
	AdvAstSave._general = advastgeneral;
		
	object.AGAdvAstapiSave(save_succeed_back, save_error_back, AdvAstSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-astapi.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/**************************SAVE ADV ASTAPI END**************************/