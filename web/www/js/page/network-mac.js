function check(){
	if(confirm(language("Burn Confirm",  "After clicking 'burning' to complete, the device will automatically shut down! Do you want to continue?"))){
		var lan_mac = document.getElementById('lan_mac').value;
		var wan_mac = document.getElementById('wan_mac').value;
		
		document.getElementById('clan_mac').innerHTML = "";
		document.getElementById('cwan_mac').innerHTML = "";
		var rex=/^[0-9a-fA-F]{12}$/i;
		if(!rex.test(lan_mac)) {
			document.getElementById('clan_mac').innerHTML = con_str(language("Mac Tip", 'Please enter a 12-bit string with character requirements of 0-9 or a-f or A-F'));
			document.getElementById('lan_mac').focus();
			return false;
		}
		
		if(wan_mac != ''){
			if(!rex.test(wan_mac)) {
				document.getElementById('cwan_mac').innerHTML = con_str(language("Mac Tip", 'Please enter a 12-bit string with character requirements of 0-9 or a-f or A-F'));
				document.getElementById('wan_mac').focus();
				return false;
			}
		}
	}else{
		return false;
	}

	return true;
}

function mac_show_tip(that, type, cur_lan_mac, cur_wan_mac){
	var rex=/^[0-9a-fA-F]{12}$/i;
	if(type == 'lan'){
		var lan_mac = document.getElementById("lan_mac").value;
		document.getElementById('clan_mac').innerHTML = "";
		
		if(!rex.test(lan_mac)) {
			document.getElementById('clan_mac').innerHTML = con_str(language("Mac Tip", 'Please enter a 12-bit string with character requirements of 0-9 or a-f or A-F'));
			return false;
		}
	}else{
		var wan_mac = document.getElementById("wan_mac").value;
		document.getElementById('cwan_mac').innerHTML = "";
		
		if(wan_mac != ''){
			if(!rex.test(wan_mac)) {
				document.getElementById('cwan_mac').innerHTML = con_str(language("Mac Tip", 'Please enter a 12-bit string with character requirements of 0-9 or a-f or A-F'));
				return false;
			}
		}
	}
	
	var new_mac = $.trim(that.val()).toLowerCase();
	
	if(type == 'lan'){
		document.getElementById('clan_mac').innerHTML = "";
		var old_mac = cur_lan_mac;
	}else{
		document.getElementById('cwan_mac').innerHTML = "";
		var old_mac = cur_wan_mac;
	}
	old_mac = $.trim(old_mac).toLowerCase();
	
	if(new_mac != old_mac){
		if(type == 'lan'){
			document.getElementById('clan_mac').innerHTML = "<span class='incorrect'></span>"+con_str(language('MAC Address Diff','Note: MAC address is inconsistent with current.')+"&nbsp&nbspMAC:"+old_mac);
		}else{
			document.getElementById('cwan_mac').innerHTML = "<span class='incorrect'></span>"+con_str(language('MAC Address Diff','Note: MAC address is inconsistent with current.')+"&nbsp&nbspMAC:"+old_mac);
		}
	}else{
		if(type == 'lan'){
			document.getElementById('clan_mac').innerHTML = "<span class='correct'></span>"+"<span style='color:#008100;'>"+language('MAC Address Same','MAC address is the same as the current one.')+"&nbsp&nbspMAC:"+old_mac+"</span>";
		}else{
			document.getElementById('cwan_mac').innerHTML = "<span class='correct'></span>"+"<span style='color:#008100;'>"+language('MAC Address Same','MAC address is the same as the current one.')+"&nbsp&nbspMAC:"+old_mac+"</span>";
		}
	}
}
/***************************************************************************/
(function(){
	$("#lang_lan_ipv4").html(language('LAN IPv4'));
	$("#lang_wan_ipv4").html(language('WAN IPv4'));
	$(".lang_interface").html(language('Interface'));
	$(".lang_interface_help").html(language('Interface help','The name of network interface.'));
	$(".lang_mac").html(language('MAC'));
	$(".lang_mac_help").html(language('MAC help','Physical address of your network interface.')+'<br/>'+language("Mac Tip", 'Please enter a 12-bit string with character requirements of 0-9 or a-f or A-F'));
	$("#burn_submit").val(language('Burn'));
}());

function show_network_mac(data_temp){
	var lan_mac = $.trim(data_temp['_lanmac']);
	var wan_mac = $.trim(data_temp['_wanmac']);
	var vlanflag = data_temp['_vlanflag'];
	
	lan_mac = lan_mac.replace(/:/g, '');
	wan_mac = wan_mac.replace(/:/g, '');
	
	if(wan_mac == ""){
		document.getElementById('wan_mac').disabled = true;
	}
	
	$("#lan_mac").bind('input propertychange', function(){
		var that = $(this);
		
		mac_show_tip(that, 'lan', lan_mac, wan_mac);
	});
	
	$("#wan_mac").bind('input propertychange', function(){
		var that = $(this);
		
		mac_show_tip(that, 'wan', lan_mac, wan_mac);
	});
	
	if(vlanflag == 0){
		$("#show_wan").hide();
	}
}

object.AGNetworkBurnMacGet(succeed_back,error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data['_get']['_combuf']);
	show_network_mac(data_temp);
	footer();
	
	$("#burn_submit").click(function(){
		if(check()){
			if(save_only_once()){
				save_network_mac();
			}
		}
	});
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}

function error_back(data){
	window.location.href = 'error.html';
}

/***************************************************************************/
function save_network_mac(){
	var LanMac = document.getElementById('lan_mac').value;
	if(LanMac == ''){
		LanMac = null;
	}
	
	var WanMac = document.getElementById('wan_mac').value;
	if(WanMac == ''){
		WanMac = null;
	}
	
	object.AGNetworkBurnMac(save_succeed_back, save_error_back, LanMac, WanMac);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-mac.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}