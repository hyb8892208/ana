function modechange()
{
	var tz_info = value('system_timezone');
	if ((tz_info=='') || (tz_info==null)){
		set_value('show_TZ', tz_info);
	}
	else {
		var tz_split = tz_info.split('@');
		set_value('show_TZ', tz_split[1]);
	}
}


function postLocalTime()
{
	if(!check()) {
		return false;
	}

	var myDate = new Date();
	set_value('local_yea',myDate.getFullYear());
	set_value('local_mon',myDate.getMonth()+1);
	set_value('local_dat',myDate.getDate());
	set_value('local_hou',myDate.getHours());
	set_value('local_min',myDate.getMinutes());
	set_value('local_sec',myDate.getSeconds());

	return true;
}

function check()
{
	var ntp_server1 = document.getElementById("ntp_server1").value;
	var ntp_server2 = document.getElementById("ntp_server2").value;
	var ntp_server3 = document.getElementById("ntp_server3").value;

	document.getElementById("cntp_server1").innerHTML = '';
	if(ntp_server1 != '') {
		if(!check_domain(ntp_server1)) {
			var rstr = language('js check domain','Invalid domain or IP address.');
			document.getElementById("cntp_server1").innerHTML = con_str(rstr);
			return false;
		} 
	}

	document.getElementById("cntp_server2").innerHTML = '';
	if(ntp_server2 != '') {
		if(!check_domain(ntp_server2)) {
			var rstr = language('js check domain','Invalid domain or IP address.');
			document.getElementById("cntp_server2").innerHTML = con_str(rstr);
			return false;
		} 
	}

	document.getElementById("cntp_server3").innerHTML = '';
	if(ntp_server3 != '') {
		if(!check_domain(ntp_server3)) {
			var rstr = language('js check domain','Invalid domain or IP address.');
			document.getElementById("cntp_server3").innerHTML = con_str(rstr);
			return false;
		} 
	}

	if(limit_string_length()){
		return false;
	}
	
	return true;
}

function limit_string_length(){
	if(check_string_length('ntp_server1')){
		return true;
	}
	
	if(check_string_length('ntp_server2')){
		return true;
	}
	
	if(check_string_length('ntp_server3')){
		return true;
	}
	
	return false;
}
/*****************************************************************************/

function ctime(c, Y, M, D, sec) {
	sec++;
	var H=Math.floor(sec/3600)%24;
	var I=Math.floor(sec/60)%60;
	var S=sec%60;
	if(S<10) S='0'+S;
	if(I<10) I='0'+I;
	if(H<10) H='0'+H;
	if (H=='00' & I=='00' & S=='00') D=D+1; 
	if (M==2) { 
		if (Y%4==0 && !Y%100==0 || Y%400==0) { 
			if (D==30){
				M+=1;D=1;
			} 
		} else { 
			if (D==29) {
				M+=1;D=1;
			} 
		}
	} else {
		if (M==4 || M==6 || M==9 || M==11) { 
			if (D==31) {
				M+=1;D=1;
			} 
		} else { 
			if (D==32) {
				M+=1;D=1;
			}
		}
	}

	if (M==13) {
		Y+=1;M=1;
	} 

	setTimeout("ctime("+c+","+Y+","+M+","+D+","+sec+")", 1000);
	document.getElementById("currenttime").innerHTML = Y+'-'+M+'-'+D+' '+H+':'+I+':'+S;
}

function onload_func()
{
	modechange();
}

function onload_show(){
	$(":checkbox").iButton(); 
	onload_func();
}
/******************************SHOW SYSTEM TIME BEGIN******************************/
(function(){
	$("#lang_system_time").html(language('System Time'));
	$("#lang_system_time_help").html(language('System Time help@system-time', 'Your gateway system time.'));
	$("#lang_time_zone").html(language('Time Zone'));
	$("#lang_time_zone_help").html(language('Time Zone help@system-time', 'The world time zone. Please select the one which is the same as or the closest to your city.'));
	$("#lang_melbourna_").html(language('Melbourne,Canberra,Sydney'));
	$("#lang_perth").html(language('Perth'));
	$("#lang_brisbane").html(language('Brisbane'));
	$("#lang_adelaide").html(language('Adelaide'));
	$("#lang_darwin").html(language('Darwin'));
	$("#lang_hobart").html(language('Hobart'));
	$("#lang_amsterdam").html(language('Amsterdam,Netherlands'));
	$("#lang_athens").html(language('Athens,Greece'));
	$("#lang_berlin").html(language('Berlin,Germany'));
	$("#lang_brussels").html(language('Brussels,Belgium'));
	$("#lang_bratislava").html(language('Bratislava,Slovakia'));
	$("#lang_budapest").html(language('Budapest,Hungary'));
	$("#lang_copenhagen").html(language('Copenhagen,Denmark'));
	$("#lang_dublin").html(language('Dublin,Ireland'));
	$("#lang_helsinki").html(language('Helsinki,Finland'));
	$("#lang_kyiv").html(language('Kyiv,Ukraine'));
	$("#lang_lisbon").html(language('Lisbon,Portugal'));
	$("#lang_london").html(language('London,GreatBritain'));
	$("#lang_madrid").html(language('Madrid,Spain'));
	$("#lang_oslo").html(language('Oslo,Norway'));
	$("#lang_paris").html(language('Paris,France'));
	$("#lang_prague").html(language('Prague,CzechRepublic'));
	$("#lang_roma").html(language('Roma,Italy'));
	$("#lang_moscow").html(language('Moscow,Russia'));
	$("#lang_stockholm").html(language('Stockholm,Sweden'));
	$("#lang_zurich").html(language('Zurich,Switzerland'));
	$("#lang_auckland").html(language('Auckland, Wellington'));
	$("#lang_hawaii").html(language('Hawaii Time'));
	$("#lang_alaska_time").html(language('Alaska Time'));
	$("#lang_pacific_time").html(language('Pacific Time'));
	$("#lang_mountain_time").html(language('Mountain Time'));
	$("#lang_mountain_time_no_dst").html(language('Mountain Time @Arizona, no DST'));
	$("#lang_central_time").html(language('Central Time'));
	$("#lang_eastern_time").html(language('Eastern Time'));
	$("#lang_bermuda").html(language('Bermuda'));
	$("#lang_anadyr").html(language('Anadyr'));
	$("#lang_amman").html(language('Amman'));
	$("#lang_beirut").html(language('Beirut'));
	$("#lang_damascus").html(language('Damascus'));
	$("#lang_gaza").html(language('Gaza'));
	$("#lang_jerusalem").html(language('Jerusalem'));
	$("#lang_nicosia").html(language('Nicosia'));
	$("#lang_aden").html(language('Aden'));
	$("#lang_baghdad").html(language('Baghdad'));
	$("#lang_bahrain").html(language('Bahrain'));
	$("#lang_kuwait").html(language('Kuwait'));
	$("#lang_qatar").html(language('Qatar'));
	$("#lang_riyadh").html(language('Riyadh'));
	$("#lang_tehran").html(language('Tehran'));
	$("#lang_baku").html(language('Baku'));
	$("#lang_dubai").html(language('Dubai'));
	$("#lang_muscat").html(language('Muscat'));
	$("#lang_tbilisi").html(language('Tbilisi'));
	$("#lang_yerevan").html(language('Yerevan'));
	$("#lang_kabul").html(language('Kabul'));
	$("#lang_aqtobe").html(language('Aqtobe'));
	$("#lang_ashgabat").html(language('Ashgabat'));
	$("#lang_dushanbe").html(language('Dushanbe'));
	$("#lang_karachi").html(language('Karachi'));
	$("#lang_oral").html(language('Oral'));
	$("#lang_samarkand").html(language('Samarkand'));
	$("#lang_tashkent").html(language('Tashkent'));
	$("#lang_yekaterinburg").html(language('Yekaterinburg'));
	$("#lang_calcutta").html(language('Calcutta'));
	$("#lang_colombo").html(language('Colombo'));
	$("#lang_almaty").html(language('Almaty'));
	$("#lang_bishkek").html(language('Bishkek'));
	$("#lang_dhaka").html(language('Dhaka'));
	$("#lang_novosibirsk").html(language('Novosibirsk'));
	$("#lang_omsk").html(language('Omsk'));
	$("#lang_qyzylorda").html(language('Qyzylorda'));
	$("#lang_thimphu").html(language('Thimphu'));
	$("#lang_jakarta").html(language('Jakarta'));
	$("#lang_bangkok").html(language('Bangkok'));
	$("#lang_vientiane").html(language('Vientiane'));
	$("#lang_phnom_penh").html(language('Phnom Penh'));
	$("#lang_chongqing").html(language('Chongqing'));
	$("#lang_hong_kong").html(language('Hong Kong'));
	$("#lang_shanghai").html(language('Shanghai'));
	$("#lang_singapore").html(language('Singapore'));
	$("#lang_urumqi").html(language('Urumqi'));
	$("#lang_taiwan").html(language('Taiwan'));
	$("#lang_ulaanbaatar").html(language('Ulaanbaatar'));
	$("#lang_dili").html(language('Dili'));
	$("#lang_jayapura").html(language('Jayapura'));
	$("#lang_pyongyang").html(language('Pyongyang'));
	$("#lang_seoul").html(language('Seoul'));
	$("#lang_tokyo").html(language('Tokyo'));
	$("#lang_yakutsk").html(language('Yakutsk'));
	$("#lang_sao_paulo").html(language('Sao Paulo,Brazil'));
	$("#lang_buenos_aires").html(language('Buenos_Aires,Argentina'));
	$("#lang_central_america").html(language('Central America @no DST'));
	$("#lang_caracas").html(language('Caracas,Venezuela'));
	$("#lang_user_defined").html(language('User defined @or out of date'));
	$("#lang_posix_tz_string").html(language('POSIX TZ String'));
	$("#lang_posix_tz_string_help").html(language('POSIX TZ String help', 'Posix timezone strings.'));
	$("#lang_auto_sync_from_ntp").html(language('Auto-Sync from NTP'));
	$("#lang_auto_sync_from_ntp_help").html(language('Auto-Sync from NTP help', 'Whether enable automatically synchronize from NTP server or not. On(enabled),OFF(disabled).'));
	$("#lang_australia").attr('label',language('Australia'));
	$("#lang_europe").attr('label',language('Europe'));
	$("#lang_new_zealand").attr('label',language('New Zealand'));
	$("#lang_usa_and_canada").attr('label',language('USA and Canada'));
	$("#lang_atlantic").attr('label',language('Atlantic'));
	$("#lang_asia_1").attr('label',(language('Asia')+" (UTC+1)"));
	$("#lang_asia_2").attr('label',(language('Asia')+" (UTC+2)"));
	$("#lang_asia_3").attr('label',(language('Asia')+" (UTC+3)"));
	$("#lang_asia_3_1").attr('label',(language('Asia')+" (UTC+3:30)"));
	$("#lang_asia_4").attr('label',(language('Asia')+" (UTC+4)"));
	$("#lang_asia_4_1").attr('label',(language('Asia')+" (UTC+4:30)"));
	$("#lang_asia_5").attr('label',(language('Asia')+" (UTC+5)"));
	$("#lang_asia_5_1").attr('label',(language('Asia')+" (UTC+5:30)"));
	$("#lang_asia_6").attr('label',(language('Asia')+" (UTC+6)"));
	$("#lang_asia_7").attr('label',(language('Asia')+" (UTC+7)"));
	$("#lang_asia_8").attr('label',(language('Asia')+" (UTC+8)"));
	$("#lang_asia_9").attr('label',(language('Asia')+" (UTC+9)"));
	$("#lang_central_and_south_america").attr('label',language('Central and South America'));
	$("#lang_unkonwn").attr('label',language('Unknown'));
	
	$("#lang_net_server1").html(language('NTP Server 1'));
	$("#lang_net_server1_help").html(language('NTP Server 1 help', 'Time server domain or hostname.For example, [time.asia.apple.com]'));
	$("#lang_net_server2").html(language('NTP Server 2'));
	$("#lang_net_server2_help").html(language('NTP Server 2 help', 'The first reserved NTP server.For example, [time.windows.com]'));
	$("#lang_net_server3").html(language('NTP Server 3'));
	$("#lang_net_server3_help").html(language('NTP Server 3 help', 'The second reserved NTP server.For example, [time.nist.gov]'));
	
	$("#time_settings_li").html(language('Time Settings'));
	$(".sync_from_ntp_input").val(language('Sync from NTP'));
	$(".sync_from_client_input").val(language('Sync from Client'));
	$("#report_b").html(language('Report'));
	$("#time_synchronize_b").html(language('Time Synchronize'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}
}());

var url = get_url_para();
var _ok = url['ok'];
var sync = url['sync'];
var click_flag = 0;

object.AGSysTimeGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var time_data = data_temp['_time'];
	var date_data = data_temp['_date'];
	
	header(data_temp['_combuf']);
	time_show(time_data, date_data);
	footer();
	
	onload_show();
	
	//ntp
	$(".sync_from_ntp_input").click(function(){
		if(click_flag == 0){
			if(check()){
				sync_ntp();
				click_flag = 1;
			}
		}else if(click_flag == 1){
			alert(language('NTP running tip','Sync from NTP is running'));
		}else if(click_flag == 2){
			alert(language('Client running tip','Sync from Client is running'));
		}
	});
	
	//client
	$(".sync_from_client_input").click(function(){
		if(click_flag == 0){
			if(postLocalTime()){
				sync_client();
				click_flag = 2;
			}
		}else if(click_flag == 1){
			alert(language('NTP running tip','Sync from NTP is running'));
		}else if(click_flag == 2){
			alert(language('Client running tip','Sync from Client is running'));
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

function time_show(time_data, date_data){
	
	if(time_data['_timezone'] != ''){
		var cf_timezone = time_data['_timezone'];
	}else{
		var cf_timezone = '-@UTC+0';
	}
	
	var auto_sw = false;
	if(time_data['_autosync'] == 'on'){
		var auto_sw = true;
	}
	
	var cf_ntp = [];
	for(var i=1;i<=3;i++){
		if(time_data['_ntp'+i] != undefined){
			cf_ntp[i] = time_data['_ntp'+i];
		}else{
			cf_ntp[i] = '';
		}
	}
	
	document.getElementById('ntp_server1').value = cf_ntp[1];
	document.getElementById('ntp_server2').value = cf_ntp[2];
	document.getElementById('ntp_server3').value = cf_ntp[3];
	
	var c = 0;
	var Y = date_data['_year'];
	var M = date_data['_month'];
	var D = date_data['_day'];
	var sec = parseInt(date_data['_hour']*3600)+parseInt(date_data['_minute']*60)+parseInt(date_data['_second']);
	
	//check
	document.getElementById('auto_sw').checked = auto_sw;
	
	/* other info */
	document.getElementById("system_timezone").value = cf_timezone;
	ctime(c, Y, M, D, sec);
	
	$(".sync_input").click(function(){
		$("#report_info").css("display", "block");
		$("#sync_info").html("<img src='../images/loading1.gif' />loading....");
	});
	
	//show back info
	var final_show = '';
	if(sync == 'ntp'){
		if(_ok != 'failed!'){//succeed
			if(_ok == 'ok1'){
				final_show += "NTP: ["+document.getElementById('ntp_server1').value+"] <br>";
			}else if(_ok == 'ok2'){
				final_show += "NTP: ["+document.getElementById('ntp_server2').value+"] <br>";
			}else if(_ok == 'ok3'){
				final_show += "NTP: ["+document.getElementById('ntp_server3').value+"] <br>";
			}
			final_show += language('Synchronize Succeeded');
			final_show += '<br>';
		}else{//error
			final_show += '<font color=ff0000>';
			final_show += 'NTP '+language('Synchronize Failed');
			final_show += '</font>';
		}
		$("#report_info").css("display", "block");
		$("#sync_info").html(final_show);
	}else if(sync == 'client'){
		if(_ok == 'ok'){//succeed
			final_show += language("Client Synchronize Succeeded");
			final_show += '<br>';
		}else{//error
			final_show += '<font color=ff0000>';
			final_show += language('Client Synchronize Failed');
			final_show += '</font>';
		}
		$("#report_info").css("display", "block");
		$("#sync_info").html(final_show);
	}
}
/******************************SHOW SYSTEM TIME END******************************/


/***********************************SYNC NTP BEGIN*******************************/
function sync_ntp(){
	/* save begin */
	var ntpserver = [];
	for(var i=1;i<=3;i++){
		ntpserver[i] = document.getElementById('ntp_server'+i).value;
	}
	
	if(document.getElementById('auto_sw').checked == true){
		var auto = 'on';
	}else{
		var auto = 'off';
	}
	
	var timezone = document.getElementById('system_timezone').value;
	var show_TZ = document.getElementById('show_TZ').value;
	
	var systime = new AST_SysTime();
	systime._timezone = timezone;
	systime._autosync = auto;
	systime._ntp1 = ntpserver[1];
	systime._ntp2 = ntpserver[2];
	systime._ntp3 = ntpserver[3];
	
	var SysTimeSave = new AST_SysTimeSave();
	SysTimeSave._time = systime;
	SysTimeSave._tz = show_TZ;
	/* save end */
	
	/* cmd1 begin */
	var ps = timezone.split("@");
	if(ps[0] != undefined){
		if(ps[0] == '-'){
			var zonefile = 'UTC';
		}else{
			var zoneinfo = ps[0].split('/');
			var zonefile = zoneinfo[1];
		}
	}else{
		var zonefile = 'UTC';
	}
	
	/* cmd1 end */
	
	object.AGSysTimeSave(ntp_succeed_back, ntp_error_back, SysTimeSave, zonefile, null);
}

function ntp_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'system-time.html?save=true&sync=ntp&ok='+data['_result'];
	}
}

function ntp_error_back(data){
	click_flag = 0;
	window.location.href = 'system-time.html?save=true&sync=ntp&ok=ok1';
	// alert(language('sync from NTP failed'));
}
/***********************************SYNC NTP END*******************************/



/********************************SYNC CLIENT BEGIN*******************************/
function sync_client(){
	/* save begin */
	var ntpserver = [];
	for(var i=1;i<=3;i++){
		ntpserver[i] = document.getElementById('ntp_server'+i).value;
	}
	
	if(document.getElementById('auto_sw').checked == true){
		var auto = 'on';
	}else{
		var auto = 'off';
	}
	
	var timezone = document.getElementById('system_timezone').value;
	var show_TZ = document.getElementById('show_TZ').value;
	
	var systime = new AST_SysTime();
	systime._timezone = timezone;
	systime._autosync = auto;
	systime._ntp1 = ntpserver[1];
	systime._ntp2 = ntpserver[2];
	systime._ntp3 = ntpserver[3];
	
	var SysTimeSave = new AST_SysTimeSave();
	SysTimeSave._time = systime;
	SysTimeSave._tz = show_TZ;
	/* save end */
	
	/* cmd1 begin */
	var ps = timezone.split("@");
	if(ps[0] != undefined){
		if(ps[0] == '-'){
			var zonefile = 'UTC';
		}else{
			var zoneinfo = ps[0].split('/');
			var zonefile = zoneinfo[1];
		}
	}else{
		var zonefile = 'UTC';
	}
	
	/* cmd1 end */
	
	
	/* cmd2 begin */
	var local_yea = document.getElementById('local_yea').value;
	var local_mon = document.getElementById('local_mon').value;
	var local_dat = document.getElementById('local_dat').value;
	var local_hou = document.getElementById('local_hou').value;
	var local_min = document.getElementById('local_min').value;
	var local_sec = document.getElementById('local_sec').value;
	
	var ts =  local_yea + '-' + local_mon + '-' + local_dat + ' ' + local_hou + ':' + local_min + ':' + local_sec;
	/* cmd2 end */
	
	object.AGSysTimeSave(client_succeed_back, client_error_back, SysTimeSave, zonefile, ts);
}

function client_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'system-time.html?save=true&sync=client&ok='+data['_result'];
	}
}

function client_error_back(data){
	click_flag = 0;
	window.location.href = 'system-time.html?save=true&sync=client&ok=ok';
	// alert(language('sync from client failed'));
}
/*********************************SYNC CLIENT END*******************************/