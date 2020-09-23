function setValue(sip_data, ports)
{
	var name_ary = [];
	for(var item in sip_data){
		name_ary.push(sip_data[item]['_section']);
	}
	
	var username = document.getElementById('username0').value;
	var passwd = document.getElementById('passwd0').value;
	var ipaddr = document.getElementById('ipaddr0').value;
	var port = document.getElementById('port0').value;
	var register_mode = document.getElementById('register_mode0').value;
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

	for (i = 1; i <= ports; i++) {
		if (document.getElementById('channel'+i).checked == true) {
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
	
	for (i = 1; i <= ports; i++) {
		if (document.getElementById('channel'+i).checked == true) {
			
			if(password_auto) {
				var tmppasswd = passwd;
				document.getElementById('passwd'+i).value = tmppasswd.replace(numstr,newpasswd+'');

				var tmpusername = username;
				document.getElementById('username'+i).value = tmpusername.replace(usernamestr,newusername+'');						
			} else {
				document.getElementById('passwd'+i).value = passwd;

				var tmpusername = username;
				document.getElementById('username'+i).value = tmpusername.replace(usernamestr,newusername+'');
			}
			document.getElementById('ipaddr'+i).value = ipaddr;
			document.getElementById('port'+i).value = port;
			document.getElementById('register_mode'+i).value = register_mode;
			newpasswd = newpasswd + 1;
			newusername = newusername + 1;	
		} else {
			document.getElementById('username'+i).value = '';
			document.getElementById('passwd'+i).value = '';
			document.getElementById('ipaddr'+i).value = '';
			document.getElementById('port'+i).value = '';
			document.getElementById('register_mode'+i).value = '';
		}
	}
	
}

function register_check(){
	$(".register_mode").change(function(){
		var channel = $(this).parent().siblings().children('.channel_name').val();
		var register_mode = document.getElementById('register_mode'+channel).value;
		if(register_mode == 'server'){
			document.getElementById('ipaddr'+channel).value = 'dynamic';
		}else if(document.getElementById('ipaddr'+channel).value == 'dynamic'){
			document.getElementById('ipaddr'+channel).value = '';
		}
	});
}

function check(ports)
{
	var port_overwrite = language('port binding overwrite confirm');
	var ports_overwrite = language('ports binding overwrite confirm');

	var newbindings_ary = new Array();
	for (i = 0; i < newbindings_ary.length; i++) {
		var checkornot = document.getElementById('channel'+bindings_ary[i]).checked;
		if (checkornot == true)
			newbindings_ary.push(bindings_ary[i]);
	}

	for (i = 1; i <= ports; i++) {
		if (document.getElementById('channel'+i).checked != true) {
			continue;
		}
		var username = document.getElementById('username'+i).value;
		var passwd = document.getElementById('passwd'+i).value;
		var ipaddr = document.getElementById('ipaddr'+i).value;

		if (username == '') {
			alert(language('js check username 1', '\'User Name\' must not be null!'));
			document.getElementById('username'+i).focus();
			return false;
		} else {
			if(!check_sipname(username)) {
				alert(language('js check sipname', 'Allowed character must be any of [0-9a-zA-Z$*-=_.], length: 1-32'));
				document.getElementById('username'+i).focus();
				return false;
			}
		}
		if (passwd != '') {
			if(!check_sippwd(passwd)) {
				alert(language('js check sippwd', 'Allowed character must be any of [0-9a-zA-Z`~!#@$%^&*()_+{}|<>-=[],.],1 - 32 characters.'));
				document.getElementById('passwd'+i).focus();
				return false;
			}
		}
		if(!check_domain(ipaddr)) {
			alert(language('js check domain', 'Invalid hostname or IP address!'));
			document.getElementById('ipaddr'+i).focus();
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

function click_password_auto(obj, ports)
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
			alert(language('js check busername', 'you need to set a number for username'));
			return ;
		}
		for (i = 1; i <= ports; i++) {
			if (document.getElementById('channel'+i).checked != true) {
				continue;
			}

			var tmppasswd = passwd;
			var tmpusername = username;
			document.getElementById('passwd'+i).value = tmppasswd.replace(numstr,newpasswd+'');
			if (document.getElementById('username'+i).value == '') {
				document.getElementById('username'+i).value = tmpusername.replace(usernamestr,newusername+'');
			}
			newpasswd = newpasswd + 1;
			newusername = newusername + 1;
		}
	
	} else {
		if(passwd == '') {
			passwd = username;
		}
		for (i = 1; i <= ports; i++) {
			if (document.getElementById('channel'+i).checked != true) {
				continue;
			}
			
			document.getElementById('passwd'+i).value = passwd;
		}
	}
}
/*************************************************************************************/

function lock_button(){
	if($("#float_button_5").attr("checked")=="checked"){
		$("#password_auto").attr({"checked":true});
	} else {
		$("#password_auto").attr({"checked":false});
	}
}
function onload_show(){
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
	
	register_check();
}
/*************************************************************************************/

/********************************SHOW SIP BATCH ENDPOINTS BEGIN********************************/
(function(){
	$("#id_th").html(language('ID'));
	$("#username_th").html(language('User Name'));
	$("#password_th").html(language('Password'));
	$("#hostname_ip_th").html(language('Hostname or IP Address'));
	$("#port_th").html(language('Port'));
	$("#register_mode_th").html(language('Register Mode'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	$(".batch_input").val(language('Batch'));
	$(".password_auto_input").html(language('AutoPassword'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function sip_batch_endpoints_show(analog_data){
	var i = 1;
	for(var item in analog_data){
		var itm = analog_data[item]['_channel'];
		$(".tshow").append(
			"<tr>"+
				"<td>"+
					"<input type='checkbox' class='channel_select' name='channel"+i+"' id='channel"+i+"'/>"+
				"</td>"+
				"<td>"+
					i+
					"<input type='hidden' class='channel_name' value='"+i+"' />"+
				"</td>"+
				"<td>"+
					"<input type=text name='username"+i+"' id='username"+i+"' value='' style='width: 100px;' />"+
				"</td>"+
				"<td>"+
					"<input type=text name='passwd"+i+"' id='passwd"+i+"' value='' style='width: 100px;' />"+
				"</td>"+
				"<td>"+
					"<input type=text name='ipaddr"+i+"' id='ipaddr"+i+"' value='' style='width: 110px;' />"+
				"</td>"+
				"<td>"+
					"<input type=text name='port"+i+"' id='port"+i+"' value='' style='width: 100px;' />"+
				"</td>"+
				"<td>"+
					"<select size=1 class='register_mode' id='register_mode"+i+"' >"+
						"<option value='client'>client</option>"+
						"<option value='server'>server</option>"+
						//"<option value='none'>none</option>"+
					"</select>"+
				"</td>"+
			"</tr>"
		);
		i++;
	}
}

object.AGSipBatchEndpointsGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var analog_data = data_temp['_ana']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	
	header(data_temp['_combuf']);
	sip_batch_endpoints_show(analog_data);
	footer();
	
	onload_show();
	
	var ports = analog_data.length;
	
	//save
	$(".save_click").click(function(){
		if(check(ports)){
			if(save_only_once()){
				$("#loading_image").show();
				sip_batch_endpoints_save(sip_data);
			}
		}
	});
	
	//selectall 
	$("#selall").click(function(){
		var selall_checked = $(this).attr('checked');
		if(selall_checked == 'checked'){
			$(".channel_select").attr('checked','checked');
		}else{
			$(".channel_select").removeAttr('checked');
		}
	});
	
	//setValue
	$(".batch_input").click(function(){
		setValue(sip_data, ports);
	});
	
	//autopassword
	$("#password_auto").click(function(){
		click_password_auto($(this), ports);
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/********************************SHOW SIP BATCH ENDPOINTS END********************************/


/********************************SAVE SIP BATCH ENDPOINTS BEGIN********************************/
function sortNumber(a,b){
	return b-a;
}
function sip_batch_endpoints_save(sip_data){
	var arr_temp = [];
	for(var item in sip_data){
		arr_temp.push(sip_data[item]['_order']);
	}
	arr_temp = arr_temp.sort(sortNumber);
	if(arr_temp[0] != undefined){
		var last_order = parseInt(arr_temp[0]) + 1;
	}else{
		var last_order = 1;
	}
	
	var SipBatchArr = new AST_SipBatchArr();
	$(".channel_name").each(function(){
		var channel_checked = $(this).parent().siblings().children('.channel_select').attr('checked');
		if(channel_checked == 'checked'){
			var sipbatch = new AST_SipBatch();
			
			var p = $(this).val();
			
			var username = document.getElementById('username'+p).value;
			sipbatch._username = username;
			
			sipbatch._section = username;
			
			var registration = document.getElementById('register_mode'+p).value;
			if(registration == 'none'){
				sipbatch._registration = 0;
			}else if(registration == 'client'){
				sipbatch._registration = 1;
			}else if(registration == 'server'){
				sipbatch._registration = 2;
			}
			
			sipbatch._order = last_order;
			
			var passwd = document.getElementById('passwd'+p).value;
			sipbatch._secret = passwd;
			
			var ipaddr = document.getElementById('ipaddr'+p).value;
			sipbatch._host = ipaddr;
			
			var port = document.getElementById('port'+p).value;
			if(port == ''){
				port = 0;
			}
			sipbatch._port = port;
			
			sipbatch._md5 = md5(username+'-'+passwd);
			
			SipBatchArr._item.push(sipbatch);
			
			last_order++;
		}
	});
	
	object.AGSipBatchEndpointsSave(save_succeed_back, save_error_back, SipBatchArr);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'sip-batch-endpoints.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/********************************SAVE SIP BATCH ENDPOINTS END********************************/