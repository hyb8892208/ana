function detect_cidbeforering(){
	var need_cidbeforering = document.getElementById("cidbeforering").checked;
	
	if(need_cidbeforering){
		document.getElementById("cidbuflen").disabled = false;
		document.getElementById("cutcidbufheadlen").disabled = false;
		document.getElementById("fixedtimepolarity").disabled = false;
	}else{
		document.getElementById("cidbuflen").disabled = true;
		document.getElementById("cutcidbufheadlen").disabled = true;
		document.getElementById("fixedtimepolarity").disabled = true;
	}
}

function check(){
	var cidbeforering_check = document.getElementById("cidbeforering").checked;
	var cidbuflen = document.getElementById("cidbuflen").value;
	var cutcidbufheadlen = document.getElementById("cutcidbufheadlen").value;
	var fixedtimepolarity = document.getElementById("fixedtimepolarity").value;
	var current_threshold = document.getElementById('current_threshold').value;
	
	var fxotxgain = document.getElementById("fxotxgain").value;
	var fxorxgain = document.getElementById("fxorxgain").value;
	
	document.getElementById('ccidbuflen').innerHTML = '';
	document.getElementById('ccutcidbufheadlen').innerHTML = '';
	document.getElementById('cfixedtimepolarity').innerHTML = '';
	document.getElementById("cfxotxgain").innerHTML='';
	document.getElementById("cfxorxgain").innerHTML='';
	document.getElementById("ccurrent_threshold").innerHTML = '';
	
	if(cidbeforering_check){
		if(!(parseInt(cidbuflen) >=1 && parseInt(cidbuflen) <= 4000)){
			var cidbuflen_str = language('js check cidbuflen', 'js allow the value of cidbuflen is 1 ~ 4000');
			document.getElementById("ccidbuflen").innerHTML = con_str(cidbuflen_str);
			document.getElementById('cidbuflen').focus();
			return false;
		}
		if(String(cidbuflen).indexOf(".") > -1){
			var cidbuflen_str = language('js check parameters data type', 'parameters data type must be int');
			document.getElementById("ccidbuflen").innerHTML = con_str(cidbuflen_str);
			document.getElementById('cidbuflen').focus();
			return false;
		}
		if(!(parseInt(cutcidbufheadlen) >=1 && parseInt(cutcidbufheadlen) <= 2000)){
			var cutcidbufheadlen_str = language('js check cutcidbufheadlen', 'js allow the value of cutcidbufheadlen is 1 ~ 2000ms');
			document.getElementById("ccutcidbufheadlen").innerHTML = con_str(cutcidbufheadlen_str);
			document.getElementById('cutcidbufheadlen').focus();
			return false;
		}
		if(String(cutcidbufheadlen).indexOf(".") > -1){
			var cutcidbufheadlen_str = language('js empty-check cutcidbufheadlen', 'parameters data type must be int');
			document.getElementById("ccutcidbufheadlen").innerHTML = con_str(cutcidbufheadlen_str);
			document.getElementById('cutcidbufheadlen').focus();
			return false;
		}
		if(!(parseInt(fixedtimepolarity) >= -1 && parseInt(fixedtimepolarity) <= 2000)){
			var fixedtimepolarity_str = language('js check fixedtimepolarity', 'js allow the value of fixedtimepolarity is -1 ~ 2000');
			document.getElementById("cfixedtimepolarity").innerHTML = con_str(fixedtimepolarity_str);
			document.getElementById('fixedtimepolarity').focus();
			return false;
		}
		if(String(fixedtimepolarity).indexOf(".") > -1){
			var fixedtimepolarity_str = language('js empty-check fixedtimepolarity', 'parameters data type must be int');
			document.getElementById("cfixedtimepolarity").innerHTML = con_str(fixedtimepolarity_str);
			document.getElementById('fixedtimepolarity').focus();
			return false;
		}
	}
	
	if(!(parseInt(fxorxgain) >= -150 && parseInt(fxorxgain) <= 120)){
		var fxorxgain_str = language('js check fxorxgain','js Allowed the range of fxorxgain is -150 ~ 120.');
		document.getElementById("cfxorxgain").innerHTML = con_str(fxorxgain_str);
		document.getElementById('fxorxgain').focus();
		return false;
	}
	if(String(fxorxgain).indexOf(".") > -1){
		var fxorxgain_str = language('js check parameters data type', 'parameters data type must be int');
		document.getElementById("cfxorxgain").innerHTML = con_str(fxorxgain_str);
		document.getElementById('fxorxgain').focus();
		return false;
	}
	if(!(parseInt(fxotxgain) >= -150 && parseInt(fxotxgain) <= 120)){
		var fxotxgain_str = language('js check fxotxgain', 'js Allowed the range of fxotxgain is -150 ~ 120.');
		document.getElementById("cfxotxgain").innerHTML = con_str(fxotxgain_str);
		document.getElementById('fxotxgain').focus();
		return false;
	}
	if(String(fxotxgain).indexOf(".") > -1){
		var fxotxgain_str = language('js check parameters data type','parameters data type must be int');
		document.getElementById("cfxotxgain").innerHTML = con_str(fxotxgain_str);
		document.getElementById('fxotxgain').focus();
		return false;
	}
	
	if(!(parseInt(current_threshold) >= 1 && parseInt(current_threshold) <= 65535)){
		document.getElementById('ccurrent_threshold').innerHTML = con_str("Range: 1-65535");
		document.getElementById('current_threshold').focus();
		return false;
	}
	
	if(!confirm(language("Dahdi Restart help","Setting the driver parameters will restart dahdi, which takes about three minutes. Calls will be interrupted during the restart. Are you sure you need to restart?"))){
		return false;
	}
	
	return true;
}

function onload_show(){
	$("#cidbeforering").iButton();
	detect_cidbeforering();
}

(function(){
	$("#driver_settings_li").html(language('Driver'));
	
	/* CallerID detect begin */
	$("#lang_callerid_detect").html(language('CallerID detect'));
	$("#lang_cidbeforering").html(language('cidbeforering'));
	$("#lang_cidbeforering_help").html(language('cidbeforering help','Swith to handle irregular CID function.'));
	$("#lang_cidbuflen").html(language('cidbuflen'));
	$("#lang_cidbuflen_help").html(language('cidbuflen help', 'CID media stream length byte size.'));
	$("#lang_cutcidbufheadlen").html(language('cutcidbufheadlen'));
	$("#lang_cutcidbufheadlen_help").html(language('cutcidbufheadlen help', 'CID media stream header length byte size.'));
	$("#lang_fixedtimepolarity").html(language('fixedtimepolarity'));
	$("#lang_fixedtimepolarity_help").html(language('fixedtimepolarity help', 'Transmit polarity line reversal signal delay time.'));
	$("#lang_current_threshold").html(language('Current Threshold'));
	$("#lang_current_threshold_help").html(language('Current Threshold help','Range: 1-65535'));
	/* CallerID detect end */
	
	/* General begin */
	$("#general_li").html(language('General'));
	$("#lang_codec").html(language('Codec'));
	$("#lang_codec_help").html(language('Codec help','Set the global encoding:mulaw,alaw<br/>'));
	$("#lang_impedance").html(language('Impedance'));
	$("#lang_impedance_help").html(language('Impedance help','Configuration for impedance. <br/>'));
	/* General end */
	
	/* Hardware gain begin */
	$("#lang_hardware_gain").html(language('Hardware gain'));
	$("#lang_fxo_rx_gain").html(language('FXO Rx gain'));
	$("#lang_fxo_rx_gain_help").html(language('FXO Rx gain help','Set FXO to terminal gain. Range: from -150 to 120, the default is 0. <br/>'));
	$("#lang_fxo_tx_gain").html(language('FXO Tx gain'));
	$("#lang_fxo_tx_gain_help").html(language('FXO Tx gain help','Set FXO to IP gain. Range: from -150 to 120, the default is 0. <br/>'));
	$("#lang_fxs_rx_gain").html(language('S Ports Rx gain'));
	$("#lang_fxs_rx_gain_help").html(language('S Ports Rx gain help','Set S Ports to terminal gain. Range: -35, 0 or 35. the default is 0. <br/>'));
	$("#lang_fxs_tx_gain").html(language('S Ports Tx gain'));
	$("#lang_fxs_tx_gain_help").html(language('S Ports Tx gain help','Set S Ports to IP gain. Range: -35, 0 or 35. the default is 0. <br/>'));
	/* Hardware gain end */
	
	$(".lang_save").val(language('Save'));
	$(".lang_cancel").val(language('Cancel'));
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_driver(data_temp){
	var driver_data = data_temp['_param'];
	
	var type=_Define['type'];
	
	var cidbeforering = driver_data['_cidbeforering'];
	var cidbuflen = driver_data['_cidbuflen'];
	var cutcidbufheadlen = driver_data['_cutcidbufheadlen'];
	var fixedtimepolarity = driver_data['_fixedtimepolarity'];
	
	var fxorxgain = driver_data['_fxorxgain'];
	var fxotxgain = driver_data['_fxotxgain'];
	var fxsrxgain = driver_data['_fxsrxgain'];
	var fxstxgain = driver_data['_fxstxgain'];
	
	if(driver_data['_codec']==1){
		var codec = 'alaw';
	}else{
		var codec = 'mulaw';
	}
	
	if(driver_data['_opermode'] != ''){
		var impedance = driver_data['_opermode'];
	}else{
		var impedance = 'FCC';
	}
	
	var current_threshold = driver_data['_Currentthreshold'];
	
	if(cidbeforering == 1){
		document.getElementById('cidbeforering').checked = true;
	}
	document.getElementById('cidbuflen').value = cidbuflen;
	document.getElementById('cutcidbufheadlen').value = cutcidbufheadlen;
	document.getElementById('fixedtimepolarity').value = fixedtimepolarity;
	document.getElementById('codec').value = codec;
	document.getElementById('fxorxgain').value = fxorxgain;
	document.getElementById('fxotxgain').value = fxotxgain;
	document.getElementById('fxsrxgain').value = fxsrxgain;
	document.getElementById('fxstxgain').value = fxstxgain;
	document.getElementById('current_threshold').value = current_threshold;
	
	var _impedance_select = "<select name='impedance' id='impedance'>";
	var temp = _Define['__IMPEDANCE_LIST__'].split(",");
	for(var i=0;i<temp.length;i++){
		var temp_val = temp[i].toLowerCase();
		for(var j=0;j<temp_val.length;j++){
			temp_val = temp_val[0].toUpperCase() + temp_val.substring(1, temp_val.length);
		}
		
		if(impedance == temp[i]){
			_impedance_select += "<option value='"+temp[i]+"' selected>"+language(temp_val)+"</option>";
		}else{
			_impedance_select += "<option value='"+temp[i]+"'>"+language(temp_val)+"</option>";
		}
	}
	_impedance_select += "</select><span id='cimpedance'></span>";
	$("#impedance_select").html(_impedance_select);
	
	if(type == 0){
		$(".fxs_type").hide();
	}else if(type == 2){
		$(".fxo_type").hide();
	}
	
	if(data_temp['_combuf']['_features']['_CheckFXSCurrSta'] == 1){
		$("#current_threshold_tr").show();
	}
}

object.AGUcpAlgDriverGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_driver(data_temp);
	footer();
	
	onload_show();
	
	$(".lang_save").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_driver();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

/******************************************************************************************/
function save_driver(){
	var driver = new AST_UcpAlgDriverParam();
	
	var opermode = document.getElementById('impedance').value;
	driver._opermode = opermode;
	
	var codec_val = document.getElementById('codec').value;
	if(codec_val == 'alaw'){
		var codec = 1;
	}else{
		var codec = 0;
	}
	driver._codec = codec;
	
	var cidbuflen_val = document.getElementById('cidbuflen').value;
	if(cidbuflen_val != ''){
		var cidbuflen = cidbuflen_val;
	}else{
		var cidbuflen = 3000;
	}
	driver._cidbuflen = cidbuflen;
	
	var cutcidbufheadlen_val = document.getElementById('cutcidbufheadlen').value;
	if(cutcidbufheadlen_val != ''){
		var cutcidbufheadlen = cutcidbufheadlen_val;
	}else{
		var cutcidbufheadlen = 128;
	}
	driver._cutcidbufheadlen = cutcidbufheadlen;
	
	var fixedtimepolarity_val = document.getElementById('fixedtimepolarity').value;
	if(fixedtimepolarity_val != ''){
		var fixedtimepolarity = fixedtimepolarity_val;
	}else{
		var fixedtimepolarity = 0;
	}
	driver._fixedtimepolarity = fixedtimepolarity;
	
	if(document.getElementById('cidbeforering').checked == true){
		var cidbeforering = 1;
	}else{
		var cidbeforering = 0;
	}
	driver._cidbeforering = cidbeforering;
	
	var fxorxgain_val = document.getElementById('fxorxgain').value;
	if(fxorxgain_val != ''){
		var fxorxgain = fxorxgain_val;
	}else{
		var fxorxgain = 120;
	}
	driver._fxorxgain = fxorxgain;
	
	var fxotxgain_val = document.getElementById('fxotxgain').value;
	if(fxotxgain_val != ''){
		var fxotxgain = fxotxgain_val;
	}else{
		var fxotxgain = 120;
	}
	driver._fxotxgain = fxotxgain;
	
	var fxsrxgain = document.getElementById('fxsrxgain').value;
	driver._fxsrxgain = fxsrxgain;
	
	var fxstxgain = document.getElementById('fxstxgain').value;
	driver._fxstxgain = fxstxgain;
	
	var current_threshold = document.getElementById('current_threshold').value;
	driver._Currentthreshold = current_threshold;
	
	object.AGUcpAlgDriverSave(save_succeed_back, save_error_back, driver);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-driver.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}