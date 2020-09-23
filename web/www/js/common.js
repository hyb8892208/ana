/**
* define
*/
var _Define = {
	'TLS_SW' : 'on', //sip-endpoints-edit.html
	'type' : 2, //0->O, 1->S&O, 2->S 
	'system_type' : 'openvox',
	'__IMPEDANCE_LIST__' : "FCC,TBR21,ARGENTINA,AUSTRALIA,AUSTRIA,BAHRAIN,BELGIUM,BRAZIL,BULGARIA,CANADA,CHILE,CHINA,COLOMBIA,CROATIA,CYPRUS,CZECH,DENMARK,ECUADOR,EGYPT,ELSALVADOR,FINLAND,FRANCE,GERMANY,GREECE,GUAM,HONGKONG,HUNGARY,ICELAND,INDIA,INDONESIA,IRELAND,ISRAEL,ITALY,JAPAN,JORDAN,KAZAKHSTAN,KUWAIT,LATVIA,LEBANON,LUXEMBOURG,MACAO,MALAYSIA,MALTA,MEXICO,MOROCCO,NETHERLANDS,NEWZEALAND,NIGERIA,NORWAY,OMAN,PAKISTAN,PERU,PHILIPPINES,POLAND,PORTUGAL,ROMANIA,RUSSIA,SAUDIARABIA,SINGAPORE,SLOVAKIA,SLOVENIA,SOUTHAFRICA,SOUTHKOREA,SPAIN,SWEDEN,SWITZERLAND,SYRIA,TAIWAN,THAILAND,UAE,UK,USA,YEMEN",
};

var anaglb_country = {
	'at' : 'Austria',
	'au' : 'Australia',
	'bg' : 'Bulgaria',
	'br' : 'Brazil',
	'be' : 'Belgium',
	'ch' : 'Switzerland',
	'cl' : 'Chile',
	'cn' : 'China',
	'cz' : 'Czech Republic',
	'de' : 'Germany',
	'dk' : 'Denmark',
	'ee' : 'Estonia',
	'es' : 'Spain',
	'fi' : 'Finland',
	'fr' : 'France',
	'gr' : 'Greece',
	'hu' : 'Hungary',
	'il' : 'Israel',
	'in' : 'India',
	'it' : 'Italy',
	'lt' : 'Lithuania',
	'jp' : 'Japan',
	'mx' : 'Mexico',
	'my' : 'Malaysia',
	'nl' : 'Netherlands',
	'no' : 'Norway',
	'nz' : 'New Zealand',
	'ph' : 'Philippines',
	'pl' : 'Poland',
	'pt' : 'Portugal',
	'ru' : 'Russian Federation / ex Soviet Union',
	'se' : 'Sweden',
	'sg' : 'Singapore',
	'th' : 'Thailand',
	'uk' : 'United Kingdom',
	'us' : 'United States / North America',
	'us-old' : 'United States Circa 1950/ North America',
	'tw' : 'Taiwan',
	've' : 'Venezuela / South America',
	'za' : 'South Africa',
	'custom' : 'Custom...',
}

/***
* Navigation
* config in title
*/
var title = {
	"system" : {
		"Status" : "system-status.html",
		"Time" : "system-time.html",
		"Login Settings" : "system-login.html",
		"General" : "system-general.html",
		"Tools" : "system-tools.html",
		"Information" : "system-info.html",
		// "Config Record" : "system-record.html",
		// "Config Label" : "system-label.html",
	},
	"analog" : {
		"Channel Settings" : "alg-chnsettings.html",
		"Channel Settings Edit" : "alg-chnsettings-edit.html",
		"Pickup" : "alg-pickupsettings.html",
		"Dial Matching Table" : "alg-dialtable.html",
		"Advanced" : "alg-glbsettings.html",
		"Special Function Keys" : "alg-funkeys.html",
		"FXO" : "alg-fxoparam.html",
		"FXS" : "alg-fxsparam.html",
		"Driver" : "alg-driver.html"
	},
	"sip" : {
		"SIP Endpoints" : "sip-endpoints.html",
		"Sip Endpoints Edit" : "sip-endpoints-edit.html",
		"FXS Batch Binding SIP" : "sip-bendpoints.html",
		"Batch Create SIP" : "sip-batch-endpoints.html",
		"Advanced SIP Settings" : "sip-adv-settings.html",
		"Sip Account Security" : "sip-security.html"
	},
	"routing" : {
		"Call Routing Rules" : "routing-rules.html",
		"Call Routing Rules Edit" : "routing-rules-edit.html",
		"Groups" : "routing-groups.html",
		"Groups Edit" : "routing-groups-edit.html",
		"Batch Create Rules" : "sip-fxo-binding.html",
		"Advanced" : "routing-advanced.html"
	},
	"network" : {
		"Basic Settings" : "network-vlan.html",
		// "Lan Settings" : "network-lan.html",
		// "Wan Settings" : "network-wan.html",
		"VPN Settings" : "network-openvpn.html",
		"DDNS Settings" : "network-ddns.html",
		"Toolkit" : "network-toolkit.html",
		"Security Settings" : "network-switch.html",
		"Security Rules" : "network-rules.html",
		"Security Rules Edit" : "network-rules-edit.html"
	},
	"advanced" : {
		"Asterisk API" : "adv-astapi.html",
		"Asterisk CLI" : "adv-astcli.html",
		"Asterisk File Editor" : "adv-astfileeditor.html",
		"Asterisk File Editor Edit" : "adv-astfileeditor-edit.html",
		"Cloud" : "adv-cloud.html",
		"Tr069" : "adv-tr069.html",
		"SNMP" : "adv-snmp.html",
	},
	"logs" : {
		"Log Settings" : "log-settings.html",
		"System" : "log-sys.html",
		"Asterisk" : "log-ast.html",
		"SIP" : "log-sip.html",
		"DAHDI" : "log-dahdi.html",
		"CDR" : "log-cdr.html"
	}
};
function set_title(){
	for(var item in title){
		for(var itm in title[item]){
			if(title[item][itm] == get_url()){
				switch(itm){
					case 'Status':
						itm = 'System Status';
						break;
					case 'Time':
						itm = 'Time Settings';
						break;
					case 'Tools':
						itm = 'System Tools';
						break;
					case 'VPN Settings':
						itm = 'OpenVPN Settings';
						break;
					case 'Toolkit':
						itm = 'Network Toolkit';
						break;
					case 'System':
						itm = 'System Logs';
						break;
					case 'Asterisk':
						itm = 'Asterisk Logs';
						break;
					case 'SIP':
						itm = 'SIP Logs';
						break;
				}
				document.title = language(itm);
			}
		}
	}
}

//get url name. eg:sip-endpoints.html
function get_url(){
	var url = location.href;
	url = url.substring(url.lastIndexOf("/")+1);
	if(url.indexOf("?")>0){
		url = url.substring(0,url.lastIndexOf("?"));
	}
	return url;
}

//get a url array.  eg:temp2['name']
function get_url_para(){
	var url = location.href;
	var temp = url.split('?');
	
	if(temp[1] != undefined){
		temp = temp[1].split('&');
		var temp1 = [];
		var temp2 = [];
		for(var i=0;i<temp.length;i++){
			temp1[i] = temp[i].split('=');
			temp2[temp1[i][0]] = temp1[i][1];
		}
		return temp2;
	}
	return '';
}

//for Navigation
function Is_in_Parenttitle(item){
	var url = get_url();
	for(var tmp in title){
		if(tmp==item){
			for(var tmp1 in title[tmp]){
				if(title[tmp][tmp1]==url){
					return true;
				}
			}
		}
	}
	return false;
}

//for Navigation
function Is_in_Subtitle(item){
	var url = get_url();
	if(url==item){
		return true;
	}
	return false;
}

function Navigation(data_temp){
	var i = 0;
	var _display;
	var _nav;
	var _con;
	var k = 0;
	var flex_routing_sw = data_temp['_FlexRoutingSw'];
	var type=_Define['type'];
	var system_type = data_temp['_systemtype'];
	var wan_exist = data_temp['_EthennetPort'];//0:lan;1:lan&wan;2:no;
	
	for(var item in title){
		k++;
	}
	var url = get_url();
	var nav_html_str = '<UL id="nav">';
	var menu_con_str = '<div id=menu_con>';
	for(var item in title){
		if(flex_routing_sw == 0){
			//if(type==2 && item=='routing'){continue;}
		}
		
		Is_in_Parenttitle(item)?_display='block':_display='none';
		menu_con_str += '<div style="DISPLAY: '+_display+'" id="qh_con'+i+'"><UL><li class="bgl"><img src="../images/bg_l.gif" /></li>';
		var j = 0;
		for(var name in title[item]){
			if(flex_routing_sw == 0){
				if(type==2 && item == 'routing'){
					if(url=='routing-rules.html' && title[item][name]=='routing-rules.html'){continue;}
					if(name=='Call Routing Rules'){continue;}
					if(url=='routing-groups.html' && title[item][name]=='routing-groups.html'){continue;}
					if(name=='Groups'){continue;}
					if(url=='sip-fxo-binding.html' && title[item][name]=='sip-fxo-binding.html'){continue;}
					if(name=='Batch Create Rules'){continue;}
				}
			}else{
				if(url=='alg-pickupsettings.html' && title[item][name]=='alg-pickupsettings.html'){continue;}
				if(name=='Pickup'){continue;}
			}
			
			/* features begin */
			if(data_temp['_features']['_SNMP'] == 0){
				if(url=='adv-snmp.html' && title[item][name]=='adv-snmp.html'){continue;}
				if(name=='SNMP'){continue;}
			}
			if(data_temp['_features']['_OpenVoxCloud'] == 0){
				if(url=='adv-cloud.html' && title[item][name]=='adv-cloud.html'){continue;}
				if(name=='Cloud'){continue;}
			}
			if(data_temp['_features']['_TR069'] == 0){
				if(url=='adv-tr069.html' && title[item][name]=='adv-tr069.html'){continue;}
				if(name=='Tr069'){continue;}
			}
			/* features end */
			
			if(type==0 && (name=='FXS' || name=='FXS Batch Binding SIP' || name=='Dial Matching Table' || name=='Pickup Settings' || name=='Special Function Keys')){continue;}
			if(type==2 && (name=='FXO' || name=='Batch Creat Rules')){continue;}
			if(system_type != 'openvox' && name == 'Cloud'){continue;}
			// if(wan_exist == 0 && name == 'Wan Settings'){continue;}
			/* edit page or child page begin */
			if(url=='alg-chnsettings-edit.html' && title[item][name]=='alg-chnsettings-edit.html'){continue;}
			if(name=='Channel Settings Edit'){continue;}
			if(url=='sip-endpoints-edit.html' && title[item][name]=='sip-endpoints-edit.html'){continue;}
			if(name=='Sip Endpoints Edit'){continue;}
			if(url=='routing-rules-edit.html' && title[item][name]=='routing-rules-edit.html'){continue;}
			if(name=='Call Routing Rules Edit'){continue;}
			if(url=='routing-groups-edit.html' && title[item][name]=='routing-groups-edit.html'){continue;}
			if(name=='Groups Edit'){continue;}
			if(url=='adv-astfileeditor-edit.html' && title[item][name]=='adv-astfileeditor-edit.html'){continue;}
			if(name=='Asterisk File Editor Edit'){continue;}
			if(url=='network-rules-edit.html' && title[item][name]=='network-rules-edit.html'){continue;}
			if(name=='Security Rules Edit'){continue;}
			/* edit page or child page end */
			if(j==0){
				if(i==0){
					Is_in_Parenttitle(item)?_nav='nav_on':_nav='nav_off';
					nav_html_str += '<li><a class="mynav '+_nav+'" id=mynav'+i+' href="./'+title[item][name]+'">'+language(item)+'</a></li>';
				}else{
					Is_in_Parenttitle(item)?_nav='nav_on':_nav='nav_off';
					nav_html_str += '<li class="menu_line">|</li><li><a class="mynav '+_nav+'" id=mynav'+i+' href="./'+title[item][name]+'">'+language(item)+'</a></li>';
				}
				Is_in_Subtitle(title[item][name])?_con='con_off':_con='con_on';
				menu_con_str += '<li class="bgbg"><a href="./'+title[item][name]+'" id="nav_'+i+j+'" class="'+_con+'">'+language(name)+'</a></li>';
			}else{
				Is_in_Subtitle(title[item][name])?_con='con_off':_con='con_on';
				menu_con_str += '<li class="menu_con_line">|</li><li class="bgbg"><a href="./'+title[item][name]+'" id="nav_'+i+j+'" class="'+_con+'">'+language(name)+'</a></li>';
			}
			j++;
		}
		menu_con_str += '<li class="bgr"><img src="../images/bg_r.gif" /></li>';
		menu_con_str += '</UL></div>';
		i++;
	}
	nav_html_str += '</UL>';
	menu_con_str += '</div>';
	var _html = nav_html_str+menu_con_str;
	
	$("#menu").html(_html);
	
	$(".mynav").mouseover(function(){
		$(".nav_li_hover").removeClass("nav_li_hover");
		$(this).addClass("nav_li_hover");
		var id = $(this).attr("id");
		id = id.substr(5,1);
		show_nav(id);
	});
		
	$("#menu").mouseleave(function(){
		var id = $(".nav_on").attr("id");
		id = id.substr(5,1);
		show_nav(id);
		$(".nav_li_hover").removeClass("nav_li_hover");
	});
	
	$("#qh_con1").css("margin-left", "-100px");
	
	return _html;
}
function show_nav(cur_num){
	var i = 0;
	for(var tmp in title){
		i++;
	}
	for(var num = 0 ; num <= i ; num++){
		if(cur_num == num){
			$("#qh_con"+num).css("display","block");
		} else {
			$("#qh_con"+num).css("display","none");
		}
	}
}
/*-----------------------------------------------------------------------------*/

/**
* Language
*
*/
function language(name, en_output){
	var value;
	if(_language[name] != undefined){
		value = _language[name];
	}else if(en_output != undefined){
		value = en_output;
	}else{
		value = name;
	}
	
	if(debug == 0){
		value = '['+value+']';
	}
	
	return value;
}

/*-----------------------------------------------------------------------------*/

/**
* CXF general js code new object
*
*/
var object = new urn_ast_AST_wsdl_ASTPortType_urn_ast_AST_wsdl_AST();
var _protocol = window.location.protocol;
var url_host = window.location.host;

object.url = _protocol+'//'+url_host+'/proxy';
/*-----------------------------------------------------------------------------*/

/**
* sort data by asc
* data => data come from service
* para => Follow this parameter to sort
*/
function sort_2d_arr(data, para){
	var arr = [];
	for(var item in data){
		arr.push(parseInt(data[item][para]));
	}
	arr.sort(function(a,b){return a-b;});
	if(para == '_section'){
		for(var item in arr){
			var temp = arr[item];
			var n = parseInt(item);
			if(temp == arr[n+1]){
				arr[n+1] = arr[n+1]+'-backup';
			}
		}
	}
	
	var sip_info = [];
	for(var i=0;i<arr.length;i++){
		for(var item in data){
			if(data[item][para] == arr[i]){//backup for sip
				sip_info.push(data[item]);
			}
		}
	}
	return sip_info;
}

//alg-chnsettings-edit == sip-fxo-binding == alg-chnsettings
function get_all_sip(sip_data,routing_data,all_analog_data,chnl,sip){
	var _select = '<input type="hidden" associated_chnnl_oldvalue="'+chnl+'">'+
			'<select size=1 name="associated_chnnl" id="associated_chnnl" onchange="siptrunk_change_editpage(this, '+chnl+')">'+
				'<option value="none">None</option>'+
				'<optgroup label="SIP">';
	for(var item in sip_data){
		var sip_sec = sip_data[item]['_section'];
		var temp = sip_sec.split('-');
		if(temp[1] != undefined){continue;}
		var value = 'sip-'+sip_sec;
		if(sip==sip_sec){
			_select = _select+'<option value="'+value+'" selected>'+sip_sec+'</option>';
		}else if(is_analog_use(all_analog_data,sip_sec) || (is_routing_use(routing_data,sip_sec) && _Define['type'] != 2)){
			_select = _select+'<option value="'+value+'" disabled>'+sip_sec+'</option>';
		}else{
			_select = _select+'<option value="'+value+'">'+sip_sec+'</option>';
		}
	}
	_select = _select+'</optgroup></select><span id="cassociated_channel"></span>';
	return _select;
}

function is_analog_use(all_analog_data, sip){
	for(var item in all_analog_data){
		if(all_analog_data[item]['_associatedchnnl'] == ''){continue;}
		var sip_trunk = all_analog_data[item]['_associatedchnnl'];
		if(sip_trunk == 'none'){continue;}
		var sip_temp = sip_trunk.split('-');
		if(sip_temp[1] == sip){return 1;}
	}
	return 0;
}

function is_routing_use(routing_data, sip){
	for(var item in routing_data){
		var from_channel = routing_data[item]['_fromchannel'];
		if(from_channel == ''){return 0;}
		var to_channel = routing_data[item]['_tochannel'];
		var to_temp = to_channel.split(",");
		var from_temp = from_channel.split('-');
		if(from_temp[1] == sip){
			return 1;
		}
		for(var i in to_temp){
			var i_temp = to_temp[i].split('-');
			if(sip == i_temp[1]){
				return 1;
			}
		}
	}
	return 0;
}
/*-----------------------------------------------------------------------------*/

/*
* judge is not a number
*/
function is_num(value){
	if(value == 0){return true;}
	var r = /^\+?[1-9][0-9]*$/; //unsigned int
	var res = r.test(value);
	return res;
}

/*
* //tip for user that wrong number value
*/
function string_filter_tip_run(value){
	var key = document.getElementById(value).value;
	if(!is_num(key)){
		$("#c"+value).html(language('js check dtmf integer 1'));
		document.getElementById(value).focus();
		return true;
	}
	return false;
}
/*----------------------------------------------------------------------------*/
function check_string_length(value){
	var key = document.getElementById(value).value;
	if(key.length > 31){
		$("#c"+value).html(language('limit character'));
		document.getElementById(value).focus();
		return true;
	}
	return false;
}

/*----------------------------------------------------------------------------*/
/**
* save Only once
*/
var save_click_flag = 0;
function save_only_once(){
	if(save_click_flag == 0){
		save_click_flag = 1;
		return true;
	}else{
		alert('You have saved it, please do not repeat it.');
		return false;
	}
}


/*----------------------------------------------------------------------------*/
/**
* error code come from server
*/
function error_tip(err_code){
	switch(err_code){
		case 2:
			alert('Save failed!');
			return false;
		case 3:
			alert('Failed to obtain configuration information.');
			return false;
		case 4:
			window.location.href = '404.html';
			return false;
		case 5:
			alert('Delete failed!');
			return false;
		case 6:
			alert('Rollback failed!');
			return false;
		case 7:
			alert('Database query error.');
			return false;
		case 8:
			alert('Application change failed.');
			return false;
		case 9:
			alert('Key parameter error.');
			return false;
		case 10:
			alert('save successfully, but back failure.');
			return false;
		default:
			return true;
	}
}
/*----------------------------------------------------------------------------*/
/**
* common data
*/
function header(data_temp){
	error_tip(data_temp['_result']);
	_Define['system_type'] = data_temp['_systemtype'];
	_Define['type'] = data_temp['_type'];
	var flex_routing_sw = data_temp['_FlexRoutingSw'];
	if(flex_routing_sw == 1){
		delete title['sip']['FXS Batch Binding SIP'];
	}
	if(_Define['system_type'] == 'nrtc'){
		delete title['sip']['Sip Account Security'];
	}
	
	Navigation(data_temp);
	set_title();
	
	//set child nav style
	var url = get_url();
	if(url=='alg-chnsettings-edit.html'){$("#nav_10").addClass('con_off');}
	if(url=='sip-endpoints-edit.html'){$("#nav_20").addClass('con_off');}
	if(url=='routing-rules-edit.html'){$("#nav_30").addClass('con_off');}
	if(url=='routing-groups-edit.html'){$("#nav_31").addClass('con_off');}
	if(url=='network-rules-edit.html'){$("#nav_45").addClass('con_off');}
	if(url=='adv-astfileeditor-edit.html'){$("#nav_52").addClass('con_off');}
	
	//header_image and footer_image
	var rand = Math.random();
	$("#bg").css("background","url("+data_temp['_headerimagepath']+"?v="+rand+") no-repeat");
	
	$("#bg").append("<div id='boot'></div>");
	$("#boot").css("background","url("+data_temp['_footerimagepath']+"?v="+rand+") no-repeat");
	
	//copyright
	$("#boot").html(data_temp['_copyright']);
	
	var nav_temp = get_url().split("-");
	var nav_type = nav_temp[0];
	if(_Define['system_type'] != 'emetrotel'){
		switch(nav_type){
			case 'system':
				$("#aeu").html("<img src='../images/icons/system.gif' />");
				break;
			case 'alg':
				$("#aeu").html("<img src='../images/icons/analog.gif' />");
				break;
			case 'sip':
				$("#aeu").html("<img src='../images/icons/sip.gif' />");
				break;
			case 'routing':
				$("#aeu").html("<img src='../images/icons/routing.gif' />");
				break;
			case 'network':
				$("#aeu").html("<img src='../images/icons/network.gif' />");
				break;
			case 'adv':
				$("#aeu").html("<img src='../images/icons/advanced.gif' />");
				break;
			case 'log':
				$("#aeu").html("<img src='../images/icons/logs.gif' />");
				break;
		}
	}else{
		if(nav_type == 'alg'){
			nav_type = 'analog';
		}else if(nav_type == 'adv'){
			nav_type = 'advanced';
		}else if(nav_type == 'log'){
			nav_type = 'logs';
		}
		$("#aeu").html("<h4>"+nav_type.toUpperCase()+"</h4>");
	}
}
/*----------------------------------------------------------------------------*/

/**
* footer
*/
function footer(){
	/*
	var footer_str = '';
	
	var myDate = new Date();
	var copyright_year = myDate.getFullYear();

	if(_Define['system_type'] == 'openvox'){
		footer_str += '<div id="boot">'+language('Copyright')+' © '+copyright_year+' '+language('OpenVox Copyright','OpenVox Analog Gateway All Rights Reserved.<br>TEL:+86-755-82535461 FAX:+86-755-83823074')+'</div>';
	}else if(_Define['system_type'] == 'yfree'){
		footer_str += '<div id="boot">Copyright © Shanghai HaoShen Information Technology Co.,Ltd All rights reserved.   沪ICP备14010026号<br>TEL:+86-21-33191992-801   Fax:+86-21-33191992-860</div>';
	}else if(_Define['system_type'] == 'nrtc'){
		footer_str += '<div id="boot">NATIONAL RADIO AND TELECOMMUNICATION CORPORATION, HARIPUR PAKISTAN<br>TEL:(0995)611382, 666611, 611728 FAX: (0995)610933 E-mail: marketing@nrtc.com.pk, md@nrtc.com.pk<br> Web-site: www.nrtc.com.pk</div>';
	}else if(_Define['system_type'] == 'trun'){
		footer_str += '<div id="boot">成都市武侯区科华北路69号世外桃源广场B座620 <br> TEL :028-86060665 <br> Web-site: http://www.028tianrun.com</div>';
	}else if(_Define['system_type'] == 'ryu'){
		footer_str += '<div id="boot">龍冠科技股份有限公司 <br>新北市中和區圆通路369巷10號1楼<br>TEL:(02)8245-2085   FAX:(02)2240-4063</div>';
	}else{
		footer_str += '<div id="boot">Analog Gateway.  <br></div>';
	}

	if(debug == 0){
		var show_display = 'display:block';
	}else{
		var show_display = 'display:none';
	}
	footer_str += '<div id="language_debug" class="language_debug" style="'+show_display+'">'+
					'<span>'+language('LANGUAGE DEBUG MODE','LANGUAGE DEBUG MODE')+'</span>'+
				'</div>';
				
	$("#bg").append(footer_str);
	*/
}