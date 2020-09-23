function cancel(){
	window.location.href = "routing-rules.html";
}
function _onfocus(obj,str)
{
	if (obj.value == str) {
		obj.value =''
		obj.style.color = '#000000';
	}
}

function _onblur(obj,str)
{
	if (trim(obj.value) =='') {
		obj.value = str;
		obj.style.color = '#aaaaaa';
	}
}

function addTPRow()
{
	var tbl_timeroute = document.getElementById('tbl_timeroute');
	var len = tbl_timeroute.rows.length-1;
	var newTr = tbl_timeroute.insertRow(len);
	var newTd = newTr.insertCell(0);
	newTd.innerHTML = time_pattern_table('','','','','','','','');
}

function addRow(analog_data, sip_data, group_data, flex_routing_sw)
{
	var tbl_fctn = document.getElementById('tbl_fctn');
	var len = tbl_fctn.rows.length-1;
	var name = "fctn_channel";

	var newTr = tbl_fctn.insertRow(len);

	var newTd0 = newTr.insertCell(0);
	var newTd1 = newTr.insertCell(0);

	newTd0.innerHTML = '<td>'+channel_select(analog_data, sip_data, group_data, name, flex_routing_sw)+'</td><img src=\"../images/delete.gif\" style=\"float:right; margin-left:0px; margin-bottom:-3px;cursor:pointer;\" alt=\"remove\" title=\"Click here to remove this pattern\" onclick=\"javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\" />';
	newTd1.innerHTML = '<th>'+language('Failover Call Through Number')+' ' + len + ':</th>';
}

function addDPRow2()
{
	var tbl_callee_caller_manipulation = document.getElementById('tbl_callee_caller_manipulation');
	var len = tbl_callee_caller_manipulation.rows.length-1;

	var newTr = tbl_callee_caller_manipulation.insertRow(len);
	var newTd = newTr.insertCell(0);
	var para = [];
	para['callerid'] = [];
	para['calleeid'] = [];
	newTd.innerHTML = dial_pattern_html2(para);
	
	callee_pre_and_match_disabled();
}

function disa_ami_change()                                                                                                                       
{                                                                                                                                                
	$("#disa_sw").iButton();
	$("#second_dial_sw").iButton();
	$("#disa_secret_sw").iButton();
	$("#forceanswer").iButton();
	var sw = document.getElementById('disa_sw').checked;
	if (sw) {
			set_visible('second_dial_ctl',true);
			set_visible('disa_timeout_ctl',true);
			set_visible('disa_password_digits_ctl',true);
			set_visible('disa_secret_ctl',true);
	} else {
			set_visible('second_dial_ctl',false);
			set_visible('disa_timeout_ctl',false);
			set_visible('disa_password_digits_ctl',false);
                set_visible('disa_secret_ctl',false);
        }
}

function select_length_change()
{
	var limit_length = document.getElementById('disa_password_digits').value;
	var edit = $("#editsecret");

	var array_secret = edit.val().split(/[\r\n]+/g);
	if ( array_secret.length >50 ) {
		alert("The lines of secret must be less than 50.\n\rPlease change password by clicking the 'Edit' Button.");
		return false;
	} else {
		for (var i=0;i<array_secret.length;i++){
			var secret = array_secret[i];
			var j = i + 1;
			if ( secret.length >limit_length ) {
				alert_str = "Sorry! The password digits does not match!!\n\r"+"Please re-select 'Max Password Digits' option,\n or change password by clicking the 'Edit' Button.";
				alert(alert_str);
				return false;
			} else {
				var regex = /\d*/i;
				var result = secret.match(regex);                                                                                
				if (result != secret) {                                                                                          
						number_check = "Secret must be numbers(at:line "+ j + ").Please change password by clicking the 'Edit' Button.";
						alert(number_check);
						return false ;
				} else {
						//secret ok .....
				}
			}
		}
	}
}

function secret_edit()
{
	var limit_length = document.getElementById('disa_password_digits').value;
	var old_data = document.getElementById('editsecret').value;
	$("#DISA_secret_dg").dialog({
		resizeable: false,
		height:400,
		width:500,
		modal:true,
		buttons: {
			"Save Secret": function() {
				var save_flag = 0;
				edit = $("#editsecret");
				var array_secret = edit.val().split(/[\r\n]+/g);
				var secret_str = "";
				if ( array_secret.length >50 ) {
					alert("The lines of secret must be less than 50.\n\rPlease delete some lines.");
					return ;
				} else {
					for (var i=0;i<array_secret.length;i++){
						var secret = array_secret[i];
						var j = i + 1;
						if ( secret.length >limit_length ) {
							alert_str = "Sorry! The password digits does not match!!\n\rPlease make sure the length of password(line "+j +") is less than "+limit_length+".";
							alert(alert_str);
							return ;
						} else {
							var regex = /\d*/i;
							var result = secret.match(regex);
							if (result != secret) {
								number_check = "Error! Secret must be numbers(line "+ j + ").\n\rPlease fix it.";
								alert(number_check);
								save_flag = 0;
								return ;
							} else {
								save_flag = 1;
								secret_str = secret_str  + secret + "\n";
							}
						}
					}
				}
				if (save_flag == 1) {
					alert("Save successfully.");
					$(this).dialog("close");
					document.getElementById('revc_secret').value = secret_str;
				}
			},
			Cancel: function() {
				document.getElementById('editsecret').value = old_data;
				$(this).dialog( "close" );
			}
		}
	});
	return ;
}

function check(all_routing_data, section)
{
	var aroutings = all_routing_data;
	var name_ary = [];
	for(var item in aroutings){
		if(aroutings[item]['_section'] == section){continue;}
		name_ary.push(aroutings[item]['_section']);
	}
	var routing_name = document.getElementById('routing_name').value;
	
	document.getElementById('crouting_name').innerHTML = '';
	for (var i in name_ary)
	{
		if(name_ary[i] == routing_name) {
			document.getElementById('crouting_name').innerHTML = con_str('Already exist.');
			return false;
		}
	}

	var from_channel = document.getElementById('from_channel').value; 
	var to_channel = document.getElementById('to_channel').value; 

	document.getElementById('crouting_name').innerHTML = '';
	
	if  (routing_name==""){
		document.getElementById("crouting_name").innerHTML=con_str('Must set.');
		return false;
	}
	
	document.getElementById('cfrom_channel').innerHTML = '';
	if(from_channel == 'none') {
		document.getElementById('cfrom_channel').innerHTML = con_str('Must set.');
		return false;
	}

	document.getElementById('cto_channel').innerHTML = '';
	if(to_channel == 'none') {
		document.getElementById('cto_channel').innerHTML = con_str('Must set.');
		return false;
	}
	
	if (!(rstr=check_diyname(routing_name))) {
		document.getElementById("crouting_name").innerHTML = con_str(rstr);
		return false;
	}
	
	document.getElementById('cdialing_delay').innerHTML = '';
	var dialing_delay = document.getElementById('dialing_delay').value;
	if((isNaN(parseInt(dialing_delay)) || (parseFloat(dialing_delay) < 0) || (parseFloat(dialing_delay) > 60)) && dialing_delay != ''){
		document.getElementById('cdialing_delay').innerHTML = con_str('Must be number, range: 0-60.');
		return false;
	}
	
	if(limit_string_length()){
		return false;
	}
	
	return true;
}

function trunk_sw_control(obj){
	var trunk_sw = trim(obj.value);
	var  obj_td;
	
	obj_td = obj.parentNode;
	var count = obj_td.childElementCount;
	var td_childs = obj_td.childNodes;
	for(var i = 0; i < count; i++){
		if(obj_td == undefined || obj_td.children[i] == undefined){
			continue;
		}
		if(obj_td.children[i].nodeName == 'INPUT'){
			if(obj_td.children[i].getAttribute('title') != "match pattern"){
				if(trunk_sw == 'on'){
					obj_td.children[i].disabled = true;
				} else {
					obj_td.children[i].disabled = false;
				}
			}
		}
	}
}

function limit_string_length(){
	if(check_string_length('forward_number')){
		return true;
	}
	
	return false;
}
/*************************************************************************************/
function float_sort_hide(){
	$("#sort_gsm_cli").stop().animate({left:"-198px"}, 300);
	$("#sort_out").stop().animate({left:"0px"}, 300);
}

function float_sort_on(){
	$("#sort_gsm_cli").animate({left:"0px"}, 300);
	$("#sort_out").animate({left:"198px"}, 300);
}

function routing_onload(){
	$("#float_button_3").mouseover(function(){
	  $("#float_button_3").css({opacity:"1",filter:"alpha(opacity=100)"});
	});
	$("#float_button_3").mouseleave(function(){
	  $("#float_button_3").css({opacity:"0.5",filter:"alpha(opacity=50)"});
	});
	float_sort_hide();
	var sort_info_top = $("#lps").offset().top;
	$("#sort_gsm_cli").offset({top: sort_info_top });
	$("#sort_out").offset({top: sort_info_top });
	$("#sort_out").mouseover(function(){
		if($("#sort_out").offset().left <= 5){
	   		float_sort_on();
		}
	});
	$("#sort_gsm_cli").mouseleave(function(){
		float_sort_hide();
	});
	$("#disa_sw").iButton();
	disa_ami_change();
	
	$("#delay_sw").iButton();
	caller_disabled();
	
	callee_pre_and_match_disabled();
	$("#from_channel").change(function(){
		var str = $(this).find("option:selected").val();
		str = str.split('-');
		if(str[0] == 'fxo'){
			$(".cidNumber_table").show();
		}else{
			$(".cidNumber_table").hide();
		}
		
		callee_pre_and_match_disabled();
	});
}

function callee_pre_and_match_disabled(){
	var from_channel = document.getElementById('from_channel').value;
	var temp = from_channel.indexOf('fxo');
	if(temp != -1){
		$('.prefix_e').attr('disabled','disabled');
		$('.match_pattern_e').attr('disabled','disabled');
	}else{
		$('.prefix_e').removeAttr('disabled');
		$('.match_pattern_e').removeAttr('disabled');
	}
}

function caller_disabled(){
	$(".trunk_sw").each(function(){
		if($(this).val() == 'on'){
			$(this).siblings('.prepend_r').attr('disabled', 'disabled');
			$(this).siblings('.prefix_r').attr('disabled', 'disabled');
			$(this).siblings('.sdfr_r').attr('disabled', 'disabled');
			$(this).siblings('.sta_r').attr('disabled', 'disabled');
			$(this).siblings('.rdfr_r').attr('disabled', 'disabled');
			$(this).siblings('.callername_r').attr('disabled', 'disabled');
		}
	});
}
/*****************************************SHOW ROUTING BEGIN********************************************/
(function(){
	/* Call Routing Rule begin */
	$("#lang_routing_name").html(language('Routing Name'));
	$("#lang_routing_name_help").html(language('Routing Name help','The name of this route. Should be used to describe what types of calls this route matches(for example, \'SIP2GSM\' or \'GSM2SIP\').'));
	$("#lang_call_comes_in_from").html(language('Call Comes in From'));
	$("#lang_call_comes_in_from_help").html(language('Call Comes in From help','The launching point of incoming calls.'));
	$("#lang_send_call_throuth").html(language('Send Call Through'));
	$("#lang_send_call_throuth_help").html(language('Send Call Through help','The destination to receive the incoming calls.'));
	$("#lang_forceanswer").html(language('Force Answer'));
	$("#lang_forceanswer_help").html(language('Force Answer help','Force Answer'));
	/* Call Routing Rule end */
	
	/* DISA Settings begin */
	$("#lang_authentication").html(language('Authentication'));
	$("#lang_authentication_help").html(language('Authentication help','Enable or disable password authentication.'));
	$("#lang_secondary_dialing").html(language('Secondary Dialing'));
	$("#lang_secondary_dialing_help").html(language('Secondary Dialing help','Enable or disable secondary dialing.'));
	$("#lang_disa_timeout").html(language('DISA Timeout'));
	$("#lang_disa_timeout_help").html(language('DISA Timeout help','Select the timemout range of 1 to 10 seconds.'));
	$("#lang_max_pssword_digits").html(language('Max Password Digits'));
	$("#lang_max_pssword_digits_help").html(language('Max Password Digits help','Restrict the max length of password.'));
	$("#lang_password").html(language('Password'));
	$("#lang_password_help").html(language('Password Authentication help','Click the button to edit the Authenticated Password.'));
	$("#lang_edit").val(language('Edit'));
	/* DISA Settings end */
	
	/* Advance Routing Rule begin */
	$("#lang_calleeid").html(language('CalleeID/callerID Manipulation'));
	$("#lang_calleeid_help").html(language('CalleeID Manipulation Help',''+
		'A Dial Pattern is a unique set of digits that will select this route and send the call to the designated trunks.   If a dialed pattern matches this route, no subsequent routes will be tried.<br/>   If Time Groups are enabled, subsequent routes will be checked for matches outside of the designated time(s).'+
		'Rules:<br>'+
		'<b>X</b> matches any digit from 0-9<br>'+
		'<b>Z</b> matches any digit from 1-9<br>'+
		'<b>N</b> matches any digit from 2-9<br>'+
		'<b>[1237-9]</b>        matches any digit in the brackets (example: 1,2,3,7,8,9)<br>'+
		'<b>.</b>&nbsp         wildcard, matches one or more dialed digits<br>'+
		'<br><b> Prepend:</b> &nbsp;&nbsp;&nbsp;Digits to prepend to a successful match.  If the dialed number matches the patterns specified by the subsequent columns, then this will be prepended before sending to the trunks. <br/>'+
		'<br><b>Prefix:</b> &nbsp;&nbsp;&nbsp;Prefix to remove on a successful match.  The dialed number is compared to this and the subsequent columns for a match. Upon a match, this prefix is removed from the dialed number before sending it to the trunks. <br/>'+
		'<br><b>Match Pattern :</b>&nbsp;&nbsp;&nbsp;  The dialed number will be compared against the  prefix + this match pattern. Upon a match, the match pattern portion of the dialed number will be sent to the trunks.<br/>'+
		'<br><b>SDfR(Stripped Digits from Right):</b> &nbsp;&nbsp;&nbsp;The amount of digits to be deleted from the right end of the number. If the value of this item exceeds the length of the current number, the whole number will be deleted. <br/>'+
		'<br><b>RDfR(Reserved Digits from Right):</b> &nbsp;&nbsp;&nbsp;The amount of digits to be resevered from the right end of the number. If the value of this item under the length of the current number, the whole number will be reserverd. <br/>'+
		'<br><b>StA(Suffix to Add) :</b> &nbsp;&nbsp;&nbsp;Designated information to be added to the right end of the current number.<br/>'+
		'<br><b>Caller Name :</b> &nbsp;&nbsp;&nbsp;What caller name would you like to set before sending this call to the endpoint.<br/>'+
		'<br><b>Disabled Caller Number Change :</b> &nbsp;&nbsp;Disable the caller number change, and fixed caller number match pattern.<br> '));
	$("#lang_add_more_dial_pattern").val('+ '+language('Add More Dial Pattern Fields'));
	$("#lang_time_patterns").html(language('Time Patterns that will use this Route'));
	$("#lang_time_patterns_help").html(language('Time Patterns that will use this Route help'));
	$("#lang_add_more_time_pattern").val('+ '+language('Add More Time Pattern Fields'));
	$("#lang_change_rules").html(language('Change Rules'));
	$("#lang_forward_number").html(language('Forward Number'));
	$("#lang_forward_number_help").html(language('Forward Number help','What destination number will you dial? <br/>This is very useful when you have a transfer call.'));
	$("#lang_failover_call_through_number").html(language('Failover Call Through Number'));
	$("#lang_failover_call_through_number_help").html(language('Failover Call Through Number help','The gateway will attempt to send the call out each of these in the order you specify'));
	$("#add_failover_call").val('+ '+language('Add a Failover Call Through Provider'));
	$("#lang_cid_number").html(language('Cid Number'));
	$("#lang_cid_number_help").html(language('Cid Number help',''));
	$("#lang_dialing_delay").html(language('Dialing Delay'));
	$("#lang_dialing_delay_help").html(language('Dialing Delay help','The action of send calleeid will be delay <br/>when you creating a calling.'));
	/* Advance Routing Rule end */
	
	/* show other info */
	var url = get_url_para();
	var edit = url['edit'];
	if(edit == 'edit'){
		$("#routing_title").html(language('Modify a Call Routing Rule'));
	}else if(edit == 'add'){
		$("#routing_title").html(language('Create a Call Routing Rule'));
	}
	$("#call_routing_rule_li").html(language('Call Routing Rule'));
	$("#disa_settings_li").html(language('DISA Settings'));
	$("#advance_routing_rule_li").html(language('Advance Routing Rule'));
	$("#cid_number_settings_li").html(language('Cid Number Settings'));
	$(".cancel_input").val(language('Cancel'));
	$(".save_routing").val(language('Save'));
}());

function Routing_para(){
	this.routing_name = '';
	this.from_channel = '';
	this.to_channel = '';
	this.DISA_sw = '';
	this.second_dial_sw = '';
	this.timeout = '';
	this.max_passwd_digits = '';
	this.editsecret = '';
	this.forward_number = '';
	this.time_pattern = '';
	this.order = '';
	this.revc_secret = '';
	this.dialing_delay = '';
	this.forceanswer = '';
}

function channel_select(analog_data, sip_data, group_data, name, sel, flex_routing_sw){
	var _channel_select = '<select size=1 name="'+name+'" id="'+name+'" class="'+name+'_class"><option value="none">None</option><optgroup label="Port">';
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] == 2){
			var value = 'fxo-'+analog_data[item]['_channel'];
			
			if(sel == value){
				var selected = 'selected';
			}else{
				selected = '';
			}
			_channel_select += '<option value="'+value+'" '+selected+'>'+value+'</option>';
		}else if(analog_data[item]['_signalling'] == 1){
			if(flex_routing_sw == 1){
				var value = 'fxs-'+analog_data[item]['_channel'];
				
				if(sel == value){
					var selected = 'selected';
				}else{
					selected = '';
				}
				_channel_select += '<option value="'+value+'" '+selected+'>'+value+'</option>';
			}
		}
	}
	_channel_select += '</optgroup>';
	
	_channel_select += '<optgroup label="SIP">';
	for(var item in sip_data){
		value = 'sip-'+sip_data[item]['_section'];
		if(sel == value){
			selected = 'selected';
		}else{
			selected = '';
		}
		_channel_select += '<option value="'+value+'" '+selected+'>'+value+'</option>';
	}
	_channel_select += '</optgroup>';
	
	_channel_select += '<optgroup label="GROUP">';
	for(var item in group_data){
		value = group_data[item]['_section'];
		var temp_value = 'grp-'+value;
		if(sel == temp_value){
			selected = 'selected';
		}else{
			selected = '';
		}
		_channel_select += '<option value="'+temp_value+'" '+selected+'>'+value+'</option>';
	}
	_channel_select += '</optgroup></select>';
	
	return _channel_select;
}

function parse_dial_pattern(pattern){
	if(pattern != undefined){
		var temp = pattern.split(',');
	}else{
		var temp = [];
	}
	var temp1 = [];
	var ret = [];
	ret[0] = [];
	ret[0]['prepend'] = '';
	ret[0]['prefix'] = '';
	ret[0]['match_pattern'] = '';
	ret[0]['sdfr'] = '';
	ret[0]['sta'] = '';
	ret[0]['rdfr'] = '';
	ret[0]['callername'] = '';
	ret[0]['trunk_sw'] = '';
	for(var i=0;i<temp.length;i++){
		temp1[i] = temp[i].split('|');
		ret[i] = [];
		if(temp1[i][0]!=undefined){
			ret[i]['prepend'] = temp1[i][0];
		}else{
			ret[i]['prepend'] = '';
		}
		if(temp1[i][1]!=undefined){
			ret[i]['prefix'] = temp1[i][1];
		}else{
			ret[i]['prefix'] = '';
		}
		if(temp1[i][2]!=undefined){
			ret[i]['match_pattern'] = temp1[i][2];
		}else{
			ret[i]['match_pattern'] = '';
		}
		if(temp1[i][3]!=undefined){
			ret[i]['sdfr'] = temp1[i][3];
		}else{
			ret[i]['sdfr'] = '';
		}
		if(temp1[i][4]!=undefined){
			ret[i]['sta'] = temp1[i][4];
		}else{
			ret[i]['sta'] = '';
		}
		if(temp1[i][5]!=undefined){
			ret[i]['rdfr'] = temp1[i][5];
		}else{
			ret[i]['rdfr'] = '';
		}
		if(temp1[i][6]!=undefined){
			ret[i]['callername'] = temp1[i][6];
		}else{
			ret[i]['callername'] = '';
		}
		if(temp1[i][7]!=undefined){
			ret[i]['trunk_sw'] = temp1[i][7];
		}else{
			ret[i]['trunk_sw'] = '';
		}
	}
	return ret;
}

function dial_pattern_html2(para){
	
	if(para['calleeid']['prepend']==undefined) {para['calleeid']['prepend']=language('Prepend');}
	if(para['calleeid']['prepend_c']==undefined) {para['calleeid']['prepend_c']="style=\'color:#aaaaaa;\'";}
	if(para['calleeid']['prefix']==undefined) {para['calleeid']['prefix']=language('Prefix');}
	if(para['calleeid']['prefix_c']==undefined) {para['calleeid']['prefix_c']="style=\'color:#aaaaaa;\'";}
	if(para['calleeid']['match_pattern']==undefined) {para['calleeid']['match_pattern']=language('Match Pattern');}
	if(para['calleeid']['match_pattern_c']==undefined) {para['calleeid']['match_pattern_c']="style=\'color:#aaaaaa;\'";}
	if(para['calleeid']['sdfr']==undefined) {para['calleeid']['sdfr']=language('SDfR');}
	if(para['calleeid']['sdfr_c']==undefined) {para['calleeid']['sdfr_c']="style=\'color:#aaaaaa;\'";}
	if(para['calleeid']['sta']==undefined) {para['calleeid']['sta']=language('StA');}
	if(para['calleeid']['sta_c']==undefined) {para['calleeid']['sta_c']="style=\'color:#aaaaaa;\'";}
	if(para['calleeid']['rdfr']==undefined) {para['calleeid']['rdfr']=language('RdfR');}
	if(para['calleeid']['rdfr_c']==undefined) {para['calleeid']['rdfr_c']="style=\'color:#aaaaaa;\'";}
	
	if(para['callerid']['prepend']==undefined) {para['callerid']['prepend']=language('Prepend');}
	if(para['callerid']['prepend_c']==undefined) {para['callerid']['prepend_c']="style=\'color:#aaaaaa;\'";}
	if(para['callerid']['prefix']==undefined) {para['callerid']['prefix']=language('Prefix');}
	if(para['callerid']['prefix_c']==undefined) {para['callerid']['prefix_c']="style=\'color:#aaaaaa;\'";}
	if(para['callerid']['match_pattern']==undefined) {para['callerid']['match_pattern']=language('Match Pattern');}
	if(para['callerid']['match_pattern_c']==undefined) {para['callerid']['match_pattern_c']="style=\'color:#aaaaaa;\'";}
	if(para['callerid']['sdfr']==undefined) {para['callerid']['sdfr']=language('SDfR');}
	if(para['callerid']['sdfr_c']==undefined) {para['callerid']['sdfr_c']="style=\'color:#aaaaaa;\'";}
	if(para['callerid']['sta']==undefined) {para['callerid']['sta']=language('StA');}
	if(para['callerid']['sta_c']==undefined) {para['callerid']['sta_c']="style=\'color:#aaaaaa;\'";}
	if(para['callerid']['rdfr']==undefined) {para['callerid']['rdfr']=language('RdfR');}
	if(para['callerid']['rdfr_c']==undefined) {para['callerid']['rdfr_c']="style=\'color:#aaaaaa;\'";}
	if(para['callerid']['callername']==undefined) {para['callerid']['callername']=language('Caller Name');}
	if(para['callerid']['callername_c']==undefined) {para['callerid']['callername_c']="style=\'color:#aaaaaa;\'";}
	
	var trunk_sw = para['callerid']['trunk_sw'];
	var str = '<tr>'+
				'<td>'+
					'<table class="tab_border_none" width="100%">'+
						'<tr>'+
							'<td class="td_talignr">'+language('Callee_Dial_pattern')+'</td>'+
							'<td class="td_talignl">'+
								'<input title="prepend" type="text" size="8" class="prepend_e" value="'+para['calleeid']['prepend']+'" onfocus="_onfocus(this,\''+language('Prepend')+'\')" onblur="_onblur(this,\''+language('Prepend')+'\')" '+para['calleeid']['prepend_c']+' />'+
								' + <input title="prefix" type="text" size="8" class="prefix_e" value="'+para['calleeid']['prefix']+'" onfocus="_onfocus(this,\''+language('Prefix')+'\')" onblur="_onblur(this,\''+language('Prefix')+'\')" '+para['calleeid']['prefix_c']+' />'+
								' | [ <input title="match pattern" type="text" size="16" class="match_pattern_e" value="'+para['calleeid']['match_pattern']+'" onfocus="_onfocus(this,\''+language('Match Pattern')+'\')" onblur="_onblur(this,\''+language('Match Pattern')+'\')" '+para['calleeid']['match_pattern_c']+' />'+
								' ] | ( - <input title="sdfr" type="text" size="8" class="sdfr_e" name="sdfr_e[]" value="'+para['calleeid']['sdfr']+'" onfocus="_onfocus(this,\''+language('SDfR')+'\')" onblur="_onblur(this,\''+language('SDfR')+'\')" '+para['calleeid']['sdfr_c']+' />'+
								' + <input title="sta" type="text" size="8" class="sta_e" value="'+para['calleeid']['sta']+'" onfocus="_onfocus(this,\''+language('StA')+'\')" onblur="_onblur(this,\''+language('StA')+'\')" '+para['calleeid']['sta_c']+' />'+
								' ) | <input title="rdfr" type="text" size="8" class="rdfr_e" value="'+para['calleeid']['rdfr']+'" onfocus="_onfocus(this,\''+language('RdfR')+'\')" onblur="_onblur(this,\''+language('RdfR')+'\')" '+para['calleeid']['rdfr_c']+' /> &nbsp;&nbsp;&nbsp;'+
							'</td>'+
							'<td rowspan=2>'+
								'<img src="../images/delete.gif" style="float:none; margin-left:0px; margin-bottom:-3px;cursor:pointer;" alt="remove" title="'+language('Click here to remove this pattern')+'" onclick="javascript:this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);">'+
							'</td>'+
						'</tr>'+
	
						'<tr>'+
							'<td class="td_talignr">'+language('Caller_Dial_pattern')+'</td>'+
							'<td class="td_talignl">'+
								'<input title="prepend" type="text" size="8" class="prepend_r" value="'+para['callerid']['prepend']+'" onfocus="_onfocus(this,\''+language('Prepend')+'\')" onblur="_onblur(this,\''+language('Prepend')+'\')" '+para['callerid']['prepend_c']+' />'+
								' + <input title="prefix" type="text" size="8" class="prefix_r" value="'+para['callerid']['prefix']+'" onfocus="_onfocus(this,\''+language('Prefix')+'\')" onblur="_onblur(this,\''+language('Prefix')+'\')" '+para['callerid']['prefix_c']+' />'+
								' | [ <input title="match pattern" type="text" size="16" class="match_pattern_r" value="'+para['callerid']['match_pattern']+'" onfocus="_onfocus(this,\''+language('Match Pattern')+'\')" onblur="_onblur(this,\''+language('Match Pattern')+'\')" '+para['callerid']['match_pattern_c']+' />'+
								' ] | ( - <input title="sdfr" type="text" size="8" class="sdfr_r" value="'+para['callerid']['sdfr']+'" onfocus="_onfocus(this,\''+language('SDfR')+'\')" onblur="_onblur(this,\''+language('SDfR')+'\')" '+para['callerid']['sdfr_c']+' />'+
								' + <input title="sta" type="text" size="8" class="sta_r" value="'+para['callerid']['sta']+'" onfocus="_onfocus(this,\''+language('StA')+'\')" onblur="_onblur(this,\''+language('StA')+'\')" '+para['callerid']['sta_c']+' />'+
								' ) | <input title="rdfr" type="text" size="8" class="rdfr_r" value="'+para['callerid']['rdfr']+'" onfocus="_onfocus(this,\''+language('RdfR')+'\')" onblur="_onblur(this,\''+language('RdfR')+'\')" '+para['callerid']['rdfr_c']+' />'+
								' | <input title="Caller Name" type="text" size="16" class="callername_r" value="'+para['callerid']['callername']+'" onfocus="_onfocus(this,\''+language('Caller Name')+'\')" onblur="_onblur(this,\''+language('Caller Name')+'\')" '+para['callerid']['callername_c']+' /> &nbsp;&nbsp;&nbsp;';
	
	str += '<select title="Disabled Callernumber Vary" class="trunk_sw" name="trunk_sw[]" onchange="trunk_sw_control(this)">';
	if(trunk_sw == 'off'){
		str += '<option value="off" selected>Modify_CallerID</option>';
	}else{
		str += '<option value="off">Modify_CallerID</option>';
	}
	if(trunk_sw == 'on'){
		str += '<option value="on" selected >Filter_CallerID</option>';
	}else{
		str += '<option value="on">Filter_CallerID</option>';
	}
	str += '</select></td></tr></table></td></tr>';
	return str;
}

function parse_time_pattern(time_pattern){
	if(time_pattern != undefined){
		var temp = time_pattern.split(',');
	}else{
		var temp = [];
	}
	var val = [];
	var ret = [];
	ret[0] = [];
	ret[0]['stime'] = '';
	ret[0]['etime'] = '';
	ret[0]['sweek'] = '';
	ret[0]['eweek'] = '';
	ret[0]['sday'] = '';
	ret[0]['eday'] = '';
	ret[0]['smonth'] = '';
	ret[0]['emonth'] = '';
	for(var i=0;i<temp.length;i++){
		var tmp = temp[i].split('|');
		ret[i] = [];
		if(tmp[0]!=' '){
			val = tmp[0].split('-');
			ret[i]['stime'] = val[0];
			ret[i]['etime'] = val[1];
		}else{
			ret[i]['stime'] = '';
			ret[i]['etime'] = '';
		}
		if(tmp[1]!=undefined){
			val = tmp[1].split('-');
			ret[i]['sweek'] = val[0];
			ret[i]['eweek'] = val[1];
		}else{
			ret[i]['sweek'] = '';
			ret[i]['eweek'] = '';
		}
		if(tmp[2]!=undefined){
			val = tmp[2].split('-');
			ret[i]['sday'] = val[0];
			ret[i]['eday'] = val[1];
		}else{
			ret[i]['sday'] = '';
			ret[i]['eday'] = '';
		}
		if(tmp[3]!=undefined){
			val = tmp[3].split('-');
			ret[i]['smonth'] = val[0];
			ret[i]['emonth'] = val[1];
		}else{
			ret[i]['smonth'] = '';
			ret[i]['emonth'] = '';
		}
	}
	return ret;
}

function time_pattern_table(ts,te,ws,we,ds,de,ms,me){
	//start
	var time_pattern_str = '<table class="tab_border_none count_table" width="100%">'+
							'<tr>'+
								'<td class="td_talignr">'+language('Time to start')+':</td>'+
								'<td class="td_talignl">'+time_select('stime',ts)+'</td>'+
								'<td class="td_talignr">'+language('Week Day start')+':</td>'+
								'<td class="td_talignl">'+week_select('sweek',ws)+'</td>'+
								'<td class="td_talignr">'+language('Month Day start')+':</td>'+
								'<td class="td_talignl">'+day_select('sday',ds)+'</td>'+
								'<td class="td_talignr">'+language('Month start')+':</td>'+
								'<td class="td_talignl">'+month_select('smonth',ms)+'</td>'+
								'<td rowspan=2><img src="../images/delete.gif" style="float:none; margin-left:0px; margin-bottom:-3px;cursor:pointer;" alt="remove" title="'+language('Click here to remove this pattern')+'" onclick="javascript:this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);"></td>'+
							'</tr>'+
	//finish
							'<tr>'+
								'<td class="td_talignr">'+language('Time to finish')+':</td>'+
								'<td class="td_talignl">'+time_select('etime',te)+'</td>'+
								'<td class="td_talignr">'+language('Week Day finish')+':</td>'+
								'<td class="td_talignl">'+week_select('eweek',we)+'</td>'+
								'<td class="td_talignr">'+language('Month Day finish')+':</td>'+
								'<td class="td_talignl">'+day_select('eday',de)+'</td>'+
								'<td class="td_talignr">'+language('Month finish')+':</td>'+
								'<td class="td_talignl">'+month_select('emonth',me)+'</td>'+
							'</tr>'+
						'</table>';
	return time_pattern_str;
}

function time_select(name,time){
	if(time){var res = time.split(':');}else{var res = '';}
	var h = '';
	var m = '';
	var time_str = '';
	if(res[0]!= undefined){
		res[0] = Number(res[0]);
		if(!isNaN(res[0])){
			h = parseInt(res[0]);
		}
	}
	if(res[1]!= undefined){
		res[1] = Number(res[1]);
		if(!isNaN(res[1])){
			m = parseInt(res[1]);
		}
	}
	time_str += '<select class="h'+name+'" name="h'+name+'"><option value="" >-</option>';
	var val;
	var sel;
	for(var i=0;i<24;i++){
		if(i<10){
			val = '0'+i;
		}else{
			val = i;
		}
		if(h === i){sel = 'selected';}else{sel = '';}
		time_str += '<option value="'+val+'" '+sel+' > '+val+' </option>';
	}
	time_str +=  '</select> : <select class="m'+name+'" name="m'+name+'"><option value="">-</option>';
	for(i=0;i<60;i++){
		if(i<10){
			val = '0'+i;
		}else{
			val = i;
		}
		if(m === i){sel = 'selected';}else{sel = '';}
		time_str += '<option value="'+val+'" '+sel+'> '+val+' </option>';
	}
	time_str += '</select>';
	return time_str;
}

function week_select(name, week){
	var weeks = [language('Monday'),language('Tuesday'),language('Wednesday'),language('Thursday'),language('Friday'),language('Saturday'),language('Sunday')];
	var values = ['mon','tue','wed','thu','fri','sat','sun'];
	var week_str = '';
	week_str += '<select class="'+name+'" name="'+name+'"><option value="" >-</option>';
	var sel;
	for(var i=0;i<7;i++){
		if(week === values[i]){sel = 'selected';}else{sel = '';}
		week_str += '<option value="'+values[i]+'" '+sel+'> '+weeks[i]+' </option>'
	}
	week_str += '</select>';
	return week_str;
}

function day_select(name, day){
	if(day){var d = parseInt(day);}
	var day_str = '<select class="'+name+'" name="'+name+'"><option value="">-</option>';
	var val = '';
	var sel = '';
	for(var i=1;i<=31;i++){
		if(i<10){
			val = '0'+i;
		}else{
			val = i;
		}
		if(d ===i){sel = 'selected';}else{sel = '';}
		day_str += '<option value="'+val+'" '+sel+'> '+val+' </option>';
	}
	day_str += '</select>';
	return day_str;
}

function month_select(name, month){
	var months = [language('January'),language('February'),language('March'),language('April'),language('May'),language('June'),language('July'),language('August'),language('September'),language('October'),language('November'),language('December')];
	var values = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
	var month_str = '<select class="'+name+'" name="'+name+'"><option value="" >-</option>';
	var sel;
	for(var i=0;i<12;i++){
		if(month === values[i]){sel = 'selected';}else{sel = ''}
		month_str += '<option value="'+values[i]+'" '+sel+' > '+months[i]+' </option>';
	}
	month_str += '</select>';
	return month_str;
}

function show_routing(routing_data, analog_data, sip_data, group_data, cidNumber, revc_secret, flex_routing_sw){
	var routing = new Routing_para();
	routing.routing_name = section;
	
	routing.from_channel = routing_data['_fromchannel'];
	
	if(routing_data['_tochannel'] != '' && routing_data['_tochannel'] != undefined){
		var fctn_channel = routing_data['_tochannel'].split(',');
		if(fctn_channel[0] != undefined){
			routing.to_channel = fctn_channel[0];
		}
		fctn_channel.shift();
	}
	
	routing.forceanswer = routing_data['_forceanswer'];
	
	if(routing_data['_forwardnumber'] != undefined){
		routing.forward_number = routing_data['_forwardnumber'];
	}else{
		routing.forward_number = '';
	}
	
	routing.DISA_sw = routing_data['_disasw'];
	
	routing.second_dial_sw = routing_data['_seconddialsw'];
	
	if(routing_data['_timeout'] != 0){
		routing.timeout = routing_data['_timeout'];
	}
	
	if(routing_data['_maxpasswddigits'] != 0){
		routing.max_passwd_digits = routing_data['_maxpasswddigits'];
	}
	
	routing.time_pattern = routing_data['_timepattern'];
	
	if(routing_data['_order'] != '0' && routing_data['_order'] != undefined){
		routing.order = routing_data['_order'];
	}else{
		routing.order = _order;
	}
	
	if(routing_data['_dialingdelay'] != undefined){
		routing.dialing_delay = routing_data['_dialingdelay'].toFixed(2);
	}else{
		routing.dialing_delay = '';
	}
	
	if(revc_secret != null){
		routing.revc_secret = revc_secret;
	}else{
		routing.revc_secret = '';
	}
	
	var para = [];
	
	//create routing
	var dial_patten_callee = parse_dial_pattern(routing_data['_calleedialpattern']);
	var dial_patten_caller = parse_dial_pattern(routing_data['_callerdialpattern']);
	
	var _dial_pattern_html = '';
	for(var i=0;i<dial_patten_callee.length;i++){
		if(routing_data['_calleedialpattern'] == null || routing_data['_callerdialpattern'] == null){
			dial_patten_callee[i] = [];
			dial_patten_caller[i] = [];
		}
		
		//ee
		para['calleeid'] = [];
		para['calleeid']['prepend'] = language('Prepend');
		para['calleeid']['prepend_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_callee[i]['prepend']!=undefined && dial_patten_callee[i]['prepend']!='' && dial_patten_callee[i]['prepend']!='Prepend'){
			para['calleeid']['prepend'] = dial_patten_callee[i]['prepend'];
			para['calleeid']['prepend_c'] = 'style="color:#000000";';
		}
		
		para['calleeid']['prefix'] = language('Prefix');
		para['calleeid']['prefix_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_callee[i]['prefix']!=undefined && dial_patten_callee[i]['prefix']!='' && dial_patten_callee[i]['prefix']!='Prefix'){
			para['calleeid']['prefix'] = dial_patten_callee[i]['prefix'];
			para['calleeid']['prefix_c'] = 'style="color:#000000";';
		}
		
		para['calleeid']['match_pattern'] = language('Match Pattern');
		para['calleeid']['match_pattern_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_callee[i]['match_pattern']!=undefined && dial_patten_callee[i]['match_pattern']!='' && dial_patten_callee[i]['match_pattern']!='Match Pattern'){
			para['calleeid']['match_pattern'] = dial_patten_callee[i]['match_pattern'];
			para['calleeid']['match_pattern_c'] = 'style="color:#000000";';
		}
		
		para['calleeid']['sdfr'] = language('SDfR');
		para['calleeid']['sdfr_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_callee[i]['sdfr']!=undefined && dial_patten_callee[i]['sdfr']!='' && dial_patten_callee[i]['sdfr']!='SDfR'){
			para['calleeid']['sdfr'] = dial_patten_callee[i]['sdfr'];
			para['calleeid']['sdfr_c'] = 'style="color:#000000";';
		}
		
		para['calleeid']['sta'] = language('StA');
		para['calleeid']['sta_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_callee[i]['sta']!=undefined && dial_patten_callee[i]['sta']!='' && dial_patten_callee[i]['sta']!='StA'){
			para['calleeid']['sta'] = dial_patten_callee[i]['sta'];
			para['calleeid']['sta_c'] = 'style="color:#000000";';
		}
		
		para['calleeid']['rdfr'] = language('RdfR');
		para['calleeid']['rdfr_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_callee[i]['rdfr']!=undefined && dial_patten_callee[i]['rdfr']!='' && dial_patten_callee[i]['rdfr']!='RdfR'){
			para['calleeid']['rdfr'] = dial_patten_callee[i]['rdfr'];
			para['calleeid']['rdfr_c'] = 'style="color:#000000";';
		}
		
		//er
		para['callerid'] = [];
		para['callerid']['prepend'] = language('Prepend');
		para['callerid']['prepend_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['prepend']!=undefined && dial_patten_caller[i]['prepend']!='' && dial_patten_caller[i]['prepend']!='Prepend'){
			para['callerid']['prepend'] = dial_patten_caller[i]['prepend'];
			para['callerid']['prepend_c'] = 'style="color:#000000";';
		}
		
		para['callerid']['prefix'] = language('Prefix');
		para['callerid']['prefix_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['prefix']!=undefined && dial_patten_caller[i]['prefix']!='' && dial_patten_caller[i]['prefix']!='Prefix'){
			para['callerid']['prefix'] = dial_patten_caller[i]['prefix'];
			para['callerid']['prefix_c'] = 'style="color:#000000";';
		}
		
		para['callerid']['match_pattern'] = language('Match Pattern');
		para['callerid']['match_pattern_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['match_pattern']!=undefined && dial_patten_caller[i]['match_pattern']!='' && dial_patten_caller[i]['match_pattern']!='Match Pattern'){
			para['callerid']['match_pattern'] = dial_patten_caller[i]['match_pattern'];
			para['callerid']['match_pattern_c'] = 'style="color:#000000";';
		}
		
		para['callerid']['sdfr'] = language('SDfR');
		para['callerid']['sdfr_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['sdfr']!=undefined && dial_patten_caller[i]['sdfr']!='' && dial_patten_caller[i]['sdfr']!='SDfR'){
			para['callerid']['sdfr'] = dial_patten_caller[i]['sdfr'];
			para['callerid']['sdfr_c'] = 'style="color:#000000";';
		}
		
		para['callerid']['sta'] = language('StA');
		para['callerid']['sta_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['sta']!=undefined && dial_patten_caller[i]['sta']!='' && dial_patten_caller[i]['sta']!='StA'){
			para['callerid']['sta'] = dial_patten_caller[i]['sta'];
			para['callerid']['sta_c'] = 'style="color:#000000";';
		}
		
		para['callerid']['rdfr'] = language('RdfR');
		para['callerid']['rdfr_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['rdfr']!=undefined && dial_patten_caller[i]['rdfr']!='' && dial_patten_caller[i]['rdfr']!='RdfR'){
			para['callerid']['rdfr'] = dial_patten_caller[i]['rdfr'];
			para['callerid']['rdfr_c'] = 'style="color:#000000";';
		}
		
		para['callerid']['callername'] = language('Caller Name');
		para['callerid']['callername_c'] = 'style="color:#aaaaaa";';
		if(dial_patten_caller[i]['callername']!=undefined && dial_patten_caller[i]['callername']!='' && dial_patten_caller[i]['callername']!='Caller Name'){
			para['callerid']['callername'] = dial_patten_caller[i]['callername'];
			para['callerid']['callername_c'] = 'style="color:#000000";';
		}
		
		if(dial_patten_caller[i]['trunk_sw']!=undefined && dial_patten_caller[i]['trunk_sw']!=''){
			para['callerid']['trunk_sw'] = dial_patten_caller[i]['trunk_sw'];
		}
		
		_dial_pattern_html += dial_pattern_html2(para);
	}
	
	document.getElementById('old_section').value = section;
	document.getElementById('order').value = routing.order;
	document.getElementById('revc_secret').value = routing.revc_secret;
	
	/* Call Routing Rule begin */
	//value 
	document.getElementById('routing_name').value = routing.routing_name;
	
	var _from_channel_select = channel_select(analog_data, sip_data, group_data, 'from_channel', routing.from_channel, flex_routing_sw);
	var _to_channel_select = channel_select(analog_data, sip_data, group_data, 'to_channel', routing.to_channel, flex_routing_sw);
	
	//select
	$("#from_channel_select").prepend(_from_channel_select);
	$("#to_channel_select").prepend(_to_channel_select);
	/* Call Routing Rule end */

	/* DISA Settings begin */
	if(routing.DISA_sw==0){
		var disa_sw = true;
	}else{
		disa_sw = false;
	}
	if(routing.second_dial_sw==0){
		var second_dial_sw = true;
	}else{
		second_dial_sw = false;
	}
	var _disa_timeout_select = '<select size=1 name="disa_timeout" id="disa_timeout" style="width:80px" >';
	for(i=1;i<=10;i++){
		if(routing.timeout==i){
			_disa_timeout_select += '<option value="'+i+'" selected>  '+i+' s  </option>';
		}else if(routing.timeout == undefined && i==5){
			_disa_timeout_select += '<option value="'+i+'" selected>  '+i+' s  </option>';
		}else{
			_disa_timeout_select += '<option value="'+i+'" >  '+i+' s  </option>';
		}
	}
	_disa_timeout_select += '</select>';
	var _disa_password_digits = '<select size=1 name="disa_password_digits" id="disa_password_digits" style="width:80px" onchange="select_length_change()">';
	for(i=1;i<=10;i++){
		if(routing.max_passwd_digits==i){
			_disa_password_digits += '<option value="'+i+'" selected>    '+i+'    </option>';
		}else if(routing.max_passwd_digits == undefined && i==10){
			_disa_password_digits += '<option value="'+i+'" selected>    '+i+'    </option>';
		}else{
			_disa_password_digits += '<option value="'+i+'" >    '+i+'    </option>';
		}
	}
	_disa_password_digits += '</select>';
	
	//checked
	document.getElementById('disa_sw').checked = disa_sw;
	document.getElementById('second_dial_sw').checked = second_dial_sw;
	if(routing.forceanswer == 0){
		document.getElementById('forceanswer').checked = true;
	}
	
	//select
	$("#disa_time_select").prepend(_disa_timeout_select);
	$("#disa_password_select").prepend(_disa_password_digits);
	
	//secret value
	$("#editsecret").text(routing.revc_secret);
	/* DISA Settings end */

	/* Advance Routing Rule begin */
	$("#for_dial_pattern_html").after(_dial_pattern_html);
	
	var time_pattern_table_str = '';
	var time_pattern = parse_time_pattern(routing.time_pattern);
	for(var i=0;i<time_pattern.length;i++){
		time_pattern_table_str = time_pattern_table_str + time_pattern_table(time_pattern[i]['stime'],time_pattern[i]['etime'],time_pattern[i]['sweek'],time_pattern[i]['eweek'],time_pattern[i]['sday'],time_pattern[i]['eday'],time_pattern[i]['smonth'],time_pattern[i]['emonth']);
	}
	$("#time_pattern_table_str").append(time_pattern_table_str);
	
	//value
	document.getElementById('forward_number').value = routing.forward_number;
	
	var _fctn_channel_select = '';
	i = 0;
	for(var c in fctn_channel){
		i++;
		_fctn_channel_select += '<tr><th>'+language('Failover Call Through Number')+' '+i+': </th><td>';
		_fctn_channel_select += channel_select(analog_data, sip_data, group_data, 'fctn_channel', fctn_channel[c], flex_routing_sw);
		_fctn_channel_select += '<img src=\"../images/delete.gif\" style=\"float:right; margin-left:0px; margin-bottom:-3px;cursor:pointer;\" alt=\"remove\" title=\"Click here to remove this pattern\" onclick=\"javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\" />';
		_fctn_channel_select += '</td></tr>';
	}
	$("#for_fctn_channel_select").after(_fctn_channel_select);
	
	document.getElementById('dialing_delay').value = routing.dialing_delay;
	
	$("#add_failover_call").click(function(){
		addRow(analog_data, sip_data, group_data, flex_routing_sw);
	});
	/* Advance Routing Rule end */
	
	/* Cid Number Setting begin */
	if(routing.from_channel != undefined){
		var from_channel_val = routing.from_channel;
	}else{
		var from_channel_val = '';
	}
	var cid_str = from_channel_val.split('-');
	if(cid_str[0] != 'fxo'){$(".cidNumber_table").css('display', 'none');}
	
	//value
	document.getElementById('cidNumber').value = cidNumber;
	/* Cid Number Setting end */
}

var url = get_url_para();
if(url['routing'] != undefined){
	var section = url['routing'];
}else{
	var section = null;
}

var edit = url['edit'];
var _order = url['order'];

object.AGRoutingRulsGetOne(succeed_back, error_back, section);

function succeed_back(data){
	var data_temp = data['_get'];
	var routing_data = data_temp['_context'];
	var all_routing_data = data_temp['_routings']['_item'];
	var analog_data = data_temp['_ana']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	var group_data = data_temp['_group']['_item'];
	var revc_secret = data_temp['_revcsecret'];
	var cidNumber = data_temp['_cidnumber'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	
	header(data_temp['_combuf']);
	if(section == null){
		section = '';
		var routing_data = [];
		routing_data[section] = [];
		show_routing(routing_data, analog_data, sip_data, group_data, cidNumber, revc_secret, flex_routing_sw);
	}else{
		show_routing(routing_data, analog_data, sip_data, group_data, cidNumber, revc_secret, flex_routing_sw);
	}
	footer();
	
	routing_onload();
	
	//save
	$(".save_routing").click(function(){
		if(check(all_routing_data, section)){
			if(save_only_once()){
				$("#loading_image").show();
				save_routing();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/****************************************SHOW ROUTING END*********************************************/


/*******************************************SAVE ROUTING BEGIN*****************************************/
function match_dialpattern(value){
	var re = /^[*#+0-9XZN.\[\-\]]+$/;
	var res = re.test(value);
	return res;
}

function match_dialpattern_digit(value){
	var re = /^[0-9]+$/;
	var res = re.test(value);
	return res;
}

function save_routing(){
	var routing = new Routing_para();
	
	var old_section = document.getElementById('old_section').value;
	var new_section = document.getElementById('routing_name').value;
	
	var RoutingContex = new AST_RoutingContex();
	
	routing.order = document.getElementById('order').value;
	RoutingContex._order = routing.order;
	
	routing.from_channel = document.getElementById('from_channel').value;
	RoutingContex._fromchannel = routing.from_channel;
	
	var to_channel_temp = document.getElementById('to_channel').value;
	to_channel_temp += ',';
	$(".fctn_channel_class").each(function(){
		var fctn_channel = $(this).val();
		if(fctn_channel != '' && fctn_channel != 'none'){
			to_channel_temp += fctn_channel+',';
		}
	});
	to_channel_temp = to_channel_temp.substring(0,to_channel_temp.length-1);
	RoutingContex._tochannel = to_channel_temp;
	
	if(document.getElementById('forceanswer').checked == true){
		var forceanswer = 0;
	}else{
		var forceanswer = 1;
	}
	RoutingContex._forceanswer = forceanswer;
	
	/* callee disa pattern begin */
	var e_dp_ary = [];
	e_dp_ary[0] = [];
	e_dp_ary[0]['prepend_e'] = '';
	e_dp_ary[0]['prefix_e'] = '';
	e_dp_ary[0]['match_pattern_e'] = '';
	e_dp_ary[0]['sdfr_e'] = '';
	e_dp_ary[0]['sta_e'] = '';
	e_dp_ary[0]['rdfr_e'] = '';
	var i = 0;
	$(".prepend_e").each(function(){
		e_dp_ary[i] = [];
		e_dp_ary[i]['prepend_e'] = $(this).val();
		i++;
	});
	
	i = 0;
	$(".prefix_e").each(function(){
		if((routing.from_channel).indexOf('fxo') != -1){
			e_dp_ary[i]['prefix_e'] = '';
		}else{
			e_dp_ary[i]['prefix_e'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".match_pattern_e").each(function(){
		if((routing.from_channel).indexOf('fxo') != -1){
			e_dp_ary[i]['match_pattern_e'] = '';
		}else{
			e_dp_ary[i]['match_pattern_e'] = $(this).val();
		}
		i++;
	});

	i = 0;
	$(".sdfr_e").each(function(){
		e_dp_ary[i]['sdfr_e'] = $(this).val();
		i++;
	});

	i = 0;
	$(".sta_e").each(function(){
		e_dp_ary[i]['sta_e'] = $(this).val();
		i++;
	});

	i = 0;
	$(".rdfr_e").each(function(){
		e_dp_ary[i]['rdfr_e'] = $(this).val();
		i++;
	});

	var e_dial_pattern = '';
	for(var item in e_dp_ary){
		var e_tmp = e_dp_ary[item]['prepend_e'];
		if(match_dialpattern(e_tmp)){
			var prepend_e = e_tmp;
		}else{
			var prepend_e = '';
		}
		
		e_tmp = e_dp_ary[item]['prefix_e'];
		if(match_dialpattern(e_tmp)){
			var prefix_e = e_tmp;
		}else{
			var prefix_e = '';
		}
		
		e_tmp = e_dp_ary[item]['match_pattern_e'];
		if(match_dialpattern(e_tmp)){
			var match_pattern_e = e_tmp;
		}else{
			var match_pattern_e = '';
		}
		
		e_tmp = e_dp_ary[item]['sdfr_e'];
		if(match_dialpattern_digit(e_tmp)){
			var sdfr_e = e_tmp;
		}else{
			var sdfr_e = '';
		}
		
		e_tmp = e_dp_ary[item]['sta_e'];
		if(match_dialpattern(e_tmp)){
			var sta_e = e_tmp;
		}else{
			var sta_e = '';
		}
		
		e_tmp = e_dp_ary[item]['rdfr_e'];
		if(match_dialpattern_digit(e_tmp)){
			var rdfr_e = e_tmp;
		}else{
			var rdfr_e = '';
		}
		
		if(prepend_e != '' || prefix_e != '' || match_pattern_e != '' || sdfr_e != '' || sta_e != '' || rdfr_e != ''){
			var e_dp = prepend_e + '|' + prefix_e + '|' + match_pattern_e + '|' + sdfr_e + '|' + sta_e + '|' + rdfr_e;
			e_dial_pattern += e_dp + ',';
		}else{
			var dp = "|||||";
			e_dial_pattern += dp + ',';
		}
	}
	e_dial_pattern = e_dial_pattern.substring(0,e_dial_pattern.length-1);
	RoutingContex._calleedialpattern = e_dial_pattern;
	/* callee disa pattern end */
	
	/* caller disa pattern begin */
	var dp_ary = [];
	dp_ary[0] = [];
	dp_ary[0]['prepend_r'] = '';
	dp_ary[0]['prefix_r'] = '';
	dp_ary[0]['match_pattern_r'] = '';
	dp_ary[0]['sdfr_r'] = '';
	dp_ary[0]['sta_r'] = '';
	dp_ary[0]['rdfr_r'] = '';
	dp_ary[0]['callername_r'] = '';
	dp_ary[0]['trunk_sw'] = '';
	i = 0;
	$(".prepend_r").each(function(){
		dp_ary[i] = [];
		if($(this).attr('disabled') != 'disabled'){
			dp_ary[i]['prepend_r'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".prefix_r").each(function(){
		if($(this).attr('disabled') != 'disabled'){
			dp_ary[i]['prefix_r'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".match_pattern_r").each(function(){
		dp_ary[i]['match_pattern_r'] = $(this).val();
		i++;
	});
	
	i = 0;
	$(".sdfr_r").each(function(){
		if($(this).attr('disabled') != 'disabled'){
			dp_ary[i]['sdfr_r'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".sta_r").each(function(){
		if($(this).attr('disabled') != 'disabled'){
			dp_ary[i]['sta_r'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".rdfr_r").each(function(){
		if($(this).attr('disabled') != 'disabled'){	
			dp_ary[i]['rdfr_r'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".callername_r").each(function(){
		if($(this).attr('disabled') != 'disabled'){
			dp_ary[i]['callername_r'] = $(this).val();
		}
		i++;
	});
	
	i = 0;
	$(".trunk_sw").each(function(){
		dp_ary[i]['trunk_sw'] = $(this).val();
		i++;
	});
	
	var dial_pattern = '';
	for(var item in dp_ary){
		var tmp = dp_ary[item]['prepend_r'];
		if(match_dialpattern(tmp)){
			var prepend_r = tmp;
		}else{
			var prepend_r = '';
		}
		
		tmp = dp_ary[item]['prefix_r'];
		if(match_dialpattern(tmp)){
			var prefix_r = tmp;
		}else{
			var prefix_r = '';
		}
		
		tmp = dp_ary[item]['match_pattern_r'];
		if(match_dialpattern(tmp)){
			var match_pattern_r = tmp;
		}else{
			var match_pattern_r = '';
		}
		
		tmp = dp_ary[item]['sdfr_r'];
		if(match_dialpattern_digit(tmp)){
			var sdfr_r = tmp;
		}else{
			var sdfr_r = '';
		}
		
		tmp = dp_ary[item]['sta_r'];
		if(match_dialpattern(tmp)){
			var sta_r = tmp;
		}else{
			var sta_r = '';
		}
		
		tmp = dp_ary[item]['rdfr_r'];
		if(match_dialpattern_digit(tmp)){
			var rdfr_r = tmp;
		}else{
			var rdfr_r = '';
		}
		
		tmp = dp_ary[item]['callername_r'];
		if(tmp != language("Caller Name")){
			var callername_r = tmp;
		}else{
			var callername_r = '';
		}
		
		var trunk_sw = dp_ary[item]['trunk_sw'];
		
		if(prepend_r != '' || prefix_r != '' || match_pattern_r != '' || sdfr_r != '' || sta_r != '' || rdfr_r != '' || callername_r != ''){
			var dp = prepend_r + '|' + prefix_r + '|' + match_pattern_r + '|' + sdfr_r + '|' + sta_r + '|' + rdfr_r + '|' + callername_r + '|' + trunk_sw;
			dial_pattern += dp+',';
		}else{
			var dp = "|||||||";
			dial_pattern += dp+',';
		}
	}
	dial_pattern = dial_pattern.substring(0,dial_pattern.length-1);
	RoutingContex._callerdialpattern = dial_pattern;
	/* caller disa pattern end */
	
	/* time pattern begin */
	i = 0;
	var tp_ary = [];
	$(".count_table").each(function(){
		tp_ary[i] = []; //initialize two-dimensional array
		i++;
	})
	
	i = 0;
	var f = 0;
	$(".hstime").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['hstime'] = $(this).val();
		}else{
			tp_ary[i]['hstime'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".mstime").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['mstime'] = $(this).val();
		}else{
			tp_ary[i]['mstime'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".hetime").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['hetime'] = $(this).val();
		}else{
			tp_ary[i]['hetime'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".metime").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['metime'] = $(this).val();
		}else{
			tp_ary[i]['metime'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".sweek").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['sweek'] = $(this).val();
		}else{
			tp_ary[i]['sweek'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".eweek").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['eweek'] = $(this).val();
		}else{
			tp_ary[i]['eweek'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".sday").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['sday'] = $(this).val();
		}else{
			tp_ary[i]['sday'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".eday").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['eday'] = $(this).val();
		}else{
			tp_ary[i]['eday'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".smonth").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['smonth'] = $(this).val();
		}else{
			tp_ary[i]['smonth'] = '';
		}
		i++;
	});
	
	i = 0;
	$(".emonth").each(function(){
		if($(this).val() != ''){
			f = 1;
			tp_ary[i]['emonth'] = $(this).val();
		}else{
			tp_ary[i]['emonth'] = '';
		}
		i++;
	});
	
	var time_pattern = '';
	if(i != 0 && f == 1){
		for(var item in tp_ary){
			if(tp_ary[item]['hstime'] != '' || tp_ary[item]['hetime'] != '' || tp_ary[item]['mstime'] != '' || tp_ary[item]['metime'] != ''){
				if(tp_ary[item]['hstime'] == ''){
					if(tp_ary[item]['hetime'] != ''){
						tp_ary[item]['hstime'] = tp_ary[item]['hetime'];
					}else{
						tp_ary[item]['hstime'] = '00';
					}
				}
				
				if(tp_ary[item]['mstime'] == ''){
					if(tp_ary[item]['metime'] != ''){
						tp_ary[item]['mstime'] = tp_ary[item]['metime'];
					}else{
						tp_ary[item]['mstime'] = '00';
					}
				}
				
				if(tp_ary[item]['hetime'] == ''){
					if(tp_ary[item]['hstime'] != ''){
						tp_ary[item]['hetime'] = tp_ary[item]['hstime'];
					}else{
						tp_ary[item]['hetime'] = '00';
					}
				}
				
				if(tp_ary[item]['metime'] == ''){
					if(tp_ary[item]['mstime'] != ''){
						tp_ary[item]['metime'] = tp_ary[item]['mstime'];
					}else{
						tp_ary[item]['metime'] = '00';
					}
				}
			}
			
			if(tp_ary[item]['sweek'] != '' || tp_ary[item]['eweek'] != ''){
				if(tp_ary[item]['sweek'] == ''){
					tp_ary[item]['sweek'] = tp_ary[item]['eweek'];
				}
				
				if(tp_ary[item]['eweek'] == ''){
					tp_ary[item]['eweek'] = tp_ary[item]['sweek'];
				}
			}
			
			if(tp_ary[item]['sday'] != '' || tp_ary[item]['eday'] != ''){
				if(tp_ary[item]['sday'] == ''){
					tp_ary[item]['sday'] = tp_ary[item]['eday'];
				}
				
				if(tp_ary[item]['eday'] == ''){
					tp_ary[item]['eday'] = tp_ary[item]['sday'];
				}
			}
			
			if(tp_ary[item]['smonth'] != '' || tp_ary[item]['emonth'] != ''){
				if(tp_ary[item]['smonth'] == ''){
					tp_ary[item]['smonth'] = tp_ary[item]['emonth'];
				}
				
				if(tp_ary[item]['emonth'] == ''){
					tp_ary[item]['emonth'] = tp_ary[item]['smonth'];
				}
			}
			
			var tp = tp_ary[item]['hstime'] + ':' + tp_ary[item]['mstime'] + '-' + tp_ary[item]['hetime'] + ':' + tp_ary[item]['metime'];
			tp += '|' + tp_ary[item]['sweek'] + '-' + tp_ary[item]['eweek'];
			tp += '|' + tp_ary[item]['sday'] + '-' + tp_ary[item]['eday'];
			tp += '|' + tp_ary[item]['smonth'] + '-' + tp_ary[item]['emonth'];
			
			if(tp_ary[item]['hstime'] != '' || tp_ary[item]['hetime'] != '' || tp_ary[item]['mstime'] != '' || tp_ary[item]['metime'] != '' || tp_ary[item]['sweek'] != '' || tp_ary[item]['eweek'] != '' || tp_ary[item]['sday'] != '' || tp_ary[item]['eday'] != '' || tp_ary[item]['smonth'] != '' || tp_ary[item]['emonth'] != ''){
				time_pattern += tp+',';
			}
		}
		time_pattern = time_pattern.substring(0,time_pattern.length-1);
	}
	RoutingContex._timepattern = time_pattern;
	/* time pattern end */

	/* change rules begin */
	routing.forward_number = document.getElementById('forward_number').value;
	RoutingContex._forwardnumber = routing.forward_number;
	/* change rules end */
	
	if(document.getElementById('disa_sw').checked == true){
		var disa_sw_val = 0;
	}else{
		var disa_sw_val = 1;
	}
	RoutingContex._disasw = disa_sw_val;
	
	if(document.getElementById('second_dial_sw').checked == true){
		var second_dial_sw = 0;
	}else{
		var second_dial_sw = 1;
	}
	RoutingContex._seconddialsw = second_dial_sw;
	
	var disa_timeout_val = document.getElementById('disa_timeout').value;
	RoutingContex._timeout = disa_timeout_val;
	
	var dialing_delay_val = document.getElementById('dialing_delay').value;
	if(dialing_delay_val == '') dialing_delay_val = 0;
	var dialing_delay = parseFloat(dialing_delay_val).toFixed(2);
	RoutingContex._dialingdelay = dialing_delay;
	
	var disa_password_digits_val = document.getElementById('disa_password_digits').value;
	RoutingContex._maxpasswddigits = disa_password_digits_val;
	
	/* extensions_macro.conf begin */
	var data_macro_checkcid = '';
	var cidNumber = document.getElementById('cidNumber').value;
	if($(".cidNumber_table").css('display') == 'none'){
		cidNumber = null;
	}
	/* extensions_macro.conf end */
	
	/* revc_secret */
	var revc_secret = document.getElementById('revc_secret').value;
	if(revc_secret == ''){
		revc_secret = null;
	}
	
	object.AGRoutingRulsSave(save_succeed_back, save_error_back, old_section, new_section, RoutingContex, cidNumber, revc_secret);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		if(edit == 'add'){
			window.location.href = 'routing-rules.html?new=true';
		}else{
			window.location.href = 'routing-rules.html?save=true';
		}
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*******************************************SAVE ROUTING END*****************************************/