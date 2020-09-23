function check(analog_data)
{
	var pickupenable_sw = document.getElementById("pickupenable_sw").checked; 
	var timeout = document.getElementById("pickuptimeout").value;
	if (pickupenable_sw) {
		if(!check_phonenum(timeout)) {
			document.getElementById("cpickuptimeout").innerHTML = con_str('Please input a valid timeout value!');
			return false;
		} else {
			document.getElementById("cpickuptimeout").innerHTML = '';
		}
	}

	if(string_filter_tip(analog_data)){
		return false;
	}
	
	
	if(!confirm(language('Save Interrupt Call help','Save will interrupt the call. Are you sure you want to save it?'))){
		return false;
	}
	
	return true;
}

function onload_func()
{
	enable_ami_change();
}

function enable_ami_change()
{   
	$("#pickupenable_sw").iButton();

	var sw = document.getElementById('pickupenable_sw').checked;
	if (sw) {
		set_visible('help_id',true);
		set_visible('pickup_number',true);
		set_visible('pickup_timeout',true);
		set_visible('board1',true);
	} else {
		set_visible('help_id',false);
		set_visible('pickup_number',false);
		set_visible('pickup_timeout',false);
		set_visible('board1',false);
	}
}

function string_filter_tip(analog_data){
	if(string_filter_tip_run('pickuptimeout')){
		return true;
	}
	
	if(string_filter_tip_run('pickupnumber')){
		return true;
	}
	
	for(var item in analog_data){
		var key = document.getElementById('chnlpickuptimeout'+analog_data[item]['_channel']).value;
		if(!is_num(key)){
			$("#chnl"+analog_data[item]['_channel']).html('Time Out: '+language('js check dtmf integer 1'));
			document.getElementById("chnl"+analog_data[item]['_channel']).focus();
			return true;
		}
		var key = document.getElementById('chnlpickupnumber'+analog_data[item]['_channel']).value;
		if(!is_num(key)){
			$("#chnl"+analog_data[item]['_channel']).html('Number: '+language('js check dtmf integer 1'));
			document.getElementById("chnl"+analog_data[item]['_channel']).focus();
			return true;
		}
	}
	
	return false;
}
/************************************************************************************/

function onload_show(){
		$("#pickupenable_sw").iButton();
		onload_func();
}
/************************************************************************************/

/*****************************SHOW PICKUPSETTINGS BEGIN******************************/
(function(){
	$("#lang_enable").html(language("Enable")+':');
	$("#lang_enable_help").html(language('Enable help', "ON(enabled),OFF(disabled)"));
	$("#lang_time_out").html(language("Time Out"));
	$("#lang_time_out_help").html(language('Time Out help','Set the timeout, in milliseconds (ms).Note: You can only enter numbers.'));
	$("#lang_number").html(language("Number"));
	$("#lang_number_help").html(language('Number help','Pickup number'));
	
	/* other info */
	$("#status_settings_li").text(language('Status Settings'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function pickupsettings_show(analog_data, pickup_data){
	if(pickup_data['_enable'] == 1){
		var pickupenable_sw = true;
	}else{
		var pickupenable_sw = false;
	}
	
	if(pickup_data['_timeout'] != 0){
		var pickuptimeout = pickup_data['_timeout'];
	}else{
		var pickuptimeout = '';
	}
	
	if(pickup_data['_number'] != 0){
		var pickupnumber = pickup_data['_number'];
	}else{
		var pickupnumber = '';
	}
    
	var pickup = [];
	for(var item in analog_data){
		pickup[item] = [];
		pickup[item]['section'] = analog_data[item]['_channel'];
		
		if(analog_data[item]['_enablechnlpickup'] == 1){
			pickup[item]['enablechnlpickup'] = 'yes';
		}else{
			pickup[item]['enablechnlpickup'] = 'no';
		}
		
		if(analog_data[item]['_chnlpickuptimeout'] != 0){
			pickup[item]['chnlpickuptimeout'] = analog_data[item]['_chnlpickuptimeout'];
		}else{
			pickup[item]['chnlpickuptimeout'] = '';
		}
		
		if(analog_data[item]['_chnlpickupnumber'] != 0){
			pickup[item]['chnlpickupnumber'] = analog_data[item]['_chnlpickupnumber'];
		}else{
			pickup[item]['chnlpickupnumber'] = '';
		}
	}
	
	//checked
	document.getElementById('pickupenable_sw').checked = pickupenable_sw;
	
	//value
	document.getElementById('pickuptimeout').value = pickuptimeout;
	document.getElementById('pickupnumber').value = pickupnumber;

	var html_str = '';

	for(var item in pickup){
		if(pickup[item]['enablechnlpickup'] == 'no'){var no_selected = 'selected';}else{var no_selected = '';}
		if(pickup[item]['enablechnlpickup'] == 'yes'){var yes_selected = 'selected';}else{var yes_selected = '';}
		html_str += '<tr>'+
			'<th class="board_name">S'+pickup[item]['section']+'</th>'+
			'<td>'+
				'<select name="enablechnlpickup'+pickup[item]['section']+'" class="enablechnlpickup">'+
					'<option value="no" '+no_selected+'>'+language('Disabled')+'</option>'+
					'<option value="yes" '+yes_selected+'>'+language('Enabled')+'</option>'+
				'</select>'+
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+language('Time Out')+' <input id="chnlpickuptimeout'+pickup[item]['section']+'" class="chnlpickuptimeout" type="text" name="chnlpickuptimeout" value="'+pickup[item]['chnlpickuptimeout']+'"/>'+
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+language('Number')+'  <input id="chnlpickupnumber'+pickup[item]['section']+'" class="chnlpickupnumber" type="text" name="chnlpickupnumber" value="'+pickup[item]['chnlpickupnumber']+'"/>'+
				'<span id="chnl'+pickup[item]['section']+'" class="number_tip"></span>'+
			'</td>'+
		'</tr>';
	}
	$("#board1").html(html_str);
}

object.AGAlgPickupGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var analog_data = data_temp['_pickchn']['_item'];
	var pickup_data = data_temp['_pickup'];
	
	header(data_temp['_combuf']);
	pickupsettings_show(analog_data, pickup_data);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check(analog_data)){
			if(save_only_once()){
				$("#loading_image").show();
				pickupsettings_save();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*****************************SHOW PICKUPSETTINGS END******************************/

/*****************************SAVE PICKUPSETTINGS END******************************/
function pickupsettings_save(){
	var AlgPickup = new AST_AlgPickup();
	
	if(document.getElementById('pickupenable_sw').checked == true){
		AlgPickup._enable = 1;
	}else{
		AlgPickup._enable = 0;
	}
	
	var pickuptimeout = document.getElementById('pickuptimeout').value;
	AlgPickup._timeout = pickuptimeout;
	
	var pickupnumber = document.getElementById('pickupnumber').value;
	AlgPickup._number = pickupnumber;
	
	var AlgPickupChnArr = new AST_AlgPickupChnArr();
	$("#board1 tr").each(function(){
		var board_name = $(this).children(".board_name").text();
		var board_temp =board_name.split('S');
		
		var algpickupchn = new AST_AlgPickupChn();
		algpickupchn._channel = board_temp[1];
		
		var enablechnlpickup_val = $(this).children().children('.enablechnlpickup').val();
		if(enablechnlpickup_val == 'yes'){
			var enablechnlpickup = 1;
		}else{
			var enablechnlpickup = 0;
		}
		algpickupchn._enablechnlpickup = enablechnlpickup;
		
		var chnlpickuptimeout = $(this).children().children('.chnlpickuptimeout').val();
		if(chnlpickuptimeout == ''){
			chnlpickuptimeout = 0;
		}
		algpickupchn._chnlpickuptimeout = chnlpickuptimeout;
		
		var chnlpickupnumber = $(this).children().children('.chnlpickupnumber').val();
		if(chnlpickupnumber == ''){
			chnlpickupnumber = 0;
		}
		algpickupchn._chnlpickupnumber = chnlpickupnumber;
		
		AlgPickupChnArr._item.push(algpickupchn);
	});
	
	object.AGAlgPickupSave(save_succeed_back, save_error_back, AlgPickup, AlgPickupChnArr);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-pickupsettings.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*****************************SAVE PICKUPSETTINGS END******************************/