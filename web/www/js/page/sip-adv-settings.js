function enable_tcp_change()
{
	var value = document.getElementById('enable_tcp').value == 'yes' ? false : true;
	
	document.getElementById('tcp_bind_port').disabled = value;
	document.getElementById('tcp_authentication_timeout').disabled = value;
	document.getElementById('tcp_authentication_limit').disabled = value;
}

function onload_show()
{
	$("#stun_enable").iButton();
	enable_tcp_change();
}

function check(){
	if(string_filter_tip()){
		return false;
	}
	
	if(limit_string_length()){
		return false;
	}
	
	if(string_filter_tip_run('port_stun')){
		return false;
	}
	var port_stun = parseInt(document.getElementById('port_stun').value);
	if(port_stun < 1 || port_stun > 65535){
		$("#cport_stun").html(con_str('Range: 1-65535'));
		document.getElementById('port_stun').focus();
		return false;
	}
	
	if(string_filter_tip_run('reflesh')){
		return false;
	}
	var reflesh = parseInt(document.getElementById('reflesh').value);
	if(reflesh < 1 || reflesh > 5000){
		$("#creflesh").html(con_str('Range: 1-5000'));
		document.getElementById('reflesh').focus();
		return false;
	}
	
	var server = document.getElementById('server').value;
	if(server.length > 64){
		$("#cserver").html(con_str('Server length less than 64'));
		document.getElementById('server').focus();
		return false;
	}
	
	return true;
}

function string_filter_tip(){ // tip for user that wrong value
	if(string_filter_tip_run('udp_bind_port')){
		return true;
	}
	
	if(string_filter_tip_run('tcp_bind_port')){
		return true;
	}
	
	if(string_filter_tip_run('tcp_authentication_timeout')){
		return true;
	}
	
	if(string_filter_tip_run('tcp_authentication_limit')){
		return true;
	}
	
	if(string_filter_tip_run('externally_mapped_tcp_port')){
		return true;
	}
	
	if(string_filter_tip_run('start_of_rtp_port_range')){
		return true;
	}
	
	if(string_filter_tip_run('end_of_rtp_port_range')){
		return true;
	}
	
	if(string_filter_tip_run('rtptimeout')){
		return true;
	}
	
	if(string_filter_tip_run('maximum_registration_expiry')){
		return true;
	}
	
	if(string_filter_tip_run('minimum_registration_expiry')){
		return true;
	}
	
	if(string_filter_tip_run('default_registration_expiry')){
		return true;
	}
	
	if(string_filter_tip_run('registration_timeout')){
		return true;
	}
	
	if(string_filter_tip_run('number_of_registration_attemptsy')){
		return true;
	}
	
	return false;
}

function limit_string_length(){
	if(check_string_length('external_address')){
		return true;
	}
	
	if(check_string_length('external_hostname')){
		return true;
	}
	
	if(check_string_length('hostname_refresh_interval')){
		return true;
	}
	
	if(check_string_length('sdp_owner')){
		return true;
	}
	
	if(check_string_length('realm')){
		return true;
	}
	
	if(check_string_length('tos_for_sip_packets')){
		return true;
	}
	
	if(check_string_length('tos_for_rtp_packets')){
		return true;
	}
	
	return false;
}
/**********************************************************************************/

function addRow()
{
	var value = document.getElementById('local_network').value;
	if(value == "")
		return;

	var newTr = tab_lnl.insertRow(-1);

	var newTd0 = newTr.insertCell(0);
	var newTd1 = newTr.insertCell(0);

	var str = '<button type="button" name="send" value="Delete" style="width:32px;height:32px;" onclick=\'if(confirm("Are you sure to delete you selected ?"))javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\'><img src="/images/delete.gif"></button>';
	str += '<input type="hidden" class="local_network_list" name="local_network_list[]" value="' + value + '" />';

	newTd0.innerHTML = str;
	newTd1.innerHTML = value;
}

$("#callee_id_1").change(function(){
	if($(this).val()=='EXTEN'){
		$("#callee_id_2").hide();
	}else{
		$("#callee_id_2").show();
	}
});
/**********************************************************************************/


/******************************SHOW SIP ADV SETTINGS BEGIN***************************/
(function(){
	/* Networking General begin */
	$(".lang_general").html(language('General'));
	$("#lang_udp_bind_port").html(language('UDP Bind Port'));
	$("#lang_udp_bind_port_help").html(language('UDP Bind Port help','Choose a port on which to listen for UDP traffic.'));
	$("#lang_enable_tcp").html(language('Enable TCP'));
	$("#lang_enable_tcp_help").html(language('Enable TCP help','Enable server for incoming TCP connection(default is no).'));
	$(".lang_no").html(language('_No'));
	$(".lang_yes").html(language('_Yes'));
	$("#lang_tcp_bing_port").html(language('TCP Bind Port'));
	$("#lang_tcp_bing_port_help").html(language('TCP Bind Port help','Choose a port on which to listen for TCP traffic.'));
	$("#lang_tcp_authentication_timeout").html(language('TCP Authentication Timeout'));
	$("#lang_tcp_authentication_timeout_help").html(language('TCP Authentication Timeout help','The maximum number of seconds a client has to authenticate.<br/>If the client does not authenticate before this timeout expires,<br/>the client will be disconnected.(default value is: 30 seconds)'));
	$("#lang_tcp_authentication_limit").html(language('TCP Authentication Limit'));
	$("#lang_tcp_authentication_limit_help").html(language('TCP Authentication Limit help','The maiximum number of unauthenticated sessions that will be<br/> allowed to connect at any given time.(default is:50)'));
	$("#lang_enable_hostname_lookup").html(language('Enable Hostname Lookup'));
	$("#lang_enable_hostname_lookup_help").html(language('Enable Hostname Lookup help','Enable DNS SRV lookups on outbound calls Note: the gateway only<br/> uses the first host in SRV records Disabling DNS SRV lookups disables<br/>the ability to place SIP calls based on domain names to some other SIP<br/>users on the Internet Sepcifying a port in a SIP peer definition or when<br/>dialing outbound calls with supress SRV lookups for that peer or call.'));
	/* Networking General end */
	
	/* Networking NAT Settings begin */
	$("#lang_nat_settings").html(language('NAT Settings'));
	$("#lang_local_network").html(language('Local Network'));
	$("#lang_local_network_help").html(language('Local Network help','Format:192.168.0.0/255.255.0.0 or 172.16.0.0./12<br/>A list of IP address or IP ranges which are located inside a NATed network.<br/> This gateway will replace the internal IP address in SIP and SDP messages with<br/> the extenal IP address when a NAT exists between the gateway and other endpoings.'));
	$("#lang_local_network_list").html(language('Local Network List'));
	$("#lang_local_network_list_help").html(language('Local Network List help','Local IP address list that you added.'));
	$("#lang_ip_range").html(language('IP Range'));
	$("#lang_action").html(language('Action'));
	$("#lang_subscribe_network_change_event").html(language('Subscribe Network Change Event'));
	$("#lang_subscribe_network_change_event_help").html(language('Subscribe Network Change Event help','Through the use of the test_stun_monitor module, the gateway has the ability to detect when<br/>the perceived external network address has changed. When the stun_monitor is installed and <br/>configured, chan_sip will renew all outbound registrations when the monitor detects any sort<br/>of network change has occurred. By default this option is enabled, but only takes effect once<br/>res_stun_monitor is configured. If res_stun_monitor is enabled and you wish to not generate all<br/>outbound registrations on a network change,use the option below to disable this feature.'));
	$("#lang_match_external_address_locally").html(language('Match External Address Locally'));
	$("#lang_match_external_address_locally_help").html(language('Match External Address Locally help','Only substitute the externaddr or externhost setting if it matches.'));
	$("#lang_dynamic_exclude_static").html(language('Dynamic Exclude Static'));
	$("#lang_dynamic_exclude_static_help").html(language('Dynamic Exclude Static help','Disallow all dynamic hosts from registering as any IP address<br/> used for staticly defined hosts. This helps avoid the configuration<br/>error of allowing your users to register at the same address as a SIP provider.'));
	$("#lang_externally_mapped_tcp_port").html(language('Externally Mapped TCP Port'));
	$("#lang_externally_mapped_tcp_port_help").html(language('Externally Mapped TCP Port help','The externally mapped TCP port, when the gateway is behind a static NAT or PAT.'));
	$("#lang_external_address").html(language('External Address'));
	$("#lang_external_address_help").html(language('External Address help','The external address (and optional TCP port) of the NAT.<br>External Address = hostname[:port] specifies a static address[:port] to be used in SIP and SDP messages.Examples: <br>External Address = 12.34.56.78 <br>External Address = 12.34.56.78:9900 <br>'));
	$("#lang_external_hostname").html(language('External Hostname'));
	$("#lang_external_hostname_help").html(language('External Hostname help','The external hostname (and optional TCP port) of the NAT.<br>External Hostname = hostname[:port] is similar to "External Address". Examples: <br>External Hostname = foo.dyndns.net <br>'));
	$("#lang_hostname_refresh_internal").html(language('Hostname Refresh Interval'));
	$("#lang_hostname_refresh_internal_help").html(language('Hostname Refresh Interval help','How often to perform a hostname lookup. This can be useful when your NAT device<br/>lets you choose the port mapping, but the IP address is dynamic. Beware, you might<br/>suffer from service disruption when the name server resolution fails.'));
	/* Networking NAT Settings end */
	
	/* Networking STUN Settings end */
	$("#lang_stun_settings").html(language('STUN Settings'));
	$("#lang_enable_stun").html(language('Enable'));
	$("#lang_enable_stun_help").html(language('Enable help','Enable'));
	$("#lang_port_stun").html(language('Server Port'));
	$("#lang_port_stun_help").html(language('Server Port help','Server Port'));
	$("#lang_reflesh").html(language('Reflesh Request Interval'));
	$("#lang_reflesh_help").html(language('Reflesh Request Interval help','Reflesh Request Interval'));
	$("#lang_server").html(language('Server IP Adress/Domain Name'));
	$("#lang_server_help").html(language('Server IP Adress/Domain Name help','Server IP Adress/Domain Name'));
	$(".lang_server").html('Server');
	$(".lang_client").html('Client');
	$(".lang_none").html('None');
	/* Networking STUN Settings end */
	
	/* Networking RTP Settings begin */
	$("#lang_rtp_settings").html(language('RTP Settings'));
	$("#lang_start_of_rtp_port_range").html(language('Start of RTP Port Range'));
	$("#lang_start_of_rtp_port_range_help").html(language('Start of RTP Port Range help','Start of range of port numbers to be used for RTP.'));
	$("#lang_end_of_rtp_port_range").html(language('End of RTP port Range'));
	$("#lang_end_of_rtp_port_range_help").html(language('End of RTP port Range help','End of range of port numbers to be used for RTP'));
	$("#lang_rtp_timeout").html(language('RTP Timeout'));
	$("#lang_rtp_timeout_help").html(language('RTP Timeout help','RTP Timeout'));
	/* Networking RTP Settings end */
	
	/* Parsing and Compatibility General begin */
	$("#lang_strict_rfc_interpretation").html(language('Strict RFC Interpretation'));
	$("#lang_strict_rfc_interpretation_help").html(language('Strict RFC Interpretation help','Check header tags, character conversion in URIs, and multiline headers<br/>for strict SIP compatibility(default is yes)'));
	$("#lang_send_compact_headers").html(language('Send Compact Headers'));
	$("#lang_send_compact_headers_help").html(language('Send Compact Headers help','Send compact SIP headers.'));
	$("#lang_sdp_owner").html(language('SDP Owner'));
	$("#lang_sdp_owner_help").html(language('SDP Owner help','Allows you to change the username filed in the SDP owner string,（o=）.<br/>This filed MUST NOT contain spaces.'));
	$("#lang_matching_priority").html(language('Matching Priority'));
	$("#lang_matching_priority_help").html(language('Matching Priority'));
	$("#lang_from_number").html(language('From-Number'));
	$("#lang_extern_number").html(language('Extern-Number'));
	/* Parsing and Compatibility General end */
	
	/* Parsing and Compatibility SIP Methods begin */
	$("#lang_sip_methods").html(language('SIP Methods'));
	$("#lang_disallowed_sip_methods").html(language('Disallowed SIP Methods'));
	$("#lang_disallowed_sip_methods_help").html(language('Disallowed SIP Methods help','When a dialog is started with another SIP endpoint, the other endpoint<br/>should include an Allow header telling us what SIP methods the endpoint<br/>implements. However, some endpoints either do not include an Allow header<br/>or lie about what methods they implement.In the former case, the gateway<br/>makes the assumption that the endpoint supports all known SIP methods. If<br/>you know that your SIP endpoint does not provide support for a specific method,<br/>then you may provide a list of methods that your endpoint does not implement in the<br/>disallowed_methods option. Note that if your endpoint is truthful with its Allow header,<br/>then there is no need to set this option.'));
	$("#lang_ack").html(language('ACK'));
	$("#lang_bye").html(language('BYE'));
	$("#lang_cancel").html(language('CANCEL'));
	$("#lang_info").html(language('INFO'));
	$("#lang_invite").html(language('INVITE'));
	$("#lang_message").html(language('MESSAGE'));
	$("#lang_notify").html(language('NOTIFY'));
	$("#lang_options").html(language('OPTIONS'));
	$("#lang_prack").html(language('PRACK'));
	$("#lang_publish").html(language('PUBLISH'));
	$("#lang_refer").html(language('REFER'));
	$("#lang_register").html(language('REGISTER'));
	$("#lang_subscribe").html(language('SUBSCRIBE'));
	$("#lang_update").html(language('UPDATE'));
	$("#lang_hangup_cause_code").html(language('Hangup Cause Code'));
	$("#lang_hangup_cause_code_help").html(language('Hangup Cause Code help','Hangup Cause Code'));
	$("#lang_default").html(language('default'));
	$("#lang_404").html(language('404 Not Found'));
	$("#lang_420").html(language('420 No Route Destination'));
	$("#lang_486").html(language('486 Busy Here'));
	$("#lang_408").html(language('408 Request Timeout'));
	$("#lang_480").html(language('480 Temporarily Unavailable'));
	$("#lang_403").html(language('403 Forbidden'));
	$("#lang_410").html(language('410 Gone'));
	$("#lang_502").html(language('502 Bad Gateway'));
	$("#lang_484").html(language('484 Address Incomplete'));
	$("#lang_501").html(language('501 Not Implemented'));
	$("#lang_500").html(language('500 Server Internal Failure'));
	$("#lang_503").html(language('503 Service Unavailable'));
	$("#lang_488").html(language('488 Not Acceptable Here'));
	$("#lang_603").html(language('603 Declined'));
	/* Parsing and Compatibility SIP Methods end */
	
	/* Parsing and Compatibility Caller ID begin */
	$("#lang_caller_id").html(language('Caller ID'));
	$("#lang_shrink_caller_id").html(language('Shrink Caller ID'));
	$("#lang_shrink_caller_id_help").html(language('Shrink Caller ID help',"The shrinkcallerid function removes '(', ' ', ')', non-trailing '.',<br/>and '-' not in square brackets. For example,the caller id value 555.5555<br/>becomes 5555555 when this option is enabled. Disabling this option results<br/>in no modification of the caller id value,which is necessary when the caller<br/> id represents something that must be preserved. By default this option is on."));
	$("#lang_sip_from").html(language('SIP From'));
	$("#lang_sip_from_help").html(language('SIP From help','SIP From'));
	/* Parsing and Compatibility Caller ID end */
	
	/* Parsing and Compatibility Callee ID begin */
	$(".lang_callee_id").html(language('Callee ID'));
	$("#lang_sip_to").html(language('SIP To'));
	$("#lang_sip_to_help").html(language('SIP To help',"Callee ID transfer."));
	$("#lang_callee_id_help").html(language('Callee ID help',"defalut: EXTEN<br/>eg: When selecting SIP To, Name is Jason and Number is 401.<br/>To mode is: \"Jason\"&lt;sip:401@172.16.6.239;transport=UDP&gt;"));
	/* Parsing and Compatibility Callee ID begin */
	
	/* Parsing and Compatibility Timer Configuration begin */
	$("#lang_timer_configuration").html(language('Timer Configuration'));
	$("#lang_maximum_registration_expiry").html(language('Maximum Registration Expiry'));
	$("#lang_maximum_registration_expiry_help").html(language('Maximum Registration Expiry help','Maximum allowed time of incoming registrations and subscriptions (seconds)'));
	$("#lang_minimum_registration_expiry").html(language('Minimum Registration Expiry'));
	$("#lang_minimum_registration_expiry_help").html(language('Minimum Registration Expiry help','Minimum length of registrations/subscriptions (default 60)'));
	$("#lang_default_registration_expiry").html(language('Default Registration Expiry'));
	$("#lang_default_registration_expiry_help").html(language('Default Registration Expiry help','Default length of incoming/outgoing registration'));
	/* Parsing and Compatibility Timer Configuration begin */
	
	/* Parsing and Compatibility Outbound Registrations begin */
	$("#lang_outbound_registrations").html(language(language('Outbound Registrations')));
	$("#lang_registration_timeout").html(language('Registration Timeout'));
	$("#lang_registration_timeout_help").html(language('Registration Timeout help','How often, in seconds, to retry registration calls. Default 20 seconds.'));
	$("#lang_number_of_registration_attempts").html(language('Number of Registration Attempts'));
	$("#lang_number_of_registration_attempts_help").html(language('Number of Registration Attempts help','Number of registration attempts before we give up. 0 = continue forever,<br/> hammering the other server until it accepts the registration. Default is 0 tries,<br/> continue forever'));
	/* Parsing and Compatibility Outbound Registrations end */
	
	/* Security Authentication Settings begin */
	$("#lang_authentication_settings").html(language('Authentication Settings'));
	$("#lang_match_auth_username").html(language('Match Auth Username'));
	$("#lang_match_auth_username_help").html(language('Match Auth Username help',"If available, match user entry using the 'username' field from the<br/> authentication line instead of the 'from' field."));
	$("#lang_realm").html(language('Realm'));
	$("#lang_realm_help").html(language('Realm help','Realm for digest authentication. Realms MUST be globally unique according<br/>to RFC 3261. Set this to your host name or domain name.'));
	$("#lang_use_domain_as_realm").html(language('Use Domain as Realm'));
	$("#lang_use_domain_as_realm_help").html(language('Use Domain as Realm help',"Use the domain from the SIP Domains setting as the realm.<br/>In this case, the realm will be based on the request 'to' or 'from'<br/> header and should match one of the domain. Otherwise, the configured 'realm'<br/> value will be used."));
	$("#lang_always_auth_reject").html(language('Always Auth Reject'));
	$("#lang_always_auth_reject_help").html(language('Always Auth Reject help',"When an incoming INVITE or REGISTER is to be rejected, <br/>for any reason, always reject with an identical response equivalent<br/> to valid username and invalid password/hash instead of letting the requester<br/> know whether there was a matching user or peer for their request. This reduces<br/>the ability of an attacker to scan for valid SIP usernames. This option is set<br/>to 'yes' by default."));
	$("#lang_authenticate_options_requests").html(language('Authenticate Options Requests'));
	$("#lang_authenticate_options_requests_help").html(language('Authenticate Options Requests help','Enabling this option will authenticate OPTIONS requests just<br/>like INVITE requests are. By default this option is disabled.'));
	/* Security Authentication Settings end */
	
	/* Security Guest Calling begin */
	$("#lang_guest_calling").html(language('Guest Calling'));
	$("#lang_allow_guest_calling").html(language('Allow Guest Calling'));
	$("#lang_allow_guest_calling_help").html(language('Allow Guest Calling help','Allow or reject guest calls (default is yes, to allow). If your gateway<br/> is connected to the Internet and you allow guest calls, you want to check<br/>which services you offer everyone out there, by enabling them in the default context.'));
	/* Security Guest Calling end */
	
	/* Media ISDN Media Settings begin */
	$("#lang_isdn_media_settings").html(language('ISDN Media Settings'));
	$("#lang_premature_media").html(language('Premature Media'));
	$("#lang_premature_media_help").html(language('Premature Media help',"Some ISDN links send empty media frames before the call is in ringing<br/> or progress state. The SIP channel will then send 183 indicating early<br/>media which will be empty - thus users get no ring signal. Setting this to<br/>\"yes\" will stop any media before we have call progress (meaning the SIP channel<br/>will not send 183 Session Progress for early media). Default is 'yes'. Also make<br/> sure that the SIP peer is configured with progressinband=never. In order for 'noanswer'<br/> applications to work, you need to run the progress() application in the priority before the app."));
	/* Media ISDN Media Settings end */
	
	/* Media RTP for SIP begin */
	$("#lang_rtp_for_sip").html(language('RTP for SIP'));
	$("#lang_directmedia").html(language('directmedia'));
	$("#lang_directmedia_help").html(language('directmedia help','Redirect the RTP media stream to go directly from the caller to the callee or not.'));
	/* Media RTP for SIP end */
	
	/* Media QoS/ToS begin */
	$("#lang_qos_tos").html(language('QoS/ToS'));
	$("#lang_tos_for_sip_packets").html(language('TOS for SIP Packets'));
	$("#lang_tos_for_sip_packets_help").html(language('TOS for SIP Packets help','Sets type of service for SIP packets.'));
	$("#lang_tos_for_rtp_packeds").html(language('TOS for RTP Packets'));
	$("#lang_tos_for_rtp_packeds_help").html(language('TOS for RTP Packets help','Sets type of service for RTP packets'));
	/* Media QoS/ToS end */
	
	/* other info */
	$("#networking_li").html(language('Networking'));
	$("#parsing_and_compatibility_li2").html(language('Parsing and Compatibility'));
	$("#security_li").html(language('Security'));
	$("#media_li2").html(language('Media'));
	$(".save_input").val(language('Save'));
	$("#lang_add").val(language('Add'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

function General(){
	this.udp_bind_port = 5060;
	this.enable_tcp = "yes";
	this.tcp_bind_port = 5060;
	this.tcp_authentication_timeout = "";
	this.tcp_authentication_limit = "";
	this.enable_hostname_lookup = "yes";
	this.subscribe_network_change_event = 1;
	this.match_external_address_locally = "yes";
	this.dynamic_exclude_static = "yes";
	this.externally_mapped_tcp_port = "";
	this.external_address = "";
	this.external_hostname = "";
	this.hostname_refresh_interval = "";
	this.start_of_rtp_port_range = 10000;
	this.end_of_rtp_port_range = 20000;
	this.rtptimeout = 20;
	this.strict_rfc_interpretation = "";
	this.send_compact_headers = "yes";
	this.sdp_owner = "";
	this.ACK = false;
	this.BYE = false;
	this.CANCEL = false;
	this.INFO = false;
	this.INVITE = false;
	this.MESSAGE = false;
	this.NOTIFY = false;
	this.OPTIONS = false;
	this.PRACK = false;
	this.PUBLISH = false;
	this.REFER = false;
	this.REGISTER = false;
	this.SUBSCRIBE = false;
	this.UPDATE = false;
	this.shrink_caller_id = "yes";
	this.maximum_registration_expiry = "";
	this.minimum_registration_expiry = "";
	this.default_registration_expiry = "";
	this.registration_timeout = "";
	this.number_of_registration_attemptsy = "0";
	this.match_auth_username = "yes";
	this.realm = "";
	this.use_domain_as_realm = "yes";
	this.always_auth_reject = "yes";
	this.authenticate_options_requests = "yes";
	this.allow_guest_calling = "yes";
	this.premature_media = "yes";
	this.tos_for_sip_packets = "";
	this.tos_for_rtp_packets = "";
	this.sipto = 0;
	this.matchingpriority = 0;
}

function show_sip_settings(data_temp){
	var sip_data = data_temp['_sipadv'];
	var rtp_data = data_temp['_siprtp'];
	var stun_data = data_temp['_sipadv']['_stun'];
	
	var general = new General();
	
	if(sip_data['_udpbindport'] != 0){
		general.udp_bind_port = sip_data['_udpbindport'];
	}
	
	if(sip_data['_tcpenable'] == 1){
		general.enable_tcp = 'yes';
	}else if(sip_data['_tcpenable'] == 0){
		general.enable_tcp = 'no';
	}
	
	if(sip_data['_tcpbindport'] != 0){
		general.tcp_bind_port = sip_data['_tcpbindport'];
	}
	
	if(sip_data['_tcpauthtimeout'] != 0){
		general.tcp_authentication_timeout = sip_data['_tcpauthtimeout'];
	}
	
	if(sip_data['_tcpauthlimit'] != 0){
		general.tcp_authentication_limit = sip_data['_tcpauthlimit'];
	}
	
	if(sip_data['_srvlookup'] == 1){
		general.enable_hostname_lookup = 'yes';
	}else if(sip_data['_srvlookup'] == 0){
		general.enable_hostname_lookup = 'no';
	}
	
	general.subscribe_network_change_event = sip_data['_subevent'];
	
	if(sip_data['_matchexternaddrlocally'] == 1){
		general.match_external_address_locally = 'yes';
	}else if(sip_data['_matchexternaddrlocally'] == 0){
		general.match_external_address_locally = 'no';
	}
	
	if(sip_data['_dynamicexcludestatic'] == 1){
		general.dynamic_exclude_static = 'yes';
	}else if(sip_data['_dynamicexcludestatic'] == 0){
		general.dynamic_exclude_static = 'no';
	}
	
	if(sip_data['_externtcpport'] != 0){
		general.externally_mapped_tcp_port = sip_data['_externtcpport'];
	}
	
	general.external_address = sip_data['_externaddr'];
	
	general.external_hostname = sip_data['_externhost'];
	
	general.hostname_refresh_interval = sip_data['_externrefresh'];
	
	if(stun_data['_enable'] == 1){
		var stun_checked = true;
	}else{
		var stun_checked = false;
	}
	
	if(stun_data['_port'] == 0){
		var stun_port = 3478;
	}else{
		var stun_port = stun_data['_port'];
	}
	
	if(stun_data['_reflesh'] == 0){
		var stun_reflesh = 30;
	}else{
		var stun_reflesh = stun_data['_reflesh'];
	}
	
	var stun_server = stun_data['_server'];
	
	
	if(sip_data['_rtptimeout'] != 0){
		general.rtptimeout = sip_data['_rtptimeout'];
	}
	
	if(sip_data['_pedantic'] == 1){
		general.strict_rfc_interpretation = 'yes';
	}else if(sip_data['_pedantic'] == 0){
		general.strict_rfc_interpretation = 'no';
	}
	
	if(sip_data['_compactheaders'] == 1){
		general.send_compact_headers = 'yes';
	}else if(sip_data['_compactheaders'] == 0){
		general.send_compact_headers = 'no';
	}
	
	general.sdp_owner = sip_data['_sdpowner'];
	
	general.matchingpriority = sip_data['_matchingpriority'];
	
	if(sip_data['_disallowedmethods'] != ''){
		var temp = sip_data['_disallowedmethods'];
		
		for(var i=0;i<temp.length;i++){
			if(i == 0 && temp.charAt(i) == 1){
				general.ACK = true;
			}
			if(i == 1 && temp.charAt(i) == 1){
				general.BYE = true;
			}
			if(i == 2 && temp.charAt(i) == 1){
				general.CANCEL = true;
			}
			if(i == 3 && temp.charAt(i) == 1){
				general.INFO = true;
			}
			if(i == 4 && temp.charAt(i) == 1){
				general.INVITE = true;
			}
			if(i == 5 && temp.charAt(i) == 1){
				general.MESSAGE = true;
			}
			if(i == 6 && temp.charAt(i) == 1){
				general.NOTIFY = true;
			}
			if(i == 7 && temp.charAt(i) == 1){
				general.OPTIONS = true;
			}
			if(i == 8 && temp.charAt(i) == 1){
				general.PRACK = true;
			}
			if(i == 9 && temp.charAt(i) == 1){
				general.PUBLISH = true;
			}
			if(i == 10 && temp.charAt(i) == 1){
				general.REFER = true;
			}
			if(i == 11 && temp.charAt(i) == 1){
				general.REGISTER = true;
			}
			if(i == 12 && temp.charAt(i) == 1){
				general.SUBSCRIBE = true;
			}
			if(i == 13 && temp.charAt(i) == 1){
				general.UPDATE = true;
			}
		}
	}
	
	if(sip_data['_hangupcausecode'] != ''){
		var hangupcausecode = sip_data['_hangupcausecode'];
	}else{
		var hangupcausecode = 0;
	}
	
	if(sip_data['_shrinkcallerid'] == 1){
		general.shrink_caller_id = 'yes';
	}else if(sip_data['_shrinkcallerid'] == 0){
		general.shrink_caller_id = 'no';
	}
	
	if(sip_data['_allowcidnamefromdomin'] == 1){
		var sip_from = 'Number';
	}else if(sip_data['_allowcidnamefromdomin'] == 0){
		var sip_from = 'Name';
	}
	
	if(sip_data['_maxexpiry'] != 0){
		general.maximum_registration_expiry = sip_data['_maxexpiry'];
	}
	
	if(sip_data['_minexpiry'] != 0){
		general.minimum_registration_expiry = sip_data['_minexpiry'];
	}
	
	if(sip_data['_defaultexpiry'] != 0){
		general.default_registration_expiry = sip_data['_defaultexpiry'];
	}
	
	if(sip_data['_registertimeout'] != 0){
		general.registration_timeout = sip_data['_registertimeout'];
	}
	
	if(sip_data['_registerattempts'] != 0){
		general.number_of_registration_attemptsy = sip_data['_registerattempts'];
	}else{
		general.number_of_registration_attemptsy = '';
	}
	
	if(sip_data['_matchauthusername'] == 1){
		general.match_auth_username = 'yes';
	}else if(sip_data['_matchauthusername'] == 0){
		general.match_auth_username = 'no';
	}
	
	general.realm = sip_data['_realm'];
	
	if(sip_data['_domainasrealm'] == 1){
		general.use_domain_as_realm = 'yes';
	}else if(sip_data['_domainasrealm'] == 0){
		general.use_domain_as_realm = 'no';
	}
	
	if(sip_data['_alwaysauthreject'] == 1){
		general.always_auth_reject = 'yes';
	}else if(sip_data['_alwaysauthreject'] == 0){
		general.always_auth_reject = 'no';
	}
	
	if(sip_data['_authoptionsrequest'] == 1){
		general.authenticate_options_requests = 'yes';
	}else if(sip_data['_authoptionsrequest'] == 0){
		general.authenticate_options_requests = 'no';
	}
	
	if(sip_data['_allowguest'] == 1){
		general.allow_guest_calling = 'yes';
	}else if(sip_data['_allowguest'] == 0){
		general.allow_guest_calling = 'no';
	}
	
	if(sip_data['_prematuremedia'] == 1){
		general.premature_media = 'yes';
	}else if(sip_data['_prematuremedia'] == 0){
		general.premature_media = 'no';
	}
	
	general.tos_for_sip_packets = sip_data['_tossip'];
	
	general.tos_for_rtp_packets = sip_data['_tosaudio'];
	
	if(sip_data['_sipto'] == 1){
		general.sipto = sip_data['_sipto'];
	}else{
		general.sipto = 0;
	}
	
	if(sip_data['_calleeid1'] == 0){
		var calleeid1 = 'EXTEN';
	}else if(sip_data['_calleeid1'] == 1){
		var calleeid1 = 'To';
	}else{
		var calleeid1 = 'From';
	}
	
	if(sip_data['_calleeid2'] == 0){
		var calleeid2 = 'Number';
	}else{
		var calleeid2 = 'Name';
	}
	
	if(sip_data['_directmedia'] == 4){
		general.directmedia = 'outgoing';
	}else if(sip_data['_directmedia'] == 3){
		general.directmedia = 'update';
	}else if(sip_data['_directmedia'] == 2){
		general.directmedia = 'nonat';
	}else if(sip_data['_directmedia'] == 1){
		general.directmedia = 'no';
	}else{
		general.directmedia = 'yes';
	}
	
	var localnet = [];
	var temp = sip_data['_localnet'].split(";");
	for(var item in temp){
		if(temp[item] != ''){
			localnet.push(temp[item]);
		}
	}
	
	/* rtp begin */
	if(rtp_data['_rtpstart'] != 0){
		general.start_of_rtp_port_range = rtp_data['_rtpstart'];
	}
	
	if(rtp_data['_rtpend']!=undefined){
		general.end_of_rtp_port_range = rtp_data['_rtpend'];
	}
	/* rtp end */
	
	/* Networking General begin */
	//value
	document.getElementById('udp_bind_port').value = general.udp_bind_port;
	document.getElementById('tcp_bind_port').value = general.tcp_bind_port;
	document.getElementById('tcp_authentication_timeout').value = general.tcp_authentication_timeout;
	document.getElementById('tcp_authentication_limit').value = general.tcp_authentication_limit;
	
	//select
	document.getElementById('enable_tcp').value = general.enable_tcp;
	document.getElementById('enable_hostname_lookup').value = general.enable_hostname_lookup;
	/* Networking General end */
	
	/* Networking NAT Settings begin */
	//value
	document.getElementById('externally_mapped_tcp_port').value = general.externally_mapped_tcp_port;
	document.getElementById('external_address').value = general.external_address;
	document.getElementById('external_hostname').value = general.external_hostname;
	document.getElementById('hostname_refresh_interval').value = general.hostname_refresh_interval;
	
	//select
	document.getElementById('subscribe_network_change_event').value = general.subscribe_network_change_event;
	document.getElementById('match_external_address_locally').value = general.match_external_address_locally;
	document.getElementById('dynamic_exclude_static').value = general.dynamic_exclude_static;
	
	var localnet_str = '';
	for(var i=0;i<localnet.length;i++){
		localnet_str += '<tr><td>'+localnet[i]+'</td>';
		localnet_str += '<td><button type="button" name="send" value="Delete" style="width:32px;height:32px;" onclick=\'if(confirm("Are you sure to delete you selected ?"))javascript:this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\'><img src="/images/delete.gif"></button>';
		localnet_str += '<input type="hidden" class="local_network_list" name="local_network_list[]" value="'+localnet[i]+'" /></td></tr>';
	}
	$("#tab_lnl").append(localnet_str);
	/* Networking NAT Settings end */
	
	/* Networking STUN Settings begin */
	document.getElementById('stun_enable').checked = stun_checked;
	document.getElementById('port_stun').value = stun_port;
	document.getElementById('reflesh').value = stun_reflesh;
	document.getElementById('server').value = stun_server;
	/* Networking STUN Settings end */
	
	/* Networking RTP Settings begin */
	//value
	document.getElementById('start_of_rtp_port_range').value = general.start_of_rtp_port_range;
	document.getElementById('end_of_rtp_port_range').value = general.end_of_rtp_port_range;
	document.getElementById('rtptimeout').value = general.rtptimeout;
	/* Networking RTP Settings end */
	
	/* Parsing and Compatibility General begin */
	
	//value
	document.getElementById('sdp_owner').value = general.sdp_owner;
	document.getElementById('matching_priority').value = general.matchingpriority;
	
	//select
	document.getElementById('strict_rfc_interpretation').value = general.strict_rfc_interpretation;
	document.getElementById('send_compact_headers').value = general.send_compact_headers;
	/* Parsing and Compatibility General end */
	
	/* Parsing and Compatibility SIP Methods begin */
	//checked
	document.getElementById('ack_checked').checked = general.ACK;
	document.getElementById('bye_checked').checked = general.BYE;
	document.getElementById('cancel_checked').checked = general.CANCEL;
	document.getElementById('info_checked').checked = general.INFO;
	document.getElementById('invite_checked').checked = general.INVITE;
	document.getElementById('message_checked').checked = general.MESSAGE;
	document.getElementById('notify_checked').checked = general.NOTIFY;
	document.getElementById('options_checked').checked = general.OPTIONS;
	document.getElementById('prack_checked').checked = general.PRACK;
	document.getElementById('publish_checked').checked = general.PUBLISH;
	document.getElementById('refer_checked').checked = general.REFER;
	document.getElementById('register_checked').checked = general.REGISTER;
	document.getElementById('subscribe_checked').checked = general.SUBSCRIBE;
	document.getElementById('update_checked').checked = general.UPDATE;
	document.getElementById('hangupcausecode').value = hangupcausecode;
	/* Parsing and Compatibility SIP Methods end */
	
	/* Parsing and Compatibility Caller ID begin */
	//select
	document.getElementById('shrink_caller_id').value = general.shrink_caller_id;
	document.getElementById('sip_from').value = sip_from;
	/* Parsing and Compatibility Caller ID end */
	
	/* Parsing and Compatibility Callee ID begin */
	//select
	document.getElementById('sipto').value = general.sipto;
	document.getElementById('callee_id_1').value = calleeid1;
	document.getElementById('callee_id_2').value = calleeid2;
	/* Parsing and Compatibility Callee ID end */
	
	/* Parsing and Compatibility Timer Configuration begin */
	//value
	document.getElementById('maximum_registration_expiry').value = general.maximum_registration_expiry;
	document.getElementById('minimum_registration_expiry').value = general.minimum_registration_expiry;
	document.getElementById('default_registration_expiry').value = general.default_registration_expiry;
	/* Parsing and Compatibility Timer Configuration end */
	
	/* Parsing and Compatibility Outbound Registrations begin */
	//value
	document.getElementById('registration_timeout').value = general.registration_timeout;
	document.getElementById('number_of_registration_attemptsy').value = general.number_of_registration_attemptsy;
	/* Parsing and Compatibility Outbound Registrations end */
	
	/* Security Authentication Settings begin */
	//value
	document.getElementById('realm').value = general.realm;
	
	//select
	document.getElementById('match_auth_username').value = general.match_auth_username;
	document.getElementById('use_domain_as_realm').value = general.use_domain_as_realm;
	document.getElementById('always_auth_reject').value = general.always_auth_reject;
	document.getElementById('authenticate_options_requests').value = general.authenticate_options_requests;
	/* Security Authentication Settings end */
	
	/* Security Guest Calling begin */
	//select
	document.getElementById('allow_guest_calling').value = general.allow_guest_calling;
	/* Security Guest Calling end */
	
	/* Media ISDN Media Settings begin */
	//select
	document.getElementById('premature_media').value = general.premature_media;
	document.getElementById('direct_media').value = general.directmedia;
	/* Media ISDN Media Settings end */
	
	/* Media QoS/ToS begin */
	//val
	document.getElementById('tos_for_sip_packets').value = general.tos_for_sip_packets;
	document.getElementById('tos_for_rtp_packets').value = general.tos_for_rtp_packets;
	/* Media QoS/ToS end */
	
	/* other function */
	if(calleeid1 == 'EXTEN'){
		$("#callee_id_2").hide();
	}else{
		$("#callee_id_2").show();
	}
	
}

object.AGSipAdvSettingGet(succeed_back, error_back);

function succeed_back(data){
	console.log(data);
	var data_temp = data['_get'];
	var sip_data = data_temp['_sipadv'];
	
	header(data_temp['_combuf']);
	show_sip_settings(data_temp);
	footer();
	
	onload_show();
	
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_sip_setttings(sip_data);
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/******************************SHOW SIP ADV SETTINGS END***************************/

/******************************SAVE SIP ADV SETTINGS BEGIN***************************/
function save_sip_setttings(sip_data){
	/* sip data begin */
	var sipadvget = new AST_SipAdv();
	
	var udp_bind_port = document.getElementById('udp_bind_port').value;
	sipadvget._udpbindport = udp_bind_port;
	
	var enable_tcp = document.getElementById('enable_tcp').value;
	if(enable_tcp == 'yes'){
		var tcpenable = 1;
	}else if(enable_tcp == 'no'){
		var tcpenable = 0;
	}
	sipadvget._tcpenable = tcpenable;
	
	if(document.getElementById('tcp_bind_port').disabled != true){
		var tcp_bind_port = document.getElementById('tcp_bind_port').value;
	}else{
		var tcp_bind_port = sip_data['_tcpbindport'];
	}
	sipadvget._tcpbindport = tcp_bind_port;
	
	if(document.getElementById('tcp_authentication_timeout').disabled != true){
		var tcp_authentication_timeout = document.getElementById('tcp_authentication_timeout').value;
	}else{
		var tcp_authentication_timeout = sip_data['_tcpauthtimeout'];
	}
	if(tcp_authentication_timeout != ''){
		sipadvget._tcpauthtimeout = tcp_authentication_timeout;
	}else {
		sipadvget._tcpauthtimeout = 0;
	}
		
	if(document.getElementById('tcp_authentication_limit').disabled != true){
		var tcp_authentication_limit = document.getElementById('tcp_authentication_limit').value;
	}else{
		var tcp_authentication_limit = sip_data['_tcpauthlimit'];
	}
	if(tcp_authentication_limit != ''){
		sipadvget._tcpauthlimit = tcp_authentication_limit;
	}else{
		sipadvget._tcpauthlimit = 0;
	}
	
	var enable_hostname_lookup = document.getElementById('enable_hostname_lookup').value;
	if(enable_hostname_lookup == 'yes'){
		var srvlookup = 1;
	}else if(enable_hostname_lookup == 'no'){
		var srvlookup = 0;
	}
	sipadvget._srvlookup = srvlookup;
	
	var subevent = document.getElementById('subscribe_network_change_event').value;
	sipadvget._subevent = subevent;
	
	var match_external_address_locally = document.getElementById('match_external_address_locally').value;
	if(match_external_address_locally == 'yes'){
		var matchexternaddrlocally = 1;
	}else if(match_external_address_locally == 'no'){
		var matchexternaddrlocally = 0;
	}
	sipadvget._matchexternaddrlocally = matchexternaddrlocally;
	
	var dynamic_exclude_static = document.getElementById('dynamic_exclude_static').value;
	if(dynamic_exclude_static == 'yes'){
		var dynamicexcludestatic = 1;
	}else if(dynamic_exclude_static == 'no'){
		var dynamicexcludestatic = 0;
	}
	sipadvget._dynamicexcludestatic = dynamicexcludestatic;
	
	var externally_mapped_tcp_port = document.getElementById('externally_mapped_tcp_port').value;
	if(externally_mapped_tcp_port != ''){
		sipadvget._externtcpport = externally_mapped_tcp_port;
	}else{
		sipadvget._externtcpport = 0;
	}
	
	var external_address = document.getElementById('external_address').value;
	sipadvget._externaddr = external_address;
	
	var external_hostname = document.getElementById('external_hostname').value;
	sipadvget._externhost = external_hostname;
	
	var hostname_refresh_interval = document.getElementById('hostname_refresh_interval').value;
	sipadvget._externrefresh = hostname_refresh_interval;
	
	var SipAdvStun = new AST_SipAdvSTUN();
	
	if(document.getElementById('stun_enable').checked){
		var stun_enable = 1;
	}else{
		var stun_enable = 0;
	}
	SipAdvStun._enable = stun_enable;
	
	var port_stun = document.getElementById('port_stun').value;
	if(port_stun == ''){
		port_stun = 3478;
	}
	SipAdvStun._port = port_stun;
	
	var stun_reflesh = document.getElementById('reflesh').value;
	if(stun_reflesh == ''){
		stun_reflesh = 30;
	}
	SipAdvStun._reflesh = stun_reflesh;
	
	var server = document.getElementById('server').value;
	SipAdvStun._server = server;
	
	sipadvget._stun = SipAdvStun;
	
	var strict_rfc_interpretation = document.getElementById('strict_rfc_interpretation').value;
	if(strict_rfc_interpretation == 'yes'){
		var pedantic = 1;
	}else if(strict_rfc_interpretation == 'no'){
		var pedantic = 0;
	}
	sipadvget._pedantic = pedantic;
	
	var send_compact_headers = document.getElementById('send_compact_headers').value;
	if(send_compact_headers == 'yes'){
		var compactheaders = 1;
	}else if(send_compact_headers == 'no'){
		var compactheaders = 0;
	}
	sipadvget._compactheaders = compactheaders;
	
	var sdp_owner = document.getElementById('sdp_owner').value;
	sipadvget._sdpowner = sdp_owner;
	
	var matchingpriority = document.getElementById('matching_priority').value;
	sipadvget._matchingpriority = matchingpriority;
	
	var disallow_sip_str = '';
	$(".disallow_sip").each(function(){
		if($(this).attr('checked') == 'checked'){
			disallow_sip_str += '1';
		}else{
			disallow_sip_str += '0';
		}
	});
	sipadvget._disallowedmethods = disallow_sip_str;
	
	var shrink_caller_id = document.getElementById('shrink_caller_id').value;
	if(shrink_caller_id == 'yes'){
		var shrinkcallerid = 1;
	}else if(shrink_caller_id == 'no'){
		var shrinkcallerid = 0;
	}
	sipadvget._shrinkcallerid = shrinkcallerid;
	
	var sip_from = document.getElementById('sip_from').value;
	if(sip_from == 'Name'){
		var sip_from_val = 0;
	}else if(sip_from == 'Number'){
		var sip_from_val = 1;
	}
	sipadvget._allowcidnamefromdomin = sip_from_val;
	
	var hangupcausecode = document.getElementById('hangupcausecode').value;
	sipadvget._hangupcausecode = hangupcausecode;
	
	var sipto = document.getElementById('sipto').value;
	sipadvget._sipto = sipto;
	
	var calleeid1_temp = document.getElementById('callee_id_1').value;
	if(calleeid1_temp == 'EXTEN'){
		calleeid1 = 0;
	}else if(calleeid1_temp == 'To'){
		calleeid1 = 1;
	}else{
		calleeid1 = 2;
	}
	sipadvget._calleeid1 = calleeid1;
	
	var calleeid2_temp = document.getElementById('callee_id_2').value;
	if(calleeid2_temp == 'Number'){
		calleeid2 = 0;
	}else{
		calleeid2 = 1;
	}
	sipadvget._calleeid2 = calleeid2;
	
	var maximum_registration_expiry = document.getElementById('maximum_registration_expiry').value;
	if(maximum_registration_expiry != ''){
		sipadvget._maxexpiry = maximum_registration_expiry;
	}else {
		sipadvget._maxexpiry = 0;
	}
	
	var minimum_registration_expiry = document.getElementById('minimum_registration_expiry').value;
	if(minimum_registration_expiry != ''){
		sipadvget._minexpiry = minimum_registration_expiry;
	}else {
		sipadvget._minexpiry = 0;
	}
	
	var default_registration_expiry = document.getElementById('default_registration_expiry').value;
	if(default_registration_expiry != ''){
		sipadvget._defaultexpiry = default_registration_expiry;
	}else {
		sipadvget._defaultexpiry = 0;
	}
	
	var registration_timeout = document.getElementById('registration_timeout').value;
	if(registration_timeout != ''){
		sipadvget._registertimeout = registration_timeout;
	}else {
		sipadvget._registertimeout = 0;
	}
	
	var number_of_registration_attemptsy = document.getElementById('number_of_registration_attemptsy').value;
	if(number_of_registration_attemptsy != ''){
		sipadvget._registerattempts = number_of_registration_attemptsy;
	}else {
		sipadvget._registerattempts = 0;
	}
	
	var match_auth_username = document.getElementById('match_auth_username').value;
	if(match_auth_username == 'yes'){
		var matchauthusername = 1;
	}else if(match_auth_username == 'no'){
		var matchauthusername = 0;
	}
	sipadvget._matchauthusername = matchauthusername;
	
	var realm = document.getElementById('realm').value;
	sipadvget._realm = realm;
	
	var use_domain_as_realm = document.getElementById('use_domain_as_realm').value;
	if(use_domain_as_realm == 'yes'){
		var domainasrealm = 1;
	}else if(use_domain_as_realm == 'no'){
		var domainasrealm = 0;
	}
	sipadvget._domainasrealm = domainasrealm;
	
	var always_auth_reject = document.getElementById('always_auth_reject').value;
	if(always_auth_reject == 'yes'){
		var alwaysauthreject = 1;
	}else if(always_auth_reject == 'no'){
		var alwaysauthreject = 0;
	}
	sipadvget._alwaysauthreject = alwaysauthreject;
	
	var authenticate_options_requests = document.getElementById('authenticate_options_requests').value;
	if(authenticate_options_requests == 'yes'){
		var authoptionsrequest = 1;
	}else if(authenticate_options_requests == 'no'){
		var authoptionsrequest = 0;
	}
	sipadvget._authoptionsrequest = authoptionsrequest;
	
	var allow_guest_calling = document.getElementById('allow_guest_calling').value;
	if(allow_guest_calling == 'yes'){
		var allowguest = 1;
	}else if(allow_guest_calling == 'no'){
		var allowguest = 0;
	}
	sipadvget._allowguest = allowguest;
	
	var premature_media = document.getElementById('premature_media').value;
	if(premature_media == 'yes'){
		var prematuremedia = 1;
	}else if(premature_media == 'no'){
		var prematuremedia = 0;
	}
	sipadvget._prematuremedia = prematuremedia;
	
	var directmedia_val = document.getElementById('direct_media').value;
	if(directmedia_val == 'outgoing'){
		var directmedia = 4;
	}else if(directmedia_val == 'update'){
		var directmedia = 3;
	}else if(directmedia_val == 'nonat'){
		var directmedia = 2;
	}else if(directmedia_val == 'no'){
		var directmedia = 1;
	}else{
		var directmedia = 0;
	}
	sipadvget._directmedia =  directmedia;
	
	var tos_for_sip_packets = document.getElementById('tos_for_sip_packets').value;
	sipadvget._tossip = tos_for_sip_packets;
	
	var tos_for_rtp_packets = document.getElementById('tos_for_rtp_packets').value;
	sipadvget._tosaudio = tos_for_rtp_packets;
	
	var rtptimeout = document.getElementById('rtptimeout').value;
	if(rtptimeout != ''){
		sipadvget._rtptimeout = rtptimeout;
	}else{
		sipadvget._rtptimeout = 0;
	}
	
	var localnet_val = '';
	$(".local_network_list").each(function(){
		var temp_val = $(this).val();
		localnet_val += temp_val+',';
	});
	localnet_val=localnet_val.substring(0,localnet_val.length-1);
	sipadvget._localnet = localnet_val;
	/* sip data end */

	/* rtp data begin */
	var siprtp = new AST_SipRtp();
	
	var start_of_rtp_port_range = document.getElementById('start_of_rtp_port_range').value;
	siprtp._rtpstart = start_of_rtp_port_range;
	
	var end_of_rtp_port_range = document.getElementById('end_of_rtp_port_range').value;
	siprtp._rtpend = end_of_rtp_port_range;
	/* rtp data end */
	
	var SipAdvSave = new AST_SipAdvSave();
	SipAdvSave._sipadv = sipadvget;
	SipAdvSave._siprtp = siprtp;
	
	object.AGSipAdvSettingSave(save_succeed_back, save_error_back, SipAdvSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'sip-adv-settings.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/******************************SAVE SIP ADV SETTINGS BEGIN***************************/