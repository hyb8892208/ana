function cancel(){
	window.location.href = "alg-chnsettings.html";
}
//use by common.js
function siptrunk_change_editpage(obj, channel)
{
	var asschannel_old = $(obj).parent("td").find("input").attr("associated_chnnl_oldvalue");
	var asschannel = document.getElementById('associated_chnnl').value;
	var channel_new = ""+channel;
	var channel_new = 800 + channel_new.slice(-1);

	if(asschannel == 'none') {
		document.getElementById('cid_number').value = channel_new;
		document.getElementById('fullname').value = "Channel " + channel_new;		

		var channel_new = ""+channel;
		var portid=parseInt(channel_new.slice(-1));
		document.getElementById('portname').value = "port"+portid;
	} else {
		ass = asschannel.split("-");
		document.getElementById('cid_number').value = ass[1];
		document.getElementById('fullname').value = ass[1];
		$(obj).parent("td").find("input").attr("associated_chnnl_oldvalue",asschannel);
	}
}


function delay_reply_200ok_change()
{
	var delay_reply_200ok_enable = document.getElementById('delay_reply_200ok_enable');
	if(delay_reply_200ok_enable){
		var sw = delay_reply_200ok_enable.checked;
		if (sw) {
			set_visible('tr_delay_reply_200ok_timer', true);
		} else {
			set_visible('tr_delay_reply_200ok_timer', false);
		}
	}
}

function check(all_analog_data,sip_data,routing_data,chnl_type)
{
	var rxgain = document.getElementById('rxgain').value;
	var txgain = document.getElementById('txgain').value;

	if (rxgain < -20.0 || rxgain > 6.0) {
		alert(language('js check digitgain', 'Invalid value! Range: from -20.0dB to 6dB, in 0.1 dB increments.'));
		document.getElementById('rxgain').focus();
		return false;
	}
	if (txgain < -20.0 || txgain > 6.0) {
		alert(language('js check digitgain', 'Invalid value! Range: from -20.0dB to 6dB, in 0.1 dB increments.'));
		document.getElementById('txgain').focus();
		return false;
	}

	if (chnl_type == 1) {
		callwait = document.getElementById('callwaiting');
		fwdtype = document.getElementById('callforward').value;
		fwdext = document.getElementById('callforwardexten').value;
		if (callwait.checked == true && fwdtype != 0) {
			alert(language('js check callwaiting', 'Do not enable Call waiting and Call forward at same time.'));
			document.getElementById('callforward').focus();
			return false;
		}
		if (fwdtype != 0 && !check_sipnumber(fwdext)) {
			alert(language('js check sipnumber', 'Only allow digits characters, length: 1 - 32.'));
			document.getElementById('callforwardexten').focus();
			return false;
		}
		
		//------
		if($("input[name=associated_chnnl_sync]").attr('checked')=='checked'){
			if(associated_chnnl_tip(all_analog_data, sip_data, routing_data)){
				alert(language('SIP out'));
				return false;
			}
		}
	}
	
	if (chnl_type == 0) {
		var delayenbale = document.getElementById('delay_reply_200ok_enable');
		var delaytimer = document.getElementById('delay_reply_200ok_timer').value;
		var calloutmininterval = document.getElementById('calloutmininterval').value;
		
		if(String(calloutmininterval).indexOf(".") > -1){
			var calloutmininterval_str = language('js check parameters data type','parameters data type must be int');
			document.getElementById("ccalloutmininterval").innerHTML = con_str(calloutmininterval);
			document.getElementById('calloutmininterval').focus();
			return false;
		}
		if(!(parseInt(calloutmininterval) >= 400 && parseInt(calloutmininterval) <= 10000)){
			var calloutmininterval_str = language('js check calloutmininterval','Range:400 ~ 10000ms');
			document.getElementById("ccalloutmininterval").innerHTML = con_str(calloutmininterval_str);
			document.getElementById('calloutmininterval').focus();
			return false;
		}
		
		if (delayenbale.checked == true) {
			if(!(delaytimer >= 1 && delaytimer <= 90) || String(delaytimer).indexOf(".") > -1){
				alert(language('js check delay_reply_200ok_timer', 'Invalid value! Range: from 1s to 90s.'));
				document.getElementById('delay_reply_200ok_timer').focus();
				return false;
			}
		}
	}
	
	if(string_filter_tip()){
		return false;
	}
	
	if(limit_string_length()){
		return false;
	}
	
	//call limit
	if(document.getElementById('call_limit_switch').checked){
		var call_time_settings = document.getElementById('call_time_settings').value;
		document.getElementById('ccall_time_settings').innerHTML = '';
		if(isNaN(call_time_settings) || parseInt(call_time_settings) < 0){
			document.getElementById('call_time_settings').focus();
			document.getElementById('ccall_time_settings').innerHTML = con_str("Must be Number.Range:>=0.");
			return false;
		}
		
		var day_calls_settings = document.getElementById('day_calls_settings').value;
		document.getElementById('cday_calls_settings').innerHTML = '';
		if(isNaN(day_calls_settings) || parseInt(day_calls_settings) < 0){
			document.getElementById('day_calls_settings').focus();
			document.getElementById('cday_calls_settings').innerHTML = con_str("Must be Number.Range:>=0.");
			return false;
		}
		
		var day_answer_setting = document.getElementById('day_answer_setting').value;
		document.getElementById('cday_answer_setting').innerHTML = '';
		if(isNaN(day_answer_setting) || parseInt(day_answer_setting) < 0){
			document.getElementById('day_answer_setting').focus();
			document.getElementById('cday_answer_setting').innerHTML = con_str("Must be Number.Range:>=0");
			return false;
		}
		
		var hour_calls_settings = document.getElementById('hour_calls_settings').value;
		document.getElementById('chour_calls_settings').innerHTML = '';
		if(isNaN(hour_calls_settings) || parseInt(hour_calls_settings) < 0){
			document.getElementById('hour_calls_settings').focus();
			document.getElementById('chour_calls_settings').innerHTML = con_str("Must be Number.Range:>=0");
			return false;
		}
	}

	return true;
}

function associated_chnnl_tip(all_analog_data, sip_data, routing_data){
	var ana_sip = [];
	var associatedchnnl_val = document.getElementById('associated_chnnl').value;
	if(associatedchnnl_val == 'none'){return false;}
	for(var item in all_analog_data){
		var flag = 0;
		$(".port").each(function(){
			if($(this).attr('checked') == 'checked'){
				if(all_analog_data[item]['_channel'] == $(this).val()){
					flag = 1;
				}
			}
		});
		if(flag == 1){continue;}
		if(all_analog_data[item]['_associatedchnnl'] != associatedchnnl_val && all_analog_data[item]['_associatedchnnl'] != '' && all_analog_data[item]['_associatedchnnl'] != 'none'){
			ana_sip.push(all_analog_data[item]['_associatedchnnl']);
		}
	}
	
	var routing_sip = [];
	for(var r_item in routing_data){
		var from_channel = routing_data[r_item]['_fromchannel'];
		var to_channel = routing_data[r_item]['_tochannel'];
		var to_temp = to_channel.split(",");
		var from_temp = from_channel.split("-");
		if(from_temp[0] == 'sip'){
			routing_sip.push(from_channel);
		}
		
		for(var i in to_temp){
			var i_temp = to_temp[i].split('-');
			if(i_temp[0] == 'sip'){
				routing_sip.push(to_temp[i]);
			}
		}
	}
	
	var sip = ana_sip.concat(routing_sip);
	for(var i=sip_data.length-1; i>=0; i--){
		for(var s_item in sip){
			var temp = sip[s_item].split('-');
			if(sip_data[i] == undefined){continue;}
			if(temp[1] == sip_data[i]['_section']){
				sip_data.splice(i,1);
			}
		}
	}
	
	var page_left_len = 0;
	var page_right_len = 0;
	$(".port").each(function(){
		if($(this).attr('checked') == 'checked'){
			if($(this).val() < channel){
				page_left_len++;
			}
			
			if($(this).val() > channel){
				page_right_len++;
			}
		}
	});
	
	var sip_left_len = 0;
	var sip_right_len = 0;
	var assotemp = associatedchnnl_val.split('-');
	for(var item in sip_data){
		if(sip_data[item]['_section'] > assotemp[1]){
			sip_right_len++;
		}
		
		if(sip_data[item]['_section'] < assotemp[1]){
			sip_left_len++;
		}
	}
	
	if(page_left_len > sip_left_len || page_right_len > sip_right_len){
		return true;
	}
	
	return false;
}

function show_used_channel(all_analog_data){
	var key = [];
	$(".port").each(function(){
		if($(this).attr('checked') == 'checked'){
			key.push($(this).val());
		}
	});
	
	var sip_arr = [];
	for(var item in all_analog_data){
		for(var i=0;i<key.length;i++){
			if(all_analog_data[item]['_channel'] == key[i] && all_analog_data[item]['_associatedchnnl'] != 'none'  && all_analog_data[item]['_associatedchnnl'] != ''){
				sip_arr.push(all_analog_data[item]['_associatedchnnl']);
			}
		}
	}
	
	$("#associated_chnnl option").each(function(){
		for(var i=0;i<sip_arr.length;i++){
			if($(this).val() == sip_arr[i]){
				$(this).removeAttr('disabled');
			}
		}
	});
}

function string_filter_tip(){ //tip for user that wrong number value
	if(string_filter_tip_run('ringtimeout')){
		return true;
	}
	if(chnl_type == 'FXS'){
		if(string_filter_tip_run('cid_number')){
			return true;
		}
	}else if(chnl_type == 'FXO'){
		if(string_filter_tip_run('polarityonanswerdelay')){
			return true;
		}
		if(string_filter_tip_run('delay_reply_200ok_timer')){
			return true;
		}
	}
	return false;
}

function limit_string_length(){
	if(check_string_length('portname')){
		return true;
	}
	
	if(check_string_length('rxgain')){
		return true;
	}
	
	if(check_string_length('txgain')){
		return true;
	}
	
	if(chnl_type == 'FXS'){
		if(check_string_length('fullname')){
			return true;
		}
		
		if(check_string_length('callforwardexten')){
			return true;
		}
	}
	
	return false;
}
/************************************************************************/

function callforward_type_change()
{
	var callforward = document.getElementById('callforward').value;
	
	if(callforward == 0) {
		document.getElementById('callforwardexten').value = '';
		document.getElementById('callforwardexten').disabled = true;
	} else {
		document.getElementById('callforwardexten').disabled = false;
	}
}

function handle_port_sync()
{
	if(isAllCheckboxChecked('class','port')){
		$("#all_port").attr({"checked":true});
	}else{
		$("#all_port").attr({"checked":false});
	}
	if(isCheckboxChecked('class','port')){
		$(".setting_sync").show();
		$("#all_settings_sync").attr({"disabled":false,"checked":false});
		//selectAllCheckbox(false,'class','setting_sync'); 
	}else{
		$(".setting_sync").hide();
		$("#all_settings_sync").attr({"disabled":true,"checked":true});
		selectAllCheckbox(false,'class','setting_sync');
	}
}

function handle_setting_sync()
{
	if(isAllCheckboxChecked('class','setting_sync')){
		$("#all_settings_sync").attr({"checked":true});
	}else{
		$("#all_settings_sync").attr({"checked":false});
	}
}

function setting_sync_check(checked){
	if(checked){
		$(".setting_sync").attr('checked', true);
	}else{
		$(".setting_sync").removeAttr('checked');
	}
}

/* left bar show */
function float_sort_hide()
{
	$("#sort_ag_cli").stop().animate({left:"-198px"}, 300);
	$("#sort_out").stop().animate({left:"0px"}, 300);
}

function float_sort_on()
{
	$("#sort_ag_cli").animate({left:"0px"}, 300);
	$("#sort_out").animate({left:"198px"}, 300);
}
/**********************************************************************************/
function onload_show(all_analog_data){
	$("#callwaiting").iButton();
	$("#threewaycalling").iButton(); 
	$("#transfer").iButton();
	$("#cidbeforering").iButton();
	$("#dnd").iButton();
	$("#usecallerid").iButton();
	$("#hidecallerid").iButton();
	$("#answeronpolarityswitch").iButton(); 
	$("#hanguponpolarityswitch").iButton();
	$("#delay_reply_200ok_enable").iButton();
	$("#call_limit_switch").iButton();
	$("#immediatesendcid").iButton();
	delay_reply_200ok_change()
	
	$(".port").click(function(){
		handle_port_sync();
	});

	$(".setting_sync").click(function(){
		handle_setting_sync();
	});
	
	float_sort_hide();
	var sort_info_top = $("#lps").offset().top;
	$("#sort_ag_cli").offset({top: sort_info_top });
	$("#sort_out").offset({top: sort_info_top });
	$("#sort_out").mouseover(function(){
		if($("#sort_out").offset().left <= 5){
			float_sort_on();
		}
	});
	$("#sort_ag_cli").mouseleave(function(){
		float_sort_hide();
	});
	
	$(".associated_checked").click(function(){
		if($(this).attr("checked") == "checked"){
			$(".associated_checked").attr("checked","checked");
		}else{
			$(".associated_checked").removeAttr("checked");
		}
	});
	
	$(".port").click(function(){
		show_used_channel(all_analog_data);
	});
	$("#all_port").click(function(){
		show_used_channel(all_analog_data);
	});
	
	//show and hide call_limit
	var call_limit_switch = $("#call_limit_switch").attr('checked');
	if(call_limit_switch == 'checked'){
		$(".call_limit_tr").show();
	}else{
		$(".call_limit_tr").hide();
	}
	$("#call_limit_switch").change(function(){
		if($(this).attr('checked') == 'checked'){
			$(".call_limit_tr").show();
		}else{
			$(".call_limit_tr").hide();
		}
	});
}

/***************************************SHOW CHANNEL BEIGN*******************************************/
function Channel(){
	this.chnnl_type = '';
	this.portname = '';
	this.rxgain = '';
	this.txgain = '';
	this.ringtimeout = '';
	this.associated_chnnl = '';
	this.cid_number = '';
	this.fullname = '';
	this.hidecallerid = '';
	this.usecallerid = '';
	this.cidsignalling = '';
	this.dnd = '';
	this.cidstart = '';
	this.answeronpolarityswitch = '';
	this.hanguponpolarityswitch = '';
	this.polarityonanswerdelay = '';
	this.delay_reply_200ok_enable = 'no';
	this.delay_reply_200ok_timer = '8';
	this.callwaiting = '';
	this.threewaycalling = '';
	this.transfer = '';
	this.callforward = '';
	this.callforwardexten = '';
	this.context = '';
	this.failover_fxo = '';
}

(function(){
	/* General begin */
	$("#lang_port_type").html(language('Port type'));
	$("#lang_port_type_help").html(language('Port type help','The port type <br/>Read only, auto-detected by gateway. '));
	$("#lang_port_name").html(language('Name'));
	$("#lang_port_name_help").html(language('Port Name help','Port Name'));
	$("#lang_rx_gain").html(language('Rx gain'));
	$("#lang_rx_gain_help").html(language('Rx gain help','Set the rx gain (dB). Range: from -20.0dB to 6dB, in 0.1 dB increments.<br/>'));
	$("#lang_tx_gain").html(language('Tx gain'));
	$("#lang_tx_gain_help").html(language('Tx gain help','Set the tx gain (dB). Range: from -20.0dB to 6dB, in 0.1 dB increments.<br/>'));
	$("#lang_ring_timeout").html(language('Ring timeout'));
	$("#lang_ring_timeout_help").html(language('Ring timeout help','Set the ring timeout (seconds). <br/>'));
	/* General end */
	
	/* Call limit begin */
	$("#lang_call_limit_switch").html(language('Call Limit Switch'));
	$("#lang_call_limit_switch_help").html(language('Call Limit Switch help'));
	$("#lang_limit_call_time").html(language('Limit Call Time'));
	$("#lang_limit_call_time_help").html(language('Limit Call TIme help'));
	$("#lang_limit_daily_call_times").html(language('Limit Daily Call Times'));
	$("#lang_limit_daily_call_times_help").html(language('Limit Daily Call Times help'));
	$("#lang_limit_daily_answer_times").html(language('Limit Daily Answer Times'));
	$("#lang_limit_daily_answer_times_help").html(language('Limit Daily Answer Times help'));
	$("#lang_limit_hour_call_times").html(language('Limit Hour Call Times'));
	$("#lang_limit_hour_call_times_help").html(language('Limit Hour Call Times help'));
	/* Call limit end */
	
	/* Save To Other Channels begin */
	$("#lang_call_limit").html(language("Call Limit"));
	$("#lang_save_to_other_channels").html(language("Save To Other Channels"));
	$("#lang_save_to_other_channels_help").html(language("Save To Other Channels help","Saving channel param to other channels synchronously"));
	$("#lang_all").html(language("All"));
	$("#lang_sync_all_settings").html(language("Sync All Settings"));
	$("#lang_sync_all_settings_help").html(language("Sync All Settings help", "AG Sync All settings"));
	$("#lang_select_all_settings").html(language("Select all settings", "Select all settings"));
	/* Save To Other Channels end */
	
	/* show other info */
	var url = get_url_para();
	var channel = url['chnl_num'];
	$("#channel_name").html(language('port')+'-'+channel);
	$("#General_name").html(language('General'));
	$("#Caller_ID_name").html(language('Caller ID'));
	$("#Save_to_other_name").html(language('Save To Other Channels'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
}());

function edit_chnl(data_temp){
	if(chnl_type == 'FXS'){
		var analog_data = data_temp['_fxo'];
	}else if(chnl_type == 'FXO'){
		var analog_data = data_temp['_fxs'];
	}
	var all_analog_data = data_temp['_section']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	var routing_data = data_temp['_routing']['_item'];
	var calllimit_data = data_temp['_limit'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	
	var chnl = new Channel();
	var url = get_url_para();
	
	chnl.chnnl_type = url['chnl_type'];
	
	if(analog_data['_name'] != ''){
		chnl.portname = analog_data['_name'];
	}else{
		chnl.portname = "port-"+channel;
	}
	
	if(analog_data['_rxgain'] != ''){
		chnl.rxgain = analog_data['_rxgain'];
	}
	
	if(analog_data['_txgain'] != ''){
		chnl.txgain = analog_data['_txgain'];
	}
	
	if(analog_data['_ringtimeout'] != 0){
		chnl.ringtimeout = analog_data['_ringtimeout'];
	}
	
	if(analog_data['_immediatesendcid'] == 1){
		var immediatesendcid_check = 'checked';
	}else{
		var immediatesendcid_check = '';
	}
	
	if(analog_data['_calloutmininterval'] != ''){
		var calloutmininterval = analog_data['_calloutmininterval'];
	}else{
		var calloutmininterval = '';
	}
	
	if(analog_data['_associatedchnnl'] != ''){
		chnl.associated_chnnl = analog_data['_associatedchnnl'];
	}
	
	if(analog_data['_cidnumber'] != 0){
		chnl.cid_number = analog_data['_cidnumber'];
	}
	
	if(analog_data['_fullname'] != ''){
		chnl.fullname = analog_data['_fullname'];
	}
	
	if(analog_data['_internalnumber'] != ''){
		var internalnumber = analog_data['_internalnumber'];
	}
	
	if(analog_data['_hidecallerid'] == 1){
		chnl.hidecallerid = 'yes';
	}else {
		chnl.hidecallerid = 'no';
	}
	
	if(analog_data['_usecallerid'] == 1){
		chnl.usecallerid = 'yes';
	}else{
		chnl.usecallerid = 'no';
	}
	
	if(analog_data['_cidsignalling'] == 2){
		chnl.cidsignalling = 'dtmf';
	}else if(analog_data['_cidsignalling'] == 1){
		chnl.cidsignalling = 'v23';
	}else {
		chnl.cidsignalling = 'bell';
	}
	
	if(analog_data['_dnd'] == 1){
		chnl.dnd = 'yes';
	}else{
		chnl.dnd = 'no';
	}
	
	if(analog_data['_cidstart'] == 3){
		chnl.cidstart = 'dtmf';
	}else if(analog_data['_cidstart'] == 2){
		chnl.cidstart = 'polarity_IN';
	}else if(analog_data['_cidstart'] == 1){
		chnl.cidstart = 'polarity';
	}else{
		chnl.cidstart = 'ring';
	}
	
	if(analog_data['_answerswitch'] == 1){
		chnl.answeronpolarityswitch = 'yes';
	}else{
		chnl.answeronpolarityswitch = 'no';
	}
	
	if(analog_data['_hangupswitch'] == 1){
		chnl.hanguponpolarityswitch = 'yes';
	}else{
		chnl.hanguponpolarityswitch = 'no';
	}

	if(analog_data['_polarityonanswerdelay'] != 0){
		chnl.polarityonanswerdelay = analog_data['_polarityonanswerdelay'];
	}
	
	if(analog_data['_delayreply200okenable'] == 1){
		chnl.delay_reply_200ok_enable = 'yes';
	}else{
		chnl.delay_reply_200ok_enable = 'no';
	}
	
	if(analog_data['_delayreply200oktimer'] != 0){
		chnl.delay_reply_200ok_timer = analog_data['_delayreply200oktimer'];
	}
	
	if(analog_data['_callwaiting'] == 1){
		chnl.callwaiting = 'yes';
	}else{
		chnl.callwaiting = 'no';
	}
	
	if(analog_data['_threewaycalling'] == 1){
		chnl.threewaycalling = 'yes';
	}else{
		chnl.threewaycalling = 'no';
	}
	
	if(analog_data['_transfer'] == 1){
		chnl.transfer = 'yes';
	}else{
		chnl.transfer = 'no';
	}
	
	if(analog_data['_callforward'] != 4){
		chnl.callforward = analog_data['_callforward'];
	}
	
	if(analog_data['_callforwardexten'] != ''){
		chnl.callforwardexten = analog_data['_callforwardexten'];
	}
	
	if(analog_data['_failoverfxo'] != ''){
		chnl.failover_fxo = analog_data['_failoverfxo'];
	}
	
	/* General begin */
	var faileover_fxo_select = '<select size=1 name="failover_fxo" id="failover_fxo"><option value="">None</option>';
	for(var item in all_analog_data){
		if(all_analog_data[item]['_signalling'] == 2){//fxs_ks
			var each_fxo_name = 'fxo-'+all_analog_data[item]['_channel'];
			if(each_fxo_name == chnl.failover_fxo){
				faileover_fxo_select += '<option value="fxo-'+all_analog_data[item]['_channel']+'" selected >fxo-'+all_analog_data[item]['_channel']+'</option>';
			}else{
				faileover_fxo_select += '<option value="fxo-'+all_analog_data[item]['_channel']+'" >fxo-'+all_analog_data[item]['_channel']+'</option>';
			}
		}
	}
	faileover_fxo_select += '</select>';
	$("#chnnl_type").html(chnl.chnnl_type);
	//value
	document.getElementById('portname').value = chnl.portname;
	document.getElementById('rxgain').value = chnl.rxgain;
	document.getElementById('txgain').value = chnl.txgain;
	document.getElementById('ringtimeout').value = chnl.ringtimeout;
	if(chnl.chnnl_type=='FXS'){
		if(flex_routing_sw == 0){
			if(_Define['type'] == 1){
				$("#tab_general table").append(
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+
								language('Failover fxo')+':'+
								'<span class="showhelp">'+
								language('Failover fxo help','When the SIP server registered with the gateway or gateway has a network failure, <br/>the SIP trunking or SIP relay that is registered on the gateway is not available and can be output directly from the PSTN line on the FXO<br/>')+
								'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="failover_fxo_sync" name="failover_fxo_sync" title="Synchronization option"/>'+
							faileover_fxo_select+
							'<span id="failover_fxo"></span>'+
						'</td>'+
					'</tr>'
				);
			}
		}
		
		if(data_temp['_combuf']['_FlexRoutingSw'] == 0){
			if(chnl.associated_chnnl != 'none'){
				var asso_temp = chnl.associated_chnnl.split('-');
				var asso_name = asso_temp[1];
			}else{
				var asso_name = 'none';
			}
			$("#tab_general table").append(
				'<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Sip Account')+':'+
							'<span class="showhelp">'+language('Sip Account help','The channel after receiving the user`s call request,<br/>on behalf of the user to initiate a new call to the<br/>associated SIP request. <br/>')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync associated_checked" id="associated_chnnl_sync" name="associated_chnnl_sync" title="Synchronization option"/>'+
						get_all_sip(sip_data,routing_data,all_analog_data,channel,asso_name)+
					'</td>'+
				'</tr>'
			);
		}
	}else if(chnl.chnnl_type == 'FXO'){
		$("#tab_general table").append(
			'<tr>'+
				'<th>'+
					'<div class="helptooltips">'+
						'<span id="lang_immediatesendcid">'+language('Immediate Send Cid')+'</span>:'+
						'<span id="lang_immediatesendcid_help" class="showhelp">'+language('Immediate Send Cid help','"#" is sent out immediately')+'</span>'+
					'</div>'+
				'</th>'+
				'<td>'+
					'<input type="checkbox" class="setting_sync" id="immediatesendcid_sync" name="immediatesendcid_sync" title="Synchronization option"/>'+
					'<input type="checkbox" name="immediatesendcid" id="immediatesendcid" '+immediatesendcid_check+' />'+
				'</td>'+
			'</tr>'+
			
			'<tr>'+
				'<th>'+
					'<div class="helptooltips">'+
						'<span id="lang_calloutmininterval">'+language('Callout Min Interval')+'</span>:'+
						'<span id="lang_calloutmininterval_help" class="showhelp">'+language('Callout Min Interval help','Callout Min interval (range: 400-10000ms, default: 2000ms)')+'</span>'+
					'</div>'+
				'</th>'+
				'<td>'+
					'<input type="checkbox" class="setting_sync" id="calloutmininterval_sync" name="calloutmininterval_sync" title="Synchronization option"/>'+
					'<input type=text name="calloutmininterval" id="calloutmininterval" value="'+calloutmininterval+'" />'+
					'<span id="ccalloutmininterval" class="number_tip"></span>'+
				'</td>'+
			'</tr>'
		);
	}
	/* General end */
	
	/* Caller ID begin */
	var tab_cid_str = '';
	if(chnl.chnnl_type=='FXS'){
		if(data_temp['_combuf']['_FlexRoutingSw'] == 0){
			var lang_cid_number = language('Caller ID');
			var lang_cid_number_help = language('Caller ID help','Set the caller ID <br/>');
		}else{
			var lang_cid_number = language('Extension Number');
			var lang_cid_number_help = language('Extension Number help', 'Extension Number');
		}
		
		tab_cid_str += '<tr>'+
					'<th>'+
						'<div class="helptooltips">'+lang_cid_number+':'+
							'<span class="showhelp">'+lang_cid_number_help+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync associated_checked" id="cid_number_sync" name="cid_number_sync" title="Synchronization option"/>'+
						'<input type=text name="cid_number" id="cid_number" value="'+chnl.cid_number+'" />'+
						'<span id="ccid_number" class="number_tip"></span>'+
					'</td>'+
				'</tr>'+
				
				'<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Full name')+':'+
							'<span class="showhelp">'+language('Full name help','Set the full name of caller<br/>')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync associated_checked" id="fullname_sync" name="fullname_sync" title="Synchronization option"/>'+
						'<input type=text name="fullname" id="fullname" value="'+chnl.fullname+'" />'+
						'<span id="cfullname" class="number_tip"></span>'+
					'</td>'+
				'</tr>';
				
		if(data_temp['_combuf']['_FlexRoutingSw'] == 0){
			tab_cid_str += '<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Internal Exten Number')+':'+
							'<span class="showhelp">'+language('Internal Exten Number help','Internal Exten Number')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync associated_checked" id="internalnumber_sync" name="internalnumber_sync" title="Synchronization option"/>'+
						'<input type=text name="internalnumber" id="internalnumber" value="'+internalnumber+'" />'+
						'<span id="cinternalnumber" class="number_tip"></span>'+
					'</td>'+
				'</tr>';
		}
	}
	
	if(chnl.chnnl_type=='FXO'){
		if(chnl.usecallerid=='yes'){var use_checked='checked';}else{var use_checked = '';}
		if(chnl.hidecallerid=='yes'){var hide_checked='checked';}else{var hide_checked = '';}
		tab_cid_str += '<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Use callerid')+':'+
							'<span class="showhelp">'+language('Use callerid help','Use callerid or not<br/>')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync" id="usecallerid_sync" name="usecallerid_sync" title="Synchronization option"/>'+
						'<input type=checkbox name="usecallerid" id="usecallerid" '+use_checked+' /><span id="cusecallerid"></span>'+
					'</td>'+
				'</tr>'+
				
				'<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Hide callerid')+':'+
							'<span class="showhelp">'+language('Hide callerid help','Whether or not to hide outgoing caller ID. <br/>')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync" id="hidecallerid_sync" name="hidecallerid_sync" title="Synchronization option"/>'+
						'<input type=checkbox name="hidecallerid" id="hidecallerid" '+hide_checked+'/><span id="chidecallerid"></span>'+
					'</td>'+
				'</tr>';
	}
		
	var cid_select = '<select name="cidsignalling" id="cidsignalling">';
	if(chnl.cidsignalling=='bell'){
		cid_select = cid_select+'<option value="bell" selected>bell</option>';
	}else{
		cid_select = cid_select+'<option value="bell">bell</option>';
	}
	if(chnl.cidsignalling=='v23'){
		cid_select = cid_select+'<option value="v23" selected>v23</option>';
	}else{
		cid_select = cid_select+'<option value="v23">v23</option>';
	}
	if(chnl.cidsignalling=='dtmf'){
		cid_select = cid_select+'<option value="dtmf" selected>dtmf</option></select>';
	}else{
		cid_select = cid_select+'<option value="dtmf">dtmf</option></select>';
	}
	if(chnl.dnd=='yes'){var dnd_check='checked';}else{var dnd_check = '';}
	tab_cid_str += '<tr>'+
			'<th>'+
				'<div class="helptooltips">'+language('CID signalling')+':'+
					'<span class="showhelp">'+language('CID signalling help','Type of caller ID signalling in use. <br/>')+'</span>'+
				'</div>'+
			'</th>'+
			'<td>'+
				'<input type="checkbox" class="setting_sync" id="cidsignalling_sync" name="cidsignalling_sync" title="Synchronization option"/>'+
				cid_select+
				'<span id="ccidsignalling"></span>'+
			'</td>'+
		'</tr>'+
		
		'<tr>'+
			'<th>'+
				'<div class="helptooltips">'+language('DND')+':'+
					'<span class="showhelp">'+language('dnd help','Do not disturb. <br/>')+'</span>'+
				'</div>'+
			'</th>'+
			'<td>'+
				'<input type="checkbox" class="setting_sync" id="dnd_sync" name="dnd_sync" title="Synchronization option"/>'+
				'<input type="checkbox" id="dnd" name="dnd" '+dnd_check+'/>'+
			'</td>'+
		'</tr>';
	
	if(chnl.chnnl_type=='FXO'){
		var cid_start_select = '<select name="cidstart" id="cidstart">';
		if(chnl.cidstart=='ring'){
			cid_start_select = cid_start_select+'<option value="ring" selected>ring</option>';
		}else{
			cid_start_select = cid_start_select+'<option value="ring">ring</option>';
		}
		if(chnl.cidstart=='polarity'){
			cid_start_select = cid_start_select+'<option value="polarity" selected>polarity</option>';
		}else{
			cid_start_select = cid_start_select+'<option value="polarity">polarity</option>';
		}
		if(chnl.cidstart=='polarity_IN'){
			cid_start_select = cid_start_select+'<option value="polarity_IN" selected>polarity_IN</option>';
		}else{
			cid_start_select = cid_start_select+'<option value="polarity_IN">polarity_IN</option>';
		}
		if(chnl.cidstart=='dtmf'){
			cid_start_select = cid_start_select+'<option value="dtmf" selected>dtmf</option></select>';
		}else{
			cid_start_select = cid_start_select+'<option value="dtmf">dtmf</option></select>';
		}
		tab_cid_str += '<tr>'+
			'<th>'+
				'<div class="helptooltips">'+language('CID start signal')+':'+
					'<span class="showhelp">'+language('CID start signal help','Set the signals of start of caller ID<br/>ring = a ring signals the start (default)<br/>polarity = polarity reversal signals the start<br/>polarity_IN = polarity reversal signals the start, for India<br/>')+'</span>'+
				'</div>'+
			'</th>'+
			'<td>'+
				'<input type="checkbox" class="setting_sync" id="cidstart_sync" name="cidstart_sync" title="Synchronization option"/>'+
				cid_start_select+
				'<span id="ccidstart"></span>'+
			'</td>'+
		'</tr>';
	}
	$("#tab_cid").html(tab_cid_str);
	/* Caller ID end */
	
	/* Polarity begin */
	if(chnl.answeronpolarityswitch=='yes'){var ans_checked = 'checked';}else{var ans_checked = '';}
	if(chnl.hanguponpolarityswitch=='yes'){var hang_checked = 'checked';}else{var hang_checked = '';}
	if(chnl.delay_reply_200ok_enable=='yes'){var delay_checked = 'checked';}else{var delay_checked = '';}
	var after_tab_cid_str = '<div id="newline"></div>'+
		'<div id="tab">'+
			'<li class="tb_unfold" onclick="lud(this,\'tab_polarity\')" id="tab_polarity_li">&nbsp;</li>'+
			'<li class="tbg_fold" onclick="lud(this,\'tab_polarity\')">'+language('Polarity')+'</li>'+
			'<li class="tb2_fold" onclick="lud(this,\'tab_polarity\')">&nbsp;</li>'+
			'<li class="tb_end">&nbsp;</li>'+
		'</div>'+
		
		'<div id="tab_polarity" style="display:block;height:100px">'+
			'<table width="98%" class="tedit" align="right" >'+
				'<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Answer on polarity switch')+':'+
							'<span class="showhelp">'+language('Answer on polarity switch help','Use a polarity reversal to mark when a outgoing call is answered by the remote party.<br/>')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync" id="answeronpolarityswitch_sync" name="answeronpolarityswitch_sync" title="Synchronization option"/>'+
						'<input type=checkbox name="answeronpolarityswitch" id="answeronpolarityswitch" '+ans_checked+'/><span id="cansweronpolarityswitch"></span>'+
					'</td>'+
				'</tr>'+
			
				'<tr>'+
					'<th>'+
						'<div class="helptooltips">'+language('Hangup on polarity switch')+':'+
							'<span class="showhelp">'+language('Hangup on polarity switch help','In some countries, a polarity reversal is used to signal the disconnect of a<br/>phone line.  If this option is selected, the call will be considered hung up <br/>on a polarity reversal. <br/>')+'</span>'+
						'</div>'+
					'</th>'+
					'<td>'+
						'<input type="checkbox" class="setting_sync" id="hanguponpolarityswitch_sync" name="hanguponpolarityswitch_sync" title="Synchronization option"/>'+
						'<input type=checkbox name="hanguponpolarityswitch" id="hanguponpolarityswitch" '+hang_checked+'/><span id="changuponpolarityswitch"></span>'+
					'</td>'+
				'</tr>';
	if(chnl.chnnl_type=='FXO'){
		after_tab_cid_str += '<tr>'+
						'<th>'+
							'<div class="helptooltips">'+language('Polarity on answer delay')+':'+
								'<span class="showhelp">'+language('Polarity on answer delay help','Minimal time period (ms) between the answer polarity switch and hangup polarity switch. <br/>(default: 600ms)<br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="polarityonanswerdelay_sync" name="polarityonanswerdelay_sync" title="Synchronization option"/>'+
							'<input type=text name="polarityonanswerdelay" id="polarityonanswerdelay" value="'+chnl.polarityonanswerdelay+'" />'+
							'<span id="cpolarityonanswerdelay" class="number_tip"></span>'+
						'</td>'+
					'</tr>'+
					
					'<tr id="tr_delay_reply_200ok_enable">'+
						'<th>'+
							'<div class="helptooltips">'+language('Delay reply 200 OK switch')+':'+
								'<span class="showhelp">'+language('Delay reply 200 OK switch help','It is invalid when start polarity; <br/>On: delay timer to reply 200 ok; <br/>Off: immediately reply 200 ok. <br/>default is off. <br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="delay_reply_200ok_enable_sync" name="delay_reply_200ok_enable_sync" title="Synchronization option"/>'+
							'<input type=checkbox name="delay_reply_200ok_enable" id="delay_reply_200ok_enable" onchange="delay_reply_200ok_change()" '+delay_checked+' /><span id="delay_reply_200ok_enable"></span>'+
						'</td>'+
					'</tr>'+
					
					'<tr id="tr_delay_reply_200ok_timer">'+
						'<th>'+
							'<div class="helptooltips">'+language('Delay reply 200 OK timer')+':'+
								'<span class="showhelp">(default: 8s)<br/>'+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="delay_reply_200ok_timer_sync" name="delay_reply_200ok_timer_sync" title="Synchronization option"/>'+
							'<input type=text name="delay_reply_200ok_timer" id="delay_reply_200ok_timer" value="'+chnl.delay_reply_200ok_timer+'" /> s'+
							'<span id="cdelay_reply_200ok_timer" class="number_tip"></span>'+
						'</td>'+
					'</tr>';
	}
	after_tab_cid_str += '</table></div>';
	/* Polarity end */
	
	/* Call feature begin */
	var callforward_selected = '<select name="callforward" id="callforward" onchange="callforward_type_change()">';
	if(chnl.callforward==0){
		callforward_selected = callforward_selected+'<option value=0 selected>No</option>';
	}else{
		callforward_selected = callforward_selected+'<option value=0>No</option>';
	}
	if(chnl.callforward==1){
		callforward_selected = callforward_selected+'<option value=1 selected>Unconditional</option>';
	}else{
		callforward_selected = callforward_selected+'<option value=1>Unconditional</option>';
	}
	if(chnl.callforward==2){
		callforward_selected = callforward_selected+'<option value=2 selected>No answer</option>';
	}else{
		callforward_selected = callforward_selected+'<option value=2>No answer</option>';
	}
	if(chnl.callforward==3){
		callforward_selected = callforward_selected+'<option value=3 selected>Busy</option></select>';
	}else{
		callforward_selected = callforward_selected+'<option value=3>Busy</option></select>';
	}
	if(chnl.callwaiting=='yes'){var callwaitting_checked = 'checked';}else{var callwaitting_checked = '';}
	if(chnl.threewaycalling=='yes'){var threewaycalling_checked = 'checked';}else{var threewaycalling_checked = '';}
	if(chnl.transfer=='yes'){var transfer_checked = 'checked';}else{var transfer_checked = '';}
	if(chnl.chnnl_type=='FXS'){
		after_tab_cid_str +='<div id="newline"></div>'+
			'<div id="tab">'+
				'<li class="tb_unfold" onclick="lud(this,\'tab_callfeature\')" id="tab_callfeature_li">&nbsp;</li>'+
				'<li class="tbg_fold" onclick="lud(this,\'tab_callfeature\')">'+language('Call feature')+'</li>'+
				'<li class="tb2_fold" onclick="lud(this,\'tab_callfeature\')">&nbsp;</li>'+
				'<li class="tb_end">&nbsp;</li>'+
			'</div>'+
			
			'<div id="tab_callfeature" style="display:block;height:210px">'+
				'<table width="98%" class="tedit" align="right" >'+
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+language('Call waiting')+':'+
								'<span class="showhelp">'+language('Call waiting help','Turn on/off call waiting function. <br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="callwaiting_sync" name="callwaiting_sync" title="Synchronization option"/>'+
							'<input type=checkbox name="callwaiting" id="callwaiting" '+callwaitting_checked+'/><span id="ccallwaiting"></span>'+
						'</td>'+
					'</tr>'+
					
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+language('Three way calling')+':'+
								'<span class="showhelp">'+language('Three way calling help','Turn on/off three way calling function. <br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="threewaycalling_sync" name="threewaycalling_sync" title="Synchronization option"/>'+
							'<input type=checkbox name="threewaycalling" id="threewaycalling" '+threewaycalling_checked+' /><span id="cthreewaycalling"></span>'+
						'</td>'+
					'</tr>'+
					
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+language('Call transfer')+':'+
								'<span class="showhelp">'+language('Call transfer help','Turn on/off call transfer function. <br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="transfer_sync" name="transfer_sync" title="Synchronization option"/>'+
							'<input type=checkbox name="transfer" id="transfer" '+transfer_checked+'/><span id="ctransfer"></span>'+
						'</td>'+
					'</tr>'+
					
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+language('Call forward')+':'+
								'<span class="showhelp">'+language('Call forward help','Turn on/off call forward function. <br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="callforward_sync" name="callforward_sync" title="Synchronization option"/>'+
							callforward_selected+
							'<span id="ccallforward"></span>'+
						'</td>'+
					'</tr>'+
					
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+language('Call forward number')+':'+
								'<span class="showhelp">'+language('Call forward number help','Set the call forward number. <br/>')+'</span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" class="setting_sync" id="callforwardexten_sync" name="callforwardexten_sync" title="Synchronization option"/>'+
							'<input type=text name="callforwardexten" id="callforwardexten" value="'+chnl.callforwardexten+'" />'+
							'<span id="callforwardexten" class="number_tip"></span>'+
						'</td>'+
					'</tr>'+
				'</table>'+
			'</div>';
	}
	$("#after_tab_cid").html(after_tab_cid_str);
	if(chnl.chnnl_type=='FXS'){
		callforward_type_change();
	}
	/* Call feature end */
	
	/* Call limit begin */
	//calllimit_data
	var call_limit_sw = calllimit_data['_sw'];
	if(call_limit_sw == 1){
		var call_limit_checked = true;
	}else{
		var call_limit_checked = false;
	}
	var call_time = calllimit_data['_calltime'];
	var day_call = calllimit_data['_daycalls'];
	var day_answers = calllimit_data['_dayanwers'];
	var hour_call = calllimit_data['_hourcalls'];
	
	document.getElementById('call_limit_switch').checked = call_limit_checked;
	document.getElementById('call_time_settings').value = call_time;
	document.getElementById('day_calls_settings').value = day_call;
	document.getElementById('day_answer_setting').value = day_answers;
	document.getElementById('hour_calls_settings').value = hour_call;
	/* Call limit end */
	
	/* CallerID detect begin */
	if(chnl.chnnl_type=='FXO'){
		if(analog_data['_cidbeforering'] == 1){
			var callerid_detect_checked = 'checked';
			cidbeforering_val = 1;
		}else{
			var callerid_detect_checked = '';
			cidbeforering_val = 0;
		}
		
		var callerid_detect_str = 
			'<div id="newline"></div>'+
			
			'<div id="tab">'+
				'<li class="tb_unfold" onclick="lud(this,\'tab_calleriddetect\')" id="tab_calleriddetect_li">&nbsp;</li>'+
				'<li class="tbg_fold" id="lang_callerid_detect" onclick="lud(this,\'tab_calleriddetect\')"></li>'+
				'<li class="tb2_fold" onclick="lud(this,\'tab_calleriddetect\')">&nbsp;</li>'+
				'<li class="tb_end">&nbsp;</li>'+
			'</div>'+
			'<div id="tab_calleriddetect">'+
				'<table width="98%" class="tedit" align="right">'+
					'<tr>'+
						'<th>'+
							'<div class="helptooltips">'+
								'<span id="lang_cidbeforering"></span>:'+
								'<span class="showhelp" id="lang_cidbeforering_help"></span>'+
							'</div>'+
						'</th>'+
						'<td>'+
							'<input type="checkbox" name="cidbeforering_sync" id="cidbeforering_sync" class="setting_sync" title="Synchronization option" />'+
							'<input type="checkbox" name="cidbeforering" id="cidbeforering" '+callerid_detect_checked+'/>'+
							'<span id="ccidbeforering"></span>'+
						'</td>'+
					'</tr>'+
				'</table>'+
			'</div>';
		
		$("#tab_limit").after(callerid_detect_str);
		
		$("#lang_callerid_detect").html(language('CallerID detect'));
		$("#lang_cidbeforering").html(language('cidbeforering'));
		$("#lang_cidbeforering_help").html(language('cidbeforering help','Swith to handle irregular CID function.'));
	}
	/* CallerID detect end */
	
	/* Save To Other Channel begin */ 
	var _port_str = '<tr>';
	var k = 1;
	for(t in all_analog_data){
		var each_chn = all_analog_data[t]['_channel'];
		if(chnl.chnnl_type=='FXS'){
			if(all_analog_data[t]['_signalling'] == 1){//1:fxo_ks
				if(k%4!=1 || k==1){
					if(channel==each_chn){
						_port_str += '<td><input type="checkbox" checked disabled>FXS-'+each_chn+'</td>';
					}else{
						_port_str += '<td><input type="checkbox" class="port" name="spans['+each_chn+']" value="'+each_chn+'">FXS-'+each_chn+'</td>';
					}
				}
				if(k%4==1 && k!=1){
					if(channel==each_chn){
						_port_str += '</tr><tr><td><input type="checkbox" checked disabled>FXS-'+each_chn+'</td>';
					}else{
						_port_str += '</tr><tr><td><input type="checkbox" class="port" name="spans['+each_chn+']" value="'+each_chn+'">FXS-'+each_chn+'</td>';
					}
				}
				k++;
			}
		}
		
		if(chnl.chnnl_type=='FXO'){
			if(all_analog_data[t]['_signalling'] == 2){//2:fxs_ks
				if(k%4!=1 || k==1){
					if(channel==each_chn){
						_port_str += '<td><input type="checkbox" checked disabled>FXO-'+each_chn+'</td>';
					}else{
						_port_str += '<td><input type="checkbox" class="port" name="spans['+each_chn+']" value="'+each_chn+'">FXO-'+each_chn+'</td>';
					}
				}
				if(k%4==1 && k!=1){
					if(channel==each_chn){
						_port_str += '</tr><tr><td><input type="checkbox" checked disabled>FXO-'+each_chn+'</td>';
					}else{
						_port_str += '</tr><tr><td><input type="checkbox" class="port" name="spans['+each_chn+']" value="'+each_chn+'">FXO-'+each_chn+'</td>';
					}
				}
				k++;
			}
		}
	}
	$("#port_str").html(_port_str);
	/* Save To Other Channel end */
	
	/* sidebar begin */
	var sidebar_html = '';
	var item_color = '';
	for(var item in all_analog_data){
		if(channel == all_analog_data[item]['_channel']){
			item_color = 'color:#CD3278;';
		}else{
			item_color = 'color:LemonChiffon4;';
		}
		
		if(all_analog_data[item]['_signalling'] == 3){
			continue;
		}
		
		if(all_analog_data[item]['_signalling'] == 1){
			sidebar_html += '<li><a style="'+item_color+'" href="alg-chnsettings-edit.html?chnl_num='+all_analog_data[item]['_channel']+'&chnl_type=FXS" >FXS-'+all_analog_data[item]['_channel']+'</a></li>';
		}else{
			sidebar_html += '<li><a style="'+item_color+'" href="alg-chnsettings-edit.html?chnl_num='+all_analog_data[item]['_channel']+'&chnl_type=FXO" >FXO-'+all_analog_data[item]['_channel']+'</a></li>';
		}
	}
	$("#sort_info").html(sidebar_html);
	/* sidebar end */
}


var url = get_url_para();
var channel = url['chnl_num'];
var chnl_type = url['chnl_type'];

object.AGAlgChannelGetOne(succeed_back, error_back, channel);

function succeed_back(data){
	var data_temp = data['_get'];
	if(chnl_type == 'FXS'){
		var analog_data = data_temp['_fxo'];
	}else if(chnl_type == 'FXO'){
		var analog_data = data_temp['_fxs'];
	}
	var all_analog_data = data_temp['_section']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	var routing_data = data_temp['_routing']['_item'];
	var calllimit_data = data_temp['_limit'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	
	header(data_temp['_combuf']);
	edit_chnl(data_temp);
	footer();
	
	onload_show(all_analog_data);
	
	if(chnl_type == 'FXS'){
		flag = 1;
	}else if(chnl_type == 'FXO'){
		flag = 0;
	}
	
	$(".save_input").click(function(){
		if(check(all_analog_data,sip_data,routing_data,flag)){
			if(save_only_once()){
				$("#loading_image").show();
				save_channel(analog_data, flex_routing_sw);
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/**************************************SHOW CHANNEL END*********************************************/



/**************************************SAVE CHANNEL BEGIN*********************************************/
function save_channel(analog_data, flex_routing_sw){
	var chnl = new Channel();
	var AnaSave = new AST_AnaSave();
	/* FXS begin */
	if(chnl_type == 'FXS'){
		var anacontextfxoks = new AST_AnaContextFxoks();
		
		chnl.portname = document.getElementById('portname').value;
		anacontextfxoks._name = chnl.portname;
		
		chnl.rxgain = document.getElementById('rxgain').value;
		anacontextfxoks._rxgain = chnl.rxgain;
		
		chnl.txgain = document.getElementById('txgain').value;
		anacontextfxoks._txgain = chnl.txgain;
		
		chnl.ringtimeout = document.getElementById('ringtimeout').value;
		if(chnl.ringtimeout == ''){
			chnl.ringtimeout = 0;
		}
		anacontextfxoks._ringtimeout = chnl.ringtimeout;
		
		if(flex_routing_sw == 0 && _Define['type'] == 1){
			chnl.failover_fxo = document.getElementById('failover_fxo').value;
		}else{
			chnl.failover_fxo = '';
		}
		anacontextfxoks._failoverfxo = chnl.failover_fxo;
		
		if(flex_routing_sw == 1){
			chnl.associated_chnnl = 'none';
		}else{
			chnl.associated_chnnl = document.getElementById('associated_chnnl').value;
		}
		anacontextfxoks._associatedchnnl = chnl.associated_chnnl;
		
		anacontextfxoks._telephonetype = 0;
		
		chnl.cid_number = document.getElementById('cid_number').value;
		if(chnl.cid_number == ''){
			chnl.cid_number = 0;
		}
		anacontextfxoks._cidnumber = chnl.cid_number;
		
		chnl.fullname = document.getElementById('fullname').value;
		anacontextfxoks._fullname = chnl.fullname;
		
		if(flex_routing_sw == 0){
			var internalnumber = document.getElementById('internalnumber').value;
		}else{
			var internalnumber = '';
		}
		anacontextfxoks._internalnumber = internalnumber;
		
		var cidsignalling_val = document.getElementById('cidsignalling').value;
		if(cidsignalling_val == 'dtmf'){
			chnl.cidsignalling = 2;
		}else if(cidsignalling_val == 'v23'){
			chnl.cidsignalling = 1;
		}else if(cidsignalling_val == 'bell'){
			chnl.cidsignalling = 0;
		}else{
			chnl.cidsignalling = 3;
		}
		anacontextfxoks._cidsignalling = chnl.cidsignalling;
		
		if(document.getElementById('dnd').checked == true){
			chnl.dnd = 1;
		}else{
			chnl.dnd = 0;
		}
		anacontextfxoks._dnd = chnl.dnd;
		
		if(document.getElementById('answeronpolarityswitch').checked == true){
			chnl.answeronpolarityswitch = 1;
		}else{
			chnl.answeronpolarityswitch = 0;
		}
		anacontextfxoks._answerswitch = chnl.answeronpolarityswitch;
		
		if(document.getElementById('hanguponpolarityswitch').checked == true){
			chnl.hanguponpolarityswitch = 1;
		}else{
			chnl.hanguponpolarityswitch = 0;
		}
		anacontextfxoks._hangupswitch = chnl.hanguponpolarityswitch;
		
		if(document.getElementById('callwaiting').checked == true){
			chnl.callwaiting = 1;
		}else{
			chnl.callwaiting = 0;
		}
		anacontextfxoks._callwaiting = chnl.callwaiting;
		
		if(document.getElementById('threewaycalling').checked == true){
			chnl.threewaycalling = 1;
		}else{
			chnl.threewaycalling = 0;
		}
		anacontextfxoks._threewaycalling = chnl.threewaycalling;
		
		if(document.getElementById('transfer').checked == true){
			chnl.transfer = 1;
		}else{
			chnl.transfer = 0;
		}
		anacontextfxoks._transfer = chnl.transfer;
		
		chnl.callforward = document.getElementById('callforward').value;
		anacontextfxoks._callforward = chnl.callforward;
		
		if(chnl.callforward != 0){
			chnl.callforwardexten = document.getElementById('callforwardexten').value;
		}else{
			chnl.callforwardexten = '';
		}
		anacontextfxoks._callforwardexten = chnl.callforwardexten;
		
		AnaSave._fxo = anacontextfxoks;
	}
	/* FXS end */
	
	/* FXO begin */
	if(chnl_type == 'FXO'){
		var anacontextfxsks = new AST_AnaContextFxsks();
		
		chnl.portname = document.getElementById('portname').value;
		anacontextfxsks._name = chnl.portname;
		
		chnl.rxgain = document.getElementById('rxgain').value;
		anacontextfxsks._rxgain = chnl.rxgain;
		
		chnl.txgain = document.getElementById('txgain').value;
		anacontextfxsks._txgain = chnl.txgain;
		
		chnl.ringtimeout = document.getElementById('ringtimeout').value;
		if(chnl.ringtimeout == ''){
			chnl.ringtimeout = 0;
		}
		anacontextfxsks._ringtimeout = chnl.ringtimeout;
		
		if(document.getElementById('immediatesendcid').checked == true){
			var immediatesendcid = 1;
		}else{
			var immediatesendcid = 0;
		}
		anacontextfxsks._immediatesendcid = immediatesendcid;
		
		var calloutmininterval = document.getElementById('calloutmininterval').value;
		if(calloutmininterval == ''){
			calloutmininterval = 2000;
		}
		anacontextfxsks._calloutmininterval = calloutmininterval;
		
		if(document.getElementById('usecallerid').checked == true){
			chnl.usecallerid = 1;
		}else{
			chnl.usecallerid = 0;
		}
		anacontextfxsks._usecallerid = chnl.usecallerid;
		
		if(document.getElementById('hidecallerid').checked == true){
			chnl.hidecallerid = 1;
		}else{
			chnl.hidecallerid = 0;
		}
		anacontextfxsks._hidecallerid = chnl.hidecallerid;
		
		var cidsignalling_val = document.getElementById('cidsignalling').value;
		if(cidsignalling_val == 'dtmf'){
			chnl.cidsignalling = 2;
		}else if(cidsignalling_val == 'v23'){
			chnl.cidsignalling = 1;
		}else if(cidsignalling_val == 'bell'){
			chnl.cidsignalling = 0;
		}else{
			chnl.cidsignalling = 3;
		}
		anacontextfxsks._cidsignalling = chnl.cidsignalling;
		
		if(document.getElementById('dnd').checked == true){
			chnl.dnd = 1;
		}else{
			chnl.dnd = 0;
		}
		anacontextfxsks._dnd = chnl.dnd;
		
		var cidstart_val = document.getElementById('cidstart').value;
		if(cidstart_val == 'dtmf'){
			chnl.cidstart = 3;
		}else if(cidstart_val == 'polarity_IN'){
			chnl.cidstart = 2;
		}else if(cidstart_val == 'polarity'){
			chnl.cidstart = 1;
		}else if(cidstart_val == 'ring'){
			chnl.cidstart = 0;
		}else{
			chnl.cidstart = 4;
		}
		anacontextfxsks._cidstart = chnl.cidstart;
		
		if(document.getElementById('answeronpolarityswitch').checked == true){
			chnl.answeronpolarityswitch = 1;
		}else{
			chnl.answeronpolarityswitch = 0;
		}
		anacontextfxsks._answerswitch = chnl.answeronpolarityswitch;
		
		if(document.getElementById('hanguponpolarityswitch').checked == true){
			chnl.hanguponpolarityswitch = 1;
		}else{
			chnl.hanguponpolarityswitch = 0;
		}
		anacontextfxsks._hangupswitch = chnl.hanguponpolarityswitch;
		
		chnl.polarityonanswerdelay = document.getElementById('polarityonanswerdelay').value;
		if(chnl.polarityonanswerdelay == ''){
			chnl.polarityonanswerdelay = 0;
		}
		anacontextfxsks._polarityonanswerdelay = chnl.polarityonanswerdelay;
		
		if(document.getElementById('delay_reply_200ok_enable').checked == true){
			chnl.delay_reply_200ok_enable = 1;
		}else{
			chnl.delay_reply_200ok_enable = 0;
		}
		anacontextfxsks._delayreply200okenable = chnl.delay_reply_200ok_enable;
		
		chnl.delay_reply_200ok_timer = document.getElementById('delay_reply_200ok_timer').value;
		if(chnl.delay_reply_200ok_timer == ''){
			chnl.delay_reply_200ok_timer = 0;
		}
		anacontextfxsks._delayreply200oktimer = chnl.delay_reply_200ok_timer;
		
		if(document.getElementById('cidbeforering').checked){
			var cidbeforering = 1;
		}else{
			var cidbeforering = 0;
		}
		anacontextfxsks._cidbeforering = cidbeforering;
		
		//check cidbeforering change
		if(document.getElementById('cidbeforering').checked){
			var cidbeforering_val = 1;
		}else{
			var cidbeforering_val = 0;
		}
		if(cidbeforering_val != analog_data['_cidbeforering']){
			confirm(language("Save Interrupt Call help", "Save will interrupt the call. Are you sure you want to save it?"));
		}
		
		AnaSave._fxs = anacontextfxsks;
	}
	/* FXO end */
	
	/* call limit begin */
	var calllimit = new AST_UcpAlgCalllimit();
	if(document.getElementById('call_limit_switch').checked == true){
		var call_limit_sw = 1;
	}else{
		var call_limit_sw = 0;
	}
	calllimit._sw = call_limit_sw;
	
	var call_time_settings = document.getElementById('call_time_settings').value;
	calllimit._calltime = call_time_settings;
	
	var day_calls_settings = document.getElementById('day_calls_settings').value;
	calllimit._daycalls = day_calls_settings;
	
	var day_answer_setting = document.getElementById('day_answer_setting').value;
	calllimit._dayanwers = day_answer_setting;
	
	var hour_calls_settings = document.getElementById('hour_calls_settings').value;
	calllimit._hourcalls = hour_calls_settings;
	
	AnaSave._limit = calllimit;
	/* call limit end */
	
	/* save to other channel begin */
	var sync;
	$(".port").each(function(){
		var port_checked = $(this).attr('checked');
		if(port_checked == 'checked'){
			sync = 1;
			return false;
		}else{
			sync = 0;
		}
	});
	
	var setting_sync;
	$(".setting_sync").each(function(){
		var setting_checked = $(this).attr('checked');
		if(setting_checked == 'checked'){
			setting_sync = 1;
			return false;
		}else{
			setting_sync = 0;
		}
	});
	
	var asso_chnl = null;
	var LineArr = new AST_LineArr();
	var LimitLineArr = new AST_LineArr();
	var SectionArr = new AST_SectionArr();
	if(sync && setting_sync){
		$(".port").each(function(){
			if($(this).attr('checked') == 'checked'){
				/* section begin */
				var each_channel = $(this).val();
				var ast_section = new AST_Section();
				ast_section._section = each_channel;
				SectionArr._item.push(ast_section);
				/* section end */
			}
		});
		
		/* parameter begin */
		if(chnl_type == 'FXS'){
			if(_Define['type'] == 1){
				if(document.getElementById('failover_fxo_sync').checked == true){
					var failover_fxo = new AST_Line();
					failover_fxo._key = 'failover_fxo';
					failover_fxo._value = chnl.failover_fxo;
					LineArr._item.push(failover_fxo);
				}
			}
			
			if(document.getElementById('callwaiting_sync').checked == true){
				var line_callwaiting = new AST_Line();
				line_callwaiting._key = 'callwaiting';
				if(chnl.callwaiting == 1){
					line_callwaiting._value = 'yes';
				}else if(chnl.callwaiting == 0){
					line_callwaiting._value = 'no';
				}
				LineArr._item.push(line_callwaiting);
			}
			
			if(document.getElementById('threewaycalling_sync').checked == true){
				var line_threewaycalling = new AST_Line();
				line_threewaycalling._key = 'threewaycalling';
				if(chnl.threewaycalling == 1){
					line_threewaycalling._value = 'yes';
				}else if(chnl.threewaycalling == 0){
					line_threewaycalling._value = 'no';
				}
				LineArr._item.push(line_threewaycalling);
			}
			
			if(document.getElementById('transfer_sync').checked == true){
				var line_transfer = new AST_Line();
				line_transfer._key = 'transfer';
				if(chnl.transfer == 1){
					line_transfer._value = 'yes';
				}else if(chnl.transfer == 0){
					line_transfer._value = 'no';
				}
				LineArr._item.push(line_transfer);
			}
			
			if(document.getElementById('callforward_sync').checked == true){
				var line_callforward = new AST_Line();
				line_callforward._key = 'callforward';
				line_callforward._value = chnl.callforward;
				LineArr._item.push(line_callforward);
			}
			
			if(document.getElementById('callforwardexten_sync').checked == true){
				var line_callforwardexten = new AST_Line();
				line_callforwardexten._key = 'callforwardexten';
				line_callforwardexten._value = chnl.callforwardexten;
				LineArr._item.push(line_callforwardexten);
			}
		
			if(flex_routing_sw == 0){
				if(document.getElementById('associated_chnnl_sync').checked == true){
					var line_associated_chnnl = new AST_Line();
					line_associated_chnnl._key = 'associated_chnnl';
					line_associated_chnnl._value = chnl.associated_chnnl;
					asso_chnl = chnl.associated_chnnl;
					// LineArr._item.push(line_associated_chnnl);
				}
			}
			
			if(document.getElementById('cid_number_sync').checked == true){
				var line_cid_number = new AST_Line();
				line_cid_number._key = 'cid_number';
				line_cid_number._value = chnl.cid_number;
				//LineArr._item.push(line_cid_number);
			}
			
			if(document.getElementById('fullname_sync').checked == true){
				var line_fullname = new AST_Line();
				line_fullname._key = 'fullname';
				line_fullname._value = chnl.fullname;
				//LineArr._item.push(line_fullname);
			}
			
			if(flex_routing_sw == 0){
				if(document.getElementById('internalnumber_sync').checked == true){
					var line_internalnumber = new AST_Line();
					line_internalnumber._key = 'internalnumber';
					line_internalnumber.value = internalnumber;
					// LineArr._item.push(line_internalnumber);
				}
			}
		}
		
		
		if(chnl_type == 'FXO'){
			if(document.getElementById('immediatesendcid_sync').checked == true){
				var line_immediatesendcid = new AST_Line();
				line_immediatesendcid._key = 'immediatesendcid';
				if(immediatesendcid == 1){
					immediatesendcid = 'yes';
				}else if(immediatesendcid == 0){
					immediatesendcid = 'no';
				}
				line_immediatesendcid._value = immediatesendcid;
				
				LineArr._item.push(line_immediatesendcid);
			}
			
			if(document.getElementById('calloutmininterval_sync').checked == true){
				var line_calloutmininterval = new AST_Line();
				line_calloutmininterval._key = 'calloutmininterval';
				line_calloutmininterval._value = calloutmininterval;
				
				LineArr._item.push(line_calloutmininterval);
			}
			
			if(document.getElementById('hidecallerid_sync').checked == true){
				var line_hidecallerid = new AST_Line();
				line_hidecallerid._key = 'hidecallerid';
				if(chnl.hidecallerid == 1){
					line_hidecallerid._value = 'yes';
				}else if(chnl.hidecallerid == 0){
					line_hidecallerid._value = 'no';
				}
				LineArr._item.push(line_hidecallerid);
			}
		
			if(document.getElementById('usecallerid_sync').checked == true){
				var line_usecallerid = new AST_Line();
				line_usecallerid._key = 'usecallerid';
				if(chnl.usecallerid == 1){
					line_usecallerid._value = 'yes';
				}else if(chnl.usecallerid == 0){
					line_usecallerid._value = 'no';
				}
				LineArr._item.push(line_usecallerid);
			}
			
			if(document.getElementById('cidstart_sync').checked == true){
				var line_cidstart = new AST_Line();
				line_cidstart._key = 'cidstart';
				if(chnl.cidstart == 3){
					line_cidstart._value = 'dtmf';
				}else if(chnl.cidstart == 2){
					line_cidstart._value = 'polarity_IN';
				}else if(chnl.cidstart == 1){
					line_cidstart._value = 'polarity';
				}else if(chnl.cidstart == 0){
					line_cidstart._value = 'ring';
				}
				LineArr._item.push(line_cidstart);
			}
		
			if(document.getElementById('polarityonanswerdelay_sync').checked == true){
				var line_polarityonanswerdelay = new AST_Line();
				line_polarityonanswerdelay._key = 'polarityonanswerdelay';
				line_polarityonanswerdelay._value = chnl.polarityonanswerdelay;
				LineArr._item.push(line_polarityonanswerdelay);
			}
			
			if(document.getElementById('delay_reply_200ok_enable_sync').checked == true){
				var line_delay_reply_200ok_enable = new AST_Line();
				line_delay_reply_200ok_enable._key = 'delay_reply_200ok_enable';
				if(chnl.delay_reply_200ok_enable == 1){
					line_delay_reply_200ok_enable._value = 'yes';
				}else if(chnl.delay_reply_200ok_enable == 0){
					line_delay_reply_200ok_enable._value = 'no';
				}
				LineArr._item.push(line_delay_reply_200ok_enable);
			}
			
			if(document.getElementById('delay_reply_200ok_timer_sync').checked == true){
				var line_delay_reply_200ok_timer = new AST_Line();
				line_delay_reply_200ok_timer._key = 'delay_reply_200ok_timer';
				line_delay_reply_200ok_timer._value = chnl.delay_reply_200ok_timer;
				LineArr._item.push(line_delay_reply_200ok_timer);
			}
			
			if(document.getElementById('cidbeforering_sync').checked == true){
				var line_cidbeforering = new AST_Line();
				line_cidbeforering._key = 'cidbeforering';
				line_cidbeforering._value = cidbeforering;
				LineArr._item.push(line_cidbeforering);
			}
		}
		
		if(document.getElementById('rxgain_sync').checked == true){
			var line_rxgain = new AST_Line();
			line_rxgain._key = 'rxgain';
			line_rxgain._value = chnl.rxgain;
			LineArr._item.push(line_rxgain);
		}
		
		if(document.getElementById('txgain_sync').checked == true){
			var line_txgain = new AST_Line();
			line_txgain._key = 'txgain';
			line_txgain._value = chnl.txgain;
			LineArr._item.push(line_txgain);
		}
		
		if(document.getElementById('dnd_sync').checked == true){
			var line_dnd = new AST_Line();
			line_dnd._key = 'dnd';
			if(chnl.dnd == 1){
				line_dnd._value = 'yes';
			}else if(chnl.dnd == 0){
				line_dnd._value = 'no';
			}
			LineArr._item.push(line_dnd);
		}
		
		if(document.getElementById('answeronpolarityswitch_sync').checked == true){
			var line_answeronpolarityswitch = new AST_Line();
			line_answeronpolarityswitch._key = 'answeronpolarityswitch';
			if(chnl.answeronpolarityswitch == 1){
				line_answeronpolarityswitch._value = 'yes';
			}else if(chnl.answeronpolarityswitch == 0){
				line_answeronpolarityswitch._value = 'no';
			}
			LineArr._item.push(line_answeronpolarityswitch);
		}
		
		if(document.getElementById('hanguponpolarityswitch_sync').checked == true){
			var line_hanguponpolarityswitch = new AST_Line();
			line_hanguponpolarityswitch._key = 'hanguponpolarityswitch';
			if(chnl.hanguponpolarityswitch == 1){
				line_hanguponpolarityswitch._value = 'yes';
			}else if(chnl.hanguponpolarityswitch == 0){
				line_hanguponpolarityswitch._value = 'no';
			}
			LineArr._item.push(line_hanguponpolarityswitch);
		}
		
		if(document.getElementById('ringtimeout_sync').checked == true){
			var line_ringtimeout = new AST_Line();
			line_ringtimeout._key = 'ringtimeout';
			line_ringtimeout._value = chnl.ringtimeout;
			LineArr._item.push(line_ringtimeout);
		}
		
		if(document.getElementById('cidsignalling_sync').checked == true){
			var line_cidsignalling = new AST_Line();
			line_cidsignalling._key = 'cidsignalling';
			if(chnl.cidsignalling == 2){
				line_cidsignalling._value = 'dtmf';
			}else if(chnl.cidsignalling == 1){
				line_cidsignalling._value = 'v23';
			}else if(chnl.cidsignalling == 0){
				line_cidsignalling._value = 'bell';
			}else{
				line_cidsignalling._value = '';
			}
			LineArr._item.push(line_cidsignalling);
		}
		
		//call limit
		if(document.getElementById('call_limit_switch_sync').checked == true){
			var line_call_limit_switch = new AST_Line();
			line_call_limit_switch._key = 'call_limit_switch';
			line_call_limit_switch._value = call_limit_sw;
			LimitLineArr._item.push(line_call_limit_switch);
		}
		
		if(document.getElementById('call_time_settings_sync').checked == true){
			var line_call_time_settings = new AST_Line();
			line_call_time_settings._key = 'call_time_settings';
			line_call_time_settings._value = call_time_settings;
			LimitLineArr._item.push(line_call_time_settings);
		}
		
		if(document.getElementById('day_calls_settings_sync').checked == true){
			var line_day_calls_settings = new AST_Line();
			line_day_calls_settings._key = 'day_calls_settings';
			line_day_calls_settings._value = day_calls_settings;
			LimitLineArr._item.push(line_day_calls_settings);
		}
		
		if(document.getElementById('day_answer_setting_sync').checked == true){
			var line_day_answer_settings = new AST_Line();
			line_day_answer_settings._key = 'day_answer_setting';
			line_day_answer_settings._value = day_answer_setting;
			LimitLineArr._item.push(line_day_answer_settings);
		}
		
		if(document.getElementById('hour_calls_settings_sync').checked == true){
			var line_hour_calls_settings = new AST_Line();
			line_hour_calls_settings._key = 'hour_calls_settings';
			line_hour_calls_settings._value = hour_calls_settings;
			LimitLineArr._item.push(line_hour_calls_settings);
		}
		/* parameter end */
	}
	/* save to other channel end */
	
	AnaSave._lines = LineArr;
	AnaSave._limitLines = LimitLineArr;
	AnaSave._sections = SectionArr;
	
	var Speeddial = new AST_FxsSpeeddialArr();
	AnaSave._speeddial = Speeddial;
	
	object.AGAlgChannelSave(save_succeed_back, save_error_back, channel, asso_chnl, AnaSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-chnsettings.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}

/**************************************SAVE CHANNEL END************************************************/