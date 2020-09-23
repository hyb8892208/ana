function currentTime(Y,M,D,sec) {
	sec++;
	var H=Math.floor(sec/3600)%24;
	var I=Math.floor(sec/60)%60;
	var S=sec%60;
	if(S<10) S='0'+S;
	if(I<10) I='0'+I;
	if(H<10) H='0'+H;
	if (H=='00' & I=='00' & S=='00') D=D+1;
	if (M==2) {
		if (Y%4==0 && !Y%100==0 || Y%400==0) {
			if (D==30){
				M+=1;D=1;
			}
		} else {
			if (D==29) {
				M+=1;D=1;
			}
		}
	} else {
		if (M==4 || M==6 || M==9 || M==11) {
			if (D==31) {
				M+=1;D=1;
			}
		} else {
			if (D==32) {
				M+=1;D=1;
			}
		}
	}

	if (M==13) {
		Y+=1;M=1;
	}

	document.getElementById("system_current_time").innerHTML = 'Server time:' + '' + Y+'-'+M+'-'+D+' ' + H + ':' + I + ':' + S;
	setTimeout("currentTime("+Y+","+M+","+D+","+sec+")", 1000);
}

/***************************************************************************/
function typechange()
{
	var type = document.getElementById('reboot_type').value;

	set_visible('by_day_time_table', false);
	set_visible('by_week_table', false);
	set_visible('by_week_time_table', false);
	set_visible('by_month_table', false);
	set_visible('by_month_time_table', false);
	set_visible('by_run_time_table', false);

	if (type == 'by_day') {
		set_visible('by_day_time_table', true);
	} else if (type == 'by_week') {
		set_visible('by_week_table', true);
		set_visible('by_week_time_table', true);
	} else if (type == 'by_month') {
		set_visible('by_month_table', true);
		set_visible('by_month_time_table', true);
	} else if (type == 'by_run_time') {
		set_visible('by_run_time_table', true);
	}
}

function onload_func(){
	typechange();
}

function change_language(language_type){
	if(language_type == 'english' || language_type == 'chinese'){
		$("#delete").attr("disabled",true);
	}else{
		$("#delete").attr("disabled",false);
	}
}

function check_add_language(){
	if($('#upload_lang_file').attr('value') == '') {
		alert(language('Select File alert','Please select your file first!'));
		return false;
	}
	return true;
}

function check_delete_language(){
	if($('#language_type').attr('value')=='english'){
		alert(language('Delete Language alert','Sorry, you can not delete the default language.'));
		return false;
	}

	if(!confirm(language('Delete Language confirm','Are you sure to delete the selected language package?'))) {
		return false;
	}

	return true;
}

function checkFileChange(obj){
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

	if(filesize > 1000*1000*1) {
		alert(language('Language Package Size alert','Uploaded max file is 1MB!'));
		var g_bAllowFile = false;
		return false;
	}

	var g_bAllowFile = true;
	return true;
}

/*********************************************************************************/

function onload_show(){
	$(":checkbox").iButton(); 
	
	onload_func();
	
	$("#system_current_time").draggable();
	$("#system_current_time").mousedown(function(){
		$(this).css('cursor','url(/images/closehand.cur),auto');
	});
	$("#system_current_time").mouseup(function(){
		$(this).css('cursor','url(/images/openhand.cur),auto');
	});
	$("#system_current_time").mouseover(function(){
		$(this).css('cursor','url(/images/openhand.cur),auto');
	});
};
/*************************************SHOW GENERAL BEGIN********************************************/
(function(){
	/* Language Settings begin */
	$("#lang_language").html(language('Language')+':');
	$("#lang_advanced").html(language('Advanced')+':');
	$("#lang_language_debug").html(language('Language Debug')+':');
	$("#lang_download").html(language('Download')+':');
	$("#download").val(language('Download'));
	$("#lang_language_download_help").html(language('Language Download help','Download selected language package.'));
	$(".lang_delete").val(language('Delete'));
	$("#lang_delete_language_help").html(language('Delete language help','Delete selected language.'));
	$("#lang_add_new_language").html(language('Add New Language')+':');
	$("#lang_new_language_package").html(language('New language Package'));
	$("#lang_turn_on").val(language('TURN ON'));
	$("#lang_turn_off").val(language('TURN OFF'));
	$("#lang_delete").html(language('Delete')+':');
	$("#delete").val(language('Delete'));
	$("#add").val(language('Add'));
	/* Language Settings end */
	
	/* Scheduled Reboot begin */
	$(".lang_enable").html(language('Enable'));
	$(".lang_enable_help").html(language('Enable help','ON(enabled), OFF(disabled)'));
	$("#lang_reboot_type").html(language('Reboot Type'));
	$("#lang_reboot_type_help").html(language('Reboot Type help','By Day: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reboot everyday at xx:xx(time). <br>By Week: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reboot everyweek on XXX(week day) at xx:xx(time). <br>By Month: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reboot everymonth on XXX(Month day) at xx:xx(time). <br>By Running Time: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reboot periodically by the run time.'));
	$("#lang_by_day").html(language('By Day'));
	$("#lang_by_week").html(language('By Week'));
	$("#lang_by_month").html(language('By Month'));
	$("#lang_by_running_time").html(language('By Running Time'));
	$(".lang_time").html(language('Time')+':');
	$(".lang_hour").html(language('Hour'));
	$(".lang_minute").html(language('Minute'));
	$("#lang_week").html(language('Week')+':');
	$("#lang_date").html(language('Date')+':');
	$("#lang_running_time").html(language('Running Time'));
	$("#lang_day").html(language('Day'));
	/* Scheduled Reboot end */
	
	/* other info */
	$("#language_settings_li").text(language('Language Settings'));
	$("#scheduled_reboot_li").text(language('Scheduled Reboot'));
	$("#general_save").val(language('Save'));
	$("#lang_adv_enable").change(function(){
		$('#lang_adv').slideToggle();
	});
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function show_general(auto_data, lang_data, time_data, _lang){
	var week_day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	
	if(auto_data['_type'] != ''){
		var type = auto_data['_type'];
	}else{
		var type = 'by_day';
	}
	
	if(auto_data['_sw'] == 0){
		var reboot_sw = 'on';
	}else{
		var reboot_sw = 'off';
	}
	if(reboot_sw == 'on'){
		var sw_check = true;
	}else{
		var sw_check = false;
	}
	
	/* by day begin */
	var d_minute = auto_data['_dminute'];
	
	var d_hour = auto_data['_dhour'];
	/* by day end */
	
	/* by week begin */
	var w_minute = auto_data['_wminute'];
	
	var w_hour = auto_data['_whour'];
	
	var w_week = auto_data['_wweek'];
	/* by week end */
	
	/* by month begin */
	var m_minute = auto_data['_mminute'];
	
	var m_hour = auto_data['_mhour'];
	
	var m_month = auto_data['_mmonth'];
	/* by month end */
	
	/* by run time begin */
	var r_minute = auto_data['_rminute'];
	
	var r_hour = auto_data['_rhour'];
	
	var r_day = auto_data['_rday'];
	/* by run time end */
	
	/* date begin */
	//Y,M,D,sec
	var Y = time_data['_year'];
	var M = time_data['_month'];
	var D = time_data['_day'];
	var sec = parseInt(time_data['_hour']*3600) + parseInt(time_data['_minute']*60) + parseInt(time_data['_second']);
	/* date end */
	
	/* Language Settings begin */
	var _language_type_select = "<select id='language_type' name='language_type' >";
	if(lang_data.length > 0){
		for(var item in lang_data){
			if(lang_data[item]['_key'] == _lang){
				var _selected = 'selected';
			}else{
				var _selected = '';
			}
			_language_type_select += '<option value="'+lang_data[item]['_key']+'" '+_selected+' >'+lang_data[item]['_value']+'</option>';
		}
	}else{
		_language_type_select += '<option value="english" selected >English</option>';
	}
	_language_type_select += '</select>';
	
	var _disabled = false;
	if(_lang == 'english' || _lang == 'chinese'){
		_disabled = true;
	}
	
	//select
	$("#lang_type_select").html(_language_type_select);
	
	//disabled
	document.getElementById('delete').disabled = _disabled;
	
	//value
	if(_lang != ''){
		document.getElementById('downloadfile_val').value = _lang;
	}else{
		document.getElementById('delete').disabled = 'disabled';
		document.getElementById('downloadfile_val').value = 'english';
	}
	/* Language Settings end */
	
	/* Scheduled Reboot begin */
	var _d_hour_selected = "<select id='d_hour' style='text-align:center;width: 50px;' name='d_hour' >";
	for(var i=0;i<=23;i++){
		if(i==d_hour){
			_d_hour_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_d_hour_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_d_hour_selected += "</select>";
	
	var _d_minute_selected = "<select id='d_minute' style='text-align:center;width: 50px;' name='d_minute'>";
	for(var i=0;i<=59;i++){
		if(i==d_minute){
			_d_minute_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_d_minute_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_d_minute_selected += "</select>";
	
	var _w_week_selected = "<select id='w_week' style='text-align:center;width:auto' name='w_week' >";
	for(var i=0;i<7;i++){
		if(i==w_week){
			_w_week_selected += "<option  value='"+i+"' selected >"+language(week_day[i])+"</option>";
		}else{
			_w_week_selected += "<option  value='"+i+"' >"+language(week_day[i])+"</option>";
		}
	}
	_w_week_selected += "</select>";
	
	var _w_hour_selected = "<select id='w_hour' style='text-align:center;width: 50px;' name='w_hour' >";
	for(var i=0;i<=23;i++){
		if(i==w_hour){
			_w_hour_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_w_hour_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_w_hour_selected += "</select>";
	
	var _w_minute_selected = "<select id='w_minute' style='text-align:center;width: 50px;' name='w_minute'>";
	for(var i=0;i<=59;i++){
		if(i==w_minute){
			_w_minute_selected += "<option value='"+i+"' selected >"+i+"</option>";
		}else{
			_w_minute_selected += "<option value='"+i+"'>"+i+"</option>";
		}
	}
	_w_minute_selected += "</select>";
	
	var _m_month_selected = "<select id='m_month' style='text-align:center;width: 50px;' name='m_month' >";
	for(var i=0;i<=31;i++){
		if(i==m_month){
			_m_month_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_m_month_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_m_month_selected += "</select>";
	
	var _m_hour_selected = "<select id='m_hour' style='text-align:center;width: 50px;' name='m_hour' >";
	for(var i=0;i<=23;i++){
		if(i==m_hour){
			_m_hour_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_m_hour_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_m_hour_selected += "</select>";
	
	var _m_minute_selected = "<select id='m_minute' style='text-align:center;width: 50px;' name='m_minute'>";
	for(var i=0;i<=59;i++){
		if(i==m_minute){
			_m_minute_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_m_minute_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_m_minute_selected += "</select>";
	
	var _r_day_selected = "<select id='r_day' style='text-align:center;width: 50px;' name='r_day'>";
	for(var i=0;i<=31;i++){
		if(i==r_day){
			_r_day_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_r_day_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_r_day_selected += "</select>";
	
	var _r_hour_selected = "<select id='r_hour' style='text-align:center;width: 50px;' name='r_hour' >";
	for(var i=0;i<=23;i++){
		if(i==r_hour){
			_r_hour_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_r_hour_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_r_hour_selected += "</select>";
	
	var _r_minute_selected = "<select id='r_minute' style='text-align:center;width: 50px;' name='r_minute'>";
	for(var i=0;i<=59;i++){
		if(i==r_minute){
			_r_minute_selected += "<option  value='"+i+"' selected >"+i+"</option>";
		}else{
			_r_minute_selected += "<option  value='"+i+"' >"+i+"</option>";
		}
	}
	_r_minute_selected += "</select>";
	
	//checked
	document.getElementById('reboot_sw').checked = sw_check;
	
	//select
	$("#d_hour_selected").html(_d_hour_selected);
	$("#d_minute_selected").html(_d_minute_selected);
	$("#w_week_selected").html(_w_week_selected);
	$("#w_hour_selected").html(_w_hour_selected);
	$("#w_minute_selected").html(_w_minute_selected);
	$("#m_month_selected").html(_m_month_selected);
	$("#m_hour_selected").html(_m_hour_selected);
	$("#m_minute_selected").html(_m_minute_selected);
	$("#r_day_selected").html(_r_day_selected);
	$("#r_hour_selected").html(_r_hour_selected);
	$("#r_minute_selected").html(_r_minute_selected);
	document.getElementById('reboot_type').value = type;
	/* Scheduled Reboot end */
	
	currentTime(Y,M,D,sec);
	
	/* Add language */
	$("#add").click(function(){
		var _file = document.getElementById('upload_lang_file').files;
		if(_file.length != 0){
			for(var item in lang_data){
				if(lang_data[item]['_key'] == _file[0].name){
					alert(language('Add Language overwrite alert','Language already exists!\nReadyonly Language cannot be overwrite!'));
					return false;
				}
			}
		}
	});
	
	/* Delete language */
	$("#delete").click(function(){
		if(check_delete_language()){
			var lang_val = document.getElementById('language_type').value;
			object.AGSysGeneralDelLang(del_succeed_back, del_error_back, lang_val);
		}
	});
	
	/* change language */
	$("#language_type").change(function(){
		var lang_val = document.getElementById('language_type').value;
		document.getElementById('downloadfile_val').value = lang_val;
		
		change_language(lang_val);
	});
}

object.AGSysGeneralGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var auto_data = data_temp['_autoreboot'];
	var time_data = data_temp['_date'];
	var lang_data = data_temp['_langs']['_item'];
	var _lang = data_temp['_lang'];
	var demo_enable = data_temp['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	header(data_temp['_combuf']);
	show_general(auto_data, lang_data, time_data, _lang);
	footer();
	
	onload_show();
	
	$("#general_save").click(function(){
		if(save_only_once()){
			$("#loading_image").show();
			save_general();
		}
	});
	
	//demo_enable
	if(document.getElementById('general_save') != null)
		document.getElementById('general_save').disabled = demo_enable == 1 ? true : false;
}

function error_back(data){
	window.location.href = 'error.html';
}

//delete language callback
function del_succeed_back(data){
	window.location.reload();
}

function del_error_back(data){}
/*************************************SHOW GENERAL BEGIN********************************************/


/*************************************SAVE GENERAL BEGIN********************************************/
function save_general(){
	var sysauto = new AST_SysAuto();
	if(document.getElementById('reboot_sw').checked == true){
		var reboot_sw = 0;
	}else{
		var reboot_sw = 1;
	}
	sysauto._sw = reboot_sw;
	
	var reboot_type = document.getElementById('reboot_type').value;
	sysauto._type = reboot_type;
	var d_minute = document.getElementById('d_minute').value;
	sysauto._dminute = d_minute;
	var d_hour = document.getElementById('d_hour').value;
	sysauto._dhour = d_hour;
	var w_minute = document.getElementById('w_minute').value;
	sysauto._wminute = w_minute;
	var w_hour = document.getElementById('w_hour').value;
	sysauto._whour = w_hour;
	var w_week = document.getElementById('w_week').value;
	sysauto._wweek = w_week;
	var m_minute = document.getElementById('m_minute').value;
	sysauto._mminute = m_minute;
	var m_hour = document.getElementById('m_hour').value;
	sysauto._mhour = m_hour;
	var m_month = document.getElementById('m_month').value;
	sysauto._mmonth = m_month;
	var r_minute = document.getElementById('r_minute').value;
	sysauto._rminute = r_minute;
	var r_hour = document.getElementById('r_hour').value;
	sysauto._rhour = r_hour;
	var r_day = document.getElementById('r_day').value;
	sysauto._rday = r_day;
	
	var SysGeneralSave = new AST_SysGeneralSave();
	
	SysGeneralSave._autoreboot = sysauto;
	
	var _language = document.getElementById('language_type').value;
	SysGeneralSave._lang = _language;
	
	object.AGSysGeneralSave(save_succeed_back, save_error_back, SysGeneralSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'system-general.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*************************************SAVE GENERAL END********************************************/


/*************************************LANGUAGE DEBUG BEGIN****************************************/
function language_debug(){
	var debug;
	$("#lang_turn_on").click(function(){
		debug = 0;
		object.AGSysGeneralDebug(debug_succeed_back, debug_error_back, debug);
	});
	$("#lang_turn_off").click(function(){
		debug = 1;
		object.AGSysGeneralDebug(debug_succeed_back, debug_error_back, debug);
	});
	
}
language_debug();

function debug_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.reload();
	}
}

function debug_error_back(data){
	window.location.reload();
}
/*************************************LANGUAGE DEBUG END******************************************/