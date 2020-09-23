function checkValue(value)
{
	if(trim(value) == '') {
		alert('Please input a domain or IP address\n');
		return false;
	}

	return true;
}
function param_change(data){
	var param_name = data.id;
	var index = param_name.substring(20);
	var value = data.value;
	var option_value = 'option_value';
	if(value == 'sip' ){
		show(option_value+index);
		document.getElementById(option_value+index).value='5060';
	} else if(value == 'host') {
		show(option_value+index);
		document.getElementById(option_value+index).value = '169.254.0.1';
	} else {
		hide(option_value+index);
		document.getElementById(option_value+index).value = '';
	}
}
function tcpdump_option_select(name){
	var html_str = "<select size=1 class='tcp_option' name='"+name+"' id='"+name+"' onchange=\"param_change(this)\">";
	html_str += "<option value='none' >None</option>";
	html_str += "<option value='all' >All</option>";
	html_str += "<option value='tcp' >TCP</option>";
	html_str += "<option value='udp' >UDP</option>";
	html_str += "<option value='host' >HOST</option>";
	html_str += "<option class='tcp_sip' value='sip' >SIP</option>";
	html_str += '</select>';
	
	return html_str;
}
function tcpdump_param_addRow()
{
	len = tbl_fctn.rows.length-1;
	var name = "tcpdump_param_option"+len;
	var option_value = "option_value"+len;
	var newTr = tbl_fctn.insertRow(len);

	var newTd0 = newTr.insertCell(0);

	newTd0.innerHTML = '<td>'+tcpdump_option_select(name)+'&nbsp&nbsp&nbsp<input type=\"text\" id="'+option_value+'" value=\"\" /></td><img src=\"/images/delete.gif\" style=\"float:right; margin-left:0px; margin-bottom:-3px;cursor:pointer;\" alt=\"remove\" title=\"Click here to remove this pattern\" onclick=\"javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\" />';
	hide(option_value);
	
	//tcp_sip
	if(document.getElementById('cap_port').value != ''){
		$(".tcp_sip").attr('disabled', true);
	}
}

//tcpdump
var hour,minute,second;
hour=minute=second=0;
var minutes = '00';
var seconds = '00';
var millisecond=0;
var interval;
function click(){
	minutes = '00', seconds = '00';
	var str = "<p style='text-align:center'><font color='#00ff33' size= '6px' style='font-weight:bold'>" + minutes +":"+ seconds + "</font></p>";
		str += "<br><font color='green' size='5px'>The maximum duration of this recording is 10 minutes,and the system will stop and download the recording file automatically when time is up</font>";
	$("#time").html(str);
	interval = setInterval(function() {
		millisecond=millisecond+1000;
		if(millisecond>=1000)
		{
			millisecond=0;
			second=second+1;
		}
		if(second>=60){
			second=0;
			minute=minute+1;
		}
		if(minute>=60){ 
			minute=0;
		}
		if(minute<10)minutes='0'+minute;
		else minutes=minute;
		if(second<10)seconds='0'+second;
		else seconds=second;
		if(minute>=30){
			clearInterval(interval);
		}
		var str = "<p style='text-align:center'><font color='#00ff33' size= '6px' style='font-weight:bold'>" + minutes +":"+ seconds + "</font></p>";
		str += "<br><font color='green' size='5px'>The maximum duration of this recording is 3 minutes,and the system will stop and download the recording file automatically when time is up</font>";
		$("#time").html(str);
		if(minute == 3){
			$("#preview_dg").dialog("close");
			send_dump_capture_request();
			window.clearInterval(interval);
		}
	}, 1000);
}

//tcpdump end
function send_dump_capture_request()
{	
	minutes = '00', seconds = '00';
	minute = 0;
	second = 0;
	window.clearInterval(interval);
	
	stop_tcpdump();
}

function preview_dialog() 
{
	click();
	$("#preview_dg").dialog({
		resizable: false,
		height:400,
		width:500,
		modal: true,

		buttons: [
			{
				text:"Stop Capture",
				id:"close",
				style:"text-align: center",
				click:function(){
				    $(this).dialog( "close" );
				    send_dump_capture_request();
				}
			}
		]		
	});
	$(".ui-button").click(function(){
	   	hour=minute=second=0;
		minutes = '00';
		seconds = '00';
		millisecond=0;
		window.clearInterval(interval);
		send_dump_capture_request();
	});
}

function onload_show(){
	$("#cap_port").focus(function(){
		$(".tcp_option option").removeAttr('disabled');
	});
	
	$("#cap_port").blur(function(){
		if($(this).val() != ''){
			$(".tcp_sip").attr('disabled', true);
		}
	});
}

function check(){
	if(string_filter_tip()){
		return false;
	}
	
	return true;
}

function string_filter_tip(){ //tip for user that wrong value
	if(string_filter_tip_run('cap_port')){
		return true;
	}
	
	return false;
}
/*************************************************************************************/

/*********************************SHOW NETWORK TOOLKIT BEGIN****************************/
function lang_show(){
	$(".lang_interface").html(language('Interface'));
	$(".lang_interface_help").html(language('Interface help','The name of network interface.'));
	$("#lang_ping").val(language('Ping'));
	$("#lang_traceroute").val(language('Traceroute'));
	
	//Channel Recording
	$("#lang_channel_recording").html(language('Channel Recording'));
	$("#lang_source_host").html(language('Source host'));
	$("#lang_source_host_help").html(language('Source host help',' .'));
	$("#lang_destination_host").html(language('Destination host'));
	$("#lang_destination_host_help").html(language('Destination host help','The name of network interface.'));
	$("#lang_port").html(language('Port'));
	$("#lang_port_help").html(language('Port help','The name of network interface.'));
	$("#lang_tcpdump").html(language('Tcpdump Option Paramater'));
	$("#lang_tcpdump_help").html(language('Tcpdump Parameter Option help','the tool of tcpdump capture network data by parameter option specified'));
	$("#lang_add_tcpdump_option").val(language('Add a Tcpdump paramter option'));
	$("#lang_start").val(language('Start'));
}
lang_show();

function toolkit_show(data_temp){
	var ethname_arr = data_temp['_ethname']['_item']
	
	_ping_host = 'google.com';
	_tracert_host = 'google.com';
	
	var interface_str = '';
	for(var i=0;i<ethname_arr.length;i++){
		if(ethname_arr[i] == '') continue
		if(i == 0){
			var network_type = 'Lan';
		}else if(i == 1){
			var network_type = 'Wan';
		}
		interface_str += '<option value='+i+'>'+network_type+'</option>';
	}
	$("#interface").append(interface_str);
	$("#interface_type").append(interface_str);
	
	//value 
	document.getElementById('ping_hostname').value = _ping_host;
	document.getElementById('tracert_hostname').value = _tracert_host;
}

object.AGNetworkToolkitGet(succeed_back, error_back);

var click_flag = 0;
function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	toolkit_show(data_temp);
	footer();
	
	onload_show();
	
	//ping
	$("#lang_ping").click(function(){
		if(click_flag == 0){
			toolkit_save('ping');
			click_flag = 1;
		}else if(click_flag == 1){
			alert('ping is running');
		}else if(click_flag == 2){
			alert('traceroute is running');
		}
	});
	
	//tracroute
	$("#lang_traceroute").click(function(){
		if(click_flag == 0){
			toolkit_save('traceroute');
			click_flag = 2;
		}else if(click_flag == 1){
			alert('ping is running');
		}else if(click_flag == 2){
			alert('traceroute is running');
		}
	});
	
	//start
	$("#lang_start").click(function(){
		if(check()){
			start_tcpdump();
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*********************************SHOW NETWORK TOOLKIT END****************************/

/*********************************SAVE NETWORK TOOLKIT BEGIN****************************/
var _action = '';

function toolkit_save(action){
	var _interface = document.getElementById('interface').value;
	
	if(action == 'ping'){
		var cmd = 0;
		_action = action;
		var host = document.getElementById('ping_hostname').value;
	}else{
		var cmd = 1;
		_action = action;
		var host = document.getElementById('tracert_hostname').value;
	}
	object.AGNetworkTookitPing(ping_succeed_back, ping_error_back, cmd, _interface, host);
	
	if(_action == 'ping'){
		var content = document.getElementById('ping_hostname').value;
	}else{
		var content = document.getElementById('tracert_hostname').value;
	}
	var output  = "<b>"+language('Report')+"</b>";
	output += "<table style='width:100%;font-size:12px;border:1px solid rgb(59,112,162);'>";
	output += "<tr style='background-color:#D0E0EE;height:26px;'>";
	output += "<td align='center' style='width:100%'><b>"+_action+" "+content+"</b>";
	output += "</td></tr>";
	output += "<tr align='left' style='background-color: rgb(232, 239, 247);'>";
	output += "<td id='report_info'>";
	output += "<image src='../images/loading1.gif' />";
	output += "</td>";
	output += "</tr>";
	output += "<tr style='background-color:#D0E0EE;height:26px;'>";
	output += "<th style='width:100%'>"+language('Result')+"</th>";
	output += "<tr align='left' style='background-color: rgb(232, 239, 247);'>";
	output += "<td id='report_result'>";
	output += "<image src='../images/loading1.gif' />";
	output += "</td>";
	output += "</tr></table>";
	$("#result").html(output);
}

function ping_succeed_back(data){
	if(data['_result']['_resStr'] != ''){
		var data_temp = data['_result']['_resStr'].replace(/\n/ig, '<br>');
	}else{
		var data_temp = '';
	}
	$("#report_info").html(data_temp);
	
	if(_action == 'ping'){
		var content = document.getElementById('ping_hostname').value;
	}else{
		var content = document.getElementById('tracert_hostname').value;
	}
	if(data['_result']['_res'] == 0){
		var info = "<font color=00ff00>Successfully "+_action+" [ "+content+" ] .</font>";
	}else{
		var info = "<font color=ff0000>Fail to "+_action+" [ "+content+" ] !</font>";
	}
	$("#report_result").html(info);
	
	click_flag = 0;
}

function ping_error_back(data){
	if(_action == 'ping'){
		alert('ping failed');
	}else{
		alert('traceroute failed');
	}
}
/*********************************SAVE NETWORK TOOLKIT END****************************/


/************************************START TCPDUMP**********************************/
function start_tcpdump(){
	var NetworkTookitTcpdump = new AST_NetworkTookitTcpdump();
	
	var _interface = document.getElementById('interface_type').value;
	NetworkTookitTcpdump._interface = _interface;
	
	var source_host = document.getElementById('source_host').value;
	if(source_host == ''){source_host = null;}
	NetworkTookitTcpdump._src = source_host;
	
	var dest_host = document.getElementById('dest_host').value;
	if(dest_host == ''){dest_host = null;}
	NetworkTookitTcpdump._drc = dest_host;
	
	var cap_port = document.getElementById('cap_port').value;
	if(cap_port == ''){cap_port = 0;}
	NetworkTookitTcpdump._port = cap_port;
	
	var LineArr = new AST_LineArr();
	var i = 0;
	$(".tcp_option").each(function(){
		var key = document.getElementById('tcpdump_param_option'+i).value;
		var value = document.getElementById('option_value'+i).value;
		
		if(key != ''){
			var line = new AST_Line();
			line._key = key;
			line._value = value;
			LineArr._item.push(line);
			i++;
		}
	});
	NetworkTookitTcpdump._lines = LineArr;
	
	object.AGNetworkTookitTcpdump(start_succeed_back, start_error_back, 0, NetworkTookitTcpdump);
}

function start_succeed_back(data){}

function start_error_back(data){
	alert(language('tcpdump start failed'));
}
/**************************************START TCPDUMP***********************************/


/**************************************END TCPDUMP***********************************/
function stop_tcpdump(){
	object.AGNetworkTookitTcpdump(stop_succeed_back, stop_error_back, 1, null);
}

function stop_succeed_back(data){
	setTimeout(function(){$("#toolkit_form").submit();},200);
}

function stop_error_back(data){
	alert(language('tcpdump stop failed'));
}
/**************************************END TCPDUMP***********************************/