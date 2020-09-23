function check(global_data){
	var dialto = document.getElementById("dialtimeout").value;

	if(string_filter_tip()){
		return false;
	}
	
	if(limit_string_length()){
		return false;
	}
	
	if (dialto < 25)
		document.getElementById("dialtimeout").value = "25";
	
	var echotype = document.getElementById('echotype').value;
	if(echotype == 0){
		var echocancel = document.getElementById('echocancel').value;
		if(isNaN(echocancel) || parseInt(echocancel)<0 || parseInt(echocancel)>512){
			$("#cechocancel").html(con_str(language('Echocancel Range','echocancel range:0-512')));
			return false;
		}
	}
	
	var old_sigfxs = global_data['_sigfxs'];
	var new_sigfxs = document.getElementById('sigfxs').value;
	if(new_sigfxs != old_sigfxs){
		var ret = confirm(language('FXS Signaling change','Modifying the FXS signaling parameter will clear all channel bound sip, which must be restarted to take effect.'));
		if(!ret){
			return false;
		}
	}
	
	return true;
}

function string_filter_tip(){ // tip for user that wrong number value
	if(string_filter_tip_run('toneduration')){
		return true;
	}
	
	if(string_filter_tip_run('toneinterval')){
		return true;
	}

	if(string_filter_tip_run('dialtimeout')){
		return true;
	}
	
	return false;
}

function limit_string_length(){
	if(check_string_length('toneduration')){
		return true;
	}
	
	if(check_string_length('toneinterval')){
		return true;
	}
	
	return false;
}

function switch_echocancel(type){
	var html_str = '';
	if(type == '0'){
		html_str += "<input type='text' name='echocancel' id='echocancel'/>";
	}else{
		html_str += 		
		'<select name="echocancel" id="echocancel">'+
			'<option value="0">0</option>'+
			'<option value="64">64</option>'+
			'<option value="128">128</option>'+
			'<option value="256">256</option>'+
			'<option value="512">512</option>'+
		'</select>';
	}
	
	html_str += '<span id="cechocancel"></span>';

	$("#echocancel_html").html(html_str);
}

function onload_show(){
	$("#ecm").iButton(); 
}
/***********************************************************************************/

/*******************************SHOW GLBSETTINGS BEGIN*******************************/
(function(){
	/* General begin */
	$("#lang_tone_duration").html(language('Tone duration'));
	$("#lang_tone_duration_help").html(language('Tone duration help','How long generated tones (DTMF and MF) will be played on the channel.<br/>(in milliseconds).'));
	$("#lang_tone_interval").html(language('Tone interval'));
	$("#lang_tone_interval_help").html(language('Tone interval help','How long between tone and tone will be played on the channel.<br/>(in milliseconds).'));
	$("#lang_dial_timeout").html(language('Dial timeout'));
	$("#lang_dial_timeout_help").html(language('Dial timeout help','Specifies the number of seconds we attempt to dial the specified devices. <br/>'));
	$("#lang_echo_cancel_tap_length").html(language('Echo cancel tap length'));
	$("#lang_echo_cancel_tap_length_help").html(language('Echo cancel tap length help','Hardware echo canceler tap length. <br/>'));
	$("#lang_echo_type").html(language('Echo Type'));
	$("#lang_echo_type_help").html(language('Echo Type help','Echo Type'));
	$("#lang_fxs_signaling").html(language('FXS Signaling'));
	$("#lang_fxs_signaling_help").html(language('FXS Signaling help','FXS Signaling'));
	/* General end */
	
	/* Fax begin */
	$("#lang_mode").html(language('Mode'));
	$("#lang_mode_help").html(language('Mode help','Set the transmission mode.'));
	$("#lang_adaptive").html(language('Adaptive'));
	$("#lang_t38").html(language('T.38'));
	$("#lang_pass_through").html(language('Pass-through'));
	$("#lang_rate").html(language('Rate'));
	$("#lang_rate_help").html(language('Rate help@alg-glbsettings','Set the rate of sending and receiving.'));
	$("#lang_ecm").html(language('Ecm'));
	$("#lang_ecm_help").html(language('Ecm help','Enable/disable T.30 ECM (error correction mode) by default.<br/>'));
	/* Fax end */
	
	/* Country begin */
	$("#lang_country").html(language('Country'));
	$("#lang_country_help").html(language('Country help@alg-glbsettings','Configuration for location specific tone indications. <br/>'));
	$("#lang_ring_cadence").html(language('Ring cadence'));
	$("#lang_ring_cadence_help").html(language('Ring cadence help','List of durations the physical bell rings.<br/>'));
	$("#lang_dial_tone").html(language('Dial tone'));
	$("#lang_dial_tone_help").html(language('Dial tone help','Set of tones to be played when one picks up the hook.<br/>'));
	$("#lang_ring_tone").html(language('Ring tone'));
	$("#lang_ring_tone_help").html(language('Ring tone help','Set of tones to be played when the receiving end is ringing.<br/>'));
	$("#lang_busy_tone").html(language('Busy tone'));
	$("#lang_busy_tone_help").html(language('Busy tone help','Set of tones played when the receiving end is busy.<br/>'));
	$("#lang_call_waiting_tone").html(language('Call waiting tone'));
	$("#lang_call_waiting_tone_help").html(language('Call waiting tone help','Set of tones played when there is a call waiting in the background.<br/>'));
	$("#lang_congestion_tone").html(language('Congestion tone'));
	$("#lang_congestion_tone_help").html(language('Congestion tone help','Set of tones played when there is some congestion<br/>'));
	$("#lang_dial_recall_tone").html(language('Dial recall tone'));
	$("#lang_dial_recall_tone_help").html(language('Dial recall tone help','Many phone systems play a recall dial tone after hook flash. <br/>'));
	$("#lang_record_tone").html(language('Record tone'));
	$("#lang_record_tone_help").html(language('Record tone help','Set of tones played when call recording is in progress.<br/>'));
	$("#lang_info_tone").html(language('Info tone'));
	$("#lang_info_tone_help").html(language('Info tone help','Set of tones played with special information messages (e.g., "number is out of service")<br/>'));
	$("#lang_stutter_tone").html(language('Stutter tone'));
	$("#lang_stutter_tone_help").html(language('Stutter tone help','Stutter tone'));
	/* Country end */
	
	/* other info */
	$("#global_settings_li").html(language('Global settings'));
	$("#general_li").html(language('General'));
	$("#fax_li").html(language('Fax'));
	$("#country_li").html(language('Country'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_glbsettings(global_data, country_data){
	var toneduration = global_data['_toneduration'];
	
	var toneinterval = global_data['_toneinterval'];
	
	if(global_data['_dialtimeout']!=0){
		var dialtimeout = global_data['_dialtimeout'];
	}else{
		var dialtimeout = 180;
	}
	
	echotype_old = global_data['_echotype'];
	
	switch_echocancel(echotype_old);
	
	if(global_data['_echocancel'] >= 0 || global_data['_echocancel'] <= 500){
		var echocancel = global_data['_echocancel'];
	}else{
		var echocancel = 120;
	}
	
	var fxs_signaling = global_data['_sigfxs'];
	sigfxs_old = global_data['_sigfxs'];
	
	if(global_data['_mode'] != ''){
		var mode = global_data['_mode'];
	}else{
		var mode = 'Adaptive';
	}
	
	if(global_data['_rate'] != ''){
		var rate = global_data['_rate'];
	}else{
		var rate = 0;
	}
	
	var ecm = global_data['_ecm'];
	
	//country
	var country = country_data['_country'];
	var ind_ringcadence = country_data['_ringcadence'];
	var ind_dial = country_data['_dial'];
	var ind_ring = country_data['_ring'];
	var ind_busy = country_data['_busy'];
	var ind_callwaiting = country_data['_callwaiting'];
	var ind_congestion = country_data['_congestion'];
	var ind_dialrecall = country_data['_dialrecall'];
	var ind_record = country_data['_record'];
	var ind_info = country_data['_info'];
	var ind_stutter = country_data['_stutter'];
	
	document.getElementById('toneduration').value = toneduration;
	document.getElementById('toneinterval').value = toneinterval;
	document.getElementById('dialtimeout').value = dialtimeout;
	document.getElementById('echotype').value = echotype_old;
	document.getElementById('echocancel').value = echocancel;
	document.getElementById('sigfxs').value = fxs_signaling;
	
	document.getElementById('mode').value = mode;
	document.getElementById('rate').value = rate;
	
	if(ecm==1){
		document.getElementById('ecm').checked = true;
	}
	
	var _country_select = "<select name='country' id='country' >";
	for(var item in anaglb_country){
		if(country == item){
			_country_select += "<option value='"+item+"' selected>"+language(anaglb_country[item])+"</option>";
		}else{
			_country_select += "<option value='"+item+"'>"+language(anaglb_country[item])+"</option>";
		}
	}
	_country_select += "</select>";
	$("#country_select").prepend(_country_select);
	
	if(country!='custom'){
		$("._country_readonly").attr("readonly",true);
	}
	document.getElementById('country').value = country;
	document.getElementById('ind_ringcadence').value = ind_ringcadence;
	document.getElementById('ind_dial').value = ind_dial;
	document.getElementById('ind_ring').value = ind_ring;
	document.getElementById('ind_busy').value = ind_busy;
	document.getElementById('ind_callwaiting').value = ind_callwaiting;
	document.getElementById('ind_congestion').value = ind_congestion;
	document.getElementById('ind_dialrecall').value = ind_dialrecall;
	document.getElementById('ind_record').value = ind_record;
	document.getElementById('ind_info').value = ind_info;
	document.getElementById('ind_stutter').value = ind_stutter;
	
	//change country
	$("#country").change(function(){
		var country_val = document.getElementById('country').value;
		if(country_val == 'custom'){
			$("._country_readonly").removeAttr("readonly");
		}else{
			$("._country_readonly").attr("readonly",true);
		}
		object.AGAlgGlbSettingGetOne(change_succeed_back, change_error_back, country_val);
	});
	
	$("#echotype").change(function(){
		var type = $(this).val();
		switch_echocancel(type);
		
		if(type == 1 && echocancel != 0 &&
		echocancel != 64 &&
		echocancel != 128 &&
		echocancel != 256 &&
		echocancel != 512){
			echocancel_change = 128;
		}else{
			echocancel_change = echocancel;
		}
		document.getElementById('echocancel').value = echocancel_change;
	});
}

object.AGUcpAlgGlbSettingGetAll(succeed_back, error_back);

var country_info = '';
var echotype_old = '';
var sigfxs_old = '';
function succeed_back(data){
	var data_temp = data['_get'];
	var global_data = data_temp['_global'];
	var country_data = data_temp['_glb'];
	country_info = data_temp['_glb']['_country'];
	
	header(data_temp['_combuf']);
	show_glbsettings(global_data, country_data);
	footer();
	
	onload_show();
	
	//save
	$(".save_input").click(function(){
		if(check(global_data)){
			if(save_only_once()){
				$("#loading_image").show();
				save_glbsettings();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

//change country callback
function change_succeed_back(data){
	var data_temp = data['_get']['_glb'];
	
	document.getElementById('ind_ringcadence').value = data_temp['_ringcadence'];
	document.getElementById('ind_dial').value = data_temp['_dial'];
	document.getElementById('ind_ring').value = data_temp['_ring'];
	document.getElementById('ind_busy').value = data_temp['_busy'];
	document.getElementById('ind_callwaiting').value = data_temp['_callwaiting'];
	document.getElementById('ind_congestion').value = data_temp['_congestion'];
	document.getElementById('ind_dialrecall').value = data_temp['_dialrecall'];
	document.getElementById('ind_record').value = data_temp['_record'];
	document.getElementById('ind_info').value = data_temp['_info'];
	document.getElementById('ind_stutter').value = data_temp['_stutter'];
}

function change_error_back(data){
	alert('data error');
}

/*******************************SHOW GLBSETTINGS END*******************************/

/*******************************SAVE GLBSETTINGS END*******************************/
function save_glbsettings(){
	
	var algglobal = new AST_UcpAlgGlobal();
	
	var toneduration = document.getElementById('toneduration').value;
	algglobal._toneduration = toneduration;
	
	var toneinterval = document.getElementById('toneinterval').value;
	algglobal._toneinterval = toneinterval;
	
	var dialtimeout = document.getElementById('dialtimeout').value;
	if(dialtimeout == ''){
		dialtimeout = 0;
	}
	algglobal._dialtimeout = dialtimeout;
	
	var mode = document.getElementById('mode').value;
	algglobal._mode = mode;
	
	var rate = document.getElementById('rate').value;
	algglobal._rate = rate;
	
	if(document.getElementById('ecm').checked == true){
		var ecm = 1;
	}else{
		var ecm = 0;
	}
	algglobal._ecm = ecm;
	
	var echotype_val = document.getElementById('echotype').value;
	algglobal._echotype = echotype_val;
	
	var echocancel_val = document.getElementById('echocancel').value;
	if(echocancel_val != ''){
		echocancel = echocancel_val;
	}else{
		echocancel = 120;
	}
	algglobal._echocancel = echocancel;
	
	var sigfxs = document.getElementById('sigfxs').value;
	algglobal._sigfxs = sigfxs;
	
	//country
	var algglb = new AST_AlgGlb();
	
	var country = document.getElementById('country').value;
	algglb._country = country;
	
	if(country == 'custom'){
		var ringcadence = document.getElementById('ind_ringcadence').value;
		algglb._ringcadence = ringcadence;
	
		var dial = document.getElementById('ind_dial').value;
		algglb._dial = dial;
		
		var ring = document.getElementById('ind_ring').value;
		algglb._ring = ring;
		
		var busy = document.getElementById('ind_busy').value;
		algglb._busy = busy;
		
		var callwaiting = document.getElementById('ind_callwaiting').value;
		algglb._callwaiting = callwaiting;
		
		var congestion = document.getElementById('ind_congestion').value;
		algglb._congestion = congestion;
		
		var dialrecall = document.getElementById('ind_dialrecall').value;
		algglb._dialrecall = dialrecall;
		
		var record = document.getElementById('ind_record').value;
		algglb._record = record;
		
		var info = document.getElementById('ind_info').value;
		algglb._info = info;
		
		var stutter = document.getElementById('ind_stutter').value;
		algglb._stutter = stutter;
	}else{
		var ringcadence = document.getElementById('ind_ringcadence').value;
		algglb._ringcadence = ringcadence;
		algglb._dial = '';
		algglb._ring = '';
		algglb._busy = '';
		algglb._callwaiting = '';
		algglb._congestion = '';
		algglb._dialrecall = '';
		algglb._record = '';
		algglb._info = '';
		algglb._stutter = '';
	}
	
	var UcpAlgGlbSave = new AST_UcpAlgGlbSave();
	UcpAlgGlbSave._global = algglobal;
	UcpAlgGlbSave._glb = algglb;
	
	var country = document.getElementById('country').value;
	var echotype_input = document.getElementById('echotype').value;
	if((country != country_info) || (echotype_old != echotype_input) || (sigfxs_old != sigfxs)){
		var ret = confirm(language("GlbSetting Restart help", "Your settings need to be restarted dahdi to take effect. Are you sure to restart the dahdi?"));
		if(ret){
			var flag = 1;//restart dahdi
		}else{
			var flag = 0;
		}
	}else{
		var flag = 0;
		var ret = 1;
	}
	
	object.AGUcpAlgGlbSettingSave(save_succeed_back, save_error_back, UcpAlgGlbSave, flag);
}

function save_succeed_back(data){
	if(data['_result'] == 0){
		window.location.href = 'alg-glbsettings.html?save=true';
	}else{
		alert('Save error!');
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}

function reboot_succeed_back(data){
	setTimeout("check_network()",60000);
}

function reboot_error_back(data){
	setTimeout("check_network()",60000);
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
/*******************************SAVE GLBSETTINGS END*******************************/