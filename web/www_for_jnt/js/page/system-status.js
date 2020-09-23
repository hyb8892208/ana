/* chnel filter */
function chnel_filter(){
	$("#port_table").css({"top":$("#port_filter").offset().bottom, "left":$("#port_filter").offset().left, "position":"absolute"});
	$("#port_filter").click(function(){
		if($("#port_table").css("display") == "none")
			$("#port_table").css("display", "block"); 
		else if($("#port_table").css("display") == "block")
			$("#port_table").css("display", "none");
	});

	$("#port_select").mouseleave(function(){
		$("#port_table").hide();
	});

	$("#check_all").click(function(){
		if($(this).attr("checked") == "checked"){
			$("#port_filter").attr("value", "all");
			$("input.port_check").each(function(){
				$(this).attr("checked",true);
			});
		}else{
			$("#port_filter").attr("value", "");
			$("input.port_check").each(function(){
				$(this).attr("checked",false);
			});
		}
	});
}

function set_check(check_obj,target_id)
{
	var target_obj = document.getElementById(target_id);
	if(check_obj.checked == true){
		if(target_obj.value == "all" || target_obj.value == ""){
			target_obj.value = check_obj.value; 
		}else{
			target_obj.value += "," + check_obj.value; 
		} 
	}else{
		if(target_obj.value == "all"){
			var inputs = document.getElementsByTagName("input");     
			for(var i=0;i<inputs.length;i++){
				if( (inputs[i].getAttribute("type")=="checkbox" || inputs[i].getAttribute("type")=="Checkbox") && inputs[i].getAttribute("name")=="checkbox_name[]" && inputs[i] != check_obj){
					inputs[i].checked = true;
					set_check(inputs[i],target_id);
				}
			}
		}
		if(target_obj.value.indexOf("," + check_obj.value + ",") != -1){
			target_obj.value = target_obj.value.replace("," + check_obj.value,''); 
		}else if(target_obj.value.indexOf("," + check_obj.value) != -1){
			 target_obj.value = target_obj.value.replace("," + check_obj.value,''); 
		}else if(target_obj.value.indexOf(check_obj.value + ",") != -1){
			target_obj.value = target_obj.value.replace(check_obj.value + ",",''); 
		}else if(target_obj.value.indexOf(check_obj.value) != -1){
			target_obj.value = target_obj.value.replace(check_obj.value,''); 
		} 
	}
}

function click_filter(){
	var filter_ports = $("#port_filter").val();
	if(filter_ports == "all"){
		$(".analog_class").css("display","");
	} else {
		var filter_ports_arr = Array();
		filter_ports_arr = filter_ports.split(",");
		$(".analog_class").css("display","none");
		for(var key in filter_ports_arr){
			var filter_val = parseInt(filter_ports_arr[key]);
			$("._"+filter_val).css("display","");
		}
	}
}

function clean_filter(){
	$(".analog_class").css("display","");
	$("#port_table input").attr({"checked":false});
	$("#port_filter").val("all");
}

/*-----------------------------------------------------------------------------*/
function onload_show(){
	chnel_filter();
	click_filter();
}

/*****************************SHOW SYSTEM STATUS BEGIN*******************************/
(function(){
	/* Filter begin */
	$("#do_filter").val(language('Filter'));
	$("#clean_filter").val(language("Clean Filter"));
	$("#lang_check_all").html(language("All"));
	/* Filter end */
	
	/* Port Information begin */
	$("#lang_port").html(language('Port'));
	$("#lang_type").html(language('Type'));
	$("#lang_line_status").html(language('Line Status/Sip Account'));
	$("#lang_port_status").html(language('Port Status'));
	$("#lang_voltage").html(language('Voltage'));
	/* Port Information end */
	
	/* SIP Information begin */
	$("#lang_endpoint_name").html(language("Endpoint Name"));
	$("#lang_user_name").html(language("User Name"));
	$("#lang_host").html(language("Host"));
	$("#lang_registration").html(language("Registration"));
	$("#lang_sip_status").html(language("SIP Status"));
	$("#lang_response_code").html(language("Response Code"));
	/* SIP Information end */
	
	/* Routing Information begin */
	$("#lang_rule_name").html(language("Rule Name"));
	$("#lang_from").html(language("From"));
	$("#lang_to").html(language("To"));
	/* Routing Information end */
	
	/* Network Information begin */
	$(".lang_name").html(language("Name"));
	$("#lang_mac_address").html(language("MAC Address"));
	$("#lang_ip_address").html(language("IP Address"));
	$("#lang_mask").html(language("Mask"));
	$("#lang_gateway").html(language("Gateway"));
	$("#lang_rx_packets").html(language("RX Packets"));
	$("#lang_tx_packets").html(language("TX Packets"));
	/* Network Information end */
	
	/* other info */
	$("#port_information_li").html(language('Port Information'));
	$("#sip_information_li").html(language('SIP Information'));
	$("#routing_information").html(language('Routing Information'));
	$("#network_information").html(language('Network Information'));
}());

var CheckFXSCurrSta = '';
function status_show(data_temp){
	var analog_data = data_temp['_ana']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	var routing_data = data_temp['_roules']['_item'];
	var net_data = data_temp['_net']['_item'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	CheckFXSCurrSta = data_temp['_combuf']['_features']['_CheckFXSCurrSta'];
	
	/* Filter begin */
	var filter_tr_html = '';
	var n = 1;
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] != 1 &&
			analog_data[item]['_signalling'] != 2 &&
			analog_data[item]['_signalling'] != 3 &&
			analog_data[item]['_signalling'] != 4){
			continue;
		}
		
		if(n == 1){
			filter_tr_html += '<tbody>';
		}
		
		filter_tr_html += '<td><input type="Checkbox" name="checkbox_name[]" class="port_check" id="analog_check_'+analog_data[item]['_channel']+'" value="'+analog_data[item]['_channel']+'" onclick="set_check(this,\'port_filter\')">'+analog_data[item]['_channel']+'</td>';
		
		if(n == analog_data.length){
			filter_tr_html += '</tbody>';
		}else if(n%8 == 0){
			filter_tr_html += '</tbody><tbody>';
		}
		
		n++;
	}
	$("#filter_tr").html(filter_tr_html);
	/* Filter end */
	
	/* Port Information begin */
	var ana_html = '';
	for(var item in analog_data){
		var _channel = analog_data[item]['_channel'];
		
		if(analog_data[item]['_name'] != ''){
			var _name = analog_data[item]['_name'];
		}else{
			var _name = 'port-'+analog_data[item]['_channel'];
		}
		
		
		
		if(analog_data[item]['_signalling'] == 1 || analog_data[item]['_signalling'] == 2){
			_sigtype = 'FXO';
		}else if(analog_data[item]['_signalling'] == 3 || analog_data[item]['_signalling'] == 4){
			_sigtype = 'FXS';
		}else{
			_sigtype = '';
			continue;
		}
		
		var _line = analog_data[item]['_line'];
		
		var _callerid = analog_data[item]['_callerid'];
		
		var _status = analog_data[item]['_status'];
		
		ana_html += '<tr id="analog_'+_channel+'" class="analog_class _'+(_channel)+'">';
		ana_html += '<td>'+_channel+'</td>'+
					'<td>'+_name+'</td>';
		
		if(_sigtype == 'FXO'){
			if(_line == 'Connected'){
				ana_html += '<td><font color="#00A030">'+_sigtype+'</font></td>';
			}else if(_line == 'Disconnected'){
				ana_html += '<td><font color="#FF0000">'+_sigtype+'</font></td>';
			}else{
				ana_html += '<td><font color="#000000">'+_sigtype+'</font></td>';
			}
		}else if(_sigtype == 'FXS'){
			ana_html += '<td><font color="#00A030">'+_sigtype+'</font></td>';
		}else{
			ana_html += '<td><font color="#FF0000">Port NULL</font></td>';
		}
		
		if(_sigtype == 'FXS'){
			//if(flex_routing_sw == 0){
			if(_line == 'Connected'){
				_line = '<font color="#00A030">'+_line+'</font>';
			}else{
				_line = '<font color="#FF0000">'+_line+'</font>';
			}
			if(CheckFXSCurrSta == 1){
				ana_html += '<td>'+''+_line+' / '+_callerid+'</td>';
			}else{
				ana_html += '<td>'+_callerid+'</td>';
			}
			// }else{
				// ana_html += '<td></td>';
			// }
		}else if(_sigtype == 'FXO'){
			ana_html += '<td>'+_line+'</td>';
		}else{
			ana_html += '<td></td>';
		}
		
		if(_status=='OnHook'){
			ana_html += '<td><font color="#00A030">'+_status+'</font></td>';
		}else if(_status=='OffHook'){
			ana_html += '<td><font color="#FF0000">'+_status+'</font></td>';
		}else{
			ana_html += '<td></td>';
		}
		
		ana_html += '<td></td></tr>';
	}
	$("#analog_table").html(ana_html);
	/* Port Information end */

	/* SIP Information begin */
	var sip_html = '';
	for(var item in sip_data){
		var _section = sip_data[item]['_section'];
		var _username = sip_data[item]['_username'];
		var _host = sip_data[item]['_host'];
		var _registration_val = sip_data[item]['_registration'];
		if(_registration_val == 0){
			var _registration = 'none';
		}else if(_registration_val == 1){
			var _registration = 'client';
		}else if(_registration_val == 2){
			var _registration = 'server';
		}
		var _status = $.trim(sip_data[item]['_status']);
		var _respon = sip_data[item]['_respon'];
		
		if(_status == 'Registered'){
			var _status_td = '<font color=\"#00A030\">'+_status+'</font>';
		}else {
			var _status_td = '<font color=\"#FF0000\">'+_status+'</font>';
		}
		sip_html += '<tr>'+
				'<td>'+_section+'</td>'+
				'<td>'+_username+'</td>'+
				'<td>'+_host+'</td>'+
				'<td>'+_registration+'</td>'+
				'<td>'+_status_td+'</td>'+
				'<td>'+_respon+'</td>'+
			'</tr>';
	}
	$("#sip_table").html(sip_html);
	/* SIP Information end */

	/* Routing Information begin */
	var routing_html = '';
	for(var item in routing_data){
		var from_channel = routing_data[item]['_fromchannel'];
		var to_channel = routing_data[item]['_tochannel'];
		// var to_channel = '';
		// if(to_temp[0] != ''){
			// for(var t in to_temp){
				// var tmp = to_temp[t].split('-');
				// if(tmp[1] != undefined){
					// to_channel += tmp[1]+', ';
				// }else{
					// to_channel += to_temp[t]+', ';
				// }
			// }
		// }
		// to_channel=to_channel.substring(0,to_channel.length-2);
		routing_html += '<tr>'+
				'<td>'+routing_data[item]['_section']+'</td>'+
				'<td>'+from_channel+'</td>'+
				'<td>'+to_channel+'</td>'+
			'</tr>';
	}
	$("#routing_table").html(routing_html);
	// if(_Define['type'] == 2){
		// $(".routing_info_div").css('display', 'none');
	// }
	/* Routing Information end */

	/* Network Information begin */
	var network_html = '';
	var vpn_html = '';
	for(var item in net_data){
		if(net_data[item]['_ptpip'] == '' && net_data[item]['_mac'] != 0){
			if(item == 0){
				var net_type = 'LAN';
			}else if(item == 1){
				var net_type = 'WAN';
			}
			
			network_html += '<tr>'+
					'<td>'+net_type+'</td>'+
					'<td>'+net_data[item]['_mac']+'</td>'+
					'<td>'+net_data[item]['_ip']+'</td>'+
					'<td>'+net_data[item]['_mask']+'</td> '+
					'<td>'+net_data[item]['_gateway']+'</td>'+
					'<td>'+net_data[item]['_rx']+'</td>'+
					'<td>'+net_data[item]['_tx']+'</td>'+
				'</tr>';
		}else if(net_data[item]['_ptpip'] != ''){
			if(item == 2){
				var net_type = 'OPENVPN';
			}else if(item == 3){
				var net_type = 'PPTPVPN';
			}else if(item == 4){
				var net_type = 'Zerotier VPN';
			}else if(item == 5){
				var net_type = 'L2TPVPN';
			}
			
			vpn_html += '<br/><div id="tab">'+
				'<li class="tb1"></li>'+
				'<li class="tbg">VPN</li>'+
				'<li class="tb2"></li>'+
				'</div>';
			
			vpn_html += '<table width="100%" class="tshow"><tr>'+
				'<th>'+language('Name')+'</th>'+
				'<th>'+language('IP Address')+'</th>'+
				'<th>'+language('P-t-P IP Address')+'</th>'+
				'<th>'+language('Mask')+'</th>'+
				'<th>'+language('RX Packets')+'</th>'+
				'<th>'+language('TX Packets')+'</th>'+
				'</tr>'+
				
				'<tr>'+
				'<td>'+net_type+'</td>'+
				'<td>'+net_data[item]['_ip']+'</td>'+
				'<td>'+net_data[item]['_ptpip']+'</td>'+
				'<td>'+net_data[item]['_mask']+'</td>'+
				'<td>'+net_data[item]['_rx']+'</td>'+
				'<td>'+net_data[item]['_tx']+'</td>'+
				'</tr>'+
			'</table>';
				
		}
	}
	
	$("#network_table").html(network_html);
	$("#vpn_html").html(vpn_html);
	/* Network Information end */
}

object.AGSystemStatusGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	status_show(data_temp);
	footer();
	
	onload_show();
	get_analog_info();
}

function error_back(data){
	window.location.href = 'error.html';
}
/*****************************SHOW SYSTEM STATUS END*******************************/


/*****************************REFRESH CHANNEL BEGIN*******************************/
var cc;
function get_analog_info(){
	var url = "/service?action=get_analoginfo&" + "random=" + Math.random();
	
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data){
			refresh_channel(data);
		},
		complete: function(){
			clearTimeout(cc);
			cc = setTimeout(function(){get_analog_info();},4000);
		}
	});
};

function refresh_channel(data){
	var i=0;
	for(var item in data){
		i = item;
		var statusid=-1;
		if (data[item][0].sigtype.indexOf("FXO")>=0) {
			statusid = 4;
			data[item][0].sigtype='FXS';
			$("#analog_"+i+" td:eq(2)").html(data[item][0].sigtype);
			
			if(CheckFXSCurrSta == 1){
				var line = data[item][0].line;
				if(line == 'Connected'){
					line = '<font color="#00A030">'+line+'</font>';
				}else{
					line = '<font color="#FF0000">'+line+'</font>';
				}
				$("#analog_"+i+" td:eq(3)").html(line+' / '+data[item][0].callerid);
			}else{
				$("#analog_"+i+" td:eq(3)").html(data[item][0].callerid);
			}
		
			$("#analog_"+i+" td:eq(4)").html(data[item][0].status);
		} else if (data[item][0].sigtype.indexOf("FXS")>=0) {
			statusid = 4;
			data[item][0].sigtype='FXO';
			$("#analog_"+i+" td:eq(2)").html(data[item][0].sigtype);
			$("#analog_"+i+" td:eq(3)").html(data[item][0].line);
			$("#analog_"+i+" td:eq(4)").html(data[item][0].status);
			if (data[item][0].line == "Disconnected"){
				$("#analog_"+i+" td:eq(2)").css("color", "#FF0000");
			} else {
				$("#analog_"+i+" td:eq(2)").css("color", "#00A030");
			}
		}
		
		if (data[item][0].status == "OffHook"){
			$("#analog_"+i+" td:eq("+statusid+")").css("color", "#FF0000");
		} else if (data[item][0].status == "OnHook") {
			$("#analog_"+i+" td:eq("+statusid+")").css("color", "#00A030");
		} else {
			$("#analog_"+i+" td:eq("+statusid+")").css("color", "#000000");
		}
		
		if(data[item][0].voltage != undefined){
			$("#analog_"+i+" td:eq(5)").html(data[item][0].voltage);
		}
	}
}

/*****************************REFRESH CHANNEL END*******************************/