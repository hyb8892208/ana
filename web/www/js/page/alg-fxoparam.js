function check()
{
	var polaritydebounce = document.getElementById("polaritydebounce").value;
	var ringdebounce = document.getElementById("ringdebounce").value;
	var ringoncount = document.getElementById("ringoncount").value;
	var ringoffcount = document.getElementById("ringoffcount").value;

	document.getElementById("cpolaritydebounce").innerHTML='';
	document.getElementById("cringdebounce").innerHTML='';
	document.getElementById("cringoncount").innerHTML='';
	document.getElementById("cringoffcount").innerHTML='';

	var result = String(polaritydebounce).indexOf(".");
	if(!(parseInt(polaritydebounce) >= 8 && parseInt(polaritydebounce) <= 2048)){
		var polaritydebounce_str = language('js check polaritydebounce','js allow the range of polaritydebounce is 8 ~ 2048ms');
		document.getElementById("cpolaritydebounce").innerHTML = con_str(polaritydebounce_str);
		document.getElementById('polaritydebounce').focus();
		return false;
	}
	if(String(polaritydebounce).indexOf(".") > -1){
		var polaritydebounce_str = language('js check parameters data type','parameters data type must be int');
		document.getElementById("cpolaritydebounce").innerHTML = con_str(polaritydebounce_str);
		document.getElementById('polaritydebounce').focus();
		return false;
	}
	if(!(parseInt(ringdebounce) >= 0 && parseInt(ringdebounce) <= 2048)){
		var ringdebounce_str = language('js check ringdebounce','js allow the range of ringdebounce is 0 ~ 2048ms');
		document.getElementById("cringdebounce").innerHTML = con_str(ringdebounce_str);
		document.getElementById('ringdebounce').focus();
		return false;
	}
	if(String(ringdebounce).indexOf(".") > -1){
		var ringdebounce_str = language('js check parameters data type', 'parameters data type must be int');
		document.getElementById("cringdebounce").innerHTML = con_str(ringdebounce_str);
		document.getElementById('ringdebounce').focus();
		return false;
	}
	if(!(parseInt(ringoncount) >= 0 && parseInt(ringoncount) <= 128)){
		var ringoncount_str = language('js check ringoncount', 'js allow the range of ringoncount is 0 ~ 128');
		document.getElementById("cringoncount").innerHTML = con_str(ringoncount_str);
		document.getElementById('ringoncount').focus();
		return false;
	}
	if(String(ringoncount).indexOf(".") > -1){
		var ringoncount_str = language('js check parameters data type', 'parameters data type must be int');
		document.getElementById("cringoncount").innerHTML = con_str(ringoncount_str);
		document.getElementById('ringoncount').focus();
		return false;
	}
	if(!(parseInt(ringoffcount) >= 0 && parseInt(ringoffcount) <= 128)){
		var ringoffcount_str = language('js check ringoffcount', 'js allow the value of ringoffcount is 0 ~ 128');
		document.getElementById("cringoffcount").innerHTML = con_str(ringoffcount_str);
		document.getElementById('ringoffcount').focus();
		return false;
	}
	if(String(ringoffcount).indexOf(".") > -1){
		var ringoffcount_str = language('js empty-check cidbuflen', 'parameters data type must be int');
		document.getElementById("cringoffcount").innerHTML = con_str(ringoffcount_str);
		document.getElementById('ringoffcount').focus();
		return false;
	}
	
	return true;
}
function busydetect_click()
{
	var need_busydetect = document.getElementById("busydetect").checked;

	if(need_busydetect) {
		document.getElementById("busycountry").disabled = false;
		document.getElementById("busycount").disabled = false;
		if(document.getElementById('fxomon').checked == true){
			$("#fxomon").click();
		}
	} else {
		document.getElementById("busycountry").disabled = true;
		document.getElementById("busycount").disabled = true;
	}
}
function fxomon_click()
{
	var need_fxomon = document.getElementById("fxomon").checked;

	if(need_fxomon) {
		set_visible('tr_busy_pattern',true);
		if(document.getElementById('busydetect').checked == true){
			$("#busydetect").click();
		}
	} else {
		set_visible('tr_busy_pattern',false);
	}
}
function silencedetect_click()
{
	var need_silencedetect = document.getElementById("silencedetect").checked;

	if(need_silencedetect) {
		document.getElementById("silencethreshold").disabled = false;
		document.getElementById("maxsilence").disabled = false;
		document.getElementById("rxthreshold").disabled = false;
		document.getElementById("txthreshold").disabled = false;
	} else {
		document.getElementById("silencethreshold").disabled = true;
		document.getElementById("maxsilence").disabled = true;
		document.getElementById("rxthreshold").disabled = true;
		document.getElementById("txthreshold").disabled = true;
	}
}
function addRow_busypattern()
{
	var len = tbl_busy_pattern.rows.length-1;

	var newTr = tbl_busy_pattern.insertRow(len);
	var newTd = newTr.insertCell(0);

	newTd.innerHTML = '<input type="text" class="busypattern" name="busypattern[]" value=""/>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp<img src="/images/delete.gif" style="float:none; margin-left:0px; margin-bottom:-3px;cursor:pointer;" alt="remove" title="'+language('Click here to remove this speed dial code')+'" onclick="javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">';
}

function onload_show(){
	$("#fxomon").iButton();
	$("#busydetect").iButton();
	$("#silencedetect").iButton();
	fxomon_click();
	
	check();
	busydetect_click();
	silencedetect_click();
}
/******************************************************************************************/
(function(){
	$("#lang_fxo_settings").html(language('FXO settings'));
	
	/* Busy detect begin */
	$(".lang_busy_detect").html(language('Busy detect'));
	$("#lang_busy_detect_help").html(language('Busy detect help','Busy Detection is used for detecting busy signal or far end hang-up. <br/>'));
	$("#lang_busy_count").html(language('Busy count'));
	$("#lang_busy_count_help").html(language('Busy count help','Configure the number of busy tones the user will hear before hanging up the call when Busy Detect is enabled. <br/>'));
	$("#lang_busy_country").html(language('Busy country'));
	$("#lang_busy_country_help").html(language('Busy country help','Select country for tone settings. <br/>'));
	$("#lang_cn").html(language('China'));
	$("#lang_tw").html(language('Taiwan'));
	$("#lang_jp").html(language('Japan'));
	$("#lang_kr").html(language('Korea'));
	$("#lang_us").html(language('USA'));
	$("#lang_de").html(language('Germany'));
	$("#lang_fxo_monitor").html(language('Fxo Monitor'));
	$("#lang_fxo_monitor_help").html(language('Fxo Monitor help','Turn on/off fxo monitor function. <br/>'));
	$("#lang_busy_tone_pattern").html(language('Busy tone pattern'));
	$("#lang_busy_tone_pattern_help").html(language('Busy tone pattern help','Set the busy tone pattern. <br/> eg: 550/250,0/250 <br/>'));
	$("#lang_addrow").val('+ '+language('Add More Busy Pattern Fields'));
	/* Busy detect end */
	
	/* Silence detect begin */
	$(".lang_silence_detect").html(language('Silence detect'));
	$("#lang_silence_detect_help").html(language('Silence detect help','Turn on/off silence detect function. <br/>'));
	$("#lang_threshold").html(language('Silence threshold'));
	$("#lang_threshold_help").html(language('Silence threshold help','What we consider silence: the lower, the more sensitive, eg: 250 is 250ms.<br/>Range: 100 to 500(100 to 500ms), default: 250<br/>'));
	$("#lang_max_silence").html(language('Max silence'));
	$("#lang_max_silence_help").html(language('Max silence help','How many silencethreshold of silence before hanging up(eg: 16 is 250ms * 16 = 4s).<br/>Range: 2 to 1020(200ms to 512s), default: 80(20s)<br/>'));
	$("#lang_rx_threshold").html(language('Rx threshold'));
	$("#lang_rx_threshold_help").html(language('Rx threshold help','Range: -20 dBm0 to -40 dBm0, default: 20 (-20 dBm0), all values are understood to be negative.<br/>'));
	$("#lang_tx_threshold").html(language('Tx threshold'));
	$("#lang_tx_threshold_help").html(language('Tx threshold help','Range: -20 dBm0 to -40 dBm0, default: 20 (-20 dBm0), all values are understood to be negative.<br/>'));
	/* Silence detect end */
	
	/* Dahdi parameters begin */
	$("#lang_dahdi_parameters").html(language('Dahdi parameters'));
	$("#lang_polaritydebounce").html(language('Polaritydebounce'));
	$("#lang_polaritydebounce_help").html(language('Polaritydebounce help','The time of Polaritydebounce. Range: from 0 ms to 2048 ms, the default is 64 ms. <br/>'));
	$("#lang_ringdebounce").html(language('ringdebounce'));
	$("#lang_ringdebounce_help").html(language('ringdebounce help', 'The time of ringdebounce. Range: from 0 ms to 2048 ms, the default is 64 ms. <br/>'));
	$("#lang_ringoncount").html(language('ringoncount'));
	$("#lang_ringoncount_help").html(language('ringoncount help', 'Counting the times of ring on. Range: from 0 to 128, the default is 16. <br/>'));
	$("#lang_ringoffcount").html(language('ringoffcount'));
	$("#lang_ringoffcount_help").html(language('ringoffcount help','Counting the times of ring off. Range: from 0 to 128, the default is 0. <br/>'));
	$(".lang_times").html(language('times'));
	/* Dahdi parameters begin */
	
	$(".lang_save").val(language('Save'));
	$(".lang_cancel").val(language('Cancel'));
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_fxoparam(fxo_data){
	var glb_data = fxo_data['_glb'];
	var dahdi_data = fxo_data['_dahdi'];
	var busytones = fxo_data['_busytones']['_busypattern']['_item'];
	
	var busycount = glb_data['_busycount'];
	var busycountry = glb_data['_busycountry'];
	var silencethreshold = glb_data['_silencethreshold'];
	var maxsilence = glb_data['_maxsilence'];
	var rxthreshold = glb_data['_rxthreshold'];
	var txthreshold = glb_data['_txthreshold'];
	var silencedetect = glb_data['_silencedetect'];
	var busydetect = glb_data['_busydetect'];
	
	var polaritydebounce = dahdi_data['_polaritydebounce'];
	var ringdebounce = dahdi_data['_ringdebounce'];
	var ringoncount = dahdi_data['_ringoncount'];
	var ringoffcount = dahdi_data['_ringoffcount'];
	
	var fxomon = fxo_data['_busytones']['_fxomonenable'];
	
	if(busydetect == 1){
		document.getElementById('busydetect').checked = true;
	}
	document.getElementById('busycount').value = busycount;
	
	if(busycountry != ''){
		busycountry_val = busycountry;
	}else{
		busycountry_val = 'cn';
	}
	document.getElementById('busycountry').value = busycountry_val;
	
	if(fxomon == 1){
		document.getElementById('fxomon').checked = true;
	}
	
	var busypattern_html = '';
	for(var item in busytones){
		busypattern_html += "<tr><td>";
		busypattern_html += "<input type='text' class='busypattern' style='margin-right:100px;' value='"+busytones[item]['_value']+"'/>";
		busypattern_html += "<img src='/images/delete.gif' style='float:none; margin-left:0px; margin-bottom:-3px;cursor:pointer;' alt='remove' title='"+ language('Click here to remove this speed dial code') +"' onclick='javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);'>";
		busypattern_html += "</td></tr>";
	}
	$("#tbl_busy_pattern").prepend(busypattern_html);
	
	if(fxomon == 1){
		document.getElementById('fxomon').checked = true;
	}else{
		document.getElementById('fxomon').checked = false;
	}
	
	if(silencedetect == 1){
		document.getElementById('silencedetect').checked = true;
	}
	document.getElementById('silencethreshold').value = silencethreshold;
	document.getElementById('maxsilence').value = maxsilence;
	document.getElementById('rxthreshold').value = rxthreshold;
	document.getElementById('txthreshold').value = txthreshold;
	
	document.getElementById('polaritydebounce').value = polaritydebounce;
	document.getElementById('ringdebounce').value = ringdebounce;
	document.getElementById('ringoncount').value = ringoncount;
	document.getElementById('ringoffcount').value = ringoffcount;
}

object.AGUcpAlgFxoparamGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var fxo_data = data_temp['_fxo'];
	
	header(data_temp['_combuf']);
	show_fxoparam(fxo_data);
	footer();
	
	onload_show();
	
	$(".lang_save").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_fxoparam();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/******************************************************************************************/
function save_fxoparam(){
	var global = new AST_UcpAlgFxoGlobal();
	
	var busycount = document.getElementById('busycount').value;
	global._busycount = busycount;
	
	var busycountry = document.getElementById('busycountry').value;
	global._busycountry = busycountry;
	
	var silencethreshold = document.getElementById('silencethreshold').value;
	global._silencethreshold = silencethreshold;
	
	var maxsilence = document.getElementById('maxsilence').value;
	global._maxsilence = maxsilence;
	
	var rxthreshold = document.getElementById('rxthreshold').value;
	global._rxthreshold = rxthreshold;
	
	var txthreshold = document.getElementById('txthreshold').value;
	global._txthreshold = txthreshold;
	
	if(document.getElementById('silencedetect').checked == true){
		var silencedetect = 1;
	}else{
		var silencedetect = 0;
	}
	global._silencedetect = silencedetect;
	
	if(document.getElementById('busydetect').checked == true){
		var busydetect = 1;
	}else{
		var busydetect = 0;
	}
	global._busydetect = busydetect;
	
	var dahdi = new AST_UcpAlgDahdiContent();
	
	var polaritydebounce_val = document.getElementById('polaritydebounce').value;
	if(polaritydebounce_val != ''){
		var polaritydebounce = polaritydebounce_val;
	}else{
		var polaritydebounce = 8;
	}
	dahdi._polaritydebounce = polaritydebounce;
	
	var ringdebounce_val = document.getElementById('ringdebounce').value;
	if(ringdebounce_val != ''){
		var ringdebounce = ringdebounce_val;
	}else{
		var ringdebounce = 0;
	}
	dahdi._ringdebounce = ringdebounce;
	
	var ringoncount_val = document.getElementById('ringoncount').value;
	if(ringoncount_val != ''){
		var ringoncount = ringoncount_val;
	}else{
		var ringoncount = 0;
	}
	dahdi._ringoncount = ringoncount;
	
	var ringoffcount_val = document.getElementById('ringoffcount').value;
	if(ringoffcount_val != ''){
		var ringoffcount = ringoffcount_val;
	}else{
		var ringoffcount = 0;
	}
	dahdi._ringoffcount = ringoffcount;
	
	var busytones = new AST_AlgBusyTone();
	
	if(document.getElementById('fxomon').checked == true){
		var fxomon = 1;
	}else{
		var fxomon = 0;
	}
	busytones._fxomonenable = fxomon;
	
	var LineArr = new AST_LineArr();
	var i = 0;
	var line = new AST_Line();
	$(".busypattern").each(function(){
		var pattern_val = $(this).val();
		if(pattern_val != ''){
			var line = new AST_Line();
			line._key = 'busypattern'+i;
			line._value = pattern_val;
			LineArr._item.push(line);
			i++;
		}
	});
	busytones._busypattern = LineArr;
	
	var UcpAlgFxoparam = new AST_UcpAlgFxoparam();
	UcpAlgFxoparam._glb = global;
	UcpAlgFxoparam._dahdi = dahdi;
	UcpAlgFxoparam._busytones = busytones;
	
	object.AGUcpAlgFxoparamSave(save_succeed_back, save_error_back, UcpAlgFxoparam);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-fxoparam.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}