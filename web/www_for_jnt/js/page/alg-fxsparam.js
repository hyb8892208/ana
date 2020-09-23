function check(data_temp)
{
	var dialdebounce = document.getElementById("dialdebounce").value;
	var rxminflash = document.getElementById('rxminflash').value;
	var rxflash = document.getElementById('rxflash').value;
	
	document.getElementById("cdialdebounce").innerHTML='';
	if(!(parseInt(dialdebounce) >= 32 && parseInt(dialdebounce) <= 2048) || dialdebounce%32 != 0){
		var dialdebounce_str = language('js check dialdebounce', 'js allow the value of dialdebounce effective range is 32 ~ 2048ms ');
		document.getElementById("cdialdebounce").innerHTML= con_str(dialdebounce_str);
		return false;
	}
	if(String(dialdebounce).indexOf(".") > -1){
		var dialdebounce_str = language('js check parameters data type', 'parameters data type must be int');
		document.getElementById("cdialdebounce").innerHTML= con_str(dialdebounce_str);
		return false;
	}
	
	document.getElementById('crxminflash').innerHTML='';
	if(!(parseInt(rxminflash) >= 1 && parseInt(rxminflash) <= 100)){
		var rxminflash_str = language('js check rxminflash', 'js allow the value of rxminflash effective range is 1 ~ 100ms ');
		document.getElementById("crxminflash").innerHTML= con_str(rxminflash_str);
		return false;
	}
	if(String(rxminflash).indexOf(".") > -1){
		var rxminflash_str = language('js check parameters data type', 'parameters data type must be int');
		document.getElementById("crxminflash").innerHTML= con_str(rxminflash_str);
		return false;
	}
	
	document.getElementById("crxflash").innerHTML='';
	if(!(parseInt(rxflash) >= 100 && parseInt(rxflash) <= 3000)){
		var rxflash_str = language('js check rxflash', 'js allow the value of rxflash effective range is 100 ~ 3000ms ');
					document.getElementById("crxflash").innerHTML= con_str(rxflash_str);
		return false;
	}
	if(String(rxflash).indexOf(".") > -1){
		var rxflash_str = language('js check parameters data type', 'parameters data type must be int');
		document.getElementById("crxflash").innerHTML= con_str(rxflash_str);
		return false;
	}
	
	
	return true;
}

function change_flashwink()
{
	var value = document.getElementById('flashwink').checked;
	
	if (value) {
		document.getElementById('rxminflash').disabled = false;
		document.getElementById('rxflash').disabled = false;
	} else {
		document.getElementById('rxminflash').disabled = true;
		document.getElementById('rxflash').disabled = true;
	}
}

function onload_show(){
	$("#sendpolarityrev").iButton();
	$("#enddialkey").iButton();
	$("#flashwink").iButton();
	$("#ciddisplay").iButton();
	
	change_flashwink();
}

/***************************************************************************/
(function(){
	$("#lang_fxs_settings").html(language('S Ports settings'));
	
	/* Caller ID begin */
	$("#lang_caller_id").html(language('Caller ID'));
	$("#lang_the_pattern_of_sending_cid").html(language('The pattern of sending CID'));
	$("#lang_the_pattern_of_sending_cid_help").html(language('The pattern of sending CID help','Some countries(UK) have ring tones with different ring tones(ring-ring), which means the caller ID needs to be set later on, and not just after the first ring, as per the default(1).<br/>'));
	$("#lang_send_cid_before_ring").html(language('send CID before ringing'));
	$("#lang_send_cid_after_first_ring").html(language('send CID after first ring'));
	$("#lang_send_cid_after_second_ring").html(language('send CID after second ring'));
	$("#lang_send_cid_after_third_ring").html(language('send CID after third ring'));
	$("#lang_waiting_time_before_sending_cid").html(language('Waiting time before sending CID'));
	$("#lang_waiting_time_before_sending_cid_help").html(language('Waiting time before sending CID help','How long we will waiting before sending the CID on the channel.(in milliseconds).'));
	$("#lang_send_polarity_reversal").html(language('Send polarity reversal','Sending polarity reversal(DTMF Only)'));
	$("#lang_send_polarity_reversal_help").html(language('Send polarity reversal help','Send polarity reversal before sending the CID on the channel.'));
	$("#lang_start_code").html(language('Start code'));
	$("#lang_start_code_help").html(language('Start code help','Start code.'));
	$("#lang_stop_code").html(language('Stop code'));
	$("#lang_stop_code_help").html(language('Stop code help','Stop code.'));
	$("#lang_flash_wink").html(language('Flash/Wink'));
	$("#lang_flash_wink_help").html(language('Flash/Wink help','Turn on/off Flash/Wink. <br/>'));
	$("#lang_min_flash_time").html(language('Min flash time'));
	$("#lang_min_flash_time_help").html(language('Min flash time help','Min flash time. (in milliseconds). Range:1-100.<br/>'));
	$("#lang_max_flash_time").html(language('Max flash time'));
	$("#lang_max_flash_time_help").html(language('Max flash time help','Max flash time. (in milliseconds). Range:100-3000.<br/>'));
	$("#lang_as_ending_dial_key").html(language('as Ending Dial Key'));
	$("#lang_as_ending_dial_key_help").html(language('as Ending Dial Key help','Turn on/off Ending Dial Key. <br/>'));
	$("#lang_display_extension_number").html(language('Display extension number'));
	$("#lang_display_extension_number_help").html(language('Display extension number help','Turn on/off display extension number. <br/>'));
	/* Caller ID end */
	
	/* Other Parameters begin */
	$("#lang_other_parameters").html(language('Other Parameters'));
	$("#lang_offhook_antishake").html(language('offhook-antishake'));
	$("#lang_offhook_antishake_help").html(language('offhook-antishake help', 'The anti-jitter delay value when the gateway S Ports detects the off-hook signal. The setting value is from 32ms to 2048ms (multiple of 32) and the default value is 64ms. <br/>'));
	/* Other Parameters end */
	
	$(".lang_save").val(language('Save'));
	$(".lang_cancel").val(language('Cancel'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_fxsparam(fxs_data){
	var sendcalleridaftertime = fxs_data['_sendcalleridaftertime'];
	var startcode = fxs_data['_startcode'];
	var stopcode = fxs_data['_stopcode'];
	var flashwink = fxs_data['_flashwink'];
	var sendcalleridafter = fxs_data['_sendcalleridafter'];
	var sendpolarityrev = fxs_data['_sendpolarityrev'];
	var enddialkey = fxs_data['_enddialkey'];
	var rxminflash = fxs_data['_rxminflash'];
	var rxflash = fxs_data['_rxflash'];
	var dialdebounce = fxs_data['_dialdebounce'];
	var ciddisplay = fxs_data['_ciddisplay'];
	
	document.getElementById('sendcalleridaftertime').value = sendcalleridaftertime;
	document.getElementById('startcode').value = startcode;
	document.getElementById('stopcode').value = stopcode;
	
	if(flashwink == 1){
		document.getElementById('flashwink').checked = true;
	}
	
	document.getElementById('sendcalleridafter').value = sendcalleridafter;
	
	if(sendpolarityrev == 1){
		document.getElementById('sendpolarityrev').checked = true;
	}
	
	if(enddialkey == 1){
		document.getElementById('enddialkey').checked = true;
	}
	
	document.getElementById('rxminflash').value = rxminflash;
	document.getElementById('rxflash').value = rxflash;
	
	document.getElementById('dialdebounce').value = dialdebounce;
	
	if(ciddisplay == 1){
		document.getElementById('ciddisplay').checked = true;
	}
}

object.AGUcpAlgFxsparamGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var fxs_data = data_temp['_fxs'];
	
	header(data_temp['_combuf']);
	show_fxsparam(fxs_data);
	footer();
	
	onload_show();
	
	$(".lang_save").click(function(){
		if(check(data_temp)){
			if(save_only_once()){
				$("#loading_image").show();
				save_fxsparam();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}


/***************************************************************************/
function save_fxsparam(){
	var UcpAlgFxsparam = new AST_UcpAlgFxsparam();
	
	var sendcalleridafter = document.getElementById('sendcalleridafter').value;
	UcpAlgFxsparam._sendcalleridafter = sendcalleridafter;
	
	var sendcalleridaftertime = document.getElementById('sendcalleridaftertime').value;
	UcpAlgFxsparam._sendcalleridaftertime = sendcalleridaftertime;
	
	if(document.getElementById('sendpolarityrev').checked == true){
		var sendpolarityrev = 1;
	}else{
		var sendpolarityrev = 0;
	}
	UcpAlgFxsparam._sendpolarityrev = sendpolarityrev;
	
	var startcode = document.getElementById('startcode').value;
	UcpAlgFxsparam._startcode = startcode;
	
	var stopcode = document.getElementById('stopcode').value;
	UcpAlgFxsparam._stopcode = stopcode;
	
	if(document.getElementById('flashwink').checked == true){
		var flashwink = 1;
	}else{
		var flashwink = 0;
	}
	UcpAlgFxsparam._flashwink = flashwink;
	
	var rxminflash = document.getElementById('rxminflash').value;
	UcpAlgFxsparam._rxminflash = rxminflash;
	
	var rxflash = document.getElementById('rxflash').value;
	UcpAlgFxsparam._rxflash = rxflash;
	
	if(document.getElementById('enddialkey').checked == true){
		var enddialkey = 1;
	}else{
		var enddialkey = 0;
	}
	UcpAlgFxsparam._enddialkey = enddialkey;
	
	var dialdebounce_val = document.getElementById('dialdebounce').value;
	if(dialdebounce_val != ''){
		var dialdebounce = dialdebounce_val;
	}else{
		var dialdebounce = 0;
	}
	UcpAlgFxsparam._dialdebounce = dialdebounce;
	
	if(document.getElementById('ciddisplay').checked == true){
		var ciddisplay = 1;
	}else{
		var ciddisplay = 0;
	}
	UcpAlgFxsparam._ciddisplay = ciddisplay;
	
	object.AGUcpAlgFxsparamSave(save_succeed_back, save_error_back, UcpAlgFxsparam);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-fxsparam.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}