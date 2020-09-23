function check_chnl_type(analog_data){
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] == 'fxs_ks'){
			document.getElementById('channel'+item).disabled = true;
			document.getElementById('portname'+item).disabled = true;
			document.getElementById('username'+item).disabled = true;
			document.getElementById('passwd'+item).disabled = true;
			document.getElementById('ipaddr'+item).disabled = true;
			document.getElementById('bipaddr'+item).disabled = true;
			document.getElementById('port'+item).disabled = true;
			document.getElementById('vosenc'+item).disabled = true;
			document.getElementById('sip_codec_priority'+item).disabled = true;
			document.getElementById('sip_codec_mode'+item).disabled = true;
		}
	}
}
function selectall()
{
	$(".selectall").click(function(){
		if($(this).attr("checked") == 'checked'){
			$(".each_select").each(function(){
				if($(this).attr("disabled") != 'disabled'){
					$(this).attr("checked", true);
				}
			});
		}else{
			$(".each_select").each(function(){
				if($(this).attr("disabled") != 'disabled'){
					$(this).attr("checked", false);
				}
			});
		}
	});
}

function setValue(sip_data, analog_data)
{
	var name_ary = [];
	for(var item in sip_data){
		name_ary.push(sip_data[item]['_section']);
	}

	var username = document.getElementById('username0').value;
	var passwd = document.getElementById('passwd0').value;
	var ipaddr = document.getElementById('ipaddr0').value;
	var bipaddr = document.getElementById('bipaddr0').value;
	var codec = document.getElementById('sip_codec_priority0').value;
	var codec_mode=document.getElementById('sip_codec_mode0').value;
	var vosenc = document.getElementById('vosenc0').value;
	var port = document.getElementById('port0').value;
	var sip_overwrite = language('sip overwrite confirm');
	var sips_overwrite = language('sips overwrite confirm');
	var password_auto = document.getElementById('password_auto').checked;

	if (username == '') {
		alert(language('js check username 1', '\'User Name\' must not be null!'));
		document.getElementById('username0').focus();
		return false;
	} else {
		if(!check_sipname(username)) {
			alert(language('js check sipname', 'Allowed character must be any of [0-9a-zA-Z$*-=_.], length: 1-32'));
			document.getElementById('username0').focus();
			return false;
		}
	}
	if (passwd != '') {
		if(!check_sippwd(passwd)) {
			alert(language('js check sippwd', 'Allowed character must be any of [0-9a-zA-Z`~!#@$%^&*()_+{}|<>-=[],.],1 - 32 characters.'));
			document.getElementById('passwd0').focus();
			return false;
		}
	}
	if (ipaddr != '') {
		if(!check_domain(ipaddr)) {
			alert(language('js check domain', 'Invalid hostname or ip address!'));
			document.getElementById('ipaddr0').focus();
			return false;
		}
	}
	
	var part = username.split('_');
	if (part.length == 0 || part.length == 1) {
		var newuser = Number(username);
	} else if (part.length == 2) {
		var newuser = Number(part[1]);
	} else {
		alert(language('js check sipname', 'Allowed character must be any of [0-9a-zA-Z$*-=_.], length: 1-32'));
		document.getElementById('username0').focus();
		return false;
	}
	var newuser_as_string;
	var osips = new Array();

	var validusers = 0;

	for (var item in analog_data) {
		if (document.getElementById('channel'+analog_data[item]['_channel']).checked == true) {
			validusers++;
		}
	}
	
	for (i = 1; i <= validusers; i++) {
		if (part.length == 0 || part.length == 1) {
			newuser_as_string = newuser + "";
		} else {
			newuser_as_string = part[0] + "_" + newuser + "";
		}
		for (var j in name_ary) {
			if(name_ary[j] == newuser_as_string) {
				osips.push(name_ary[j]);
			}
		}
		newuser = newuser + 1; 
	}
	
	if (osips.length == 1) {
		var confirm_string = osips[0] + " " + sip_overwrite;
		if (!confirm(confirm_string)) {
			return false;
		}
	} else if (osips.length > 1) {
		var confirm_string = "";
		for (i = 0; i < osips.length; i++) {
			confirm_string += osips[i] + " ";
		}
		confirm_string += sips_overwrite;
		if (!confirm(confirm_string)) {
			return false;
		}
	}
	
	var usernamearray = username.match(/\d+/g);
	if(usernamearray){
		   var usernamestr = usernamearray[usernamearray.length-1];
		   var newusername = Number(usernamestr);
	}else{
		alert(language('js check busername', 'you need to set a number for username'));
		return ;
	}
	
	var numarray = passwd.match(/\d+/g);	
	if(numarray){	
		var numstr = numarray[numarray.length-1];
		var newpasswd = Number(numstr);
	}
	
	for (var item in analog_data) {
		if (document.getElementById('channel'+analog_data[item]['_channel']).checked == true) {
			if(password_auto) {
				var tmppasswd = passwd;
				document.getElementById('passwd'+analog_data[item]['_channel']).value = tmppasswd.replace(numstr,newpasswd+'');

				var tmpusername = username;
				document.getElementById('username'+analog_data[item]['_channel']).value = tmpusername.replace(usernamestr,newusername+'');						
			} else {
				document.getElementById('passwd'+analog_data[item]['_channel']).value = passwd;

				var tmpusername = username;
				document.getElementById('username'+analog_data[item]['_channel']).value = tmpusername.replace(usernamestr,newusername+'');
			}
			document.getElementById('ipaddr'+analog_data[item]['_channel']).value = ipaddr;
			document.getElementById('bipaddr'+analog_data[item]['_channel']).value = bipaddr;
			document.getElementById('sip_codec_priority'+analog_data[item]['_channel']).value = codec;
			document.getElementById('sip_codec_mode'+analog_data[item]['_channel']).value = codec_mode;
			document.getElementById('port'+analog_data[item]['_channel']).value = port;
			document.getElementById('vosenc'+analog_data[item]['_channel']).value = vosenc;
			newpasswd = newpasswd + 1;
			newusername = newusername + 1;	
		} else {
			document.getElementById('username'+analog_data[item]['_channel']).value = '';
			document.getElementById('passwd'+analog_data[item]['_channel']).value = '';
			document.getElementById('ipaddr'+analog_data[item]['_channel']).value = '';
			document.getElementById('bipaddr'+analog_data[item]['_channel']).value = '';
			document.getElementById('sip_codec_priority'+analog_data[item]['_channel']).value = 'ulaw';
			document.getElementById('port'+analog_data[item]['_channel']).value = '';
			document.getElementById('vosenc'+analog_data[item]['_channel']).value = 'No';
		}
	}
	
}

function check(analog_data)
{
	var bindings_ary = [];
	for(var item in analog_data){
		if(analog_data[item]['_signalling'] == 3) continue;
		
		if(analog_data[item]['_associatedchnnl'] != undefined){
			if(analog_data[item]['_associatedchnnl'] != 'none' && analog_data[item]['_associatedchnnl'] != ''){
				bindings_ary.push(analog_data[item]['_channel']);
			}
		}
	}
	
	var port_overwrite = language('port binding overwrite confirm');
	var ports_overwrite = language('ports binding overwrite confirm');

	var newbindings_ary = [];
	for (i = 0; i < bindings_ary.length; i++) {
		checkornot = document.getElementById('channel'+bindings_ary[i]).checked;
		if (checkornot == true)
			newbindings_ary.push(bindings_ary[i]);
	}

	for (var item in analog_data) {
		if (document.getElementById('channel'+analog_data[item]['_channel']).checked != true) {
			continue;
		}
		var username = document.getElementById('username'+analog_data[item]['_channel']).value;
		var passwd = document.getElementById('passwd'+analog_data[item]['_channel']).value;
		var ipaddr = document.getElementById('ipaddr'+analog_data[item]['_channel']).value;
		var codec = document.getElementById('sip_codec_priority'+analog_data[item]['_channel']).value;
		var codec_mode = document.getElementById('sip_codec_mode'+analog_data[item]['_channel']).value;
		if (username == '') {
			alert(language('js check username 1', '\'User Name\' must not be null!'));
			document.getElementById('username'+analog_data[item]['_channel']).focus();
			return false;
		} else {
			if(!check_sipname(username)) {
				alert(language('js check sipname', 'Allowed character must be any of [0-9a-zA-Z$*-=_.], length: 1-32'));
				document.getElementById('username'+analog_data[item]['_channel']).focus();
				return false;
			}
		}
		if (passwd != '') {
			if(!check_sippwd(passwd)) {
				alert(language('js check sippwd', 'Allowed character must be any of [0-9a-zA-Z`~!#@$%^&*()_+{}|<>-=[],.],1 - 32 characters.'));
				document.getElementById('passwd'+analog_data[item]['_channel']).focus();
				return false;
			}
		}
		if(!check_domain(ipaddr)) {
			alert(language('js check domain', 'Invalid hostname or IP address!'));
			document.getElementById('ipaddr'+analog_data[item]['_channel']).focus();
			return false;
		}
	}
	if (newbindings_ary.length == 1) {
		var confirm_string = newbindings_ary[0] + " " + port_overwrite;
		if (!confirm(confirm_string)) {
			return false;
		}
	} else if (newbindings_ary.length > 1) {
		var confirm_string = "";
		for (i = 0; i < newbindings_ary.length; i++) {
			confirm_string += newbindings_ary[i] + " ";
		}
		confirm_string += ports_overwrite;
		if (!confirm(confirm_string)) {
			return false;
		}
	}

	return true;
}

function click_password_auto(obj, analog_data)
{
	var username = document.getElementById('username0').value;
	var passwd = document.getElementById('passwd0').value;
	if((passwd == '') && (username == '')){
		return;
	}
	
	if(obj.attr('checked') == 'checked') {
		if(username == '') {
			return;
		}

		var numarray = passwd.match(/\d+/g);
		if(numarray){
			  var numstr = numarray[numarray.length-1];
			  var newpasswd = Number(numstr);
		}
		var usernamearray = username.match(/\d+/g);
		if(usernamearray){
			  var usernamestr = usernamearray[usernamearray.length-1];
			  var newusername = Number(usernamestr);
		}else{
			alert("you need to set a number for username");
			return ;
		}
		for (var item in analog_data) {
			if (document.getElementById('channel'+analog_data[item]['_channel']).checked != true) {
				continue;
			}

			var tmppasswd = passwd;
			var tmpusername = username;
			document.getElementById('passwd'+analog_data[item]['_channel']).value = tmppasswd.replace(numstr,newpasswd+'');
			if (document.getElementById('username'+analog_data[item]['_channel']).value == '') {
				document.getElementById('username'+analog_data[item]['_channel']).value = tmpusername.replace(usernamestr,newusername+'');
			}
			
			newpasswd = newpasswd + 1;
			newusername = newusername + 1;
		}
	
	} else {
		if(passwd == '') {
			passwd = username;
		}
		for (var item in analog_data) {
			if (document.getElementById('channel'+analog_data[item]['_channel']).checked != true) {
				continue;
			}
			document.getElementById('passwd'+analog_data[item]['_channel']).value = passwd;
		}
	}
}
/***********************************FILE IMPORT BEGIN**************************************/
$(function(){
	$("#file_info").on("change",function(){
		var filePath=$(this).val();
		var arr=filePath.split('\\');
		var fileName=arr[arr.length-1];
		$("#file_name").html(fileName);
	});

	$("#file_info").hover(
		function(){
			$(".file_import_tips").show();
		},
		function(){
			$(".file_import_tips").hide();
		}
	);

	$(".file_sample").hover(
		function(){
			$(".download_samples_tips").show();
		},
		function(){
			$(".download_samples_tips").hide();
		}
	);
});

function file_import(analog_data){
	if(typeof FileReader == 'undefined'){
		alert(language("Browser_warning", "Your browser version is too old to support this widget, please upgrade your browser"));
		return false;
	}

	var flag_str = '';
	var file_info = document.getElementById("file_info").files[0];
	if(typeof(file_info) == "undefined"){
		alert(language("No file selected", "No file selected"));
		return false;
	}

	var file_type = document.getElementById("file_info").value;
	file_type = file_type.split(".")[1];
	if(file_type != 'txt'){
		alert(language("File type", 'The file type is incorrect\nPlease import the txt file!'));
		return false;
	}

	var chan_num = analog_data.length;
	
	var reader = new FileReader();  
	reader.readAsText(file_info);  
	reader.onload=function(f){
		var info = this.result;
		var info_arr = info.split(";");
		for(var i=0;i<info_arr.length-1;i++){
			for(var p = 1;p<=chan_num; p++){
				var each = info_arr[i].split(",");
				if(each[0] == p){
					if(document.getElementById('channel'+p).disabled != true){
						document.getElementById('channel'+p).checked = 'checked';
						for(var j=0;j<each.length;j++){
							each[j] = each[j].replace(/[\r\n]/g,"");
							switch(j<each.length){
								case j==1:
									document.getElementById('username'+p).value = each[j];
									break;
								case j==2:
									document.getElementById('passwd'+p).value = each[j];
									break;
								case j==3:
									document.getElementById('ipaddr'+p).value = each[j];
									break;
								case j==4:
									document.getElementById('bipaddr'+p).value = each[j];
									break;
								case j==5:
									document.getElementById('port'+p).value = each[j];
									break;
								case j==6:
									each[j] = each[j].toLowerCase();
									if(each[j] == 'no'){
										document.getElementById('vosenc'+p).value = 0;
									}else if(each[j] == 'yes'){
										document.getElementById('vosenc'+p).value = 2;
									}
									break;
								case j==7:
									each[j] = each[j].toLowerCase();
									if(each[j]=='g.711 u-law' || each[j]=='u-law' || each[j]=='ulaw' || each[j]=='g.711u-law'){
										document.getElementById('sip_codec_priority'+p).value = 'ulaw';
									}else if(each[j]=='g.711 a-law' || each[j]=='a-law' || each[j]=='alaw' || each[j]=='g.711a-law'){
										document.getElementById('sip_codec_priority'+p).value = 'alaw';
									}else if(each[j]=='g.729' || each[j]=='g729'){
										document.getElementById('sip_codec_priority'+p).value = 'g729';
									}else if(each[j]=='g.722' || each[j]=='g722'){
										document.getElementById('sip_codec_priority'+p).value = 'g722';
									// }else if(each[j]=='g.723' || each[j]=='g723'){
										// document.getElementById('sip_codec_priority'+p).value = 'g723';
									}else{
										document.getElementById('sip_codec_priority'+p).value = each[j];
									}
									break;
								case j==8:
									each[j] = each[j].toLowerCase();
									if(each[j]=="all" || each[j]=="all"){
										document.getElementById('sip_codec_mode'+p).value = 'all';
									}else if(each[j]=="alone" || each[j]=="solo"){
										document.getElementById('sip_codec_mode'+p).value = 'solo';
									}
									break;
							}
						}
					}
				}
			}
		}
	}
}
/***************************************FILE IMPORT END*****************************************/

function lock_button(){
	if($("#float_button_5").attr("checked")=="checked"){
		$("#password_auto").attr({"checked":true});
	} else {
		$("#password_auto").attr({"checked":false});
	}
}
function onload_show(analog_data){
	check_chnl_type(analog_data);
	$("#float_button_3").mouseover(function(){
	  $("#float_button_3").css({opacity:"1",filter:"alpha(opacity=100)"});
	});
	$("#float_button_3").mouseleave(function(){
	  $("#float_button_3").css({opacity:"0.5",filter:"alpha(opacity=50)"});
	});
	$("#float_button_4").mouseover(function(){
	  $("#float_button_4").css({opacity:"1",filter:"alpha(opacity=100)"});
	});
	$("#float_button_4").mouseleave(function(){
	  $("#float_button_4").css({opacity:"0.5",filter:"alpha(opacity=50)"});
	});
	
	selectall();
}
/********************************************************************************/

/*************************SHOW SIP-BENGPOINTS BEGIN**************************/
(function(){
	/* other info */
	$(".file_span").html(language('Choose File'));
	$(".file_import_tips").html(language("File_import_tips","Click upload!(Please import the txt file!)<br>format:<br>Num,Username,Password,Hostname,Hosename-backup,Port,Vos,Codec,Support;<br>eg:<br>1,301,123abc,172.16.99.1,172.16.99.2,8,No,G.711 u-law,solo;<br>"));
	$("#btnId").html(language('Import'));
	$(".file_sample").html(language('Download Samples'));
	$(".download_samples_tips").html(language("Download_samples_tips", "Please upload this download file after decompress it"));
	$(".port_th").html(language('Port'));
	$("#port_name_th").html(language('Port Name'));
	$("#user_name_th").html(language('User Name'));
	$("#password_th").html(language('Password'));
	$("#hostname_ip_th").html(language('Hostname or IP Address'));
	$("#vos_encryption").html(language('VOS Encryption'));
	$("#codec_priority").html(language('Codec Priority'));
	$("#support_codec").html(language('Support Codec'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	$(".setvalue_input").val(language('Batch'));
	$(".lang_autopassword").html(language('AutoPassword'));
	$("#lang_all").html(language('All'));
	$("#lang_solo").html(language('Solo'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function show_bendpoints(analog_data){
	if ((_Define['system_type']=='yfree') || (_Define['system_type']=='general')){
		document.getElementById('sip_codec_mode0').value = 'solo';
		var _solo_selected = 'selected';
	}else {
		var _solo_selected = '';
	}
	
	var html_str = '';
	for(var item in analog_data){
		var itm = analog_data[item]['_channel'];
		if(analog_data[item]['_signalling'] == 2 || analog_data[item]['_signalling'] == 3){
			var _disabled = 'disabled';
		}else{
			var _disabled = '';
		}
		html_str += "<tr>"+
			"<td>"+
				"<input type='checkbox' class='each_select' name='channel"+itm+"' id='channel"+itm+"' "+_disabled+"/>"+
			"</td>"+
			"<td>"+
				itm+
				"<input type='hidden' class='channel_name' value='"+itm+"' "+_disabled+">"+
			"</td>"+
			"<td><input type=text name='portname"+itm+"' id='portname"+itm+"' value='port-"+itm+"' style='width: 100px;' "+_disabled+"/></td>"+
			"<td>"+
				"<input type=text name='username"+itm+"' id='username"+itm+"' value='' style='width: 100px;' "+_disabled+"/>"+
			"</td>"+
			"<td>"+
				"<input type=text name='passwd"+itm+"' id='passwd"+itm+"' value='' style='width: 100px;' "+_disabled+"/>"+
			"</td>"+
			"<td>"+
				"<input type=text name='ipaddr"+itm+"' id='ipaddr"+itm+"' value='' style='width: 110px;' "+_disabled+"/> - "+
				"<input type=text name='bipaddr"+itm+"' id='bipaddr"+itm+"' value='' style='width: 110px;' "+_disabled+"/>"+
			"</td>"+
			"<td>"+
				"<input type=text name='port"+itm+"' id='port"+itm+"' value='' style='width: 100px;' "+_disabled+"/>"+
			"</td>"+
			"<td>"+
				"<select size=1 name='vosenc"+itm+"' id='vosenc"+itm+"' "+_disabled+">"+
				  "<option value=0>No</option>"+
				  "<option value=2>Yes</option>"+
				"</select>"+
			"</td>"+
			"<td>"+
				 "<select size=1 name='sip_codec_priority"+itm+"' id='sip_codec_priority"+itm+"' "+_disabled+">"+
					"<option value=ulaw>G.711 u-law</option>"+
					"<option value=alaw>G.711 a-law</option>"+
					"<option value=g729>G.729</option>"+
					"<option value=g722>G.722</option>"+
					// "<option value=g723>G.723</option>"+
					"<option value=ilbc>ILBC</option>"+
				  "</select>"+
			"</td>"+
			"<td>"+
				 "<select size=1 name='sip_codec_mode"+itm+"' id='sip_codec_mode"+itm+"' "+_disabled+">"+
					"<option value=all>"+language('All')+"</option>"+
					"<option value=solo "+_solo_selected+">"+language('Solo')+"</option>"+
				  "</select>"+
			"</td>"+
		"</tr>";
	}
	$("#html_str").html(html_str);
}

object.AGSipBendpointGet(succeed_back, error_back);

function succeed_back(data){
	var combuf = data['_sipbend']['_combuf'];
	var analog_data = data['_sipbend']['_ana']['_item'];
	var sip_data = data['_sipbend']['_sections']['_item'];
	
	header(combuf);
	show_bendpoints(analog_data);
	footer();
	
	onload_show(analog_data);
	
	//setValue
	$('.setvalue_input').click(function(){
		setValue(sip_data, analog_data);
	});
	
	//check
	$('.save_click').click(function(){
		if(check(analog_data)){
			if(save_only_once()){
				$("#loading_image").show();
				save_bendpoints();
			}
		}
	});
	
	//password_auto_input
	$(".password_auto_input").click(function(){
		click_password_auto($(this), analog_data);
	});
	
	//file_import
	$("#btnId").click(function(){
		file_import(analog_data);
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*************************SHOW SIP-BENGPOINTS END**************************/


/*************************SAVE SIP-BENGPOINTS BEGIN**************************/
function save_bendpoints(){
	var SipBendArr = new AST_SipBendArr();
	var SipAnalogArr = new AST_SipAnalogArr();
	$(".channel_name").each(function(){
		var channel_checked = $(this).parent().siblings().children('.each_select').attr('checked');
		if(channel_checked == 'checked'){
			/* sip begin */
			var sipbend = new AST_SipBend();
			
			var p = $(this).val();
			
			var username = document.getElementById('username'+p).value;
			sipbend._username = username;
			
			sipbend._section = username;
			
			var passwd = document.getElementById('passwd'+p).value;
			sipbend._secret = passwd;
			
			var ipaddr = document.getElementById('ipaddr'+p).value;
			sipbend._ipaddr = ipaddr;
			
			var bipaddr = document.getElementById('bipaddr'+p).value;
			sipbend._bipaddr = bipaddr;
			
			var port = document.getElementById('port'+p).value;
			if(port == ''){
				port = 0;
			}
			sipbend._port = port;
			
			var vosencrypt = document.getElementById('vosenc'+p).value;
			sipbend._vosencrypt = vosencrypt;
			
			var codec_name = document.getElementById('sip_codec_priority'+p).value;
			var allow_val = '';
			if(codec_name == 'ulaw'){
				allow_val = '1';
			}else if(codec_name == 'alaw'){
				allow_val = '2';
			}else if(codec_name == 'g729'){
				allow_val = '3';
			}else if(codec_name == 'g722'){
				allow_val = '4';
			// }else if(codec_name == 'g723'){
				// allow_val = '5';
			}else if(codec_name == 'ilbc'){
				allow_val = '6';
			}
			
			var codec = document.getElementById('sip_codec_mode'+p).value;
			if(codec != 'solo'){
				allow_val = '12346';
			}
			sipbend._allow = allow_val;
			sipbend._md5 = md5(username+'-'+passwd);
			SipBendArr._item.push(sipbend);
			/* sip end */
			
			/* analog begin */
			var sipanalog = new AST_SipAnalog();
			var chl_section = p;
			
			sipanalog._section = p;
			
			var portname = document.getElementById('portname'+p).value;
			sipanalog._name = portname;
			
			sipanalog._cidnumber = username;
			
			var associated_chnnl = 'sip-'+username;
			sipanalog._associatedchnnl = associated_chnnl;
			
			sipanalog._allow = allow_val;
			sipanalog._hostip = ipaddr;
			SipAnalogArr._item.push(sipanalog);
			/* analog end */
		}
	});
	
	var SipBendSave = new AST_SipBendSave();
	SipBendSave._sip = SipBendArr;
	SipBendSave._ana = SipAnalogArr;
	 
	object.AGSipBendpointSave(save_succeed_back, save_error_back, SipBendSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'sip-bendpoints.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*************************SAVE SIP-BENGPOINTS END**************************/