function onload_show(){
	$(':checkbox').iButton(); 
	if(document.getElementById('sys_log_autoclean_sw').checked == false){
		document.getElementById('sys_log_maxsize').disabled = true;
	}
	if(document.getElementById('ast_log_autoclean_sw').checked == false){
		document.getElementById('ast_log_maxsize').disabled = true;
	}
	if(document.getElementById('sip_log_autoclean_sw').checked == false){
		document.getElementById('sip_log_maxsize').disabled = true;
	}
	if(document.getElementById('cdr_log_autoclean_sw').checked == false){
		document.getElementById('cdr_log_maxsize').disabled = true;
	}
	if(document.getElementById('dahdi_log_autoclean_sw').checked == false){
		document.getElementById('dahdi_log_maxsize').disabled = true;
	}
	$('#dahdi_log_autoclean_sw').change(function(){$('#dahdi_log_maxsize').attr('disabled', !$('#dahdi_log_autoclean_sw').attr('checked'));});
	$('#cdr_log_autoclean_sw').change(function(){$('#cdr_log_maxsize').attr('disabled', !$('#cdr_log_autoclean_sw').attr('checked'));});
	$('#sys_log_autoclean_sw').change(function(){$('#sys_log_maxsize').attr('disabled', !$('#sys_log_autoclean_sw').attr('checked'));});
	$('#ast_log_autoclean_sw').change(function(){$('#ast_log_maxsize').attr('disabled', !$('#ast_log_autoclean_sw').attr('checked'));});
	$('#sip_log_autoclean_sw').change(function(){$('#sip_log_maxsize').attr('disabled', !$('#sip_log_autoclean_sw').attr('checked'));});
}

function check(){
	var serverip = document.getElementById('serverip').value;
	if(serverip.length > 32){
		alert('No more than 32 characters');
		return false;
	}
	
	var serverport = document.getElementById('serverport').value;
	var rex=/^[0-9]+$/i;
	if(!rex.test(serverport)) {
		alert('Only can be Number');
		return false;
	}
	
	return true;
}
/***********************************************************************************/

/****************************SHOW LOG SETTINGS BEGIN*******************************/
(function(){
	$("#lang_system_logs").html(language('System Logs'));
	$("#lang_system_logs_help").html(language('System Logs help','Whether enable or disable system log.'));
	$(".lang_auto_clean").html(language('Auto clean'));
	$(".lang_auto_clean_help").html(language('Auto clean help','switch on : when the size of log file reaches the max size, <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; the system will cut a half of the file. New logs will be retained.<br>switch off : logs will remain, and the file size will increase gradually. <br>'));
	$(".lang_auto_clean_default").html(language('Auto clean default@System Logs','default on, default size=1MB.'));
	$(".lang_auto_clean_default_asterisk").html(language('Auto clean default@Asterisk Logs','default on, default size=100KB.'))
	$(".lang_auto_clean_default_sip").html(language('Auto clean default@SIP Logs','default on, default size=100KB.'))
	$(".lang_auto_clean_default_cdr").html(language('Auto clean default@Call Detail Record','default on, default size=5MB.'))
	$(".lang_maxsize").html(language('maxsize'));
	$("#lang_verbose").html(language('Verbose'));
	$("#lang_verbose_help").html(language('Asterisk Logs Verbose help','Asterisk console verbose message switch.'));
	$("#lang_notice").html(language('Notice'));
	$("#lang_notice_help").html(language('Asterisk Logs Notice help','Asterisk console notice message  switch.'));
	$("#lang_warning").html(language('Warning'));
	$("#lang_warning_help").html(language('Asterisk Logs Warning help','Asterisk console warning message  switch.'));
	$("#lang_debug").html(language('Debug'));
	$("#lang_debug_help").html(language('Asterisk Logs Debug help','Asterisk console debug message switch.'));
	$("#lang_error").html(language('Error'));
	$("#lang_error_help").html(language('Asterisk Logs Error help','Asterisk console error message  switch.'));
	$("#lang_dtmf").html(language('DTMF'));
	$("#lang_dtmf_help").html(language('Asterisk Logs DTMF help','Asterisk console DTMF info switch.'));
	$("#lang_sip_logs").html(language('SIP Logs'));
	$("#lang_sip_logs_help").html(language('SIP Logs help','Whether enable or disable SIP log.'));
	
	$(".lang_cdr").html(language('Call Detail Record'));
	$('#lang_cdr_help').html(language('Call Detail Record help','Displaying Call Detail Records for each channel.'));
	$(".lang_dahdi_logs").html(language('DAHDI Logs'));
	$("#lang_dahdi_logs_help").html(language('DAHDI Logs help','Whether enable or disable DHADI log.'));
	$("#lang_auto_clean_dahdi").html(language('Auto clean default@DAHDI Logs','default on, default size=2MB.'));
	
	$(".lang_syslog").html(language('Syslog'));
	$("#lang_local_syslog").html(language('Local Syslog'));
	$("#lang_local_syslog_help").html(language('Local Syslog help', 'This action needs to set the Asterisk log level in the log, and then turn on the local Syslog to take effect.'));
	$("#lang_server_address").html(language('Server Address'));
	$("#lang_server_address_help").html(language('Server Address help','Server Address'));
	$("#lang_server_port").html(language('Server Port'));
	$("#lang_server_port_help").html(language('Server Port help','Server Port'));
	$("#lang_klog_level").html(language('Klog Level'));
	$("#lang_klog_level_help").html(language('Klog Level help','Klog Level'));
	$("#lang_cdr_level").html(language('CDR Level'));
	$("#lang_cdr_level_help").html(language('CDR Level help','CDR Level'));
	
	/* other info */
	$("#system_logs_li").html(language('System Logs'));
	$("#asterisk_logs_li").html(language('Asterisk Logs'));
	$("#sip_logs_lli").html(language('SIP Logs'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function log_show(log_data, mon_data, gw_data, syslog){
	if(log_data != null){
		var temp = log_data.split(',');
	}else{
		var temp = [];
	}
	for(var item in temp){
		if(temp[item] == 'verbose'){
			document.getElementById('verbose_sw').checked = true;
		}
		
		if(temp[item] == 'notice'){
			document.getElementById('notice_sw').checked = true;
		}
		
		if(temp[item] == 'warning'){
			document.getElementById('warning_sw').checked = true;
		}
		
		if(temp[item] == 'debug'){
			document.getElementById('debug_sw').checked = true;
		}
		
		if(temp[item] == 'error'){
			document.getElementById('error_sw').checked = true;
		}
		
		if(temp[item] == 'dtmf'){
			document.getElementById('dtmf_sw').checked = true;
		}
	}
	
	for(var item in mon_data){
		if(mon_data[item]['_section'] == 'sys_log'){
			if(mon_data[item]['_autocleansw'] == 0){
				document.getElementById('sys_log_autoclean_sw').checked = true;
			}
			document.getElementById('sys_log_maxsize').value = mon_data[item]['_maxsize'];
		}else if(mon_data[item]['_section'] == 'ast_log'){
			if(mon_data[item]['_autocleansw']==0){
				document.getElementById('ast_log_autoclean_sw').checked = true;
			}
			document.getElementById('ast_log_maxsize').value = mon_data[item]['_maxsize'];
		}else if(mon_data[item]['_section'] == 'sip_log'){
			if(mon_data[item]['_autocleansw'] == 0){
				document.getElementById('sip_log_autoclean_sw').checked = true;
			}
			document.getElementById('sip_log_maxsize').value = mon_data[item]['_maxsize'];
		}else if(mon_data[item]['_section'] == 'cdr_log'){
			if(mon_data[item]['_autocleansw'] == 0){
				document.getElementById('cdr_log_autoclean_sw').checked = true;
			}
			document.getElementById('cdr_log_maxsize').value = mon_data[item]['_maxsize'];
		}else if(mon_data[item]['_section'] == 'dahdi_log'){
			if(mon_data[item]['_autocleansw'] == 0){
				document.getElementById('dahdi_log_autoclean_sw').checked = true;
			}
			document.getElementById('dahdi_log_maxsize').value = mon_data[item]['_maxsize'];
		}
	}
	
	for(var item in gw_data){
		if(gw_data[item]['_section'] == 'sys-log'){
			if(gw_data[item]['_rswitch'] == 0){
				document.getElementById('sys_log_sw').checked = true;
			}
		}else if(gw_data[item]['_section'] == 'cdr'){
			if(gw_data[item]['_rswitch'] == 0){
				document.getElementById('cdr_sw').checked = true;
			}
		}else if(gw_data[item]['_section'] == 'sip-log'){
			if(gw_data[item]['_rswitch'] == 0){
				document.getElementById('sip_log_sw').checked = true;
			}
		}else if(gw_data[item]['_section'] == 'dahdi-log'){
			if(gw_data[item]['_rswitch'] == 0){
				document.getElementById('dahdi_log_sw').checked = true;
			}
		}
	}
	
	//syslog
	if(syslog['_syslogsw'] == 1){
		document.getElementById('local_sys').checked = true;
	}
	
	document.getElementById('serverip').value = syslog['_serverip'];
	
	document.getElementById('serverport').value = syslog['_serverport'];
	
	if(syslog['_sysloglevel'] == 0){
		var sysloglevel = 'emerg';
	}else if(syslog['_sysloglevel'] == 1){
		var sysloglevel = 'alert';
	}else if(syslog['_sysloglevel'] == 2){
		var sysloglevel = 'crit';
	}else if(syslog['_sysloglevel'] == 3){
		var sysloglevel = 'error';
	}else if(syslog['_sysloglevel'] == 4){
		var sysloglevel = 'warning';
	}else if(syslog['_sysloglevel'] == 5){
		var sysloglevel = 'notice';
	}else if(syslog['_sysloglevel'] == 6){
		var sysloglevel = 'info';
	}else if(syslog['_sysloglevel'] == 7){
		var sysloglevel = 'debug';
	}
	document.getElementById('sysloglevel').value = sysloglevel;
	
	if(syslog['_cdrlevel'] == 0){
		var cdrlevel = 'off';
	}else if(syslog['_cdrlevel'] == 1){
		var cdrlevel = 'emerg';
	}else if(syslog['_cdrlevel'] == 2){
		var cdrlevel = 'alert';
	}else if(syslog['_cdrlevel'] == 3){
		var cdrlevel = 'crit';
	}else if(syslog['_cdrlevel'] == 4){
		var cdrlevel = 'error';
	}else if(syslog['_cdrlevel'] == 5){
		var cdrlevel = 'warning';
	}else if(syslog['_cdrlevel'] == 6){
		var cdrlevel = 'notice';
	}else if(syslog['_cdrlevel'] == 7){
		var cdrlevel = 'info';
	}else if(syslog['_cdrlevel'] == 8){
		var cdrlevel = 'debug';
	}
	document.getElementById('cdrlevel').value = cdrlevel;
}

object.AGLogSettingsGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var gw_data = data_temp['_gw']['_item'];
	var log_data = data_temp['_log4gw'];
	var mon_data = data_temp['_monitor']['_item'];
	var syslog = data_temp['_sysklog'];
	
	header(data_temp['_combuf']);
	log_show(log_data, mon_data, gw_data, syslog);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				log_save(log_data);
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/****************************SHOW LOG SETTINGS END*******************************/


/****************************SAVE LOG SETTINGS BEGIN*******************************/
function log_save(){
	var LogSettingSave = new AST_LogSettingSave();
	
	/* gw.conf begin */
	var loggwcontextarr = new AST_LogGwContextArr();
	
	if(document.getElementById('sys_log_sw').checked == true){
		var sys_log_sw = 0;
	}else{
		var sys_log_sw = 1;
	}
	var sys_log = new AST_LogGwContext();
	sys_log._section = 'sys-log';
	sys_log._rswitch = sys_log_sw;
	loggwcontextarr._item.push(sys_log);
	
	if(document.getElementById('cdr_sw').checked == true){
		var cdr_sw_val = 0;
	}else{
		var cdr_sw_val = 1;
	}
	var cdr_sw = new AST_LogGwContext();
	cdr_sw._section = 'cdr';
	cdr_sw._rswitch = cdr_sw_val;
	loggwcontextarr._item.push(cdr_sw);
	
	if(document.getElementById('dahdi_log_sw').checked == true){
		var dahdi_log_sw = 0;
	}else{
		var dahdi_log_sw = 1;
	}
	var dahdi_sw = new AST_LogGwContext();
	dahdi_sw._section = 'dahdi-log';
	dahdi_sw._rswitch = dahdi_log_sw;
	loggwcontextarr._item.push(dahdi_sw);
	
	if(document.getElementById('sip_log_sw').checked == true){
		var sip_log_sw = 0;
	}else{
		var sip_log_sw = 1;
	}
	var sip_log = new AST_LogGwContext();
	sip_log._section = 'sip-log';
	sip_log._rswitch = sip_log_sw;
	loggwcontextarr._item.push(sip_log);
	
	LogSettingSave._gw = loggwcontextarr;
	/* gw.conf end */
	
	/* logger.conf begin */
	var log4gw_str = '';
	if(document.getElementById('notice_sw').checked == true){
		log4gw_str += 'notice,';
	}
	
	if(document.getElementById('warning_sw').checked == true){
		log4gw_str += 'warning,';
	}
	
	if(document.getElementById('error_sw').checked == true){
		log4gw_str += 'error,';
	}
	
	var debug_true = false;
	if(document.getElementById('debug_sw').checked == true){
		log4gw_str += 'debug,';
		debug_true = true;
	}
	
	var verbose_true = false;
	if(document.getElementById('verbose_sw').checked == true){
		log4gw_str += 'verbose,';
		verbose_true = true;
	}
	
	if(document.getElementById('dtmf_sw').checked == true){
		log4gw_str += 'dtmf,';
	}
	log4gw_str = log4gw_str.substring(0,log4gw_str.length-1);
	LogSettingSave._log4gw = log4gw_str;
	/* logger.conf end */
	
	var cfg = [];
	if(document.getElementById('sys_log_autoclean_sw').checked == true){
		cfg['sys_log_autoclean_sw'] = 0;
		cfg['sys_log_maxsize'] = document.getElementById('sys_log_maxsize').value;
	}else{
		cfg['sys_log_autoclean_sw'] = 1;
		cfg['sys_log_maxsize'] = document.getElementById('sys_log_maxsize').value;
	}
	
	if(document.getElementById('ast_log_autoclean_sw').checked == true){
		cfg['ast_log_autoclean_sw'] = 0;
		cfg['ast_log_maxsize'] = document.getElementById('ast_log_maxsize').value;
	}else{
		cfg['ast_log_autoclean_sw'] = 1;
		cfg['ast_log_maxsize'] = document.getElementById('ast_log_maxsize').value;
	}
	
	if(document.getElementById('sip_log_autoclean_sw').checked == true){
		cfg['sip_log_autoclean_sw'] = 0;
		cfg['sip_log_maxsize'] = document.getElementById('sip_log_maxsize').value;
	}else{
		cfg['sip_log_autoclean_sw'] = 1;
		cfg['sip_log_maxsize'] = document.getElementById('sip_log_maxsize').value;
	}
	
	if(document.getElementById('cdr_log_autoclean_sw').checked == true){
		cfg['cdr_log_autoclean_sw'] = 0;
		cfg['cdr_log_maxsize'] = document.getElementById('cdr_log_maxsize').value;
	}else{
		cfg['cdr_log_autoclean_sw'] = 1;
		cfg['cdr_log_maxsize'] = document.getElementById('cdr_log_maxsize').value;
	}
	
	if(document.getElementById('dahdi_log_autoclean_sw').checked == true){
		cfg['dahdi_log_autoclean_sw'] = 0;
		cfg['dahdi_log_maxsize'] = document.getElementById('dahdi_log_maxsize').value;
	}else{
		cfg['dahdi_log_autoclean_sw'] = 1;
		cfg['dahdi_log_maxsize'] = document.getElementById('dahdi_log_maxsize').value;
	}
	var log_array = ['sys_log', 'ast_log', 'sip_log', 'cdr_log', 'dahdi_log'];
	
	var LogMorContextArr = new AST_LogMorContextArr();
	for(var item in log_array){
		var logmorcontext = new AST_LogMorContext();
		logmorcontext._section = log_array[item];
		logmorcontext._autocleansw = cfg[log_array[item]+'_autoclean_sw'];
		logmorcontext._maxsize = cfg[log_array[item]+'_maxsize'];
		LogMorContextArr._item.push(logmorcontext);
	}
	LogSettingSave._monitor = LogMorContextArr;
	
	//syslog
	var LogGwSysklog = new AST_LogGwSysklog();
	
	if(document.getElementById('local_sys').checked == true){
		var local_sys = 1;
	}else{
		var local_sys = 0;
	}
	LogGwSysklog._syslogsw = local_sys;
	
	var serverip = document.getElementById('serverip').value;
	LogGwSysklog._serverip = serverip;
	
	var serverport = document.getElementById('serverport').value;
	LogGwSysklog._serverport = serverport;
	
	var sysloglevel = document.getElementById('sysloglevel').value;
	var sys_temp = 0;
	if(sysloglevel == 'emerg'){
		sys_temp = 0;
	}else if(sysloglevel == 'alert'){
		sys_temp = 1;
	}else if(sysloglevel == 'crit'){
		sys_temp = 2;
	}else if(sysloglevel == 'error'){
		sys_temp = 3;
	}else if(sysloglevel == 'warning'){
		sys_temp = 4;
	}else if(sysloglevel == 'notice'){
		sys_temp = 5;
	}else if(sysloglevel == 'info'){
		sys_temp = 6;
	}else if(sysloglevel == 'debug'){
		sys_temp = 7;
	}
	LogGwSysklog._sysloglevel = sys_temp;
	
	var cdrlevel = document.getElementById('cdrlevel').value;
	var cdr_temp = 0;
	if(cdrlevel == 'off'){
		cdr_temp = 0;
	}else if(cdrlevel == 'emerg'){
		cdr_temp = 1;
	}else if(cdrlevel == 'alert'){
		cdr_temp = 2;
	}else if(cdrlevel == 'crit'){
		cdr_temp = 3;
	}else if(cdrlevel == 'error'){
		cdr_temp = 4;
	}else if(cdrlevel == 'warning'){
		cdr_temp = 5;
	}else if(cdrlevel == 'notice'){
		cdr_temp = 6;
	}else if(cdrlevel == 'info'){
		cdr_temp = 7;
	}else if(cdrlevel == 'debug'){
		cdr_temp = 8;
	}
	LogGwSysklog._cdrlevel = cdr_temp;
	LogSettingSave._sysklog = LogGwSysklog;
	
	object.AGLogSettingsSave(save_succeed_back, save_error_back, LogSettingSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'log-settings.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/****************************SAVE LOG SETTINGS END*******************************/