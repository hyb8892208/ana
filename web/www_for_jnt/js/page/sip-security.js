function goto(){
	window.location.href="sip-security.html";
}

function gotopage(page)
{
	if(event.keyCode == 13) {
		event.keyCode = 0;  //Must set
		event.which = 0;
		window.location.href="sip-security.html?page="+page;
	}
}

function goto_inputpage()
{
	window.location.href="sip-security.html?page="+document.getElementById('page').value;
}

function upload_cfg_file2()
{
	if(!isAllowFile('upload_cfg_file')) {
		return false;
	}

	if( ! confirm(language('File Upload confirm','Are you sure to upload configuration files?\nThis will damage the structure of your original configuration files.')) ) {
		return false;
	}

	return true;
}

function addcheck(keys_data){
	var keyname = document.getElementById('keyname').value;
	var ip_address = document.getElementById('ip_address').value;
	var organization = document.getElementById('organization').value;
	var password = document.getElementById('password').value;
	
	document.getElementById('ccreate').innerHTML='';
	if(!check_diyname(keyname)) {
		document.getElementById('ccreate').innerHTML = con_str(language('js check keyname', 'keyname you input is not valid'));
		return false;
	}
	if(!check_domain(ip_address)) {
		document.getElementById('ccreate').innerHTML = con_str(language('js check ip_address', 'ip address you input is not valid'));
		return false;
	}
	if(!check_diyname(organization)){
		document.getElementById('ccreate').innerHTML = con_str(language('js check organization', 'organization you input is not right'));
		return false;
	}
	if(!check_diypwd(password)) {
		document.getElementById('ccreate').innerHTML = con_str(language('js check password', 'passwork you input is not valid'));
		return false;
	}
	
	var server_password = '';
	var server_flag = 0;
	for(var i=0;i<keys_data.length;i++){
		if(keys_data[i]._type == 1 && document.getElementById('type').value == 'server'){
			alert(language('TLS Server Existed help', 'Only one server can be created.'));
			return false;
		}
		
		if(keys_data[i]._type == 1){
			server_password = keys_data[i]._password;
			server_flag = 1;
		}
	}
	
	if(server_flag == 0 && document.getElementById('type').value == 'client'){
		alert(language('TLS Create Server help','Please create the server first.'));
		return false;
	}
	
	if(server_flag == 1 && server_password != document.getElementById('password').value){
		alert('Please checking the server keys is exist or not and client password must be same with Server!!!');
		return false;
	}
	
	return true;
}
function download_key(key_num){
	if(key_num){
		document.getElementById('download_keyname').value = key_num;
		return true;
	} else {
		alert('failed to download the key: keyname is emtpy !');
		return false;
	}
	
}
var pem_flag = false;
function check_pem_file_format(obj){
	pem_flag = false;
	var pos = obj.value.lastIndexOf('.');
	var file_suffix = obj.value.substring(pos+1);
	if(file_suffix == 'pem') {
		pem_flag = true;
		
	}
}
var crt_flag = false;
function check_crt_file_format(obj){
	crt_flag = false;
	var pos = obj.value.lastIndexOf('.');
	var file_suffix = obj.value.substring(pos+1);
	if(file_suffix == 'crt') {
		crt_flag = true;
	}

}
function check_file_format() {
	if(!pem_flag){
		alert('The file you upload is not pem format, please upload file again.');
		return false;
	}
	if(!crt_flag){
		alert('The file you upload is not crt format, please upload file again.');
		return false;
	}
	return true; 
}

function check(){
	if(string_filter_tip()){
		return false;
	}
	
	return true;
}

function string_filter_tip(){ //tip for user that wrong value
	if(string_filter_tip_run('port')){
		return true;
	}
	
	return false;
}
/************************************************************************/
function onload_show(){
	$("#tls_enable").iButton();
	$("#tls_verify_server").iButton();
}
/**************************SHOW SIP SECURITY BEGIN***************************/
(function(){
	/* TLS Setting begin */
	$("#lang_tls_enable").html(language('TLS Enable'));
	$("#lang_tls_enable_help").html(language('TLS Enable help','Enable or disable DTLS-SRTP support.'));
	$("#lang_tls_verify_server").html(language('TLS Verify Server'));
	$("#lang_tls_verify_server_help").html(language('Enable TLS Verify Server help','Enable or disable tls verify server(default is no).'));
	$("#lang_port").html(language('Port'));
	$("#lang_port_help").html(language('Port help','Specify the port for remote connection.'));
	$("#lang_tls_client_method").html(language('TLS Client Method'));
	$("#lang_tls_client_method_help").html(language('TLS Client Method help','values include tlsv1, sslv3, sslv2, Specify protocol for outbound client connections, default is sslv2.'));
	$("#lang_tlsv1").html(language('tlsv1'));
	$("#lang_sslv2").html(language('sslv2'));
	$("#lang_sslv3").html(language('sslv3'));
	/* TLS Setting end */
	
	$("#lang_upload_the_pem_file").html(language("Upload the pem file"));
	$("#lang_upload_the_crt_file").html(language("Upload the crt file"));
	$("#lang_file_name").html(language("File Name"));
	$("#lang_file_size").html(language("File Size"));
	$("#lang_operation").html(language("Operation"));
	$("#lang_file_upload").val(language('File Upload'));
	
	/* other info */
	$("#tls_setting_li").text(language('TLS Setting'));
	$("#key_files_li").text(language('Key Files'));
	$(".save_input").val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function sip_security_show(sip_data, keys_data, keys_file){
	var port = sip_data['_tlsbindport'];
	
	if(port == 0){
		port = '5061';
	}
	
	if(sip_data['_tlsenable'] == 1){
		var tls_enable = 'yes';
	}else{
		var tls_enable = 'no';
	}
	
	if(sip_data['_tlsdontverifyserver'] == 1){
		var tls_verify_server = 'yes';
	}else{
		var tls_verify_server = 'no';
	}
	
	if(sip_data['_tlsclientmethod'] == 2){
		var tls_client_method = 'sslv3';
	}else if(sip_data['_tlsclientmethod'] == 1){
		var tls_client_method = 'sslv2';
	}else{
		var tls_client_method = 'tlsv1';
	}
	
	if(tls_enable == 'yes'){
		var tls_enable_checked = true;
	}else{
		var tls_enable_checked = false;
	}
	if(tls_verify_server == 'no'){
		var tls_verify_server_checked = true;
	}else{
		var tls_verify_server_checked = false;
	}

	//value
	document.getElementById('port').value = port;
	
	//select
	document.getElementById('tls_client_method').value = tls_client_method;
	
	//checked
	document.getElementById('tls_enable').checked = tls_enable_checked;
	document.getElementById('tls_verify_server').checked = tls_verify_server_checked;
	
	if(_Define['type'] != 2){
		var tls_html_str = '<div id="newline"></div>'+
			'<div id="tab">'+
				'<li class="tb_unfold" onclick="lud(this,\'tab_keys\')" id="tab_keys_li">&nbsp;</li>'+
				'<li class="tbg_fold" onclick="lud(this,\'tab_keys\')">'+language('TLS keys')+'</li>'+
				'<li class="tb2_fold" onclick="lud(this,\'tab_keys\')">&nbsp;</li>'+
				'<li class="tb_end">&nbsp;</li>'+
			'</div>'+
			'<div id="tab_keys" >'+
				'<table width="98%" id="tls_keys_table" class="tshow" align="right">';
			
		
		var keys_str = '';
		for(var item in keys_data){
			if(keys_data[item]['_type'] == 0){
				var k_type = 'client';
			}else if(keys_data[item]['_type'] == 1){
				var k_type = 'server';
			}else {
				var k_type = '';
			}
			
			keys_str += '<tr>';
			keys_str += '<td>'+k_type+'</td>';
			keys_str += '<td>'+keys_data[item]['_keyname']+'</td>';
			keys_str += '<td>'+keys_data[item]['_ipaddress']+'</td>';
			keys_str += '<td>'+keys_data[item]['_organizetion']+'</td>';
			keys_str += '<td>'+keys_data[item]['_password']+'</td>';
			
			keys_str += '<td>';
			keys_str += '<input class="delete_key_button" style="margin-right:10px;" type="button" value="'+language('Delete')+'" />';
			keys_str += '<input type="hidden" class="key_val" value="'+keys_data[item]['_section']+'" />';
			
			keys_str += '<form action="/service" style="display:inline-block;" method="post" enctype="multipart/form-data" >';
			keys_str += '<input type="hidden" name="action" value="download" />'
			keys_str += '<input type="hidden" name="page_name" value="sip-security" />';
			keys_str += '<input type="hidden" name="downloadfile" value="'+keys_data[item]['_keyname']+'" />';
			keys_str += '<input class="button" type="submit" value="'+language('Download')+'" onclick="return download_key('+keys_data[item]['_keyname']+');" />';
			keys_str += '</form>';
			
			keys_str += '<input type="hidden" class="key_name" value="'+keys_data[item]['_keyname']+'" />';
			keys_str += '</td>';
			keys_str += '</tr>';
		}
		
		tls_html_str += '<thead>'+
			'<tr>'+
				'<th>'+language('Type')+'</th>'+
				'<th>'+language('Key Name')+'</th>'+
				'<th>'+language('IP Address')+'</th>'+
				'<th>'+language('Organization')+'</th>'+
				'<th>'+language('Password')+'</th>'+
				'<th>'+language('Operation')+'</th>'+
			'</tr>'+
		'</thead>'+
		
		'<tbody>'+
			'<tr>'+	
				'<td>'+
					'<select id="type" name="type">'+
						'<option value="client">'+language('client')+'</option>'+
						'<option value="server">'+language('server')+'</option>'+
					'</select>'+
				'</td>'+
				'<td>'+
					'<input type="text" id="keyname" name="keyname" value="" align="left"/><span id="ckeyname"></span>'+
				'</td>'+
				'<td>'+
					'<input type="text" id="ip_address" name="ip_address" value="" align="left" /><span id="cip_address"></span>'+
				'</td>'+
				'<td>'+
					'<input type="text" id="organization" name="organization" value="" align="left" /><span id="corganization"></span>'+
				'</td>'+
				'<td>'+
					'<input type="text" id="password" name="password" value="" align="left" /><span id="cpassword"></span>'+
				'</td>'+
				'<td>'+
					'<input class="create_key" type="button" value="'+language('Create')+'" align="left" /><span id="ccreate"></span>'+
				'</td>'+
			'</tr>'+
			keys_str+
		'</tbody>';
		
		tls_html_str += '</table></div>';
		$("#tls_html_str").html(tls_html_str);
	}
	
	var key_filename = '';
	for(var i=0;i<keys_file.length;i++){
		key_filename += '<tr>'+
			'<td>'+keys_file[i]['_filename']+'</td>'+
			'<td>'+keys_file[i]['_filesize']+'</td>'+
			'<td>'+
				'<button type="button" class="filename_button" value="Delete" style="width:32px;height:32px;" >'+
					'<input type="hidden" class="filename" value="'+keys_file[i]['_filename']+'" />'+
					'<img src="/images/delete.gif">'+
				'</button>'+
			'</td>'+
		'</tr>'
	}
	$("#key_filename").html(key_filename);
}

object.AGSipSecurityGet(succeed_back, error_back);

function succeed_back(data){
	var combuf = data['_get']['_combuf'];
	var sip_data = data['_get']['_sipgen'];
	var keys_data = data['_get']['_sipkey']['_item'];
	var keys_file = data['_get']['_file']['_item'];
	
	header(combuf);
	sip_security_show(sip_data, keys_data, keys_file);
	footer();
	
	onload_show();
	
	//save
	$(".save_click").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				sip_security_save();
			}
		}
	});
	
	//create
	$(".create_key").click(function(){
		if(addcheck(keys_data)){
			$("#ccreate").html('<image style="display:inline-block;margin-left:10px;" src="../images/loading1.gif" />');
			create_key();
		}
	});
	
	//delete key 
	$(".delete_key_button").click(function(){
		var key_val = $(this).siblings(".key_val").val();
		delete_key(key_val);
	});
	
	//delete file
	$(".filename_button").click(function(){
		var filename = $(this).children(".filename").val();
		delete_file(filename);
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/**************************SHOW SIP SECURITY END***************************/


/**************************SAVE SIP SECURITY BEGIN***************************/
function sip_security_save(){
	
	if(document.getElementById('tls_enable').checked == true){
		var tlsenable = 1;
	}else{
		var tlsenable = 0;
	}
	
	if(document.getElementById('port').value != ''){
		var port = document.getElementById('port').value;
	}else{
		var port = '5061';
	}
	
	var tlsbindaddr = port;
	
	if(document.getElementById('tls_verify_server').checked == true){
		var tls_verify_server = 0;
	}else{
		var tls_verify_server = 1;
	}
	
	var tls_client_method_val = document.getElementById('tls_client_method').value;
	if(tls_client_method_val == 'sslv3'){
		var tls_client_method = 2;
	}else if(tls_client_method_val == 'sslv2'){
		var tls_client_method = 1;
	}else if(tls_client_method_val == 'tlsv1'){
		var tls_client_method = 0;
	}
	
	var SipGen = new AST_SipGen();
	SipGen._tlsbindport = tlsbindaddr;
	SipGen._tlsenable = tlsenable;
	SipGen._tlsdontverifyserver = tls_verify_server;
	SipGen._tlsclientmethod = tls_client_method;
	
	var SipSecSave = new AST_SipSecSave();
	SipSecSave._sipgen = SipGen;
	
	object.AGSipSecuritySave(save_succeed_back, save_error_back, SipSecSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'sip-security.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/**************************SAVE SIP SECURITY END***************************/


/**************************CREATE KEY BEGIN********************************/
function create_key(){
	var type_val = document.getElementById('type').value;
	if(type_val == 'server'){
		var type = 1;
	}else{
		var type = 0;
	}
	
	var keyname = document.getElementById('keyname').value;
	var ip_address = document.getElementById('ip_address').value;
	var organization = document.getElementById('organization').value;
	var _password = document.getElementById("password").value;
	var section = type+'-'+keyname;
	
	var SipKey = new AST_SipKey();
	SipKey._section = section;
	SipKey._keyname = keyname;
	SipKey._ipaddress = ip_address;
	SipKey._organizetion = organization;
	SipKey._password = _password;
	SipKey._type = type;
	
	object.AGAlgSecSettingCreateKey(create_succeed_back, create_error_back, SipKey);
}

function create_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.reload();
	}
}

function create_error_back(data){
	alert(language('create key failed'));
}
/**************************CREATE KEY END********************************/


/**************************DELETE KEY BEGIN********************************/
function delete_key(key){
	var ret = confirm(language('Delete confirm','Are you sure to delete you selected ?'));
	if(ret) {
		if(key)	{
			object.AGAlgSecSettingDeleteKey(delete_key_succeed_back, delete_key_error_back, key);
		} else {
			alert("failed to delete key: keyname is not right !");
		}
	}
}

function delete_key_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.reload();
	}
}

function delete_key_error_back(data){
	alert(language('delete key failed'));
}
/**************************DELETE KEY END********************************/

/**************************DELETE FILE BEGIN********************************/
function delete_file(filename){
	var ret = confirm(language('Delete confirm','Are you sure to delete you selected ?'));
	if(ret) {
		if(filename)	{
			object.AGAlgSecSettingDeleteFile(delete_file_succeed_back, delete_file_error_back, filename);
		} else {
			alert("failed to delete the file: No found the file!");
		}
	}
}

function delete_file_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.reload();
	}
}

function delete_file_error_back(data){
	alert(language('delete file failed'));
}
/**************************DELETE FILE END********************************/