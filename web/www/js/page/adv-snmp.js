function check(){
	return true;
	version=document.getElementById('snmp_version').value;
	switch(version){		
		case 'v3':			
			if (document.getElementById('username').value==""){
				alert("Please input User");
				document.getElementById('username').focus();
				return false;
			}
			if (document.getElementById('authpasswd').value==""){
				alert("Please input AuthPassword");
				document.getElementById('authpasswd').focus();
				return false;
			}
			
			str=document.getElementById('authpasswd').value;
			if (str.length<8){
				alert("AuthPassword need at least 8 characters");
				document.getElementById('authpasswd').focus();
				return false;
			}
			
			if (document.getElementById('privacypasswd').value==""){
				alert("Please input PrivacyPassword");
				document.getElementById('privacypasswd').focus();
				return false;
			}
			
			str=document.getElementById('privacypasswd').value;
			if (str.length<8){
				alert("PrivacyPassword need at least 8 characters");
				document.getElementById('privacypasswd').focus();
				return false;
			}
			
			if (document.getElementById('group11').value==""){
					alert("Please input Group");
					document.getElementById('group11').focus();
					return false;
				}
				if (document.getElementById('view11').value==""){
					alert("Please input ViewName");
					document.getElementById('view11').focus();
					return false;
				}
				if (document.getElementById('view13').value==""){
					alert("Please input ViewSubtree");
					document.getElementById('view13').focus();
					return false;
				}
				if (document.getElementById('view14').value==""){
					
					document.getElementById('view14').value='NA'
					
				}
			return true;
			break;
		default: //V1,V2C
			{
				if (document.getElementById('com2sec11').value==""){
					alert("Please input Security Name");
					document.getElementById('com2sec11').focus();
					return false;
				}
				if (document.getElementById('com2sec13').value==""){
					alert("Please input Community");
					document.getElementById('com2sec13').focus();
					return false;
				}
				if (document.getElementById('group11').value==""){
					alert("Please input Group");
					document.getElementById('group11').focus();
					return false;
				}
				if (document.getElementById('view11').value==""){
					alert("Please input ViewName");
					document.getElementById('view11').focus();
					return false;
				}
				if (document.getElementById('view13').value==""){
					alert("Please input ViewSubtree");
					document.getElementById('view13').focus();
					return false;
				}
				if (document.getElementById('view14').value==""){
					
					document.getElementById('view14').value='NA'
					
				}
			
			return true;
			break;
			}
	}
	return true;
}

function userchange(){
	document.getElementById("group13").value=document.getElementById("username").value;
}

function viewchange(){
	var newvalue=document.getElementById("view11").value;
	
	var obj_options=document.getElementById("access16").options;	
	obj_options[0].text=newvalue;
	obj_options[0].value=newvalue;
	
	var obj_options=document.getElementById("access17").options;	
	obj_options[0].text=newvalue;
	obj_options[0].value=newvalue;
	
	var obj_options=document.getElementById("access18").options;	
	obj_options[0].text=newvalue;
	obj_options[0].value=newvalue;
}

/*
* type: v1 or v2
*/
function community_conf_v1v2(type){
	var str = '<br/>'+
	'<div id="tab" style="height:30px;">'+
		 '<li class="tb1">&nbsp;</li>'+
		 '<li class="tbg">'+language('Community Configuration')+'('+type+')'+'</li>'+
		 '<li class="tb2">&nbsp;</li>'+
	'</div>'+
	'<table width="100%" class="tshow" >'+
		'<tr>'+
			'<th>'+language('Security Name')+'</th>'+
			'<th>'+language('Souce')+'</th>'+
			'<th>'+language('Community')+'</th>'+
		'</tr>'+
		'<tr>'+
			'<td>'+
				'<input style="width:95%;" id="com2sec1_'+type+'" value="" >'+
			'</td>'+
			'<td>'+
				'<input style="width:95%;" id="souce_'+type+'" value="" >'+
			'</td>'+
			'<td>'+
				'<input style="width:95%;" id="com2sec2_'+type+'" value="">'+
			'</td>'+
		'</tr>'+
	'</table>';
	
	return str;
}

function user_conf_v3(){
	var str = '<br/>'+
	'<div id="tab" style="height:30px;">'+
		'<li class="tb1">&nbsp;</li>'+
		'<li class="tbg">'+language('User Configuration')+'(v3)</li>'+
		'<li class="tb2">&nbsp;</li>'+
	'</div>'+
	'<table width="100%" class="tshow" >'+
		'<tr>'+
			'<th>'+language('User')+'</th>'+
			'<th>'+language('AuthType')+'</th>'+
			'<th>'+language('AuthPassword')+'</th>'+
			'<th>'+language('PrivacyType')+'</th>'+
			'<th>'+language('PrivacyPassword')+'</th>'+
		'</tr>'+
		'<tr>'+
			'<td>'+
				'<input style="width:95%;" id="username" name="username" value="" >'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="authtype" name="authtype">'+
					'<option value="0">MD5</option>'+
					'<option value="1">SHA</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<input style="width:95%;" id="authpasswd" name="authpasswd" value="">'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="privacytype" name="privacytype">'+
					'<option value="0">DES</option>'+
					'<option value="1">AES</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<input style="width:95%;" id="privacypasswd" name="privacypasswd" value="">'+
			'</td>'+
		'</tr>';
	
	return str;
}

/*
* type: v1 or v2
*/
function access_conf_v1v2(type, viewname){
	var str = 
	'<br/>'+
	'<div id="tab" style="height:30px;">'+
		'<li class="tb1">&nbsp;</li>'+
		'<li class="tbg">'+language('Access Configuration')+'('+type+')'+'</li>'+
		'<li class="tb2">&nbsp;</li>'+
	'</div>'+
	'<table width="100%" class="tshow" >'+
		'<tr>'+
			'<th>'+language('Group')+'</th>'+
			'<th>'+language('Read')+'</th>'+
			'<th>'+language('Write')+'</th>'+
			'<th>'+language('Notify')+'</th>'+
		'</tr>'+
		'<tr>'+
			'<td>'+
				'<input style="width:95%;BACKGROUND-COLOR: #e7e7e7;" readonly="readonly" id="access1_'+type+'" value="">'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="access6_'+type+'" value="">'+
					'<option value="0"></option>'+
					'<option value="1" >none</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="access7_'+type+'" value="">'+
					'<option value="0"></option>'+
					'<option value="1" >none</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="access8_'+type+'" value="">'+
					'<option value="0"></option>'+
					'<option value="1" >none</option>'+
				'</select>'+
			'</td>'+
		'</tr>'+
	'</table>';
	
	return str;
}

function access_conf_v3(){
	var str = '<br/>'+
	'<div id="tab" style="height:30px;">'+
		'<li class="tb1">&nbsp;</li>'+
		'<li class="tbg">'+language('Access Configuration')+'(v3)</li>'+
		'<li class="tb2">&nbsp;</li>'+
	'</div>'+
	'<table width="100%" class="tshow" >'+
		'<tr>'+
			'<th>'+language('Group')+'</th>'+
			'<th>'+language('Read')+'</th>'+
			'<th>'+language('Write')+'</th>'+
			'<th>'+language('Notify')+'</th>'+
		'</tr>'+
		'<tr>'+
			'<td>'+
				'<input style="width:95%;BACKGROUND-COLOR: #e7e7e7;" readonly="readonly" id="access11" value="">'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="access16" >'+
					'<option value="0"></option>'+
					'<option value="1">none</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="access17" >'+
					'<option value="0"></option>'+
					'<option value="1" >none</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="access18" >'+
					'<option value="0"></option>'+
					'<option value="1" >none</option>'+
				'</select>'+
			'</td>'+
		'</tr>'+
	'</table>';
	
	return str;
}

function group_conf_v1v2v3(type){
	if(type == 'v3'){
		var user_or_security = language('User');
	}else{
		var user_or_security = language('Security Name');
	}
	
	var str = 
	'<div id="tab" style="height:30px;">'+
		'<li class="tb1">&nbsp;</li>'+
		'<li class="tbg">'+language('Group Configuration')+'('+type+')'+'</li>'+
		'<li class="tb2">&nbsp;</li>'+
	'</div>'+
	'<table width="100%" class="tshow" >'+
		'<tr>'+
			'<th>'+language('Group')+'</th>'+
			'<th>'+user_or_security+'</th>'+
		'</tr>'+
		'<tr>'+
			'<td>'+
				'<input style="width:95%;" id="group1_'+type+'" value="">'+
			'</td>'+
			'<td>'+
				'<input style="width:95%;BACKGROUND-COLOR: #e7e7e7;" readonly="readonly" id="group3_'+type+'" value="">'+
			'</td>'+
		'</tr>'+
	'</table>';
	
	return str;
}

function view_conf_v1v2v3(type){
	var str = 
	'<div id="tab" style="height:30px;">'+
		'<li class="tb1">&nbsp;</li>'+
		'<li class="tbg">'+language('View Configuration')+'('+type+')'+'</li>'+
		'<li class="tb2">&nbsp;</li>'+
	'</div>'+
	'<table width="100%" class="tshow" >'+
		'<tr>'+
			'<th>'+language('ViewName')+'</th>'+
			'<th>'+language('ViewType')+'</th>'+
			'<th>'+language('ViewSubtree')+'</th>'+
			'<th>'+language('ViewMask')+'</th>'+
		'</tr>'+
		'<tr>'+
			'<td>'+
				'<input style="width:95%;" id="view1_'+type+'" value="">'+
			'</td>'+
			'<td>'+
				'<select style="width:95%;" id="view_'+type+'" >'+
					'<option value="0" >included</option>'+
					'<option value="1" >excluded</option>'+
				'</select>'+
			'</td>'+
			'<td><input style="width:95%;" id="view3_'+type+'" value="">'+
			'</td>'+
			'<td><input style="width:95%;" id="view4_'+type+'" value="">'+
			'</td>'+
		'</tr>'+
	'</table>';
	
	return str;
}

function onload_show(){
	$("#snmp_switch").iButton();
}
/******************************************************************************************/
(function(){
	$("#lang_snmp_parameter").html(language('SNMP Parameter'));
	$("#lang_snmp_enable").html(language('SNMP Enable'));
	$("#lang_snmp_enable_help").html(language('SNMP Enable Help','Whether to enable SNMP'));
	$("#lang_system_contact").html(language('System Contact'));
	$("#lang_system_contact_help").html(language('System Contact Help','System contact information'));
	$("#lang_system_location").html(language('System Location'));
	$("#lang_system_location_help").html(language('System Location Help','The locale of system contact'));
	$("#lang_support_snmp_version").html(language('Support SNMP Version'));
	$("#lang_support_snmp_version_help").html(language('Support SNMP Version help','Select the SNMP version to be run'));
	$("#lang_snmp_version").html(language('SNMP Version'));
	$("#lang_snmp_version_help").html(language('SNMP version','Modify the selected SNMP version\'s parameters'));
	$("#lang_v1").html(language('v1'));
	$("#lang_v2c").html(language('v2c'));
	$("#lang_v3").html(language('v3'));
	$("#lang_group_configuration").html(language('Group Configuration'));
	$(".lang_order").html(language('Order'));
	$(".lang_group").html(language('Group'));
	$(".lang_user_or_security").html(language(''));
	$("#lang_view_configuration").html(language('View Configuration'));
	$("#lang_viewname").html(language('ViewName'));
	$("#lang_viewtype").html(language('ViewType'));
	$("#lang_viewsubtree").html(language('ViewSubtree'));
	$("#lang_viewmask").html(language('ViewMask'));
	$(".lang_save").val(language('Save'));
}());

function show_snmp(snmp_data){
	var general = snmp_data['_general'];
	var v1 = snmp_data['_v1'];
	var v2c = snmp_data['_v2c'];
	var v3 = snmp_data['_v3'];
	
	var community_conf_v1_str = community_conf_v1v2('v1');
	var group_conf_v1_str = group_conf_v1v2v3('v1');
	var view_conf_v1_str = view_conf_v1v2v3('v1');
	var access_conf_v1_str = access_conf_v1v2('v1', v1['_view']['_name']);
	$("#field_community_configuration_for_v1").html(community_conf_v1_str);
	$("#field_group_configuration_for_v1").html(group_conf_v1_str);
	$("#field_view_configuration_for_v1").html(view_conf_v1_str);
	$("#field_access_configuration_for_v1").html(access_conf_v1_str);
	
	var community_conf_v2_str = community_conf_v1v2('v2');
	var group_conf_v2_str = group_conf_v1v2v3('v2');
	var view_conf_v2_str = view_conf_v1v2v3('v2');
	var access_conf_v2_str = access_conf_v1v2('v2', v2c['_view']['_name']);
	$("#field_community_configuration_for_v2").html(community_conf_v2_str);
	$("#field_group_configuration_for_v2").html(group_conf_v2_str);
	$("#field_view_configuration_for_v2").html(view_conf_v2_str);
	$("#field_access_configuration_for_v2").html(access_conf_v2_str);
	
	var user_conf_v3_str = user_conf_v3();
	var group_conf_v3_str = group_conf_v1v2v3('v3');
	var view_conf_v3_str = view_conf_v1v2v3('v3');
	var access_conf_v3_str = access_conf_v3();
	$("#field_user_configuration_v3").html(user_conf_v3_str);
	$("#field_group_configuration_for_v3").html(group_conf_v3_str);
	$("#field_view_configuration_for_v3").html(view_conf_v3_str);
	$("#field_access_configuration_v3").html(access_conf_v3_str);
	
	//general
	if(general['_sw'] == 1){
		document.getElementById('snmp_switch').checked = true;
	}
	
	document.getElementById('syscontact').value = general['_address'];
	
	document.getElementById('syslocation').value = general['_contact'];
	
	var support_snmp_version_arr = general['_supportver'].split(',');
	for(var i=0;i<support_snmp_version_arr.length;i++){
		if(support_snmp_version_arr[i] == 'v1'){
			document.getElementById('v1').checked = true;
		}else if(support_snmp_version_arr[i] == 'v2c'){
			document.getElementById('v2c').checked = true;
		}else if(support_snmp_version_arr[i] == 'v3'){
			document.getElementById('v3').checked = true;
		}
	}
	
	document.getElementById('snmp_version').value = general['_curver'];
	if(general['_curver'] == 1){
		$("#field_community_configuration_for_v2").show();
		$("#field_group_configuration_for_v2").show();
		$("#field_view_configuration_for_v2").show();
		$("#field_access_configuration_for_v2").show();
	}else if(general['_curver'] == 2){
		$("#field_view_configuration_for_v3").show();
		$("#field_group_configuration_for_v3").show();
		$("#field_user_configuration_v3").show();
		$("#field_access_configuration_v3").show();
	}else{
		$("#field_community_configuration_for_v1").show();
		$("#field_group_configuration_for_v1").show();
		$("#field_view_configuration_for_v1").show();
		$("#field_access_configuration_for_v1").show();
	}
	
	//v1v2 community conf
	document.getElementById('com2sec1_v1').value = v1['_comm']['_name'];
	document.getElementById('group3_v1').value = v1['_comm']['_name'];
	document.getElementById('souce_v1').value = v1['_comm']['_souce'];
	document.getElementById('com2sec2_v1').value = v1['_comm']['_community'];
	
	document.getElementById('com2sec1_v2').value = v2c['_comm']['_name'];
	document.getElementById('group3_v2').value = v2c['_comm']['_name'];
	document.getElementById('souce_v2').value = v2c['_comm']['_souce'];
	document.getElementById('com2sec2_v2').value = v2c['_comm']['_community'];
	
	//v1v2 group conf
	document.getElementById('group1_v1').value = v1['_secgrp']['_name'];
	document.getElementById('access1_v1').value = v1['_secgrp']['_name'];
	
	document.getElementById('group1_v2').value = v2c['_secgrp']['_name'];
	document.getElementById('access1_v2').value = v2c['_secgrp']['_name'];
	
	//v1v2 view conf
	document.getElementById('view1_v1').value = v1['_view']['_name'];
	document.getElementById('view_v1').value = v1['_view']['_MibType'];
	document.getElementById('view3_v1').value = v1['_view']['_subtree'];
	document.getElementById('view4_v1').value = v1['_view']['_mask'];
	
	document.getElementById('view1_v2').value = v2c['_view']['_name'];
	document.getElementById('view_v2').value = v2c['_view']['_MibType'];
	document.getElementById('view3_v2').value = v2c['_view']['_subtree'];
	document.getElementById('view4_v2').value = v2c['_view']['_mask'];
	
	//v1v2 access conf
	document.getElementById("access6_v1").options[0].text = v1['_view']['_name'];
	document.getElementById("access7_v1").options[0].text = v1['_view']['_name'];
	document.getElementById("access8_v1").options[0].text = v1['_view']['_name'];
	document.getElementById('access6_v1').value = v1['_access']['_read'];
	document.getElementById('access7_v1').value = v1['_access']['_write'];
	document.getElementById('access8_v1').value = v1['_access']['_notif'];
	
	document.getElementById("access6_v2").options[0].text = v2c['_view']['_name'];
	document.getElementById("access7_v2").options[0].text = v2c['_view']['_name'];
	document.getElementById("access8_v2").options[0].text = v2c['_view']['_name'];
	document.getElementById('access6_v2').value = v2c['_access']['_read'];
	document.getElementById('access7_v2').value = v2c['_access']['_write'];
	document.getElementById('access8_v2').value = v2c['_access']['_notif'];
	
	//v3 user conf
	document.getElementById('username').value = v3['_user']['_username'];
	document.getElementById('group3_v3').value = v3['_user']['_username'];
	document.getElementById('authtype').value = v3['_user']['_authproctol'];
	document.getElementById('authpasswd').value = v3['_user']['_authcode'];
	document.getElementById('privacytype').value = v3['_user']['_privproctol'];
	document.getElementById('privacypasswd').value = v3['_user']['_privcode'];
	
	//v3 group conf
	document.getElementById('group1_v3').value = v3['_secgrp']['_name'];
	document.getElementById('access11').value = v3['_secgrp']['_name'];
	
	//v3 view conf
	document.getElementById('view1_v3').value = v3['_view']['_name'];
	document.getElementById('view_v3').value = v3['_view']['_MibType'];
	document.getElementById('view3_v3').value = v3['_view']['_subtree'];
	document.getElementById('view4_v3').value = v3['_view']['_mask'];
	
	//v3 access conf
	document.getElementById("access16").options[0].text = v3['_view']['_name'];
	document.getElementById("access17").options[0].text = v3['_view']['_name'];
	document.getElementById("access18").options[0].text = v3['_view']['_name'];
	document.getElementById('access16').value = v3['_access']['_read'];
	document.getElementById('access17').value = v3['_access']['_write'];
	document.getElementById('access18').value = v3['_access']['_notif'];
	
	$("#snmp_version").change(function(){
		$("#field_community_configuration_for_v1").hide();
		$("#field_group_configuration_for_v1").hide();
		$("#field_view_configuration_for_v1").hide();
		$("#field_access_configuration_for_v1").hide();
		$("#field_community_configuration_for_v2").hide();
		$("#field_group_configuration_for_v2").hide();
		$("#field_view_configuration_for_v2").hide();
		$("#field_access_configuration_for_v2").hide();
		$("#field_view_configuration_for_v3").hide();
		$("#field_group_configuration_for_v3").hide();
		$("#field_user_configuration_v3").hide();
		$("#field_access_configuration_v3").hide();
		
		if($(this).val() == 2){
			$("#field_view_configuration_for_v3").show();
			$("#field_group_configuration_for_v3").show();
			$("#field_user_configuration_v3").show();
			$("#field_access_configuration_v3").show();
		}else if($(this).val() == 1){
			$("#field_community_configuration_for_v2").show();
			$("#field_group_configuration_for_v2").show();
			$("#field_view_configuration_for_v2").show();
			$("#field_access_configuration_for_v2").show();
		}else{
			$("#field_community_configuration_for_v1").show();
			$("#field_group_configuration_for_v1").show();
			$("#field_view_configuration_for_v1").show();
			$("#field_access_configuration_for_v1").show();
		}
	});
	
	//v1
	$(document).on("keyup", "#com2sec1_v1", function(){
		var value = $(this).val();
		$("#field_group_configuration_for_v1 #group3_v1").val(value);
	});
	
	$(document).on("keyup", "#group1_v1", function(){
		var value = $(this).val();
		$("#field_access_configuration_for_v1 #access1_v1").val(value);
	});
	
	$(document).on("keyup", "#view1_v1", function(){
		var value = $(this).val();
		document.getElementById('access6_v1').options[0].text = value;
		document.getElementById('access7_v1').options[0].text = value;
		document.getElementById('access8_v1').options[0].text = value;
	});
	
	//v2
	$(document).on("keyup", "#com2sec1_v2", function(){
		var value = $(this).val();
		$("#field_group_configuration_for_v2 #group3_v2").val(value);
	});
	
	$(document).on("keyup", "#group1_v2", function(){
		var value = $(this).val();
		$("#field_access_configuration_for_v2 #access1_v2").val(value);
	});
	
	$(document).on("keyup", "#view1_v2", function(){
		var value = $(this).val();
		document.getElementById('access6_v2').options[0].text = value;
		document.getElementById('access7_v2').options[0].text = value;
		document.getElementById('access8_v2').options[0].text = value;
	});
	
	//v3
	$(document).on("keyup", "#username", function(){
		var value = $(this).val();
		$("#field_group_configuration_for_v3 #group3_v3").val(value);
	});
	
	$(document).on("keyup", "#view1_v3", function(){
		var value = $(this).val();
		document.getElementById('access16').options[0].text = value;
		document.getElementById('access17').options[0].text = value;
		document.getElementById('access18').options[0].text = value;
	});
}

object.AGNetworkSnmpGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var snmp_data = data_temp['_snmp'];
	
	header(data_temp['_combuf']);
	show_snmp(snmp_data);
	footer();
	onload_show();
	
	$(".lang_save").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_snmp();
			}
		}
	});
}

function error_back(data){
	
}
/******************************************************************************************/
function save_snmp(){
	//general
	var SnmpGeneral = new AST_SnmpGeneral();
	
	if(document.getElementById('snmp_switch').checked){
		var sw = 1;
	}else{
		var sw = 0;
	}
	SnmpGeneral._sw = sw;
	
	var contact = document.getElementById('syscontact').value;
	SnmpGeneral._contact = contact;
	
	var address = document.getElementById('syslocation').value;
	SnmpGeneral._address = address;
	
	var supportver = document.getElementsByName('snmp_enabled_version');
	var arr = [];
	for(var i=0;i<supportver.length;i++){
		if(supportver[i].checked){
			arr.push(supportver[i].value);
		}
	}
	var supportver_str = arr.join(',');
	SnmpGeneral._supportver = supportver_str;
	
	var snmp_version = document.getElementById('snmp_version').value;
	SnmpGeneral._curver = snmp_version;
	
	//v1
	var SnmpCommunity_v1 = new AST_SnmpCommunity();
	
		var com2sec1_v1 = document.getElementById('com2sec1_v1').value;
		SnmpCommunity_v1._name = com2sec1_v1;
		var souce_v1 = document.getElementById('souce_v1').value;
		SnmpCommunity_v1._souce = souce_v1;
		var com2sec2_v1 = document.getElementById('com2sec2_v1').value;
		SnmpCommunity_v1._community = com2sec2_v1;
	
	var SnmpSecurityGroup_v1 = new AST_SnmpSecurityGroup();
	
		var group1_v1 = document.getElementById('group1_v1').value;
		SnmpSecurityGroup_v1._name = group1_v1;
	
	var SnmpView_v1 = new AST_SnmpView();
	
		var view1_v1 = document.getElementById('view1_v1').value;
		SnmpView_v1._name = view1_v1;
		var view_v1 = document.getElementById('view_v1').value;
		SnmpView_v1._MibType = view_v1;
		var view3_v1 = document.getElementById('view3_v1').value;
		SnmpView_v1._subtree = view3_v1;
		var view4_v1 = document.getElementById('view4_v1').value;
		SnmpView_v1._mask = view4_v1;
	
	var SnmpAccess_v1 = new AST_SnmpAccess();
	
		var access6_v1 = document.getElementById('access6_v1').value;
		SnmpAccess_v1._read = access6_v1;
		var access7_v1 = document.getElementById('access7_v1').value;
		SnmpAccess_v1._write = access7_v1;
		var access8_v1 = document.getElementById('access8_v1').value;
		SnmpAccess_v1._notif = access8_v1;
	
	var SnmpV1V2C_v1 = new AST_SnmpV1V2C();
		SnmpV1V2C_v1._comm = SnmpCommunity_v1;
		SnmpV1V2C_v1._secgrp = SnmpSecurityGroup_v1;
		SnmpV1V2C_v1._view = SnmpView_v1;
		SnmpV1V2C_v1._access = SnmpAccess_v1;
	
	//v2
	var SnmpCommunity_v2 = new AST_SnmpCommunity();
	
		var com2sec1_v2 = document.getElementById('com2sec1_v2').value;
		SnmpCommunity_v2._name = com2sec1_v2;
		var souce_v2 = document.getElementById('souce_v2').value;
		SnmpCommunity_v2._souce = souce_v2;
		var com2sec2_v2 = document.getElementById('com2sec2_v2').value;
		SnmpCommunity_v2._community = com2sec2_v2;
	
	var SnmpSecurityGroup_v2 = new AST_SnmpSecurityGroup();
	
		var group1_v2 = document.getElementById('group1_v2').value;
		SnmpSecurityGroup_v2._name = group1_v2;
	
	var SnmpView_v2 = new AST_SnmpView();
	
		var view1_v2 = document.getElementById('view1_v2').value;
		SnmpView_v2._name = view1_v2;
		var view_v2 = document.getElementById('view_v2').value;
		SnmpView_v2._MibType = view_v2;
		var view3_v2 = document.getElementById('view3_v2').value;
		SnmpView_v2._subtree = view3_v2;
		var view4_v2 = document.getElementById('view4_v2').value;
		SnmpView_v2._mask = view4_v2;
	
	var SnmpAccess_v2 = new AST_SnmpAccess();
	
		var access6_v2 = document.getElementById('access6_v2').value;
		SnmpAccess_v2._read = access6_v2;
		var access7_v2 = document.getElementById('access7_v2').value;
		SnmpAccess_v2._write = access7_v2;
		var access8_v2 = document.getElementById('access8_v2').value;
		SnmpAccess_v2._notif = access8_v2;
	
	var SnmpV1V2C_v2 = new AST_SnmpV1V2C();
		SnmpV1V2C_v2._comm = SnmpCommunity_v2;
		SnmpV1V2C_v2._secgrp = SnmpSecurityGroup_v2;
		SnmpV1V2C_v2._view = SnmpView_v2;
		SnmpV1V2C_v2._access = SnmpAccess_v2;
		
	//v3
	var SnmpUserAdd = new AST_SnmpUserAdd();
	
		var username = document.getElementById('username').value;
		SnmpUserAdd._username = username;
		var authtype = document.getElementById('authtype').value;
		SnmpUserAdd._authproctol = authtype;
		var authpasswd = document.getElementById('authpasswd').value;
		SnmpUserAdd._authcode = authpasswd;
		var privacytype = document.getElementById('privacytype').value;
		SnmpUserAdd._privproctol = privacytype;
		var privacypasswd = document.getElementById('privacypasswd').value;
		SnmpUserAdd._privcode = privacypasswd;
	
	var SnmpSecurityGroup = new AST_SnmpSecurityGroup();
	
		var group1_v3 = document.getElementById('group1_v3').value;
		SnmpSecurityGroup._name = group1_v3;
	
	var SnmpView = new AST_SnmpView();
	
		var view1_v3 = document.getElementById('view1_v3').value;
		SnmpView._name = view1_v3;
		var view_v3 = document.getElementById('view_v3').value;
		SnmpView._MibType = view_v3;
		var view3_v3 = document.getElementById('view3_v3').value;
		SnmpView._subtree = view3_v3;
		var view4_v3 = document.getElementById('view4_v3').value;
		SnmpView._mask = view4_v3;
	
	var SnmpAccess = new AST_SnmpAccess();
	
		var access16 = document.getElementById('access16').value;
		SnmpAccess._read = access16;
		var access17 = document.getElementById('access17').value;
		SnmpAccess._write = access17;
		var access18 = document.getElementById('access18').value;
		SnmpAccess._notif = access18;
	
	var SnmpV3 = new AST_SnmpV3();
		SnmpV3._user = SnmpUserAdd;
		SnmpV3._secgrp = SnmpSecurityGroup;
		SnmpV3._view = SnmpView;
		SnmpV3._access = SnmpAccess;
		
	var SnmpConfParam = new AST_SnmpConfParam();
		SnmpConfParam._general = SnmpGeneral;
		SnmpConfParam._v1 = SnmpV1V2C_v1;
		SnmpConfParam._v2c = SnmpV1V2C_v2;
		SnmpConfParam._v3 = SnmpV3;
	
	var SnmpSave = new AST_SnmpSave();
		SnmpSave._snmp = SnmpConfParam;
	
	object.AGNetworkSnmpSave(save_success_back, save_error_back, SnmpSave);
}

function save_success_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-snmp.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}