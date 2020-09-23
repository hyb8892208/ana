function empty_check(str)
{
	// Allowed character must be any of [0-9],1 - 3 characters. 
	var rex=/^[0-9]{1,3}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}
function check(){
	var chan_register_num = document.getElementById('chan_register_num').value;
	var chan_register_value = document.getElementById('chan_register_value').value;
	document.getElementById('cchan_register_num').innerHTML = '';
	document.getElementById('cchan_register_value').innerHTML = '';
	if(empty_check(chan_register_num)){
		if((parseInt(chan_register_num) >= 60) || (parseInt(chan_register_num) < 0)){
			document.getElementById('cchan_register_num').innerHTML = con_str(language('js check channel register number', 'the register number you input is not exist, the range of reg is : 0 ~ 59!'));
			return false;
		}  
	} else {
		document.getElementById('cchan_register_num').innerHTML = con_str('the channel register num you input is empty!!!');
		return false;
	}
	if(empty_check(chan_register_value)) {
		if((parseInt(chan_register_value) > 255) || (parseInt(chan_register_value) < 0)){
			document.getElementById('cchan_register_value').innerHTML = con_str(language('js check channel register value', 'the register value you input out of the range :(0 ~ 255)'));
			return false;
		} else {
			if(String(chan_register_value).indexOf(".") > -1){
				document.getElementById('cchan_register_value').innerHTML = con_str('Disallowing the value of register is float type');
				return false;
			}
			return true;
		}
	} else {
		document.getElementById('cchan_register_value').innerHTML = con_str('the value of channel register you input is empty !!!');
		return false;
	}
	return true;
}
function read_check(){
	var chan_register_num_n = document.getElementById('chan_register_num_n').value;
	if(parseInt(chan_register_num_n) >= 60){
		alert("the register number you input is not exist !!!");
		return false;
	}
	return true;
}
function onload_show(){
	document.getElementById('chan_register_value_n').disabled = true;
}
	
/************************************************************************************/
(function(){
	$("#lang_reading_register_value").html(language('Reading Regiter Value'));
	$(".lang_channel").html(language('Channel'));
	$("#lang_register_number").html(language('Register Number'));
	$("#lang_register_value").html(language('Register Value'));
	$("#lang_read").html(language('Read'));
	$("#lang_settings_register").html(language('Setting Register'));
	$("#lang_channel_help").html(language('Channel help','Current channel number.'));
	$("#lang_register").html(language('Register'));
	$("#lang_register_help").html(language('Register help', 'Current register number'));
	$("#lang_value").html(language('Value'));
	$("#lang_value_help").html(language('Value help', 'Current register value.'));
	$("#lang_save").val(language('Save'));
	$("#lang_cancel").val(language('Cancel'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function show_register(channel){
	var channel_str = '';
	for(var i=1;i<=channel;i++){
		channel_str += '<option value="'+i+'">'+i+'</option>';
	}
	$("#channel_number_n").html(channel_str);
	$("#channel_number").html(channel_str);
}

object.AGRegisterParaGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var channel = data_temp['_channel'];
	
	header(data_temp['_combuf']);
	show_register(channel);
	footer();
	
	onload_show();
	
	//save
	$("#lang_save").click(function(){
		if(check()){
			save_register();
		}
	});
	
	//read
	$("#lang_read").click(function(){
		read_register();
	});
}

function error_back(data){}
/************************************************************************************/
function read_register(){
	var ParaRead = new AST_RegisterParaRead();
	
	var channel = document.getElementById('channel_number_n').value;
	ParaRead._channel = channel;
	
	var number = document.getElementById('chan_register_num_n').value;
	ParaRead._number = number;
	
	object.AGRegisterParaRead(read_succeed_back, read_error_back, ParaRead);
}

function read_succeed_back(data){
	var read_data = data['_para'];
	document.getElementById('chan_register_value_n').value = read_data['_value'];
}

function read_error_back(data){
	alert(language('read failed'));
}

/************************************************************************************/
function save_register(){
	var RegisterPara = new AST_RegisterPara();
	
	var channel = document.getElementById('channel_number').value;
	RegisterPara._channel = channel;
	
	var number = document.getElementById('chan_register_num').value;
	RegisterPara._number = number;
	
	var value = document.getElementById('chan_register_value').value;
	RegisterPara._value = value;
	
	object.AGRegisterParaSave(save_succeed_back, save_error_back, RegisterPara);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'register-param.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}