function get_all_sip(sip_data,routing_data,all_analog_data,i){
	var _select = '<input type="hidden" class="flag" >'+
			'<select size=1 class="asso_chnnl" id="associated_chnnl'+i+'" >'+
				'<option value="none">None</option>'+
				'<optgroup label="SIP">';
	var i = 0;
	for(var item in sip_data){
		var value = 'sip-'+sip_data[item]['_section'];
		// if(is_analog_use(all_analog_data,sip_data[item]['_section']) || (is_routing_use(routing_data,sip_data[item]['_section']) && _Define['type'] != 2)){
			// _select = _select+'<option class="sip_val" value="'+value+'" disabled>'+sip_data[item]['_section']+'</option>';
		// }else{
			_select = _select+'<option class="sip_val" value="'+value+'">'+sip_data[item]['_section']+'</option>';
		// }
		i++;
	}
	_select = _select+'</optgroup></select><span id="cassociated_channel"></span>';
	return _select;
}

function batch_get_all_sip(sip_data,routing_data,all_analog_data,i){
	var _select = '<input type="hidden" class="flag" >'+
			'<select size=1 id="associated_chnnl'+i+'" >'+
				'<option value="none">None</option>'+
				'<optgroup label="SIP">';
	var i = 0;
	for(var item in sip_data){
		var value = 'sip-'+sip_data[item]['_section'];
		// if(is_analog_use(all_analog_data,sip_data[item]['_section']) || (is_routing_use(routing_data,sip_data[item]['_section']) && _Define['type'] != 2)){
			// _select = _select+'<option class="sip_val" value="'+value+'" disabled>'+sip_data[item]['_section']+'</option>';
		// }else{
			_select = _select+'<option class="sip_val" value="'+value+'">'+sip_data[item]['_section']+'</option>';
		// }
		i++;
	}
	_select = _select+'</optgroup></select><span id="cassociated_channel"></span>';
	return _select;
}

/**********************************SHOW SIP FXO BINDING BEGIN**************************************/
(function(){
	$("#lang_port").html(language('Port'));
	$("#lang_forward_number").html(language('Forward Number')+
	'<button type="button" style="margin-left:15px;" id="forward_batch">'+language('Increment')+'</button>'+
	'<button type="button" style="margin-left:15px;" id="forward_copy">'+language('Copy')+'</button>');
	$("#lang_sip_endpoint").html(language('Sip Endpoint')+
	'<button type="button" style="margin-left:15px;" id="sip_batch">'+language('Increment')+'</button>'+
	'<button type="button" style="margin-left:15px;" id="sip_copy">'+language('Copy')+'</button>');
	$("#lang_callerid").html(language('CallerID')+
	'<button type="button" style="margin-left:15px;" id="callerid_batch">'+language('Increment')+'</button>'+
	'<button type="button" style="margin-left:15px;" id="callerid_copy">'+language('Copy')+'</button>');
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function fxo_binding_show(sip_data, routing_data, analog_data, flex_routing_sw){
	$("#batch_get_all_sip").append(batch_get_all_sip(sip_data, routing_data, analog_data, ''));
	
	var i = 0;
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] == 1){
			if(flex_routing_sw == 0) continue;
			var chan_type = 'S Ports';
			var s_type = 'S';
		}else if(analog_data[item]['_signalling'] == 2){
			var chan_type = 'FXO';
			var s_type = 'FXO';
		}else{
			continue;
		}
		$(".tshow").append(
			'<tr>'+
				'<td>'+
					'<input type="checkbox" class="routing_select" id="routing'+i+'" />'+
					'<input type="hidden" class="order" value="'+i+'" />'+
					'<input type="hidden" class="chan_type" value="'+chan_type+'" />'+
				'</td>'+
				'<td>'+
					s_type+analog_data[item]['_channel']+
					'<input type="hidden" class="channel" value="'+analog_data[item]['_channel']+'" />'+
				'</td>'+
				'<td>'+
					'<input type=text class="forwordnumber_v" id="sip_number'+i+'" title="'+language('SIM number')+'" />'+
				'</td>'	+
				'<td>'+
					get_all_sip(sip_data, routing_data, analog_data, i)+
				'</td>'+
				'<td>'+
					'<input type=text class="callerid_v" id="callerid'+i+'" />'+
				'</td>'+
			'</tr>'
		);
		i++;
	}
	
	/* other info */
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	$(".batch_input").val(language('Batch@sip_fxo','Batch'));
	$(".fixed_input").val(language('Fixed'));
	
	//select all checkbox
	$("#selall").click(function(){
		if($(this).attr('checked') == 'checked'){
			$(".routing_select").attr('checked', 'checked');
		}else{
			$(".routing_select").removeAttr('checked');
		}
	});
	
	//batch
	$(".batch_input").click(function(){
		var sip_number_val = $("#sip_number").val();
		if(sip_number_val != '' && !check_phonenum(sip_number_val)){
			//alert('"Forward Number" must not be null!');
			alert('"Forward Number" must be number!');
			document.getElementById('sip_number').focus();
			return false;
		}
		
		var callerid_val = $("#callerid").val();
		if(callerid_val != '' && !check_phonenum(callerid_val)){
			//alert('"CallerID" must not be null!');
			alert('"CallerID" must be number!');
			document.getElementById('callerid').focus();
			return false;
		}
		
		var sip_arr = [];
		var flag = 0;
		$("#associated_chnnl").children().children('.sip_val').each(function(){
			var a = $(this).attr('disabled');
			var b = $(this).attr('selected');
			if($(this).attr('selected') == 'selected'){
				flag = 1;
			}
			
			if(flag == 1){
				if($(this).attr('disabled') != 'disabled'){
					sip_arr.push($(this).val());
				}
			}
		});
		
		var associated_chnnl_val = $("#associated_chnnl").val();
		var j = 0;
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				document.getElementById('sip_number'+i).value = sip_number_val;
				document.getElementById('callerid'+i).value = callerid_val;
				if(sip_number_val != '') sip_number_val = parseInt(sip_number_val)+1;
				if(callerid_val != '') callerid_val = parseInt(callerid_val)+1;
				
				if(associated_chnnl_val != 'none'){
					if(sip_arr[j] != undefined){
						$("#associated_chnnl"+i+" option[value='"+sip_arr[j]+"']").attr('selected', 'selected');
					}else{
						$("#associated_chnnl"+i+" option[value=none]").attr('selected', 'selected');
					}
					j++;
				}else{
					$("#associated_chnnl"+i+" option[value='"+associated_chnnl_val+"']").attr('selected', 'selected');
				}
			}
		});
	});
	
	//fixed
	$(".fixed_input").click(function(){
		var sip_number_val = $("#sip_number").val();
		if(sip_number_val != '' && !check_phonenum(sip_number_val)){
			alert('"Forward Number" must be number!');
			document.getElementById('sip_number').focus();
			return false;
		}
		
		var callerid_val = $("#callerid").val();
		if(callerid_val != '' && !check_phonenum(callerid_val)){
			alert('"CallerID" must be number!');
			document.getElementById('callerid').focus();
			return false;
		}
		
		var associated_chnnl_val = $("#associated_chnnl").val();
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				document.getElementById('sip_number'+i).value = sip_number_val;
				document.getElementById('callerid'+i).value = callerid_val;
				
				$("#associated_chnnl"+i+" option[value='"+associated_chnnl_val+"']").attr('selected', 'selected');
			}
		});
	});
	
	//forward batch
	$("#forward_batch").click(function(){
		var sip_number_val = $("#sip_number").val();
		if(sip_number_val != '' && !check_phonenum(sip_number_val)){
			alert('"Forward Number" must be number!');
			document.getElementById('sip_number').focus();
			return false;
		}
		
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				document.getElementById('sip_number'+i).value = sip_number_val;
				if(sip_number_val != '') sip_number_val = parseInt(sip_number_val)+1;
			}
		});
	});
	
	//forward copy
	$("#forward_copy").click(function(){
		var sip_number_val = $("#sip_number").val();
		if(sip_number_val != '' && !check_phonenum(sip_number_val)){
			alert('"Forward Number" must be number!');
			document.getElementById('sip_number').focus();
			return false;
		}
		
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				document.getElementById('sip_number'+i).value = sip_number_val;
			}
		});
	});
	
	//sip batch
	$("#sip_batch").click(function(){
		var sip_arr = [];
		var flag = 0;
		$("#associated_chnnl").children().children('.sip_val').each(function(){
			var a = $(this).attr('disabled');
			var b = $(this).attr('selected');
			if($(this).attr('selected') == 'selected'){
				flag = 1;
			}
			
			if(flag == 1){
				if($(this).attr('disabled') != 'disabled'){
					sip_arr.push($(this).val());
				}
			}
		});
		
		var associated_chnnl_val = $("#associated_chnnl").val();
		var j = 0;
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				
				if(associated_chnnl_val != 'none'){
					if(sip_arr[j] != undefined){
						$("#associated_chnnl"+i+" option[value='"+sip_arr[j]+"']").attr('selected', 'selected');
					}else{
						$("#associated_chnnl"+i+" option[value=none]").attr('selected', 'selected');
					}
					j++;
				}else{
					$("#associated_chnnl"+i+" option[value='"+associated_chnnl_val+"']").attr('selected', 'selected');
				}
			}
		});
	});
	
	//sip copy
	$("#sip_copy").click(function(){
		var associated_chnnl_val = $("#associated_chnnl").val();
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				$("#associated_chnnl"+i+" option[value='"+associated_chnnl_val+"']").attr('selected', 'selected');
			}
		});
	});
	
	//callerid batch
	$("#callerid_batch").click(function(){
		var callerid_val = $("#callerid").val();
		if(callerid_val != '' && !check_phonenum(callerid_val)){
			//alert('"CallerID" must not be null!');
			alert('"CallerID" must be number!');
			document.getElementById('callerid').focus();
			return false;
		}
		
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				document.getElementById('callerid'+i).value = callerid_val;
				if(callerid_val != '') callerid_val = parseInt(callerid_val)+1;
			}
		});
	});
	
	//callerid copy
	$("#callerid_copy").click(function(){
		var callerid_val = $("#callerid").val();
		if(callerid_val != '' && !check_phonenum(callerid_val)){
			alert('"CallerID" must be number!');
			document.getElementById('callerid').focus();
			return false;
		}
		
		$(".routing_select").each(function(){
			if($(this).attr('checked') == 'checked'){
				var i = $(this).siblings('.order').val();
				document.getElementById('callerid'+i).value = callerid_val;
			}
		});
	});
}

object.AGSipFxoBindingGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var sip_data = data_temp['_sip']['_item'];
	var analog_data = data_temp['_ana']['_item'];
	var routing_data = data_temp['_roules']['_item'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	
	header(data_temp['_combuf']);
	fxo_binding_show(sip_data, routing_data, analog_data, flex_routing_sw);
	footer();
	
	//save
	$(".save_click").click(function(){
		if(save_only_once()){
			$("#loading_image").show();
			fxo_binding_save();
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/**********************************SHOW SIP FXO BINDING END**************************************/


/**********************************SAVE SIP FXO BINDING BEGIN**************************************/
function fxo_binding_save(){
	var SipFxoBindingSaveArr = new AST_SipFxoBindingSaveArr();
	$(".routing_select").each(function(){
		if($(this).attr('checked') == 'checked'){
			var associated_chnnl = $(this).parent().siblings().children('.asso_chnnl').val();
			var chan_type = $(this).siblings('.chan_type').val();
			if(associated_chnnl == 'none'){
				return false;
			}
			
			var channel = $(this).parent().siblings().children('.channel').val();
			var forward_number = $(this).parent().siblings().children('.forwordnumber_v').val();
			var callerid = $(this).parent().siblings().children('.callerid_v').val();
			var order = parseInt($(this).siblings('.order').val())+1;
			var order1 = 2*parseInt(order) - 1;
			var order2 = 2*parseInt(order);
			
			if(chan_type == 'S Ports'){
				var chan2sip = 's2sip-';
				var sip2chan = 'sip2s-';
			}else{
				var chan2sip = 'fxo2sip-';
				var sip2chan = 'sip2fxo-';
			}
			
			var sipfxobinding = new AST_SipFxoBindingSave();
			sipfxobinding._name = chan2sip+channel;
			sipfxobinding._order = order1;
			sipfxobinding._forwardnumber = forward_number;
			sipfxobinding._callerid = callerid;
			sipfxobinding._associatedchnnl = associated_chnnl;
			
			SipFxoBindingSaveArr._item.push(sipfxobinding);
			
			var sipfxobinding = new AST_SipFxoBindingSave();
			sipfxobinding._name = sip2chan+channel;
			sipfxobinding._order = order2;
			sipfxobinding._forwardnumber = forward_number;
			sipfxobinding._callerid = callerid;
			sipfxobinding._associatedchnnl = associated_chnnl;
			
			SipFxoBindingSaveArr._item.push(sipfxobinding);
		}
	});
	
	object.AGSipFxoBindingSave(save_succeed_back, save_error_back, SipFxoBindingSaveArr);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'sip-fxo-binding.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/**********************************SAVE SIP FXO BINDING BEGIN**************************************/