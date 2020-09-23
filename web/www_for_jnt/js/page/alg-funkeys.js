function changge_NSCBT(blindtransfer,askedtransfer){
	var sw=document.getElementById("enablenonspecialcharactersblindtransfer").checked;
	if (sw){ //on
		document.getElementById("blindtransfer").disabled=true;
		document.getElementById("blindtransfer").value="";
		if (askedtransfer!=""){
			document.getElementById("askedtransfer").value=askedtransfer;
		}else{
			document.getElementById("askedtransfer").value="*38";
		}
		document.getElementById("askedtransfer").disabled=false;
	}else{
		document.getElementById("blindtransfer").disabled=false;
		if (blindtransfer!=""){
			document.getElementById("blindtransfer").value=blindtransfer;
		}else{
			document.getElementById("blindtransfer").value="*38";
		}
		document.getElementById("askedtransfer").value="";
		document.getElementById("askedtransfer").disabled=true;
	}
}

function onload_show(){
	$("#enablenonspecialcharactersblindtransfer").iButton();  
}

function check(){
	if(limit_string_length()){
		return false;
	}
	
	return true;
}

function limit_string_length(){
	if(check_string_length('blindtransfer')){
		return true;
	}
	
	if(check_string_length('askedtransfer')){
		return true;
	}
	
	return false;
}
/*****************************************************************************/

/******************************SHOW FUNKEYS BEGIN******************************/
(function(){
	$("#lang_none_keys_blind_transfer").html(language('None Keys Blind Transfer'));
	$("#lang_none_keys_blind_transfer_help").html(language('None Keys Blind Transfer help','Turn on the switch: A calls B, A press *38(can be customized) and calls C phone number, C picks up and talk with A.<br/>Turn off the switch: A calls B, A press *38(can be customized) and calls C phone number, A hangs up,C picks up and talk with B.'));
	$("#lang_blind_transfer").html(language('Blind Transfer'));
	$("#lang_blind_transfer_help").html(language('Blind Transfer help','When turn on the Blind Transfer, configure the dialplan before transferring the call (*38 by default).'));
	$("#lang_asked_transfer").html(language('Asked Transfer'));
	$("#lang_asked_transfer_help").html(language('Asked Transfer help','When turn on the Asked Transfer, configure the dialplan before transferring the call (*38 by default).'));
	
	$("#function_keys_li").text(language('Function Keys'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function show_funkeys(funkeys_data, flex_routing_sw){
	if(funkeys_data['_enable'] == 0){
		var enable = true;
	}else{
		var enable = false;
	}
	
	//checked
	document.getElementById('enablenonspecialcharactersblindtransfer').checked = enable;
	
	//value
	document.getElementById('blindtransfer').value = funkeys_data['_blindtransfer'];
	document.getElementById('askedtransfer').value = funkeys_data['_askedtransfer'];
	
	if(flex_routing_sw != 1){
		/* other info */
		changge_NSCBT(funkeys_data['_blindtransfer'],funkeys_data['_askedtransfer']);
		$("#enablenonspecialcharactersblindtransfer").change(function(){
			changge_NSCBT(funkeys_data['_blindtransfer'],funkeys_data['_askedtransfer']);
		});
	}else{
		$("#tab_functionkeys tr:nth-child(1),#tab_functionkeys tr:nth-child(2)").hide();
	}
}

object.AGAlgFunkyGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var funkeys_data = data_temp['_funky'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	
	header(data_temp['_combuf']);
	show_funkeys(funkeys_data, flex_routing_sw);
	footer();
	
	onload_show();
	
	//save
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_funkeys();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

/******************************SHOW FUNKEYS END*************************************/

/******************************SAVE FUNKEYS END*************************************/
function save_funkeys(){
	var AlgFunky = new AST_AlgFunky();
	
	if(document.getElementById('enablenonspecialcharactersblindtransfer').checked == true){
		var enable = 0;
	}else{
		var enable = 1;
	}
	AlgFunky._enable = enable;
	
	if(document.getElementById('blindtransfer').disabled != true){
		var blindtransfer = document.getElementById('blindtransfer').value;
	}else{
		var blindtransfer = '';
	}
	AlgFunky._blindtransfer = blindtransfer;
	
	if(document.getElementById('askedtransfer').disabled != true){
		var askedtransfer = document.getElementById('askedtransfer').value;
	}else{
		var askedtransfer = '';
	}
	AlgFunky._askedtransfer = askedtransfer;
	
	object.AGAlgFunkySave(save_succeed_back, save_error_back, AlgFunky);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-funkeys.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/******************************SAVE FUNKEYS END*************************************/