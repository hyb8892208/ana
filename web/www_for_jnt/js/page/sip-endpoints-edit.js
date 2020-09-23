function cancel(){
	window.location.href = "sip-endpoints.html";
}

function anonymous_click(value)
{
	if(value) {
		document.getElementById('sip_username').value = '';
		document.getElementById('sip_password').value = '';

		document.getElementById('sip_username').disabled = true;
		document.getElementById('sip_password').disabled = true;
		document.getElementById('sip_username').readOnly = true;
		document.getElementById('sip_password').readOnly = true;
	} else {
		document.getElementById('sip_username').disabled = false;
		document.getElementById('sip_password').disabled = false;
		document.getElementById('sip_username').readOnly = false;
		document.getElementById('sip_password').readOnly = false;
	}
}

var sip_ip_clear = false;
function registration_change()
{
	var value = document.getElementById('registration').value;
	
	if(value == 'server') {
		//document.getElementById('qualify').value = 'yes';
		document.getElementById('sip_ip').value = 'dynamic';
		document.getElementById('sip_ip').readOnly = true;
		sip_ip_clear = true;

		document.getElementById('anonymous').checked = false;
		document.getElementById('anonymous').disabled = true;
		anonymous_click(false);
	}
	
	if(value == 'client') {
		document.getElementById('authentication_user').disabled = false;
		document.getElementById('mwi').disabled = false;
		document.getElementById('port').disabled = false;
		document.getElementById('register_extension').disabled = false;
		
		document.getElementById('register_user').disabled = false;
		document.getElementById('from_user').disabled = false;
		
		document.getElementById('sip_ip').readOnly = false;
		if(sip_ip_clear){
			document.getElementById('sip_ip').value = '';
		}

		document.getElementById('anonymous').checked = false;
		document.getElementById('anonymous').disabled = true;
		anonymous_click(false);
	} else {
		document.getElementById('authentication_user').disabled = true;
		document.getElementById('mwi').disabled = true;
		document.getElementById('port').disabled = false;
		document.getElementById('register_extension').disabled = true;
	}
	
	if(value == 'none') {
		document.getElementById('sip_ip').readOnly = false;
		if(sip_ip_clear){
			document.getElementById('sip_ip').value = '';
		}

		document.getElementById('anonymous').disabled = false;
	}
}

function registration_change_for_qualify(){
	var value = document.getElementById('registration').value;
	
	if(value == 'server') {
		document.getElementById('qualify').value = 'yes';
		document.getElementById('qualifyfreq').value = 60;
	}
	
	if(value == 'client') {
		document.getElementById('qualify').value = 'no';
		document.getElementById('qualifyfreq').value = 60;
	}
	
	if(value == 'none') {
		document.getElementById('qualify').value = 'no';
		document.getElementById('qualifyfreq').value = 60;
	}
}

function check(sip_info, section)
{
	var name_ary = [];
	var ip_ary = [];
	var nameandip_ary = [];
	
	for(var item in sip_info){
		if(sip_info[item]['_section'] == section){continue;}
		name_ary.push(sip_info[item]['_section']);
		ip_ary.push(sip_info[item]['_host']);
		nameandip_ary.push(sip_info[item]['_username']+'@'+sip_info[item]['_host']);
	}
	
	var endpoint_name = document.getElementById('endpoint_name').value;
	var sip_username = document.getElementById('sip_username').value;
	var sip_password = document.getElementById('sip_password').value;
	var sip_ip = document.getElementById('sip_ip').value;
	var anonymous = document.getElementById('anonymous').checked;

	document.getElementById('cendpoint_name').innerHTML = '';
	document.getElementById('csip_username').innerHTML = '';
	document.getElementById('csip_ip').innerHTML = '';


	if(!check_sipendp(endpoint_name)) {
		document.getElementById("cendpoint_name").innerHTML = con_str(language('js check sipendp','Allowed character must be any of [0-9a-zA-Z`~!@#$%^*()_{}:|?-=.], 1-32 characters.'));
		return false;
	}else{
		document.getElementById("cendpoint_name").innerHTML = '';
	}
	
	for (var i in name_ary) 
	{
		if(name_ary[i] == endpoint_name) {
			document.getElementById('cendpoint_name').innerHTML = con_str('You already had a same username.');
			return false;
		}
	}

	if(!anonymous) {
		if(!check_sipname(sip_username)) {
			document.getElementById("csip_username").innerHTML = con_str(language('js check sipname','Allowed character must be any of [0-9a-zA-Z$*-=_.], length: 1-32'));
			return false;
		}else{
			document.getElementById("csip_username").innerHTML = '';
		}
		if(!check_sippwd(sip_password)) {
			document.getElementById("csip_password").innerHTML = con_str(language('js check sippwd','Allowed character must be any of [0-9a-zA-Z`~!#@$%^&*()_+{}|<>-=[],.],1 - 32 characters.'));
			return false;
		}else{
			document.getElementById("csip_password").innerHTML = '';
		}
	} else {
		sip_username = 'anonymous';
	}

	var registration = document.getElementById('registration').value;
	if(registration != 'server') {
		if(!check_domain(sip_ip)) {
			var rstr = language('js check domain','Invalid domain or IP address.');
			document.getElementById("csip_ip").innerHTML = con_str(rstr);
			return false;
		}
	}

	for (var i in nameandip_ary) 
	{
		if(nameandip_ary[i] == (sip_username+'@'+sip_ip)) {
			document.getElementById('csip_username').innerHTML = con_str('You already had a same '+nameandip_ary[i]+'.');
			return false;
		}

		// if(nameandip_ary[i] == ('anonymous@'+sip_ip)) {
			// document.getElementById('csip_ip').innerHTML = con_str('You exist has '+sip_ip+' set to anonymous.');
			// return false;
		// }
	}

/*
	if(anonymous) {
		for (var i in ip_ary) 
		{
			if(ip_ary[i] == sip_ip) {
				document.getElementById('csip_ip').innerHTML = con_str('You already had a same '+ip_ary[i]+'.');
				return false;
			}
		}
	}
*/
	
	if(string_filter_tip()){
		return false;
	}
	
	return true;
}

function sip_username_change(obj)
{
	if(!document.getElementById('from_user_readonly').checked) {
		document.getElementById('from_user').value = obj.value;
	}

	if(!document.getElementById('register_extension_readonly').checked) {
		document.getElementById('register_extension').value = obj.value;
	}
	
	if(!document.getElementById('register_user_readonly').checked) {
		document.getElementById('register_user').value = obj.value;
	}
}

function sip_ip_change(obj)
{
	document.getElementById('from_domain').value = obj.value;
}

function click_from_user_readonly(obj)
{
	if(obj.checked) {
		document.getElementById('from_user').readOnly = false;
	} else {
		document.getElementById('from_user').readOnly = true;
		document.getElementById('from_user').value = document.getElementById('sip_username').value;
	}
}

function click_register_extension_readonly(obj)
{
	if(obj.checked) {
		document.getElementById('register_extension').readOnly = false;
	} else {
		document.getElementById('register_extension').readOnly = true;
	}
}

function click_register_user_readonly(obj)
{
	if(obj.checked) {
		document.getElementById('register_user').readOnly = false;
	} else {
		document.getElementById('register_user').readOnly = true;
	}
}

function registery_change()
{
	var sw = document.getElementById('registery_enable').checked;
	if (sw) {
		set_visible('tr_registery_string', true);
	} else {
		set_visible('tr_registery_string', false);
	}
}

function check_tlssetup(){
	var transport = document.getElementById('transport').value;
	if(transport == "tls") {
		set_visible('tls_dtlssetup',true);
		set_visible('tls_dtlsverify',true);
		set_visible('tls_dtlsprivatekey',true);
		set_visible('tls_encryption',true);
	} else {
		set_visible('tls_dtlssetup',false);
		set_visible('tls_dtlsverify',false);
		set_visible('tls_dtlsprivatekey',false);
		set_visible('tls_encryption',false);
	}
	
}
function on_load_func()
{
	registration_change();
	registery_change();
}
function handle_port_sync()
{
	if(isAllCheckboxChecked('class','port')){
		$("#all_port").attr({"checked":true});
	}else{
		$("#all_port").attr({"checked":false});

	}
	if(isCheckboxChecked('class','port')){
		$(".setting_sync").show();
		$("#all_settings_sync").attr({"disabled":false,"checked":false});
		selectAllCheckbox(false,'class','setting_sync');
	}else{
		$(".setting_sync").hide();
		$("#all_settings_sync").attr({"disabled":true,"checked":true});
		selectAllCheckbox(false,'class','setting_sync');
	}
}

function handle_setting_sync()
{
	if(isAllCheckboxChecked('class','setting_sync')){
		$("#all_settings_sync").attr({"checked":true});
	}else{
		$("#all_settings_sync").attr({"checked":false});
	}
}

function sip_codec_priority_sync_checked(){
	for(var i=1;i<=6;i++){
	$("#sip_codec_priority"+i+"_sync").click(function(){
		if($(this).attr('checked') == 'checked'){
			$("#sip_codec_priority1_sync").attr('checked', true);
			$("#sip_codec_priority2_sync").attr('checked', true);
			$("#sip_codec_priority3_sync").attr('checked', true);
			$("#sip_codec_priority4_sync").attr('checked', true);
			$("#sip_codec_priority5_sync").attr('checked', true);
			$("#sip_codec_priority6_sync").attr('checked', true);
		}else{
			$("#sip_codec_priority1_sync").attr('checked', false);
			$("#sip_codec_priority2_sync").attr('checked', false);
			$("#sip_codec_priority3_sync").attr('checked', false);
			$("#sip_codec_priority4_sync").attr('checked', false);
			$("#sip_codec_priority5_sync").attr('checked', false);
			$("#sip_codec_priority6_sync").attr('checked', false);
		}
	});
	}
}

function onload_show(){
	on_load_func(); 
	$("#registery_enable").iButton();
	$("#enableoutboundtohost").iButton();
	
	$(".port").click(function(){
		handle_port_sync();
	});

	$(".setting_sync").click(function(){
		handle_setting_sync();
	});
	
	float_sort_hide();
	var sort_info_top = $("#lps").offset().top;
	$("#sort_ag_cli").offset({top: sort_info_top });
	$("#sort_out").offset({top: sort_info_top });
	$("#sort_out").mouseover(function(){
		if($("#sort_out").offset().left <= 5){
			float_sort_on();
		}
	});
	$("#sort_ag_cli").mouseleave(function(){
		float_sort_hide();
	});
	
	sip_codec_priority_sync_checked();
	onload_func();
}

function onload_func()
{ 
	check_tlssetup();
}

function string_filter_tip(){ //tip for user that wrong value
	if(string_filter_tip_run('port')){
		return true;
	}
	
	if(string_filter_tip_run('qualifyfreq')){
		return true;
	}
	
	if(string_filter_tip_run('outboundproxy_port')){
		return true;
	}
	
	if(string_filter_tip_run('calllimit')){
		return true;
	}
	
	if(string_filter_tip_run('max_forwards')){
		return true;
	}
	
	if(string_filter_tip_run('timert1')){
		return true;
	}
	
	if(string_filter_tip_run('timerb')){
		return true;
	}
	
	if(string_filter_tip_run('session-minse')){
		return true;
	}
	
	if(string_filter_tip_run('session-expires')){
		return true;
	}
	
	return false;
}

function limit_string_length(){
	if(check_string_length('sip_username')){
		return true;
	}
	
	if(check_string_length('sip_password')){
		return true;
	}
	
	if(check_string_length('sip_ip')){
		return true;
	}
	
	if(check_string_length('sip_ip2')){
		return true;
	}
	
	if(check_string_length('authentication_user')){
		return true;
	}
	
	if(check_string_length('register_extension')){
		return true;
	}
	
	if(check_string_length('register_user')){
		return true;
	}
	
	if(check_string_length('from_user')){
		return true;
	}
	
	if(check_string_length('from_domain')){
		return true;
	}
	
	if(check_string_length('outboundproxy')){
		return true;
	}
	
	if(check_string_length('tlsprivatekey')){
		return true;
	}
	
	var key = document.getElementById('registery_string').value;
	if(key.length > 63){
		$("#cregistery_string").html(language('limit character'));
		document.getElementById('registery_string').focus();
		return true;
	}
	
	return false;
}

$("#show_sip_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#sip_password").prop("type","text");
	}else{
		$("#sip_password").prop("type","password");
	}
});

/* left bar show */
function float_sort_hide()
{
	$("#sort_ag_cli").stop().animate({left:"-198px"}, 300);
	$("#sort_out").stop().animate({left:"0px"}, 300);
}

function float_sort_on()
{
	$("#sort_ag_cli").animate({left:"0px"}, 300);
	$("#sort_out").animate({left:"198px"}, 300);
}
/*****************************SHOW ENDPOINTS BEGIN**********************************/
(function(){
	/* Main Endpoint Settings begin */
	$("#main_endpoint_li").text(language('Main Endpoint Settings'));
	$('#lang_name').html(language('Name'));
	$('#lang_help').html(language('Name help@sip-endpoints','A name which is able to read by human. <br/>And it\'s only used for user\'s referance.'));
	$('#lang_username').html(language('User Name'));
	$('#lang_username_help').html(language('User Name help@ip-endpoints','User Name the endpoint will use to authenticate with the gateway.'));
	$('#lang_anonymous').html(language('Anonymous'));
	$('#lang_password').html(language('Password'));
	$('#lang_password_help').html(language('Password help@ip-endpoints','Password the endpoint will use to authenticate with the gateway.<br/>Allowed characters'));
	$('#lang_registration').html(language('Registration'));
	$('#lang_registration_help').html(language('Registration help@sip-endpoints','Whether this endpoint will register to this gateway or this gateway to the endpoint.'));
	$('#lang_none').html(language('_None'));
	$('#lang_server').html(language('Endpoint registers with this gateway'));
	$('#lang_client').html(language('This gateway registers with the endpoint'));
	$('#lang_hostname_or_ip').html(language('Hostname or IP Address'));
	$('#lang_hostname_or_ip_help').html(language('Hostname or IP Address help','IP address or hostname of the endpoint or \'dynamic\' if the endpoint has a dynamic IP address.<br/>This will require registration.<br>Notice: If the input here is hostname and your DNS has changed, you must <span style="color:rgb(255,0,0)">reboot asterisk'));
	$('#lang_backup_hostname_or_ip').html(language('Backup Hostname or IP Address'));
	$('#lang_backup_hostname_or_ip_help').html(language('Backup Hostname or IP Address help','IP address or hostname of the endpoint or \'dynamic\' if the endpoint has a dynamic IP address.<br/>This will require registration.<br>Notice: If the input here is hostname and your DNS has changed, you must <span style="color:rgb(255,0,0)">reboot asterisk'));
	$('#lang_transport').html(language('Transport'));
	$('#lang_transport_help').html(language('Transport help','This sets the possible transport types for outgoing. Order of usage, <br/>when the respective transport protocols are inabled, is UDP, TCP, TLS.<br/>The first enabled transport type is only used for outbound messages until a<br/>Registration takes place. During the peer Registration the transport type <br/>may change to another supported type if the peer requests so.'));
	$('#lang_nat').html(language('NAT Traversal'));
	$('#lang_nat_help').html(language('NAT Traversal help','Addresses NAT-related issues in incoming SIP or media sessions.'));
	$('#lang_mwi').html(language('SUBSCRIBE for MWI'));
	$('#lang_mwi_help').html(language('MWI help@sip-endpoints','Whether or not to subscribe to receive the MWI.'));
	$('#lang_vos').html(language('VOS Encryption'));
	$('#lang_vos_help').html(language('VOS Encryption help@sip-endpoints','Whether or not to enable VOS Encryption.'));
	
	$('#lang_force_report_on').html(language('Force report on'));
	$('#lang_report_requested_comedia').html(language('Report if requested and comedia'));
	$(".lang_no").text(language('_No'));
	$(".lang_yes").text(language('_Yes'));
	/* Main Endpoint Settings end */
	
	/* Advanced:Registration Option begin */
	$('#advanced_li').html(language('Advanced:Registration Options'));
	$('#lang_authentication_user').html(language('Authentication User'));
	$('#lang_authentication_user_help').html(language('Authentication User help','A username to use only for registration.'));
	$('#lang_register_extension').html(language('Register Extension'));
	$('#lang_register_extension_help').html(language('Register Extension help','When Gateway registers as a SIP user agent to a SIP proxy(provider), <br/>calls from this provider connect to this local extension.'));
	$(".lang_modify").text(language('Modify'));
	$('#lang_register_user').html(language('Register User'));
	$('#lang_register_user_help').html(language('Register User help','Register user name , <br/>it is the user of register => user[:secret[:authuser]]@host[:port][/extension].'));
	$('#lang_from_user').html(language('From User'));
	$('#lang_from_user_help').html(language('From User help','A username to identify the gateway to this endpoint.'));
	$('#lang_from_domain').html(language('From Domain'));
	$('#lang_from_domain_help').html(language('From Domain help','A domain to identify the gateway to this endpoint.'));
	$('#lang_port').html(language('Port'));
	$('#lang_port_help').html(language('Port help@sip-endpoints','The port number the gateway will connect to at this endpoint.'));
	$('#lang_qualify').html(language('Qualify'));
	$('#lang_qualify_help').html(language('Qualify help@sip-endpoints','Whether or not to check the endpoint\'s connection status.'));
	$('#lang_qualify_frequency').html(language('Qualify Frequency'));
	$('#lang_qualify_frequency_help').html(language('Qualify Frequency help','How often, in seconds, to check the endpoint\'s connection status.'));
	$('#lang_outbound_proxy').html(language('Outbound Proxy'));
	$('#lang_outbound_proxy_help').html(language('Outbound Proxy help','A proxy to which the gateway will send all outbound signaling instead of sending signaling directly to endpoints.'));
	$('#lang_custom_registery').html(language('Custom Registery'));
	$('#lang_custom_registery_help').html(language('Custom Registery help','Custom Registery On / Off.'));
	$('#lang_registery_string').html(language('Registery String'));
	$('#lang_registery_string_help').html(language('Registery String help','Context of registery. user[:secret[:authuser]]@host[:port][/extension] </br>eg: 1001@sip.com:pbx122@172.16.6.122/1001 </br>'));
	$('#lang_enable_to_host').html(language('Enable Outboundproxy to Host'));
	$('#lang_enable_to_host_help').html(language('Custom Registery help','Outboundproxy to Host On / Off.'));
	$('#lang_tlsverify').html(language('tlsverify'));
	$('#lang_tlsverify_help').html(language('tlsverify help','enable TLS verify or disable.'));
	$('#lang_tlssetup').html(language('tlssetup'));
	$('#lang_tlssetup_help').html(language('tlssetup help','Whether we are willing to accept connections, connect to the other party, or both.'));
	$('#lang_tlsprivatekey').html(language('tlsprivatekey'));
	$('#lang_tlsprivatekey_help').html(language('tlsprivatekey help','Private key file (*.pem format only) for TLS connections. If no tlsprivatekey is specified, tlscertfile is searched for both public and private key.'));
	$('#lang_encryption').html(language('encryption'));
	$('#lang_encryption_help').html(language('encryption help','Whether to offer SRTP encrypted media (and only SRTP encrypted media) on outgoing calls to a peer. Calls will fail with HANGUPCAUSE=58 if the peer does not support SRTP. Defaults to no.'));
	/* Advanced:Registration Option end */
	
	/* Call Settings begin */
	$("#call_settings_li").text(language('Call Settings'));
	$('#lang_dtmf_settings').html(language('DTMF Settings'));
	$('#lang_dtmf_mode').html(language('DTMF Mode'));
	$('#lang_dtmf_mode_help').html(language('DTMF Mode help','Set default dtmfmode for sending DTMF. Default:rfc2833. <br/>Other options: \'info\', SIP INFO message(application/dtmf-relay);<br/>\'inband\',Inband audio(require 64kbit codec -alaw,ulaw).'));
	$('#lang_rfc2833').html(language('RFC2833'));
	$('#lang_inband').html(language('Inband'));
	$('#lang_info').html(language('Info'));
	$('.lang_call_limit').html(language('Call Limit'));
	$('#lang_call_limit_help').html(language('Call Limit help','Setting a call-limit will cause calls above the limit not to be accepted.'));
	$('#lang_caller_id_settings').html(language('Caller ID Settings'));
	$('#lang_trust_id').html(language('Trust Remote-Party-ID'));
	$('#lang_trust_id_help').html(language('Trust Remote-Party-ID help','Whether or not the Remote-Party-ID header should be trusted.'));
	$('#lang_send_id').html(language('Send Remote-Party-ID'));
	$('#lang_send_id_help').html(language('Send Remote-Party-ID help','Whether or not to send the Remote-Party-ID header.'));
	$('#lang_rpid').html(language('Rpid'));
	$('#lang_pai').html(language('Pai'));
	$('#lang_remote_id').html(language('Remote Party ID Format'));
	$('#lang_remote_id_help').html(language('Remote Party ID Format help','How to set the Remote-Party-ID header: from Remote-Party-ID or from P-Asserted-Identity.'));
	$('#lang_p_asserted').html(language('P-Asserted-Identity Header'));
	$('#lang_remote_party').html(language('Remote-Party-ID Header'));
	$('#lang_caller_id_presentation').html(language('Caller ID Presentation'));
	$('#lang_caller_id_presentation_help').html(language('Caller ID Presentation help','Whether or not to display Caller ID.'));
	$('#lang_allowed_not_screen').html(language('Allowed,not screened'));
	$('#lang_allowed_passed_screen').html(language('Allowed,passed screen'));
	$('#lang_allowed_failed_screen').html(language('Allowed,failed screen'));
	$('#lang_allowed').html(language('Allowed'));
	$('#lang_prohib_not_screen').html(language('Prohibited,not screened'));
	$('#lang_prohib_passed_screen').html(language('Prohibited,passed screen'));
	$('#lang_failed_screen').html(language('Prohibited,failed screen'));
	$('#lang_prohib').html(language('Prohibited'));
	$('#lang_unavailable').html(language('Unavailable'));
	/* Call Settings end */
	
	/* Advanced:Signaling Settings begin */
	$("#advanced_signaling_li").text(language('Advanced:Signaling Settings'));
	$('#lang_progress_inband').html(language('Progress Inband'));
	$('#lang_progress_inband_help').html(language('Progress Inband help','If we should generate in-band ringing. <br/>Always use \'never\' to never use in-band signalling, even in cases where some buggy devices might not render it.<br/>Valid values: yes, no, never. <br/>Default: never.'));
	$('#lang_never').html(language('Never'));
	$('#lang_allow_overlap_dialing').html(language('Allow Overlap Dialing'));
	$('#lang_allow_overlap_dialing_help').html(language('Allow Overlap Dialing help','Allow Overlap Dialing: Whether or not to allow overlap dialing. <br/>Disabled by default.'));
	$('#lang_append_user').html(language('Append user'));
	$('#lang_phone_to_url').html(language('phone to URI'));
	$('#lang_phone_to_url_help').html(language('phone to URI help','Whether or not to add \';user=phone\' to URIs that contain a valid phone number.'));
	$('#lang_add_reason_header').html(language('Add Q.850 Reason Headers'));
	$('#lang_add_reason_header_help').html(language('Add Q.850 Reason Headers help','Whether or not to add Reason header and to use it if it is available.'));
	$('#lang_honor_sdp_version').html(language('Honor SDP Version'));
	$('#lang_honor_sdp_version_help').html(language('Honor SDP Version help','By default, the gateway will honor the session version number in SDP packets and will only modify the SDP session if the version number changes. <br/>Turn this option off to force the gateway to ignore the SDP session version number and treat all SDP data as new data. <br/>This is required for devices that send non-standard SDP packets (observed with Microsoft OCS). <br/>By default this option is on.'));
	$('#lang_allow_transfers').html(language('Allow Transfers'));
	$('#lang_allow_transfers_help').html(language('Allow Transfers help','Whether or not to globally enable transfers. <br/>Choosing \'no\' will disable all transfers (unless enabled in peers or users). <br/>Default is enabled.'));
	$('#lang_allow_promiscuous_redirects').html(language('Allow Promiscuous Redirects'));
	$('#lang_allow_promiscuous_redirects_help').html(language('Allow Promiscuous Redirects help','Whether or not to allow 302 or REDIR to non-local SIP address. <br/>Note that promiscredir when redirects are made to the local system will cause loops since this gateway is incapable of performing a hairpin call.'));
	$('#lang_max_forwards').html(language('Max Forwards'));
	$('#lang_max_forwards_help').html(language('Max Forwards help','Setting for the SIP Max-Forwards header (loop prevention).'));
	$('#lang_send_trying_on_register').html(language('Send TRYING on REGISTER'));
	$('#lang_send_trying_on_register_help').html(language('Send TRYING on REGISTER help','Send a 100 Trying when the endpoint registers.'));
	/* Advanced:Signaling Settings end */
	
	/* Advanced:Timer Settings begin */
	$("#advanced_timer").text(language('Advanced:Timer Settings'));
	$('#lang_default_t1_timer').html(language('Default T1 Timer'));
	$('#lang_default_t1_timer_help').html(language('Default T1 Timer help','This timer is used primarily in INVITE transactions. <br/>The default for Timer T1 is 500 ms or the measured run-trip time between the gateway and the device if you have qualify=yes for the device.'));
	$('#lang_call_setup_timer').html(language('Call Setup Timer'));
	$('#lang_call_setup_timer_help').html(language('Call Setup Timer help','If a provisional response is not received in this amount of time, the call will autocongest. <br/>Defaults to 64 times the default T1 timer.'));
	$('#lang_session_timers').html(language('Session Timers'));
	$('#lang_session_timers_help').html(language('Session Timers help','Session-Timers feature operates in the following three modes: originate, Request and run session-timers always;<br/>accept, Run session-timers only when requested by other UA; refuse, <br/>Do not run session timers in any case.'));
	$('#lang_accept').html(language('Accept'));
	$('#lang_originate').html(language('Originate'));
	$('#lang_refuse').html(language('Refuse'));
	$('#lang_minimun_session_refresh_interval').html(language('Minimum Session Refresh Interval'));
	$('#lang_minimun_session_refresh_interval_help').html(language('Minimum Session Refresh Interval help','Minimum session refresh interval in seconds. Defualts to 90 secs.'));
	$('#lang_maximun_session_refresh_interval').html(language('Maximum Session Refresh Interval'));
	$('#lang_maximun_session_refresh_interval_help').html(language('Maximum Session Refresh Interval help','Maximum session refresh interval in seconds. Defaults to 1800s.'));
	$('#lang_session_refresher').html(language('Session Refresher'));
	$('#lang_session_refresher_help').html(language('Session Refresher help','The session refresher, uac or uas. Defaults to uas.'));
	/* Advanced:Timer Settings end */
	
	/* show other info begin */
	$("#media_setting_span").text(language('Media Settings'));
	$("#media_setting_help_span").text(language('Media Settings help','Select codec from the drop down list. Codecs should be different for each Codec Priority.'));
	$("#save_to_other_sips_li").text(language('Save To Other Sips'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	/* show other info end */
	
	/* Save To Other Sips begin */
	$("#lang_save_to_other_sips").html(language('Save To Other Sips', 'Save To Other Sips'));
	$("#lang_save_to_other_sips_help").html(language('Save To Other Sips help','Saving sip param to other sips synchronously'));
	$("#lang_all").html(language('All'));
	$("#lang_sync_all_settings").html(language('Sync All Settings', 'Sync All Settings'));
	$("#lang_ag_sync_all_settings_help").html(language('AG Sync All Settings help','AG Sync All settings'));
	$("#lang_select_all_settings").html(language('Select all settings', 'Select all settings'));
	/* Save To Other Sips end */
}());

function parse_register(register){
	var ary = register.split("@");
	var reg = [];
	if(ary.length == 2){
		var part1 = ary[0];
		var part2 = ary[1];
		ary = part1.split("?");
		if(ary.length == 2){
			reg['peer'] = ary[0];
			var part22 = ary[1];
			ary = part22.split('://');
			if(ary.length == 2){
				reg['transport'] = ary[0];
				var part222 = ary[1];
				ary = part222.split(":");
				if(ary.length == 2){
					reg['user'] = ary[0];
					reg['secret'] = ary[1];
				}else if(ary.length == 3){
					reg['user'] = ary[0];
					reg['secret'] = ary[1];
					reg['authuser'] = ary[2];
				}else if(ary.length == 1){
					var reg_use = part222;
				}
			}else if(ary.length == 1){
				ary = part22.split(":");
				if(ary.length == 2){
					reg['user'] = ary[0];
					reg['secret'] = ary[1];
				}else if(ary.length == 3){
					reg['user'] = ary[0];
					reg['secret'] = ary[1];
					reg['authuser'] = ary[2];
				}else if(ary.length ==1){
					reg['user'] = part22;
				}
			}
		}else if(ary.length == 1){
			ary = part1.split("://");
			if(ary.length == 2){
				reg['transport'] = ary[0];
				var part22 = ary[1];
			}else if(ary.length == 1){
				ary = part1.split(":");
				if(ary.length == 2){
					reg['user'] = ary[0];
					reg['secret'] = ary[1];
				}else if(ary.length == 3){
					reg['user'] = ary[0];
					reg['secret'] = ary[1];
					reg['authuser'] = ary[2];
				}else if(ary.length == 1){
					reg['user'] = part1;
				}
			}
		}
		
		ary = part2.split(":");
		if(ary.length == 2){
			reg['host'] = ary[0];
			var part22 = ary[1];
			ary = part22.split("/");
			if(ary.length == 2){
				reg['port'] = ary[0];
				var part222 = ary[1];
				ary = part222.split("~");
				if(ary.length == 2){
					reg['extension'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['extension'] = part222;
				}
			}else if(ary.length == 1){
				ary = part22.split("~");
				if(ary.length == 2){
					reg['port'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['port'] = part22;
				}
			}
		}else if(ary.length == 1){
			ary = part2.split("/");
			if(ary.length == 2){
				reg['host'] = ary[0];
				part22 = ary[1];
				ary = part22.split("~");
				if(ary.length == 2){
					reg['extension'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['extension'] = part22;
				}
			}else if(ary.length == 1){
				ary = part2.split("~");
				if(ary.length == 2){
					reg['host'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['host'] = part2;
				}
			}
		}
	}else if(ary.length == 3){
		var part1 = ary[0];
		var part2 = ary[1];
		var part3 = ary[2];
		ary = part1.split("?");
		if(ary.length == 2){
			reg['peer'] = ary[0];
			part22 = ary[1];
			ary = part22.split("://");
			if(ary.length == 2){
				reg['transport'] = ary[0];
				reg['user'] = ary[1];
			}else if(ary.length == 1){
				reg['user'] = part22;
			}
		}else if(ary.length == 1){
			ary = part1.split("://");
			if(ary.length == 2){
				reg['transport'] = ary[0];
				reg['user'] = ary[1];
			}else if(ary.length == 1){
				reg['user'] = part1;
			}
		}
		
		ary = part2.split(":");
		if(ary.length == 3){
			reg['domain'] = ary[0];
			reg['secret'] = ary[1];
			reg['authuser'] = ary[2];
		}else if(ary.length == 2){
			reg['domain'] = ary[0];
			reg['secret'] = ary[1];
		}else if(ary.length == 1){
			reg['domain'] = part2;
		}
		
		ary = part3.split(":");
		if(ary.length == 2){
			reg['host'] = ary[0];
			var part22 = ary[1];
			ary = part22.split("/");
			if(ary.length == 2){
				reg['port'] = ary[0];
				var part222 = ary[1];
				ary = part222.split("~");
				if(ary.length == 2){
					reg['extension'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['extension'] = part222;
				}
			}else if(ary.length == 1){
				ary = part22.split("~");
				if(ary.length == 2){
					reg['port'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['port'] = part22;
				}
			}
		}else if(ary.length == 1){
			ary = part3.split("/");
			if(ary.length == 2){
				reg['host'] = ary[0];
				var part22 = ary[1];
				ary = part22.split("~");
				if(ary.length == 2){
					reg['extension'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['extension'] = part22;
				}
			}else if(ary.length == 1){
				ary = part3.split("~");
				if(ary.length == 2){
					reg['host'] = ary[0];
					reg['expiry'] = ary[1];
				}else if(ary.length == 1){
					reg['host'] = part3;
				}
			}
		}
	}
	
	return reg;
}

function Sip_Endpoints(){
	this.endpoint_name = '';
	this.sip_username = '';
	this.sip_password = '';
	this.registration = 'none';
	this.anonymous = 'no';
	this.order = '';
	this.sip_ip = '';
	this.transport = 'udp';
	this.nat = 'yes';
	this.mwi = 'no';
	this.vosencrypt = '0';
	this.authentication_user = '';
	this.register_extension = '';
	this.register_user = '';
	this.from_user = '';
	this.fromdomain = '';
	this.port = '';
	this.qualify = 'yes';
	this.qualifyfreq = '15';
	this.outboundproxy = '';
	this.outboundproxy_port = '5060';
	this.registery_enable = 'no';
	this.registery_string = '';
	this.tlsverify = 'yes';
	this.tlssetup = 'incoming_and_outcoming';
	this.tlsprivatekey = '';
	this.encryption = 'yes';
	this.dtmfmode = 'rfc2833';
	this.calllimit = '8';
	this.trustrpid = 'no';
	this.sendrpid = 'no';
	this.rpid_format = 'pass';
	this.callingpres = 'allowed_passed_screen';
	this.progressinband = 'never';
	this.allowoverlap = 'no';
	this.usereqphone = 'no';
	this.use_q850_reason = 'no';
	this.honorsdpversion = 'no';
	this.allowtransfer = 'yes';
	this.promiscredir = 'no';
	this.max_forwards = '70';
	this.registertrying = 'no';
	this.timert1 = '500';
	this.timerb = '32000';
	this.session_timers = 'accept';
	this.session_minse = '90';
	this.session_expires = '1800';
	this.session_refresher = 'uas';
	this.allow = 'ulaw,alaw,g729,g722,ilbc,g723';
	this.enableoutboundtohost = 'no';
}

function show_sip(sip_info, all_sip_info){
	var sip = new Sip_Endpoints();
	
	sip.endpoint_name = section;
	
	if(sip_info['_username'] != undefined){
		sip.sip_username = sip_info['_username'];
	}else{
		sip.sip_username = '';
	}
	
	if(sip_info['_allowanonymous'] == 1) { 
		var anonymous_check = true;
		sip.sip_username = '';
		sip.sip_password = '';
		var sip_username_disable = 'disabled';
	} else{
		var anonymous_check = false;
		var sip_username_disable = '';
	}
	
	if(sip_info['_secret'] != undefined){
		sip.sip_password = sip_info['_secret'];
	}else{
		sip.sip_password = '';
	}
	
	if(sip_info['_registration'] == 2){
		sip.registration = 'server';
	}else if(sip_info['_registration'] == 1){
		sip.registration = 'client';
	}else{
		sip.registration = 'none';
	}
	
	if(sip_info['_host'] != undefined){
		sip.sip_ip = sip_info['_host'];
	}else{
		sip.sip_ip = '';
	}
	
	if(sip_info['_transport'] == 2){
		sip.transport = 'tls';
	}else if(sip_info['_transport'] == 1){
		sip.transport = 'tcp';
	}else{
		sip.transport = 'udp';
	}
	
	if(sip_info['_nat'] == 3){
		sip.nat = 'comedia';
	}else if(sip_info['_nat'] == 1){
		sip.nat = 'force_rport';
	}else if(sip_info['_nat'] == 0){
		sip.nat = 'no';
	}else{
		sip.nat = 'yes';
	}
	
	if(sip_info['_mwi'] == 1){
		sip.mwi = 'yes';
	}else{
		sip.mwi = 'no';
	}
	
	if(sip_info['_vosencrypt'] == 2){
		sip.vosencrypt = sip_info['_vosencrypt'];
	}else{
		sip.vosencrypt = 0;
	}
	
	if(sip_info['_auth'] != undefined){
		sip.authentication_user = sip_info['_auth'];
	}else{
		sip.authentication_user = '';
	}
	
	if(sip_info['_registerextension'] != undefined){
		sip.register_extension = sip_info['_registerextension'];
	}else{
		sip.register_extension = '';
	}
	
	if(sip_info['_registeruser'] != undefined){
		sip.register_user = sip_info['_registeruser'];
	}else{
		sip.register_user = '';
	}
	
	if(sip_info['_fromuser'] != undefined){
		sip.from_user = sip_info['_fromuser'];
	}else{
		sip.from_user = '';
	}
	
	if(sip_info['_fromdomain'] != undefined){
		sip.fromdomain = sip_info['_fromdomain'];
	}else{
		sip.fromdomain = '';
	}
	
	if(sip_info['_port'] != 0 && sip_info['_port'] != undefined){
		sip.port = sip_info['_port'];
	}else{
		sip.port = '';
	}
	
	if(sip_info['_qualify'] == 0){
		sip.qualify = 'no';
	}else{
		sip.qualify = 'yes';
	}
	
	if(sip_info['_qualifyfreq'] != 0 && sip_info['_qualifyfreq'] != undefined){
		sip.qualifyfreq = sip_info['_qualifyfreq'];
	}else{
		if(_Define['system_type']=='yfree' || _Define['system_type']=='general'){
			sip.qualifyfreq = 60;
		}
	}
	
	if(sip_info['_outboundproxy'] != undefined){
		sip.outboundproxy = sip_info['_outboundproxy'];
	}else{
		sip.outboundproxy = '';
	}
	
	if(sip_info['_outboundproxyport'] != 0 && sip_info['_outboundproxyport'] != undefined){
		sip.outboundproxy_port = sip_info['_outboundproxyport'];
	}
	
	if(sip_info['_registeryenable'] == 1){
		sip.registery_enable = 'yes';
	}else{
		sip.registery_enable = 'no';
	}
	
	if(sip_info['_registerystring'] != undefined){
		sip.registery_string = sip_info['_registerystring'];
	}else{
		sip.registery_string = '';
	}
	
	if(sip_info['_enableoutboundtohost'] == 1){
		sip.enableoutboundtohost = 'yes';
	}else{
		sip.enableoutboundtohost = 'no';
	}
	
	if(sip_info['_tlsverify'] == 1){
		sip.tlsverify = 'yes';
	}else{
		sip.tlsverify = 'no';
	}
	
	if(sip_info['_tlssetup'] == 2){
		sip.tlssetup = 'outcoming';
	}else if(sip_info['_tlssetup'] == 1){
		sip.tlssetup = 'incoming';
	}else{
		sip.tlssetup = 'incoming_and_outcoming';
	}
	
	if(sip_info['_tlsprivatekey'] != '' && sip_info['_tlsprivatekey'] != undefined){
		temp = sip_info['_tlsprivatekey'].split('/');
		sip.tlsprivatekey = temp[4];
	}else{
		sip.tlsprivatekey = '';
	}
	
	if(sip_info['_encryption'] == 1){
		sip.encryption = 'yes';
	}else{
		sip.encryption = 'no';
	}
	
	if(sip_info['_dtmfmode'] == 2){
		sip.dtmfmode = 'info';
	}else if(sip_info['_dtmfmode'] == 1){
		sip.dtmfmode = 'inband';
	}else{
		sip.dtmfmode = 'rfc2833';
	}
	
	if(sip_info['_calllimit'] != 0 && sip_info['_calllimit'] != undefined){
		sip.calllimit = sip_info['_calllimit'];
	}
	
	if(sip_info['_trustrpid'] == 1){
		sip.trustrpid = 'yes';
	}else{
		sip.trustrpid = 'no';
	}
	
	if(sip_info['_sendrpid'] == 3){
		sip.sendrpid = 'pai';
	}else if(sip_info['_sendrpid'] == 2){
		sip.sendrpid = 'rpid';
	}else if(sip_info['_sendrpid'] == 1){
		sip.sendrpid = 'yes';
	}else{
		sip.sendrpid = 'no';
	}
	
	if(sip_info['_rpidformat'] == 1){
		sip.rpid_format = 'rpid';
	}else{
		sip.rpid_format = 'pass';
	}
	
	if(sip_info['_callingpres'] == 8){
		sip.callingpres = 'unavailable';
	}else if(sip_info['_callingpres'] == 7){
		sip.callingpres = 'prohib';
	}else if(sip_info['_callingpres'] == 6){
		sip.callingpres = 'prohib_failed_screen';
	}else if(sip_info['_callingpres'] == 5){
		sip.callingpres = 'prohib_passed_screen';
	}else if(sip_info['_callingpres'] == 4){
		sip.callingpres = 'prohib_not_screen';
	}else if(sip_info['_callingpres'] == 3){
		sip.callingpres = 'allowed';
	}else if(sip_info['_callingpres'] == 2){
		sip.callingpres = 'allowed_failed_screen';
	}else if(sip_info['_callingpres'] == 1){
		sip.callingpres = 'allowed_passed_screen';
	}else{
		sip.callingpres = 'allowed_not_screen';
	}
	
	if(sip_info['_progressinband'] == 2){
		sip.progressinband = 'no';
	}else if(sip_info['_progressinband'] == 1){
		sip.progressinband = 'yes';
	}else{
		sip.progressinband = 'never';
	}
	
	if(sip_info['_allowoverlap'] == 1){
		sip.allowoverlap = 'yes';
	}else{
		sip.allowoverlap = 'no';
	}
	
	if(sip_info['_usereqphone'] == 1){
		sip.usereqphone = 'yes';
	}else{
		sip.usereqphone = 'no';
	}

	if(sip_info['_useq850reason'] == 1){
		sip.use_q850_reason = 'yes';
	}else{
		sip.use_q850_reason = 'no';
	}

	if(sip_info['_honorsdpversion'] == 0){
		sip.honorsdpversion = 'no';
	}else{
		sip.honorsdpversion = 'yes';
	}

	if(sip_info['_allowtransfer'] == 0){
		sip.allowtransfer = 'no';
	}else{
		sip.allowtransfer = 'yes';
	}

	if(sip_info['_promiscredir'] == 1){
		sip.promiscredir = 'yes';
	}else{
		sip.promiscredir = 'no';
	}
	
	if(sip_info['_maxforwards'] != undefined){
		sip.max_forwards = sip_info['_maxforwards'];
	}
	
	if(sip_info['_registertrying'] == 1){
		sip.registertrying = 'yes';
	}else{
		sip.registertrying = 'no';
	}
	
	if(sip_info['_timert1'] != 0 && sip_info['_timert1'] != undefined){
		sip.timert1 = sip_info['_timert1'];
	}
	
	if(sip_info['_timerb'] != 0 && sip_info['_timerb'] != undefined){
		sip.timerb = sip_info['_timerb'];
	}
	
	if(sip_info['_sessiontimers'] == 2){
		sip.session_timers = 'refuse';
	}else if(sip_info['_sessiontimers'] == 1){
		sip.session_timers = 'originate';
	}else{
		sip.session_timers = 'accept';
	}
	
	if(sip_info['_sessionminse'] != 0 && sip_info['_sessionminse'] != undefined){
		sip.session_minse = sip_info['_sessionminse'];
	}
	
	if(sip_info['_sessionexpires'] != 0 && sip_info['_sessionexpires']){
		sip.session_expires = sip_info['_sessionexpires'];
	}
	
	if(sip_info['_sessionrefresher'] == 0){
		sip.session_refresher = 'uac';
	}else{
		sip.session_refresher = 'uas';
	}
	
	if(sip_info['_allow'] != undefined){
		sip.allow = sip_info['_allow'];
	}
	
	if(sip_info['_order'] != undefined){
		if(sip_info['_order'] != 0){
			sip.order = sip_info['_order'];//edit
		}else{
			var url = get_url_para();
			if(url['order'] != undefined){
				sip.order = url['order'];//new 
			}
		}
	}else{
		var url = get_url_para();
		if(url['order'] != undefined){
			sip.order = url['order'];
		}
	}
	
	$("#lps").prepend(
		'<input type="hidden" id="order" name="order" value="'+sip.order+'" />'+
		'<input type="hidden" id="old_section" name="old_section" value="'+section+'" />'
	);
	
	/* Main Endpoint Settings begin */ //Done
	//value
	document.getElementById('endpoint_name').value = sip.endpoint_name;
	document.getElementById('sip_username').value = sip.sip_username;
	document.getElementById('sip_password').value = sip.sip_password;
	document.getElementById('sip_ip').value = sip.sip_ip;
	
	//disabled
	document.getElementById('sip_username').disabled = sip_username_disable;
	document.getElementById('sip_password').disabled = sip_username_disable;
	
	//checked
	document.getElementById('anonymous').checked = anonymous_check;
	
	//selectd
	document.getElementById('registration').value = sip.registration;
	document.getElementById('transport').value = sip.transport;
	document.getElementById('nat').value = sip.nat;
	document.getElementById('mwi').value = sip.mwi;
	document.getElementById('vosencrypt').value = sip.vosencrypt;
	/* Main Endpoint Settings end */
	
	/* Advanced:Registration Option begin */
	var _registery_enable_checked = false;
	if(sip.registery_enable=='yes'){_registery_enable_checked = true;}
	
	var enableoutboundtohost_checked = false;
	if(sip.enableoutboundtohost == 'yes'){enableoutboundtohost_checked = true;}
	
	//value
	document.getElementById('authentication_user').value = sip.authentication_user;
	document.getElementById('register_extension').value = sip.register_extension;
	document.getElementById('register_user').value = sip.register_user;
	document.getElementById('from_user').value = sip.from_user;
	document.getElementById('from_domain').value = sip.fromdomain;
	document.getElementById('port').value = sip.port;
	document.getElementById('qualifyfreq').value = sip.qualifyfreq;
	document.getElementById('outboundproxy').value = sip.outboundproxy;
	document.getElementById('outboundproxy_port').value = sip.outboundproxy_port;
	document.getElementById('registery_string').value = sip.registery_string;
	document.getElementById('tlsprivatekey').value = sip.tlsprivatekey;
	
	//checked
	document.getElementById('registery_enable').checked = _registery_enable_checked;
	document.getElementById('enableoutboundtohost').checked = enableoutboundtohost_checked;
	
	//selected 
	document.getElementById('qualify').value = sip.qualify;
	document.getElementById('tlsverify').value = sip.tlsverify;
	document.getElementById('tlssetup').value = sip.tlssetup;
	document.getElementById('encryption').value = sip.encryption;
	/* Advanced:Registration Option end */
	
	/* Call Settings begin */
	//value
	document.getElementById('calllimit').value = sip.calllimit;
	
	//selected
	document.getElementById('dtmfmode').value = sip.dtmfmode;
	document.getElementById('trustrpid').value = sip.trustrpid;
	document.getElementById('sendrpid').value = sip.sendrpid;
	document.getElementById('rpid_format').value = sip.rpid_format;
	document.getElementById('callingpres').value = sip.callingpres;
	/* Call Settings end */
	
	/* Advanced:Signaling Settings begin */
	//value 
	document.getElementById('max_forwards').value = sip.max_forwards;
	
	//selected
	document.getElementById('progressinband').value = sip.progressinband;
	document.getElementById('allowoverlap').value = sip.allowoverlap;
	document.getElementById('usereqphone').value = sip.usereqphone;
	document.getElementById('use_q850_reason').value = sip.use_q850_reason;
	document.getElementById('honor_sdp_version').value = sip.honorsdpversion;
	document.getElementById('allowtransfer').value = sip.allowtransfer;
	document.getElementById('promiscredir').value = sip.promiscredir;
	document.getElementById('send_trying_on_register').value = sip.registertrying;
	/* Advanced:Signaling Settings end */
	
	/* Advanced:Timer Settings begin */
	//value
	document.getElementById('timert1').value = sip.timert1;
	document.getElementById('timerb').value = sip.timerb;
	document.getElementById('session-minse').value = sip.session_minse;
	document.getElementById('session-expires').value = sip.session_expires;
	
	//selected
	document.getElementById('session_timers').value = sip.session_timers;
	document.getElementById('session_refresher').value = sip.session_refresher;
	/* Advanced:Timer Settings end */
	
	/* Media Settings begin */
	var ulaw_selected = [];
	var alaw_selected = [];
	var g729_selected = [];
	var g722_selected = [];
	// var g723_selected = [];
	var ilbc_selected = [];
	if(sip_info['_allow'] != undefined){
		var allow_temp = sip.allow.split('');
		for(var i=0;i<=allow_temp.length;i++){
			if(allow_temp[i]==1){
				ulaw_selected[i+1] = 'selected';
			}else{
				ulaw_selected[i+1] = '';
			}
			if(allow_temp[i]==2){
				alaw_selected[i+1] = 'selected';
			}else{
				alaw_selected[i+1] = '';
			}
			if(allow_temp[i]==3){
				g729_selected[i+1] = 'selected';
			}else{
				g729_selected[i+1] = '';
			}
			if(allow_temp[i]==4){
				g722_selected[i+1] = 'selected';
			}else{
				g722_selected[i+1] = '';
			}
			// if(allow_temp[i]==5){
				// g723_selected[i+1] = 'selected';
			// }else{
				// g723_selected[i+1] = '';
			// }
			if(allow_temp[i]==6){
				ilbc_selected[i+1] = 'selected';
			}else{
				ilbc_selected[i+1] = '';
			}
		}
	}else{
		ulaw_selected[1] = 'selected';
		alaw_selected[2] = 'selected';
		g729_selected[3] = 'selected';
		g722_selected[4] = 'selected';
		ilbc_selected[5] = 'selected';
		// g723_selected[6] = 'selected';
	}
	for(var i=1;i<=5;i++){
		$("#tab_media_set table").append(
			'<tr><th>'+language('Codec Priority')+' '+i+':</th><td>'+
			'<input type="checkbox" class="setting_sync" id="sip_codec_priority'+i+'_sync" name="sip_codec_priority'+i+'_sync" title="'+language('Synchronization option')+'"/>'+
			'<select size=1 id="sip_codec_priority'+i+'" name="sip_codec_priority'+i+'" >'+
			'<option value="0"    >Not Used</option>'+
			'<option value="ulaw" '+(ulaw_selected[i])+' >G.711 u-law</option>'+
			'<option value="alaw" '+(alaw_selected[i])+' >G.711 a-law</option>'+
			'<option value="g729" '+(g729_selected[i])+' >G.729</option>'+
			'<option value="g722" '+(g722_selected[i])+' >G.722</option>'+
			// '<option value="g723" '+(g723_selected[i])+' >G.723</option>'+
			'<option value="ilbc" '+(ilbc_selected[i])+' >ILBC</option>'+
		  '</select></td></tr>'
		);		
	}
	/* Media Settings end */
	
	/* Save To Other Sips begin */
	var _port_str = '<tr>';
	var i=0;
	for(var all_temp in all_sip_info){
		var backup = all_sip_info[all_temp]['_section'].substr(all_sip_info[all_temp]['_section'].length-6,6);
		if(backup == 'backup'){continue;}
		if((i+1)%4!=1 || (i+1)==1){
			if(all_sip_info[all_temp]['_section']==sip.endpoint_name){
				_port_str += '<td>'+
								'<input type="checkbox" checked disabled>SIP-'+all_sip_info[all_temp]['_section']+
							'</td>';
			}else{
				_port_str += '<td>'+
								'<input type="checkbox" class="port" name="spans['+(i+1)+']" value="'+all_sip_info[all_temp]['_section']+'">SIP-'+all_sip_info[all_temp]['_section']+
							'</td>';
			}
		}
		if((i+1)%4==1 && (i+1)!=1){
			if(all_sip_info[all_temp]['_section']==sip.endpoint_name){
				_port_str += '</tr><tr><td>'+
									'<input type="checkbox" checked disabled>SIP-'+all_sip_info[all_temp]['_section']+
								'</td>';
			}else{
				_port_str += '</tr><tr><td>'+
									'<input type="checkbox" class="port" name="spans['+(i+1)+']" value="'+all_sip_info[all_temp]['_section']+'">SIP-'+all_sip_info[all_temp]['_section']+
								'</td>';
			}
		}
		i++; 
	}
	_port_str += '</tr>';
	
	$(".port_table").prepend(_port_str);
	/* Save To Other Sips end */
	
	/* other info */
	if(section != ''){
		$("#edit_h4").text(language("Edit SIP Endpoint") + ' "'+sip.endpoint_name+'" ');
	}else{
		$("#edit_h4").text(language("Add New SIP Endpoint"));
	}
	
	//nrtc delete tls
	if(_Define['system_type'] == 'nrtc'){
		$("#transport").find("option[value='tls']").hide();
	}
	
	/* sidebar begin */
	var sidebar_html = '';
	var item_color = '';
	for(var item in all_sip_info){
		if(section == all_sip_info[item]['_section']){
			item_color = 'color:#CD3278;';
		}else{
			item_color = 'color:LemonChiffon4;';
		}
		
		sidebar_html += '<li><a style="'+item_color+'" href="sip-endpoints-edit.html?name='+all_sip_info[item]['_section']+'&edit=edit" >SIP-'+all_sip_info[item]['_section']+'</a></li>';
	}
	$("#sort_info").html(sidebar_html);
	/* sidebar end */
}

var url = get_url_para();
var section = url['name'];
if(section == undefined){section = '';}
var edit = url['edit'];

if(section != ''){
	object.AGSipEndpointGetOne(succeed_back, error_back, section);
}else{
	object.AGSipEndpointsNewGet(new_succeed_back, new_error_back);
}
	
function succeed_back(data){
	var combuf = data['_get']['_combuf'];
	var sip_info = data['_get']['_context'];
	var all_sip_info = data['_get']['_siparr']['_item'];
	
	header(combuf);
	show_sip(sip_info, all_sip_info);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(edit == 'edit'){
			if(check(all_sip_info, section)){
				if(save_only_once()){
					$("#loading_image").show();
					save_endpoint(all_sip_info);
				}
			}
		}
	});
}

function new_succeed_back(data){
	var combuf = data['_get']['_combuf'];
	var sip_info = [];
	var all_sip_info = data['_get']['_siparr']['_item'];
	sip_info['_calllimit'] = data['_get']['_context']['_calllimit'];
	
	header(combuf);
	show_sip(sip_info, all_sip_info);
	footer();
	
	onload_show();
	registration_change_for_qualify();
	
	$(".save_input").click(function(){
		if(edit == 'new'){
			if(check(all_sip_info)){
				if(save_only_once()){
					$("#loading_image").show();
					save_endpoint(all_sip_info);
				}
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
function new_error_back(data){
	window.location.href = 'error.html';
}
/******************************SHOW ENDPOINTS END************************************/


/******************************SAVE ENDPOINTS BEGIN************************************/
function save_endpoint(all_sip_info){
	var section = document.getElementById('endpoint_name').value;
	var old_section = document.getElementById('old_section').value;
	if(old_section == ''){
		old_section = section;
	}
	
	/* sipcontext begin */
	var sipcontext = new AST_SipContext();
	
	if(document.getElementById('sip_username').disabled == false){
		var username = document.getElementById('sip_username').value;
	}else{
		var username = 'anonymous';
	}
	sipcontext._username = username;
	
	anonymous_checked = document.getElementById('anonymous').checked;
	if(anonymous_checked){
		var anonymous = 1;
	}else{
		var anonymous = 0;
	}
	sipcontext._allowanonymous = anonymous;
	
	var secret = document.getElementById('sip_password').value;
	sipcontext._secret = secret;
	
	var registration_val = document.getElementById('registration').value;
	if(registration_val == 'none'){
		var registration = 0;
	}else if(registration_val == 'client'){
		var registration = 1;
	}else if(registration_val == 'server'){
		var registration = 2;
	}
	sipcontext._registration = registration;
	
	if(document.getElementById('sip_ip').value != ''){
		var host = document.getElementById('sip_ip').value;
	}else{
		var host = '';
	}
	sipcontext._host = host;
	
	if(document.getElementById('sip_ip2').value != ''){
		var backup = document.getElementById('sip_ip2').value;
	}else{
		var backup = '';
	}
	sipcontext._backup = backup;
	
	var transport_val = document.getElementById('transport').value;
	if(transport_val == 'udp'){
		var transport = 0;
	}else if(transport_val == 'tcp'){
		var transport = 1;
	}else if(transport_val == 'tls'){
		var transport = 2;
	}
	sipcontext._transport = transport;
	
	var nat_val = document.getElementById('nat').value;
	if(nat_val == 'no'){
		var nat = 0;
	}else if(nat_val == 'force_rport'){
		var nat = 1;
	}else if(nat_val == 'yes'){
		var nat = 2;
	}else if(nat_val == 'comedia'){
		var nat = 3;
	}
	sipcontext._nat = nat;
	
	if(document.getElementById('mwi').disabled != true){
		var mwi_val = document.getElementById('mwi').value;
		if(mwi_val == 'no'){
			var mwi = 0;
		}else if(mwi_val == 'yes'){
			var mwi = 1;
		}
	}else{
		var mwi = 0;
	}
	sipcontext._mwi = mwi;
	
	var vosencrypt = parseInt(document.getElementById('vosencrypt').value);
	sipcontext._vosencrypt = vosencrypt;
	
	if(document.getElementById('authentication_user').value != '' && document.getElementById('authentication_user').disabled != true){
		var auth = document.getElementById('authentication_user').value;
	}else{
		var auth = '';
	}
	sipcontext._auth = auth;
	
	if(document.getElementById('register_extension').value != '' && document.getElementById('register_extension').disabled != true){
		var register_extension = document.getElementById('register_extension').value;
	}else{
		var register_extension = '';
	}
	sipcontext._registerextension = register_extension;
	
	if(document.getElementById('register_user').value != '' || document.getElementById('register_user_sync').checked == true){
		var register_user = document.getElementById('register_user').value;
	}else{
		var register_user = '';
	}
	sipcontext._registeruser = register_user;
	
	if(document.getElementById('from_user').value != '' || document.getElementById('fromuser_sync').checked == true){
		var from_user = document.getElementById('from_user').value;
	}else{
		var from_user = '';
	}
	sipcontext._fromuser = from_user;
	
	if(document.getElementById('from_domain').value != '' || document.getElementById('fromdomain_sync').checked == true){
		var fromdomain = document.getElementById('from_domain').value;
	}else{
		var fromdomain = '';
	}
	sipcontext._fromdomain = fromdomain;
	
	if(document.getElementById('port').value != '' || document.getElementById('port_sync').checked == true){
		var port = document.getElementById('port').value;
	}else{
		var port = 0;
	}
	if(port == ''){
		port = 0;
	}
	sipcontext._port = port;
	
	var qualify_val = document.getElementById('qualify').value;
	if(qualify_val == 'no'){
		var qualify = 0;
	}else if(qualify_val == 'yes'){
		var qualify = 1;
	}
	sipcontext._qualify = qualify;
	
	if(document.getElementById('qualifyfreq').value != '' || document.getElementById('qualifyfreq_sync').checked == true){
		var qualifyfreq = document.getElementById('qualifyfreq').value;
	}else{
		var qualifyfreq = 0;
	}
	sipcontext._qualifyfreq = qualifyfreq;
	
	var outboundproxy = document.getElementById('outboundproxy').value;
	sipcontext._outboundproxy = outboundproxy;
	
	if(document.getElementById('outboundproxy_port').value != ''){
		var outboundproxy_port = document.getElementById('outboundproxy_port').value;
	}else{
		var outboundproxy_port = 0;
	}
	sipcontext._outboundproxyport = outboundproxy_port;
	
	if(document.getElementById('registery_enable').checked == true && document.getElementById('register_user').value != ''){
		var registery_enable = 1;
	}else{
		var registery_enable = 0;
	}
	sipcontext._registeryenable = registery_enable;
	
	if(registery_enable == 1){
		if(document.getElementById('registery_string').value != ''){
			var registery_string = document.getElementById('registery_string').value;
		}else{
			var registery_string = '';
		}
	}else{
		var registery_string = '';
	}
	sipcontext._registerystring = registery_string;
	
	if(document.getElementById('enableoutboundtohost').checked == true){
		var enableoutboundtohost = 1;
	}else{
		var enableoutboundtohost = 0;
	}
	sipcontext._enableoutboundtohost = enableoutboundtohost;
	
	if(transport == 2){
		var tlsenable = 1;
		sipcontext._tlsenable = tlsenable;
		
		var tlsverify_val = document.getElementById('tlsverify').value;
		if(tlsverify_val == 'no'){
			var tlsverify = 0;
		}else if(tlsverify_val == 'yes'){
			var tlsverify = 1;
		}
		sipcontext._tlsverify = tlsverify;
		
		var tlssetup_val = document.getElementById('tlssetup').value;
		if(tlssetup_val == 'incoming_and_outcoming'){
			var tlssetup = 0;
		}else if(tlssetup_val == 'incoming'){
			var tlssetup = 1;
		}else if(tlssetup_val == 'outcoming'){
			var tlssetup = 2;
		}
		sipcontext._tlssetup = tlssetup;
		
		if(document.getElementById('tlsprivatekey').value != ''){
			var tlsprivatekey_temp = document.getElementById('tlsprivatekey').value;
			var tlsprivatekey = '/etc/asterisk/keys/'+tlsprivatekey_temp;
		}else{
			var tlsprivatekey = '';
		}
		sipcontext._tlsprivatekey = tlsprivatekey;
		
		var encryption_val = document.getElementById('encryption').value;
		if(encryption_val == 'no'){
			var encryption = 0;
		}else if(encryption_val == 'yes'){
			var encryption = 1;
		}
		sipcontext._encryption = encryption;
	}else{
		sipcontext._tlsenable = 0;
		sipcontext._tlsverify = 0;
		sipcontext._tlssetup = 0;
		sipcontext._tlsprivatekey = '';
		sipcontext._encryption = 0;
	}
	
	var dtmfmode_val = document.getElementById('dtmfmode').value;
	if(dtmfmode_val == 'rfc2833'){
		var dtmfmode = 0;
	}else if(dtmfmode_val == 'inband'){
		var dtmfmode = 1;
	}else if(dtmfmode_val == 'info'){
		var dtmfmode = 2;
	}
	sipcontext._dtmfmode = dtmfmode;
	
	if(document.getElementById('calllimit').value != '' || document.getElementById('call-limit_sync').checked == true){
		var calllimit = document.getElementById('calllimit').value;
	}else{
		var calllimit = 0;
	}
	sipcontext._calllimit = calllimit;
	
	var trustrpid_val = document.getElementById('trustrpid').value;
	if(trustrpid_val == 'no'){
		var trustrpid = 0;
	}else if(trustrpid_val == 'yes'){
		var trustrpid = 1;
	}
	sipcontext._trustrpid = trustrpid;
	
	var sendrpid_val = document.getElementById('sendrpid').value;
	if(sendrpid_val == 'no'){
		var sendrpid = 0;
	}else if(sendrpid_val == 'yes'){
		var sendrpid = 1;
	}else if(sendrpid_val == 'rpid'){
		var sendrpid = 2;
	}else if(sendrpid_val == 'pai'){
		var sendrpid = 3;
	}
	sipcontext._sendrpid = sendrpid;
	
	var rpid_format_val = document.getElementById('rpid_format').value;
	if(rpid_format_val == 'pass'){
		var rpid_format = 0;
	}else if(rpid_format_val == 'rpid'){
		var rpid_format = 1;
	}
	sipcontext._rpidformat = rpid_format;
	
	var callingpres_val = document.getElementById('callingpres').value;
	if(callingpres_val == 'allowed_not_screen'){
		var callingpres = 0;
	}else if(callingpres_val == 'allowed_passed_screen'){
		var callingpres = 1;
	}else if(callingpres_val == 'allowed_failed_screen'){
		var callingpres = 2;
	}else if(callingpres_val == 'allowed'){
		var callingpres = 3;
	}else if(callingpres_val == 'prohib_not_screen'){
		var callingpres = 4;
	}else if(callingpres_val == 'prohib_passed_screen'){
		var callingpres = 5;
	}else if(callingpres_val == 'prohib_failed_screen'){
		var callingpres = 6;
	}else if(callingpres_val == 'prohib'){
		var callingpres = 7;
	}else if(callingpres_val == 'unavailable'){
		var callingpres = 8;
	}
	sipcontext._callingpres = callingpres;
	
	var progressinband_val = document.getElementById('progressinband').value;
	if(progressinband_val == 'never'){
		var progressinband = 0;
	}else if(progressinband_val == 'yes'){
		var progressinband = 1;
	}else if(progressinband_val == 'no'){
		var progressinband = 2;
	}
	sipcontext._progressinband = progressinband;
	
	var allowoverlap_val = document.getElementById('allowoverlap').value;
	if(allowoverlap_val == 'no'){
		var allowoverlap = 0;
	}else if(allowoverlap_val == 'yes'){
		var allowoverlap = 1;
	}
	sipcontext._allowoverlap = allowoverlap;
	
	var usereqphone_val = document.getElementById('usereqphone').value;
	if(usereqphone_val == 'no'){
		var usereqphone = 0;
	}else if(usereqphone_val == 'yes'){
		var usereqphone = 1;
	}
	sipcontext._usereqphone = usereqphone;
	
	var use_q850_reason_val = document.getElementById('use_q850_reason').value;
	if(use_q850_reason_val == 'no'){
		var use_q850_reason = 0;
	}else if(use_q850_reason_val == 'yes'){
		var use_q850_reason = 1;
	}
	sipcontext._useq850reason = use_q850_reason;
	
	var honorsdpversion_val = document.getElementById('honor_sdp_version').value;
	if(honorsdpversion_val == 'no'){
		var honorsdpversion = 0;
	}else if(honorsdpversion_val == 'yes'){
		var honorsdpversion = 1;
	}
	sipcontext._honorsdpversion = honorsdpversion;
	
	var allowtransfer_val = document.getElementById('allowtransfer').value;
	if(allowtransfer_val == 'no'){
		var allowtransfer = 0;
	}else if(allowtransfer_val == 'yes'){
		var allowtransfer = 1;
	}
	sipcontext._allowtransfer = allowtransfer;
	
	var promiscredir_val = document.getElementById('promiscredir').value;
	if(promiscredir_val == 'no'){
		var promiscredir = 0;
	}else if(promiscredir_val == 'yes'){
		var promiscredir = 1;
	}
	sipcontext._promiscredir = promiscredir;
	
	if(document.getElementById('max_forwards').value != '' || document.getElementById('max_forwards_sync').checked == true){
		var max_forwards = document.getElementById('max_forwards').value;
	}else{
		var max_forwards = 0;
	}
	sipcontext._maxforwards = max_forwards;
	
	var registertrying_val = document.getElementById('send_trying_on_register').value;
	if(registertrying_val == 'no'){
		var registertrying = 0;
	}else if(registertrying_val == 'yes'){
		var registertrying = 1;
	}
	sipcontext._registertrying = registertrying;
	
	if(document.getElementById('timert1').value != '' || document.getElementById('timert1_sync').checked == true){
		var timert1 = document.getElementById('timert1').value;
	}else{
		var timert1 = 0;
	}
	sipcontext._timert1 = timert1;
	
	if(document.getElementById('timerb').value != '' || document.getElementById('timerb_sync').checked == true){
		var timerb = document.getElementById('timerb').value;
	}else{
		var timerb = 0;
	}
	sipcontext._timerb = timerb;
	
	var session_timers_val = document.getElementById('session_timers').value;
	if(session_timers_val == 'accept'){
		var session_timers = 0;
	}else if(session_timers_val == 'originate'){
		var session_timers = 1;
	}else if(session_timers_val == 'refuse'){
		var session_timers = 2;
	}
	sipcontext._sessiontimers = session_timers;
	
	if(document.getElementById('session-minse').value != '' || document.getElementById('session-minse_sync').checked == true){
		var session_minse = document.getElementById('session-minse').value;
	}else{
		var session_minse = 0;
	}
	sipcontext._sessionminse = session_minse;	
	
	if(document.getElementById('session-expires').value != '' || document.getElementById('session-expires_sync').checked == true){
		var session_expires = document.getElementById('session-expires').value;
	}else{
		var session_expires = 0;
	}
	sipcontext._sessionexpires = session_expires;
	
	var session_refresher_val = document.getElementById('session_refresher').value;
	if(session_refresher_val == 'uas'){
		var session_refresher = 1;
	}else if(session_refresher_val == 'uac'){
		var session_refresher = 0;
	}
	sipcontext._sessionrefresher = session_refresher;
	
	var allow = '';
	for(var i=1;i<=5;i++){
		var name = 'sip_codec_priority'+i;
		var allow_temp = document.getElementById(name).value;
		if(allow_temp == 0){
			continue;
		}else if(allow_temp == 'ulaw'){
			allow += '1';
		}else if(allow_temp == 'alaw'){
			allow += '2';
		}else if(allow_temp == 'g729'){
			allow += '3';
		}else if(allow_temp == 'g722'){
			allow += '4';
		// }else if(allow_temp == 'g723'){
			// allow += '5';
		}else if(allow_temp == 'ilbc'){
			allow += '6';
		}
	}
	sipcontext._allow = allow;
	
	var order = document.getElementById('order').value;
	sipcontext._order = order;
	
	sipcontext._md5 = md5(username+'-'+secret);
	/* sipcontext end */
	
	/* save to other sip begin */
	var sync;
	var other_sip = '';
	$(".port").each(function(){
		var port_checked = $(this).attr('checked');
		if(port_checked == 'checked'){
			sync = 1;
			return false;
		}else{
			sync = 0;
		}
	});
	
	var setting_sync;
	$(".setting_sync").each(function(){
		var setting_checked = $(this).attr('checked');
		if(setting_checked == 'checked'){
			setting_sync = 1;
			return false;
		}else{
			setting_sync = 0;
		}
	});
	
	var LineArr = new AST_LineArr();
	var SectionArr = new AST_SectionArr();
	if(sync && setting_sync){
		$(".port").each(function(){
			if($(this).attr('checked') == 'checked'){
				/* section begin */
				var each_sip_section = $(this).val();
				var ast_section = new AST_Section();
				ast_section._section = each_sip_section;
				SectionArr._item.push(ast_section);
				/* section end */
			}
		});
		
		/* parameter begin */
		if(document.getElementById('registration_sync').checked == true){
			var line_registration = new AST_Line();
			line_registration._key = 'registration';
			if(registration == 0){
				line_registration._value = 'none';
			}else if(registration == 1){
				// var line_host = new AST_Line();
				// line_host._key = 'host';
				// line_host._value = 'dynamic';
				// LineArr._item.push(line_host);
				line_registration._value = 'client';
			}else if(registration == 2){
				line_registration._value = 'server';
			}
			LineArr._item.push(line_registration);
		}
		
		if(document.getElementById('host_sync').checked == true){
			var line_host = new AST_Line();
			line_host._key = 'host';
			line_host._value = host;
			LineArr._item.push(line_host);
		}
		
		if(document.getElementById('transport_sync').checked == true){
			var line_transport = new AST_Line();
			line_transport._key = 'transport';
			if(transport == 0){
				line_transport._value = 'udp';
			}else if(transport == 1){
				line_transport._value = 'tcp';
			}else if(transport == 2){
				line_transport._value = 'tls';
			}
			LineArr._item.push(line_transport);
		}
		
		if(document.getElementById('nat_sync').checked == true){
			var line_nat = new AST_Line();
			line_nat._key = 'nat';
			if(nat == 0){
				line_nat._value = 'no';
			}else if(nat == 1){
				line_nat._value = 'force_rport';
			}else if(nat == 2){
				line_nat._value = 'yes';
			}else if(nat == 3){
				line_nat._value = 'comedia';
			}
			LineArr._item.push(line_nat);
		}
		
		if(document.getElementById('vosencrypt_sync').checked == true){
			var line_vosencrypt = new AST_Line();
			line_vosencrypt._key = 'vosencrypt';
			line_vosencrypt._value = vosencrypt;
			LineArr._item.push(line_vosencrypt);
		}
		
		if(document.getElementById('register_user_sync').checked == true){
			var line_registeruser = new AST_Line();
			line_registeruser._key = 'register_user';
			line_registeruser._value = register_user;
			LineArr._item.push(line_registeruser);
		}
		
		if(document.getElementById('enableoutboundtohost_sync').checked == true){
			var line_enableoutboundtohost = new AST_Line();
			line_enableoutboundtohost._key = 'enableoutboundtohost';
			if(enableoutboundtohost == 0){
				line_enableoutboundtohost._value = 'no';
			}else if(enableoutboundtohost == 1){
				line_enableoutboundtohost._value = 'yes';
			}
			LineArr._item.push(line_enableoutboundtohost);
		}
		
		if(document.getElementById('fromuser_sync').checked == true){
			var line_fromuser = new AST_Line();
			line_fromuser._key = 'fromuser';
			line_fromuser._value = from_user;
			LineArr._item.push(line_fromuser);
		}
		
		if(document.getElementById('fromdomain_sync').checked == true){
			var line_fromdomain = new AST_Line();
			line_fromdomain._key = 'fromdomain';
			line_fromdomain._value = fromdomain;
			LineArr._item.push(line_fromdomain);
		}
		
		if(document.getElementById('port_sync').checked == true){
			if(port == 0){
				port = "";
			}
			
			var line_port = new AST_Line();
			line_port._key = 'port';
			line_port._value = port;
			LineArr._item.push(line_port);
		}
		
		if(document.getElementById('qualify_sync').checked == true){
			var line_qualify = new AST_Line();
			line_qualify._key = 'qualify';
			if(qualify == 0){
				line_qualify._value = 'no';
			}else if(qualify == 1){
				line_qualify._value = 'yes';
			}
			LineArr._item.push(line_qualify);
		}
		
		if(document.getElementById('qualifyfreq_sync').checked == true){
			var line_qualifyfreq = new AST_Line();
			line_qualifyfreq._key = 'qualifyfreq';
			line_qualifyfreq._value = qualifyfreq;
			LineArr._item.push(line_qualifyfreq);
		}
		
		if(document.getElementById('outboundproxy_sync').checked == true){
			if(outboundproxy != '' && outboundproxy_port != ''){
				var line_outboundproxy = new AST_Line();
				line_outboundproxy._key = 'outboundproxy';
				line_outboundproxy._value = outboundproxy+':'+outboundproxy_port;
				LineArr._item.push(line_outboundproxy);
			}else if(outboundproxy != ''){
				var line_outboundproxy = new AST_Line();
				line_outboundproxy._key = 'outboundproxy';
				line_outboundproxy._value = outboundproxy+':5060';
				LineArr._item.push(line_outboundproxy);
			}else{
				var line_outboundproxy = new AST_Line();
				line_outboundproxy._key = 'outboundproxy';
				line_outboundproxy._value = '';
				LineArr._item.push(line_outboundproxy);
			}
		}
		
		if(transport == 2){
			if(document.getElementById('tlsverify_sync').checked == true && $('#tls_dtlsverify').css('display') != 'none' ||
				document.getElementById('tlssetup_sync').checked == true && $('#tls_dtlssetup').css('display') != 'none' ||
				document.getElementById('tlsprivatekey_sync').checked == true && $('#tls_dtlsprivatekey').css('display') != 'none' || 
				document.getElementById('encryption_sync').checked == true && $('#tls_encryption').css('display') != 'none'
			){
				var line_tlsenble = new AST_Line();
				line_tlsenble._key = 'tlsenable';
				if(tlsenable == 1){
					line_tlsenble._value = 'yes';
				}else{
					line_tlsenble._value = 'no';
				}
				LineArr._item.push(line_tlsenble);
			}
			
			if(document.getElementById('tlsverify_sync').checked == true && $('#tls_dtlsverify').css('display') != 'none'){
				var line_tlsverify = new AST_Line();
				line_tlsverify._key = 'tlsverify';
				if(tlsverify == 0){
					line_tlsverify._value = 'no';
				}else if(tlsverify == 1){
					line_tlsverify._value = 'yes';
				}
				LineArr._item.push(line_tlsverify);
			}
			
			if(document.getElementById('tlssetup_sync').checked == true && $('#tls_dtlssetup').css('display') != 'none'){
				var line_tlssetup = new AST_Line();
				line_tlssetup._key = 'tlssetup';
				if(tlssetup == 0){
					line_tlssetup._value = 'incoming_and_outcoming';
				}else if(tlssetup == 1){
					line_tlssetup._value = 'incoming'
				}else if(tlssetup == 2){
					line_tlssetup._value = 'outcoming'
				}
				LineArr._item.push(line_tlssetup);
			}
			
			if(document.getElementById('tlsprivatekey_sync').checked == true && $('#tls_dtlsprivatekey').css('display') != 'none'){
				var line_tlsprivatekey = new AST_Line();
				line_tlsprivatekey._key = 'tlsprivatekey';
				line_tlsprivatekey._value = tlsprivatekey;
				LineArr._item.push(line_tlsprivatekey);
			}
			
			if(document.getElementById('encryption_sync').checked == true && $('#tls_encryption').css('display') != 'none'){
				var line_encryption = new AST_Line();
				line_encryption._key  = 'encryption';
				if(encryption == 0){
					line_encryption._value = 'no';
				}else if(encryption == 1){
					line_encryption._value = 'yes';
				}
				LineArr._item.push(line_encryption);
			}
		}
		
		if(document.getElementById('dtmfmode_sync').checked == true){
			var line_dtmfmode = new AST_Line();
			line_dtmfmode._key = 'dtmfmode';
			if(dtmfmode == 0){
				line_dtmfmode._value = 'rfc2833';
			}else if(dtmfmode == 1){
				line_dtmfmode._value = 'inband';
			}else if(dtmfmode == 2){
				line_dtmfmode._value = 'info';
			}
			LineArr._item.push(line_dtmfmode);
		}
		
		if(document.getElementById('call-limit_sync').checked == true){
			var line_calllimit = new AST_Line();
			line_calllimit._key = 'call-limit';
			line_calllimit._value = calllimit;
			LineArr._item.push(line_calllimit);
		}
		
		if(document.getElementById('trustrpid_sync').checked == true){
			var line_trustrpid = new AST_Line();
			line_trustrpid._key = 'trustrpid';
			if(trustrpid == 0){
				line_trustrpid._value = 'no';
			}else if(trustrpid == 1){
				line_trustrpid._value = 'yes';
			}
			LineArr._item.push(line_trustrpid);
		}
		
		if(document.getElementById('sendrpid_sync').checked == true){
			var line_sendrpid = new AST_Line();
			line_sendrpid._key = 'sendrpid';
			if(sendrpid == 0){
				line_sendrpid._value = 'no';
			}else if(sendrpid == 1){
				line_sendrpid._value = 'yes';
			}else if(sendrpid == 2){
				line_sendrpid._value = 'rpid';
			}else if(sendrpid == 3){
				line_sendrpid._value = 'pai';
			}
			LineArr._item.push(line_sendrpid);
		}
		
		if(document.getElementById('rpid_format_sync').checked == true){
			var line_rpid_format = new AST_Line();
			line_rpid_format._key = 'rpid_format';
			if(rpid_format == 0){
				line_rpid_format._value = 'pass';
			}else if(rpid_format == 1){
				line_rpid_format._value = 'rpid';
			}
			LineArr._item.push(line_rpid_format);
		}
		
		if(document.getElementById('callingpres_sync').checked == true){
			var line_callingpres = new AST_Line();
			line_callingpres._key = 'callingpres';
			if(callingpres == 0){
				line_callingpres._value = 'allowed_not_screen';
			}else if(callingpres == 1){
				line_callingpres._value = 'allowed_passed_screen';
			}else if(callingpres == 2){
				line_callingpres._value = 'allowed_failed_screen';
			}else if(callingpres == 3){
				line_callingpres._value = 'allowed';
			}else if(callingpres == 4){
				line_callingpres._value = 'prohib_not_screen';
			}else if(callingpres == 5){
				line_callingpres._value = 'prohib_passed_screen';
			}else if(callingpres == 6){
				line_callingpres._value = 'prohib_failed_screen';
			}else if(callingpres == 7){
				line_callingpres._value = 'prohib';
			}else if(callingpres == 8){
				line_callingpres._value = 'unavailable';
			}
			LineArr._item.push(line_callingpres);
		}
		
		if(document.getElementById('progressinband_sync').checked == true){
			var line_progressinband = new AST_Line();
			line_progressinband._key = 'progressinband';
			if(progressinband == 0){
				line_progressinband._value = 'never';
			}else if(progressinband == 1){
				line_progressinband._value = 'yes';
			}else if(progressinband == 2){
				line_progressinband._value = 'no';
			}
			LineArr._item.push(line_progressinband);
		}
		
		if(document.getElementById('allowoverlap_sync').checked == true){
			var line_allowoverlap = new AST_Line();
			line_allowoverlap._key = 'allowoverlap';
			if(allowoverlap == 0){
				line_allowoverlap._value = 'no';
			}else if(allowoverlap == 1){
				line_allowoverlap._value = 'yes';
			}
			LineArr._item.push(line_allowoverlap);
		}
		
		if(document.getElementById('usereqphone_sync').checked == true){
			var line_usereqphone = new AST_Line();
			line_usereqphone._key = 'usereqphone';
			if(usereqphone == 0){
				line_usereqphone._value = 'no';
			}else if(usereqphone == 1){
				line_usereqphone._value = 'yes';
			}
			LineArr._item.push(line_usereqphone);
		}
		
		if(document.getElementById('use_q850_reason_sync').checked == true){
			var line_use_q850_reason = new AST_Line();
			line_use_q850_reason._key = 'use_q850_reason';
			if(use_q850_reason == 0){
				line_use_q850_reason._value = 'no';
			}else if(use_q850_reason == 1){
				line_use_q850_reason._value = 'yes';
			}
			LineArr._item.push(line_use_q850_reason);
		}
		
		if(document.getElementById('honorsdpversion_sync').checked == true){
			var line_honorsdpversion = new AST_Line();
			line_honorsdpversion._key = 'honorsdpversion';
			if(honorsdpversion == 0){
				line_honorsdpversion._value = 'no';
			}else if(honorsdpversion == 1){
				line_honorsdpversion._value = 'yes';
			}
			LineArr._item.push(line_honorsdpversion);
		}
		
		if(document.getElementById('allowtransfer_sync').checked == true){
			var line_allowtransfer = new AST_Line();
			line_allowtransfer._key = 'allowtransfer';
			if(allowtransfer == 0){
				line_allowtransfer._value = 'no';
			}else if(allowtransfer == 1){
				line_allowtransfer._value = 'yes';
			}
			LineArr._item.push(line_allowtransfer);
		}
		
		if(document.getElementById('promiscredir_sync').checked == true){
			var line_promiscredir = new AST_Line();
			line_promiscredir._key = 'promiscredir';
			if(promiscredir == 0){
				line_promiscredir._value = 'no';
			}else if(promiscredir == 1){
				line_promiscredir._value = 'yes';
			}
			LineArr._item.push(line_promiscredir);
		}
		
		if(document.getElementById('max_forwards_sync').checked == true){
			var line_max_forwards = new AST_Line();
			line_max_forwards._key = 'max_forwards';
			line_max_forwards._value = max_forwards;
			LineArr._item.push(line_max_forwards);
		}
		
		if(document.getElementById('registertrying_sync').checked == true){
			var line_registertrying = new AST_Line();
			line_registertrying._key = 'registertrying';
			if(registertrying == 0){
				line_registertrying._value = 'no';
			}else if(registertrying == 1){
				line_registertrying._value = 'yes';
			}
			LineArr._item.push(line_registertrying);
		}
		
		if(document.getElementById('timert1_sync').checked == true){
			var line_timert1 = new AST_Line();
			line_timert1._key = 'timert1';
			line_timert1._value = timert1;
			LineArr._item.push(line_timert1);
		}
		
		if(document.getElementById('timerb_sync').checked == true){
			var line_timerb = new AST_Line();
			line_timerb._key = 'timerb';
			line_timerb._value = timerb;
			LineArr._item.push(line_timerb);
		}
		
		if(document.getElementById('session-timers_sync').checked == true){
			var line_session_timers = new AST_Line();
			line_session_timers._key = 'session-timers';
			if(session_timers == 0){
				line_session_timers._value = 'accept';
			}else if(session_timers == 1){
				line_session_timers._value = 'originate';
			}else if(session_timers == 2){
				line_session_timers._value = 'refuse';
			}
			LineArr._item.push(line_session_timers);
		}
		
		if(document.getElementById('session-minse_sync').checked == true){
			var line_session_minse = new AST_Line();
			line_session_minse._key = 'session-minse';
			line_session_minse._value = session_minse;
			LineArr._item.push(line_session_minse);
		}
		
		if(document.getElementById('session-expires_sync').checked == true){
			var line_session_expires = new AST_Line();
			line_session_expires._key = 'session-expires';
			line_session_expires._value = session_expires;
			LineArr._item.push(line_session_expires);
		}
		
		if(document.getElementById('session-refresher_sync').checked == true){
			var line_session_refresher = new AST_Line();
			line_session_refresher._key = 'session-refresher';
			if(session_refresher == 0){
				line_session_refresher._value = 'uac';
			}else if(session_refresher == 1){
				line_session_refresher._value = 'uas';
			}
			LineArr._item.push(line_session_refresher);
		}
		
		if(document.getElementById('sip_codec_priority1_sync').checked == true){
			var line_allow = new AST_Line();
			line_allow._key = 'allow';
			var allow_val = '';
			for(var i=1;i<=5;i++){
				var val = document.getElementById('sip_codec_priority'+i).value;
				if(val != 0){
					allow_val += val+',';
				}
			}
			allow_val=allow_val.substring(0,allow_val.length-1);
			line_allow._value = allow_val;
			LineArr._item.push(line_allow);
		}
		
		if(document.getElementById('mwi_sync').checked == true){
			var line_mwi = new AST_Line();
			line_mwi._key = 'mwi';
			if(mwi == 1){
				var mwi_val = 'yes';
			}else{
				var mwi_val = 'no';
			}
			line_mwi._value = mwi_val;
			LineArr._item.push(line_mwi);
		}
		
		// if(document.getElementById('sip_ip2_sync').checked == true){
			// var line_backup = new AST_Line();
			// line_backup._key = 'backup';
			// line_backup._value = backup;
			// LineArr._item.push(line_backup);
		// }
		/* parameter end */
	}

	object.AGSipEndpointSave(save_succeed_back, save_error_back, old_section, section, sipcontext, LineArr, SectionArr);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		if(edit == 'new'){
			window.location.href = 'sip-endpoints.html?new=true';
		}else{
			window.location.href = 'sip-endpoints.html?save=true';
		}
	}
}
function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/******************************SAVE ENDPOINTS END************************************/