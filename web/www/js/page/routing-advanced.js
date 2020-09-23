function check(data_temp){
	if(document.getElementById('flex_routing_sw').checked == true && data_temp['_combuf']['_FlexRoutingSw'] == 0){
		if(!confirm(language('Flex Routing Switch Open help', 'This operation clears all fxs-bound SIP extension information.Need to continue?'))){
			return false;
		}
	}else if(document.getElementById('flex_routing_sw').checked == false && data_temp['_combuf']['_FlexRoutingSw'] == 1){
		if(!confirm(language('Flex Routing Switch Close help', 'This operation clears all fxs-related routing information.Need to continue?'))){
			return false;
		}
	}
	
	return true;
}

function onload_show(data_temp){
	$("#flex_routing_sw").iButton();
	$("#internalcallsw").iButton();
	$("#internalsipcallsw").iButton();
	
	if(data_temp['_FlexRoutingSw'] == 1){
		$("#internalcallsw_tr").show();
	}else{
		$("#internalcallsw_tr").hide();
		if($("#internalcallsw").attr('checked') == 'checked'){
			$("#internalcallsw").click();
		}
	}
	
	$("#flex_routing_sw").change(function(){
		if($(this).attr('checked') == 'checked'){
			$("#internalcallsw_tr").show();
		}else{
			$("#internalcallsw_tr").hide();
			if($("#internalcallsw").attr('checked') == 'checked'){
				$("#internalcallsw").click();
			}
		}
	});
}

(function(){
	$("#general_li").html(language('General'));
	$("#lang_flex_routing_sw").html(language('Flexible Routing Switch'));
	$("#lang_flex_routing_sw_help").html(language('Flexible Routing Switch help','Flexible Routing Switch'));
	$("#lang_internalcallsw").html(language('Enable Internal FXS Call'));
	$("#lang_internalcallsw_help").html(language('Enable Internal FXS Call help', 'Enable Internal FXS Call'));
	$("#lang_internalsipcallsw").html(language('Enable Internal SIP Call@Routing', 'Enable Internal SIP Call'));
	$("#lang_internalsipcallsw_help").html(language('Enable Internal SIP Call help@Routing', 'Enable Internal SIP Call'));
	
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
})();

function show_routing_advanced(adv_data){
	
	var flex_routing_sw = adv_data['_FlexRoutingSw'];
	if(flex_routing_sw == 1){
		document.getElementById('flex_routing_sw').checked = true;
	}
	
	var internalcallsw = adv_data['_InternalCallSw'];
	if(internalcallsw == 1){
		document.getElementById('internalcallsw').checked = true;
	}
	
	var internalsipcallsw = adv_data['_InternalSipCallSw'];
	if(internalsipcallsw == 1){
		document.getElementById('internalsipcallsw').checked = true;
	}
}

object.AGRoutingAdvGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_routing_advanced(data_temp);
	footer();
	
	onload_show(data_temp);
	
	$(".save_input").click(function(){
		if(check(data_temp)){
			if(save_only_once()){
				$("#loading_image").show();
				save_routing_advanced();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

/***************************************************************************/

function save_routing_advanced(){
	var _RoutingAdvSave = new AST_RoutingAdvSave();
	
	if(document.getElementById('flex_routing_sw').checked == true){
		_RoutingAdvSave._FlexRoutingSw = 1;
	}else{
		_RoutingAdvSave._FlexRoutingSw = 0;
	}
	
	if(document.getElementById('internalcallsw').checked == true){
		_RoutingAdvSave._InternalCallSw = 1;
	}else{
		_RoutingAdvSave._InternalCallSw = 0;
	}
	
	if(document.getElementById('internalsipcallsw').checked == true){
		_RoutingAdvSave._InternalSipCallSw = 1;
	}else{
		_RoutingAdvSave._InternalSipCallSw = 0;
	}
	
	object.AGRoutingAdvSave(save_succeed_back, save_error_back, _RoutingAdvSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'routing-advanced.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}