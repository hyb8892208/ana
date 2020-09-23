function onload_show(){
	$("#enable").iButton();
	$("#dhcp_option_66").iButton();
	
	if($("#dhcp_option_66").attr('checked') == 'checked'){
		$("#auto_config_server_url").attr("disabled", true);
	}else{
		$("#auto_config_server_url").removeAttr("disabled");
	}
}

$("#dhcp_option_66").change(function(){
	if($(this).attr('checked') == 'checked'){
		$("#auto_config_server_url").attr("disabled", true);
		$("#dhcp_content").hide();
	}else{
		$("#auto_config_server_url").removeAttr("disabled");
		$("#dhcp_content").show();
	}
});

$("#enable").change(function(){
	if($(this).attr('checked') == 'checked'){
		$("#enable_content").show();
		if($("#dhcp_option_66").attr('checked') == 'checked'){
			$("#dhcp_content").hide();
		}else{
			$("#dhcp_content").show();
		}
	}else{
		$("#enable_content").hide();
		$("#dhcp_content").hide();
	}
});

function check(){
	var mode = document.getElementById('mode').value;
	var dhcp_option_66 = document.getElementById('dhcp_option_66').checked;
	if(mode == 0 || dhcp_option_66){
		if(!confirm(language('Power On confirm','Your Settings need to be rebooted to take effect!'))){
			return false;
		}
	}else if(mode == 1){
		if(!confirm(language('Immediately confirm','Your system will be upgraded immediately. Are you sure?'))){
			return false;
		}
	}
	
	return true;
}
/******************************************************************************************/
(function(){
	$("#lang_auto_provision_settings").html(language('Auto Provision Settings'));
	$("#lang_enable").html(language('Enable'));
	$("#lang_enable_help").html(language('Enable help','Enable'));
	$("#lang_dhcp_option_66").html(language('DHCP Option 66'));
	$("#lang_dhcp_option_66_help").html(language('DHCP Option 66 help','DHCP Option 66'));
	$("#lang_auto_config_server_url").html(language('Auto Config Server URL'));
	$("#lang_auto_config_server_url_help").html(language('Auto Config Server URL help','Auto Config Server URL'));
	$("#lang_upgrade_mode").html(language('Upgrade Mode'));
	$("#lang_upgrade_mode_help").html(language('Upgrade Mode help','Upgrade Mode'));
	$("#lang_power_on").html(language('Power On'));
	$("#lang_immediately").html(language('Immediately'));
	$(".lang_save").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_auto_provision(data_temp){
	var autoupdate = data_temp['_autoupdate'];
	
	var enable = autoupdate['_enable'] == 1 ? true : false;
	var dhcpoption66 = autoupdate['_dhcpoption66'] == 1 ? true : false;
	var serverurl = autoupdate['_serverurl'];
	var mode = autoupdate['_mode'];
	
	document.getElementById('enable').checked = enable;
	document.getElementById('dhcp_option_66').checked = dhcpoption66;
	document.getElementById('auto_config_server_url').value = serverurl;
	document.getElementById('mode').value = mode;
	
	if(!enable){
		$('#enable_content').hide();
		$('#dhcp_content').hide();
	}
	
	if(dhcpoption66){
		$('#dhcp_content').hide();
	}
}

object.AGSystemAutoUpdateGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_auto_provision(data_temp);
	footer();
	onload_show();
	
	$(".lang_save").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_auto_provision();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/******************************************************************************************/

/******************************************************************************************/
function save_auto_provision(){
	var AutoProvisionSave = new AST_AutoProvisionSave();
	
	var enable = document.getElementById('enable').checked ? 1 : 0;
	var dhcpoption66 = document.getElementById('dhcp_option_66').checked ? 1 : 0;
	var serverurl = document.getElementById('auto_config_server_url').value;
	var mode = document.getElementById('mode').value;
	if(dhcpoption66 == 1){
		mode = 0;
	}
	
	var AutoProvision = new AST_AutoProvision();
	AutoProvision._enable = enable;
	AutoProvision._dhcpoption66 = dhcpoption66;
	AutoProvision._serverurl = serverurl;
	AutoProvision._mode = mode;
	
	AutoProvisionSave._autoupdate = AutoProvision
	
	object.AGSystemAutoUpdateSave(save_succeed_back, save_error_back, AutoProvisionSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-autoprovision.html?save=true';
	}
}

function save_error_back(){
	save_click_flag = 0;
	alert(language('save failed'));
}