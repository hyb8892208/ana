var g_bAllowFile = false;

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
		filesize = obj.files[0].fileSize;  
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

	if(filesize > 1000*1000*50) {
		alert("Uploaded max file is 50M!");
		g_bAllowFile = false;
		return false;
	}

	g_bAllowFile = true;
	return true;
} 

function isAllowFile(file_id)
{
	var x = document.getElementById(file_id).value;
	if(x=="")
	{
		alert(language('Select File alert','Please select your file first!'));
		return false;
	}

	if(g_bAllowFile)
		return true;

	alert("Uploaded max file is 50M!");
	return false;
}

function update_system_online_step1(){
	document.getElementById('showmsg').value = 'Getting information...';
	$("#update_online_dg").attr("title",language('Update Online Information'));
	
	$( "#update_online_dg" ).dialog({
		resizable: false,
		height:400,
		width:500,
		modal: true,
		buttons: [
			{
				text:language("Change Log"),
				id:"change_log",
				click:function(){
					update_system_online_step2();
				}
			},
			{
				text:language('Detailed'),
				id:"detailed",
				click:function(){
					update_system_online_step3();
				}
			},
			{
				text:language('Update Online Now'),
				id:"button_online_now",
				click:function(){
					if(system_online_update_click_one == 0){
						$( this ).dialog( "close" );
						
						var report = language('Report');
						var _system_update = language('System Update');
						var str = language('System Updating')+'......<br>'+'<img src="/images/loading1.gif" />';
						$("#restore_configuration").after(
							'<br>'+
							'<b>'+report+'</b>'+
							'<table style="width:100%;font-size:12px;border:1px solid rgb(59,112,162);">'+
								'<tr style="background-color:#D0E0EE;height:26px;">'+
									'<td align="center" style="width:100%">'+
										'<b>'+_system_update+'</b>'+
									'</td>'+
								'</tr>'+
								'<tr align="left" style="background-color: rgb(232, 239, 247);">'+
									'<td id="online_str_tip">'+
										str+
									'</td>'+
								'</tr>'+
							'</table>'
						);
						object.AGSystemToolsUpdateOnline(online_succeed_back, online_error_back);
						system_online_update_click_one = 1;
					}else{
						alert('The system is upgrading.');
					}
				}
			},
			{
				text:language('Cancel'),
				id:"cancel",
				click:function(){
					$( this ).dialog( "close" );
				}
			}
		]
	});

	object.AGSystemToolsGetFirmwareInfo(ver_succeed_back, ver_error_back, 'current-version.txt');
}
function ver_succeed_back(data){
	var temp = data['_result'].split('/');
	var current_version = $.trim(temp[0]);
	var versionnum = $.trim(temp[1]);
	
	if(versionnum == ''){
		document.getElementById('showmsg').value = language('System Online Update version error','Get remote version failed. Please check the network connection is correct!');
		return;
	} else {
		document.getElementById('showmsg').value = language('System version help 1',"Your system current version is :")+ current_version +"\n"+ language('System version help 2',"The newest system version is :") + versionnum + "\n"+ language('System Online Update confirm',"Use caution, please : This might damage the structure of your original configuration files.\n\nDo you want to update your system?\n");
		return;
	}
}
function ver_error_back(data){
	document.getElementById('showmsg').value = language('System Online Update version error','Get remote version failed. Please check the network connection is correct!');
}

function update_system_online_step2(){
	object.AGSystemToolsGetFirmwareInfo(cur_succeed_back, cur_error_back, 'current-changelog.txt');

	document.getElementById('showmsg').value = 'Getting information...';
}
function cur_succeed_back(data){
	if(data['_result'] != ''){
		document.getElementById('showmsg').value = data['_result'];
	}else{
		document.getElementById('showmsg').value = "Can't get change log.";
	}
}
function cur_error_back(data){
	document.getElementById('showmsg').value = "Can't get change log.";
}

function update_system_online_step3(){
	object.AGSystemToolsGetFirmwareInfo(change_succeed_back, change_error_back, 'ChangeLog.txt');
	
	document.getElementById('showmsg').value = 'Getting information...';
}
function change_succeed_back(data){
	if(data['_result'] != ''){
		document.getElementById('showmsg').value = data['_result'];
	}else{
		document.getElementById('showmsg').value = "Can't get detial change log.";
	}
}
function change_error_back(data){
	document.getElementById('showmsg').value = "Can't get detial change log.";
}

function upload_cfg_file2(){
	if(!isAllowFile('upload_cfg_file')) {
		return false;
	}

	if( ! confirm(language('File Upload confirm','Are you sure to upload configuration files?\nThis will damage the structure of your original configuration files.')) ) {
		return false;
	}

	return true;
}

/************************************SHOW SYSTEM TOOLS BEGIN*****************************/
function lang_show(){
	/* Reboot Tools begin */
	$("#lang_system_reboot_help").html(language('System Reboot help','Reboot the gateway and all the current calls will be dropped.'));
	$("#lang_asterisk_reboot_help").html(language('Asterisk Reboot help','Reboot the asterisk and all the current calls will be dropped.'));
	$("#lang_system_switch_help").html(language('System Reboot help','Reboot the gateway and all the current calls will be dropped.'));
	$("#system_reboot").val(language('System Reboot'));
	$("#asterisk_reboot").val(language('Asterisk Reboot'));
	$("#system_switch").val(language('System Switch'));
	/* Reboot Tools end */
	
	/* Upload Configuration begin */
	$("#lang_new_configuration_file").html(language('New configuration file'));
	$("#file_upload").val(language('File Upload'));
	$("#update_system").val(language('System Update'));
	/* Upload Configuration end */
	
	$("#lang_new_system_file").html(language('New system file'));
	
	/* Backup Configuration begin */
	$("#lang_current_configuration_file_version").html(language('Current configuration file version'));
	$("#lang_download_backup").val(language('Download Backup'));
	/* Backup Configuration end */
	
	/* Voice Recode begin */
	$("#voice_recode_li").html(language('Voice Record'));
	$("#lang_voice_select_channel").html(language('Voice Record help','Select a module to recode voice.'));
	$("#voice_start").val(language('Start Recording'));
	/* Voice Recode end */
	
	/* Restore Configuration begin */
	$("#lang_factory_reset_help").html(language('Factory Reset help','This will cause all the configuration files to back to default factory values! And reboot your gateway once it finishes.'));
	$("#factory_reset").val(language('Factory Reset'));
	/* Restore Configuration end */
	
	/* Restore System begin */
	$("#lang_restore_system_help").html(language('Restore System help','Restoring the system will cause all configuration files to be restored to the default factory value. CDR logs and system logs can be selected to clear!And reboot your gateway once it finishes.'));
	$("#restore_system").val(language('Restore System'));
	/* Restore System end */
	
	/* other info */
	$("#reboot_tools_li").text(language('Reboot Tools'));
	$("#update_firmware_li").text(language('Update Firmware'));
	$("#upload_configuration_li").text(language('Upload Configuration'));
	$("#backup_configuration_li").text(language('Backup Configuration'));
	$("#restore_configuration_li").text(language('Restore Configuration'));
	$("#restore_system_li").text(language('Restore System'));
}
lang_show();

function tools_show(cfg_version){
	/* Update Firmware begin */
	if(_Define['system_type']=='openvox'){
		$("#update_online_dg").after(
			"<table width='100%' class='tctl' >"+
				"<tr>"+
					"<th>"+
						language('System Online Update help','New system file is downloaded from official website and update system.')+
					"</th>"+
					"<td>"+
						"<input type='button' class='save_input' id='online_update_button' value='"+language('System Online Update')+"' />"+
					"</td>"+
				"</tr>"+
			"</table>"
		);
	}
	/* Update Firmware end */
	
	/* Backup Configuration begin */
	$("#cfg_version").append(cfg_version);
	/* Backup Configuration end */
	
	//prevent form submit
	$("#update_system").click(function(){
		$("#update_sys_file").after("<img src='/images/loading1.gif' />");
		object.AGSystemCloseAllservice(succeed_close_back, error_close_back);
	});
}

var url = get_url_para();

if(url['type'] != ''){
	var _type = url['type'];
}else{
	var _type = '';
}

if(url['tip'] != ''){
	var _tip = url['tip'];
}else{
	var _tip = '';
}

object.AGSystemToolGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var cfg_version = data_temp['_tool']['_cfgversion'];
	var channels = data_temp['_tool']['_channels']['_item'];
	var stacknum = data_temp['_tool']['_stacknum'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	tools_show(cfg_version);
	footer();
	
	//demo_enable
	if(document.getElementById('system_reboot') != null)
		document.getElementById('system_reboot').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('asterisk_reboot') != null)
		document.getElementById('asterisk_reboot').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('update_sys_file') != null)
		document.getElementById('update_sys_file').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('update_system') != null)
		document.getElementById('update_system').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('online_update_button') != null)
		document.getElementById('online_update_button').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('upload_cfg_file') != null)
		document.getElementById('upload_cfg_file').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('file_upload') != null)
		document.getElementById('file_upload').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('lang_download_backup') != null)
		document.getElementById('lang_download_backup').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('factory_reset') != null)
		document.getElementById('factory_reset').disabled = demo_enable == 1 ? true : false;
	if(document.getElementById('restore_system') != null)
		document.getElementById('restore_system').disabled = demo_enable == 1 ? true : false;
	
	//system_reboot
	$("#system_reboot").click(function(){
		var ret = confirm(language('System Reboot confirm','Are you sure to reboot your gateway now?\nYou will lose all data in memory!'));
		if(ret){
			if(system_reboot_click_one == 0){
				system_reboot();
				system_reboot_click_one = 1;
			}else{
				alert('The system is rebooting.');
			}
		}
	});
	
	//asterisk_reboot
	$("#asterisk_reboot").click(function(){
		var ret = confirm(language('Asterisk Reboot confirm','Are you sure to reboot Asterisk now?'));
		if(ret){
			if(asterisk_reboot_click_one == 0){
				asterisk_reboot();
				asterisk_reboot_click_one = 1;
			}else{
				alert('Asterisk has been rebooted.');
			}
		}
	});
	
	//system switch
	$("#system_switch").click(function(){
		var ret = confirm(language('System Switch confirm','Are you sure to switch System now?'));
		if(ret){
			if(system_switch_click_one == 0){
				system_switch();
				system_switch_click_one = 1;
			}else{
				alert('System has been switched');
			}
		}
	});
	
	//factory_reset
	$("#factory_reset").click(function(){
		var ret = confirm(language('Factory Reset confirm','Are you sure to restore configuration file now?'));
		if(ret){
			if(factory_reset_click_one == 0){
				factory_reset(stacknum);
				factory_reset_click_one = 1;
			}else{
				alert('Factory reset is running.');
			}
		}
	});
	
	//restore_system
	$("#restore_system").click(function(){
		$("#modal-51").show();
		$(".modal-backdrop").show();
		$(".modal-title").html(language('Configuration Restore'));
		
		$(".modal-body").css("min-height","100px");
		$(".modal-body").html('<table width="85%" style="font-size:12px;" align="center">'+
			'<tr>'+
				'<td colspan=4><span style="margin-bottom:10px;font-size:16px;display:inline-block;">'+language('Restore System clear', 'Please select the data to be cleaned up:')+'</span></td>'+
			'</tr>'+
			'<tr>'+
				'<td><input type="checkbox" class="sel_one" id="cdr_db" checked />CDR</td>'+
				'<td><input type="checkbox" class="sel_one" id="syslog" checked />'+language('SYSLOG')+'</td>'+
			'</tr>'+
		'</table><br/><br/><br/>');
		
		$(".modal-body").append('<div class="modal-footer">'+
			'<button type="button" id="button_cancel" class="btn btn-default cancel_input" style="margin-right:15px;">'+language('Close')+'</button>'+
			'<button class="btn btn-info save_input" id="restore_system_id" type="button" >'+language('Restore System')+'</button>'+
		'</div>');
	});
	
	$(document).on('click','#restore_system_id',function(){
		var ret = confirm(language('Factory Reset confirm','Are you sure to restore configuration file now?'));
		
		if(document.getElementById('cdr_db').checked){
			var cdr_db = 1;
		}else{
			var cdr_db = 0;
		}
		
		if(document.getElementById('syslog').checked){
			var syslog = 1;
		}else{
			var syslog = 0;
		}
		
		if(ret){
			if(factory_reset_click_one == 0){
				restore_system(stacknum,cdr_db,syslog);
				factory_reset_click_one = 1;
			}else{
				alert('Factory reset is running');
			}
		}
	});
	
	//system update
	if(_type == 'system_update'){
		system_update();
	}
	
	//file upload
	$("#file_upload").click(function(){
		if(upload_cfg_file2()){
			file_upload();
		}else{
			return false;
		}
	});
	if(_type == 'file_upload'){
		file_upload();
	}
	
	//system update online
	$("#online_update_button").click(function(){
		update_system_online_step1();
	});
	
	//voice start
	$("#voice_start").click(function(){
		var voice_port = document.getElementById('voice_port').value;
		if(voice_port == undefined || voice_port == ""){
			alert("Please select a module first.");
			return false;
		}
		
		object.AGUcpSystemToolsSndRecordStart(start_success_back, start_error_back, voice_port);
	});
	var option_str = '';
	for(var i=0;i<channels.length;i++){
		if(channels[i]['_signalling'] == 1){
			var port_name = 'FXS-'+channels[i]['_channel'];
		}else{
			var port_name = 'FXO-'+channels[i]['_channel'];
		}
		option_str += '<option value="'+channels[i]['_channel']+'">'+port_name+'</option>';
	}
	$("#voice_port").append(option_str);
}

function error_back(data){
	window.location.href = 'error.html';
}

function succeed_close_back(data){
	if(data['_result'] == 0){
		var file_val = $("#update_sys_file").val();
		if(file_val != ''){
			if(system_update_click_one == 0){
				system_update();
				system_update_click_one = 1;
				return true;
			}else{
				alert('The system has been updated.');
				return false;
			}
		}else{
			alert(language('Select File alert','Please select your file first!'));
			return false;
		}
	}else{
		alert('Close service error,please try again.');
	}
}

function error_close_back(data){
	alert('Close Service Error');
}
/************************************SHOW SYSTEM TOOLS END*****************************/


/************************************System Reboot BEGIN*****************************/
var system_reboot_click_one = 0;
function system_reboot(){
	$("#modal-51").show();
	$(".modal-backdrop").show();
	$(".modal-title").html(language('System Reboot'));
	$(".modal-body").html(language('System Reboot')+'......<img src="/images/loading1.gif" /><br>');
	
	object.AGSystemToolsSystemReboot(reboot_succeed_back, reboot_error_back);
}

function reboot_succeed_back(data){
	$(".modal-body").html(language('System Reboot wait','System Rebooting...<br>Please wait for about 180s, system will be rebooting.')+"<br/><img src='/images/loading.gif' />");
	
	setTimeout("check_network()",10000);
}

function reboot_error_back(data){
	$(".modal-body").html(language('System Reboot wait','System Rebooting...<br>Please wait for about 180s, system will be rebooting.')+"<br/><img src='/images/loading.gif' />");
	
	setTimeout("check_network()",10000);
}

function check_network(){
	$.ajax({
		type : 'GET',
		url : '/service?action=reboot',
		data : 'type=111',
		success : function(data){//data == 1
			if(data == 1){
				window.location.href = 'system-status.html';
			}
		},
		error : function(data){
			setTimeout("check_network()", 1000);
		}
	});
}

/************************************System Reboot END*****************************/



/************************************Asterisk Reboot BEGIN*****************************/
var asterisk_reboot_click_one = 0;
function asterisk_reboot(){
	$("#modal-51").show();
	$(".modal-backdrop").show();
	$(".modal-title").html(language('Asterisk Reboot'));
	$(".modal-body").html(language('Asterisk Reboot')+'......<img src="/images/loading1.gif" /><br>');
	
	object.AGSystemToolsAsteriskReboot(asterisk_succeed_back, asterisk_error_back);
}

function asterisk_succeed_back(data){
	if(data['_result'] == 0){
		$(".modal-body").html(language('Asterisk Reboot Succeeded')+"<div style='text-align:center;margin-top:30px;'><button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Close')+"</button></div>");
		
	}else{
		$(".modal-body").html(language('Asterisk Reboot Failed')+"<div style='text-align:center;margin-top:30px;'><button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Close')+"</button></div>");
		
		asterisk_reboot_click_one = 0;
	}
}

function asterisk_error_back(data){
	asterisk_reboot_click_one = 0;
	$(".modal-body").html(language('Asterisk Reboot Failed')+"<div style='text-align:center;margin-top:30px;'><button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Close')+"</button></div>");
}
/************************************Asterisk Reboot END*****************************/


/************************************System Switch BEGIN*****************************/
var system_switch_click_one = 0;
function system_switch(){
	$("#modal-51").show();
	$(".modal-backdrop").show();
	$(".modal-title").html(language('System Switch'));
	$(".modal-body").html(language('System Switch')+'....<img src="/images/loading1.gif" /><br>');
	
	object.AGSystemToolsSystemSwitch(switch_succeed_back, switch_error_back);
}

function switch_succeed_back(data){
	if(data['_result'] == 0){
		$(".modal-body").html(
			language('System Switch Succeeded')+'<br/>'+
			language('System Update Succeeded help','You must reboot system to entry the newer system.')+'<br/>'+
			"<div style='text-align:center;margin-top:30px;'>"+language('System Count Dowm','The system will be restarted automatically after 10 seconds countdown')+": &nbsp<span id='update_time'>10</span>"+language('Second')+"<button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Cancel')+"</button></div>"
		);
		settime(10);
	}else{
		$(".modal-body").html(language('System Switch Failed')+"<div style='text-align:center;margin-top:30px;'><button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Close')+"</button></div>");
		system_switch_click_one = 0;
	}
}

function switch_error_back(data){
	system_switch_click_one = 0;
	$(".modal-body").html(language('System Switch Failed')+"<div style='text-align:center;margin-top:30px;'><button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Close')+"</button></div>");
}

$(document).on('click','#button_cancel',function(){
	$("#modal-51").hide();
	$(".fade_in").hide();
});

function settime(update_time){
	update_time--;
	$("#update_time").text(update_time);
	var f = setTimeout(
		function(){
			settime(update_time);
		}
	,1000);
	
	$(document).on('click','#button_cancel',function(){
		$("#modal-51").hide();
		$(".fade_in").hide();
		clearTimeout(f);
	});
	
	if(update_time <= 0){
		$(".modal-body").html(language('System Reboot wait','System Rebooting...<br>Please wait for about 60s, system will be rebooting.')+"<br/><img src='/images/loading.gif' />");
		
		object.AGSystemToolsSystemReboot(reboot_succeed_back, reboot_error_back);//reboot
		
		clearTimeout(f);
	}
}
/************************************System Switch END*****************************/


/************************************System Update BEGIN*****************************/
var system_update_click_one = 0;
function system_update(){
	$("#modal-51").show();
	$(".modal-backdrop").show();
	
	if(_type == 'system_update'){
		if(_tip == 'true'){
			$(".modal-title").html(language('System Update')); 
			$(".modal-body").html(language('System Updating')+'....<img src="/images/loading1.gif" /><br>');
			object.AGSystemToolsUpdatefireware(fileware_succeed_baek, fileware_error_back);
		}else{
			$(".modal-title").html(language('System Update'));
			$(".modal-body").html(language('System Update Failed')+"<div style='text-align:center;margin-top:30px;'><button id='button_cancel' type='button' style='margin-left:10px;'>"+language('Close')+"</button></div>");
		}
	}else{
		$(".modal-title").html(language('System Update'));
		$(".modal-body").html(language('System Updating')+'....<img src="/images/loading1.gif" /><br>');
	}
}
function fileware_succeed_baek(data){
	$(".modal-title").html(language('System Reboot'));
	$(".modal-body").html(language('System Reboot wait','System Rebooting...<br>Please wait for about 180s, system will be rebooting.')+"<br/><img src='/images/loading.gif' />");
	
	// object.AGSystemToolsSystemReboot(system_reboot_succeed_back, system_reboot_error_back);//reboot
	
	setTimeout("check_network()",180000);
}
function fileware_error_back(data){}

function system_reboot_succeed_back(){}

function system_reboot_error_back(){}
/************************************System Update END*****************************/


/********************************System Online Update BEGIN************************/
var system_online_update_click_one = 0;
function online_succeed_back(data){
	if(data['_result'] == 0){
		// $("#online_str_tip").html(language('System Update Succeeded')+'<br>'+language('System Update Succeeded help',"You must reboot system to entry the newer system.")+'<br>');
		$("#online_str_tip").html(language('System Reboot wait','System Rebooting...<br>Please wait for about 180s, system will be rebooting.')+"<br/><img src='/images/loading.gif' />");
		
		// object.AGSystemToolsSystemReboot(system_reboot_succeed_back, system_reboot_error_back);//reboot
	
		setTimeout("check_network()",180000);
	}else{
		system_online_update_click_one = 0;
		$("#online_str_tip").html(language('System Online Update Download error','Download system file failed. Please check the network connection is correct!'));
	}
}
function online_error_back(data){
	$("#online_str_tip").html(language('System Reboot wait','System Rebooting...<br>Please wait for about 180s, system will be rebooting.')+"<br/><img src='/images/loading.gif' />");
	setTimeout("check_network()",180000);
	
	system_online_update_click_one = 0;
}
/********************************System Online Update END************************/



/************************************File Update BEGIN*****************************/
function file_upload(){
	var report = language('Report');
	var result = language('Result');
	var theme = language('Configuration Files Upload');
	
	var str = '';
	if(_type == 'file_upload'){
		if(_tip == 'true'){
			str += language('Configuration Files Upload Succeeded');
		}else{
			str += language('Configuration Files Upload Failed');
		}
	}else{
		str += language('Configuration Files Uploading')+' ......<br>'+'<img src="/images/loading1.gif" />';
	}
	
	$("#restore_configuration").after(
		'<br>'+
		'<b>'+report+'</b>'+
		'<table style="width:100%;font-size:12px;border:1px solid rgb(59,112,162);">'+
			'<tr style="background-color:#D0E0EE;height:26px;">'+
				'<td align="center" style="width:100%">'+
					'<b>'+theme+'</b>'+
				'</td>'+
			'</tr>'+
			'<tr align="left" style="background-color: rgb(232, 239, 247);">'+
				'<td>'+
					str+
				'</td>'+
			'</tr>'+
		'</table>'
	);
}

if(url['reload'] == 'true'){
	object.AGSystemWsapiReload(reload_succeed_back, reload_error_back);
	object.AGCommitAll(commit_success_back, commit_error_back, 'upload new configuration!');
}
function reload_succeed_back(data){}
function reload_error_back(data){}
function commit_success_back(data){}
function commit_error_back(data){}
/************************************File Update END*****************************/



/************************************Config Reset BEGIN*****************************/
var factory_reset_click_one = 0;
function factory_reset(stacknum){
	$("#modal-51").show();
	$(".modal-backdrop").show();
	$(".modal-title").html(language('Configuration Restore'));
	$(".modal-body").html(language('Configuration Restore wait',"Default Configuration Files Restoring...<br>Please wait for about 60s, system will be rebooting.")+' ......<img src="/images/loading.gif" /><br/>');
	
	setTimeout("check_factory_network("+stacknum+")", 60000);
	object.AGSystemToolsFactoryReset(factory_succeed_back, factory_error_back,0,0);
}

function factory_succeed_back(data){
	// object.AGSystemToolsSystemReboot(reboot_succeed_back, reboot_error_back);//reboot
	
	//setTimeout("check_factory_network()", 30000);
}

function factory_error_back(data){
	// object.AGSystemToolsSystemReboot(reboot_succeed_back, reboot_error_back);//reboot
	
	//setTimeout("check_factory_network()", 30000);
}

function check_factory_network(stacknum){
	window.location.href = 'http://172.16.99.'+stacknum+'/views/system-status.html';
}
/************************************Config Reset END*****************************/

/************************************Restore System BEGIN*****************************/
function restore_system(stacknum,cdr_db,syslog){
	$("#modal-51").show();
	$(".modal-backdrop").show();
	$(".modal-title").html(language('Configuration Restore'));
	$(".modal-body").html(language('Configuration Restore wait',"Default Configuration Files Restoring...<br>Please wait for about 60s, system will be rebooting.")+' ......<img src="/images/loading.gif" /><br/>');
	
	setTimeout("check_factory_network("+stacknum+")", 60000);
	object.AGSystemToolsFactoryReset(factory_succeed_back, factory_error_back,cdr_db,syslog);
}

function factory_succeed_back(data){
	// object.AGSystemToolsSystemReboot(reboot_succeed_back, reboot_error_back);//reboot
	
	//setTimeout("check_factory_network()", 30000);
}

function factory_error_back(data){
	// object.AGSystemToolsSystemReboot(reboot_succeed_back, reboot_error_back);//reboot
	
	//setTimeout("check_factory_network()", 30000);
}

function check_factory_network(stacknum){
	window.location.href = 'http://172.16.99.'+stacknum+'/views/system-status.html';
}
/************************************Restore System END*****************************/

/************************************Voice Recode Begin****************************/
var hour,minute,second;
hour=minute=second=0;
var minutes = '00';
var seconds = '00';
var millisecond=0;
var interval;
function click(){
	minutes = '00', seconds = '00';
	var str = "<p style='text-align:center'><font color='#00ff33' size= '6px' style='font-weight:bold'>" + minutes +":"+ seconds + "</font></p>";
		str += "<br><font color='green' size='5px'>The maximum duration of this recording is 10 minutes,and the system will stop and download the recording file automatically when time is up</font>";
	$("#time").html(str);
	interval = setInterval(function() {
		millisecond=millisecond+1000;
		if(millisecond>=1000)
		{
			millisecond=0;
			second=second+1;
		}
		if(second>=60){
			second=0;
			minute=minute+1;
		}
		if(minute>=60){ 
			minute=0;
		}
		if(minute<10)minutes='0'+minute;
		else minutes=minute;
		if(second<10)seconds='0'+second;
		else seconds=second;
		if(minute>=30){
			clearInterval(interval);
		}
		var str = "<p style='text-align:center'><font color='#00ff33' size= '6px' style='font-weight:bold'>" + minutes +":"+ seconds + "</font></p>";
		str += "<br><font color='green' size='5px'>The maximum duration of this recording is 3 minutes,and the system will stop and download the recording file automatically when time is up</font>";
		$("#time").html(str);
		if(minute == 3){
			$("#preview_dg").dialog("close");
			send_voice_stop_request();
			window.clearInterval(interval);
		}
	}, 1000);
}

function preview_dialog(){
	var voice_port = document.getElementById('voice_port').value;
	if(voice_port == undefined || voice_port == ""){
		alert("Please select a module first.");
		return false;
	}
	
	click();
	$("#preview_dg").dialog({
		resizeable: false,
		height:400,
		width:500,
		modal:true,
		
		buttons:[
			{
				text:language("Stop"),
				id:"close",
				style:"text-align:center",
				click:function(){
					$(this).dialog("close");
					send_voice_stop_request();
				}
			}
		]
	});
	$(".ui-button").click(function(){
		hour=minute=second=0;
		minutes = '00';
		seconds = '00';
		millisecond=0;
		window.clearInterval(interval);
		send_voice_stop_request();
	});
}

function send_voice_stop_request(){
	minutes = '00', seconds = '00';
	minute = 0;
	second = 0;
	window.clearInterval(interval);
	
	stop_voice();
}

function stop_voice(){
	var voice_port = document.getElementById('voice_port').value;
	document.getElementById('voice_channel').value = voice_port;
	object.AGUcpSystemToolsSndRecordStop(stop_success_back, stop_error_back, voice_port);
}

function stop_success_back(data){
	setTimeout(function(){$("#voice_form").submit();},200);
}

function stop_error_back(data){
	alert(language('voice stop failed'));
}

function start_success_back(data){}
function start_error_back(){
	alert(language('voice start failed'));
}
/************************************Voice Recode END******************************/