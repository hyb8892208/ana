function check_op()
{
	return true;
	var channelnum = document.getElementById("channelnum").value;
	var signalling=document.getElementById("signalling").value
	if(trim(channelnum) == ''){
		return false;
	}
	return true;
}
function mode_change(){
	var service_mode = $("#service_mode").val();
	if(service_mode != 'customize'){
		$("#customize_server").hide();
	} else {
		$("#customize_server").show();
	}
}

$("#show_password").change(function(){
	if($(this).attr("checked") == 'checked'){
		$("#password").prop("type","text");
	}else{
		$("#password").prop("type","password");
	}
});

function onload_show(){
	$("#enable_ami").iButton();
	
	mode_change();
	
	var value=$("#enable_ami").attr('checked');
	if(value!='checked'){
		$('.connect2').hide();
	}else{
		$('.connect2').show();
	}
	
	$("#enable_ami").change(function(){
		var value=$(this).attr('checked');
		if(value!='checked')$('.connect2').hide();
		else $('.connect2').show();
	});
}

(function(){
	$("#lang_cloud").html(language('Cloud'));
	$("#lang_enable_cloud_service").html(language('Enable Cloud Service'));
	$("#lang_choose_service").html(language('Choose Service'));
	$("#lang_choose_service_help").html(language('Choose Service help', "choosing a remote server the current device will connect"));
	$("#lang_china").html(language('China'));
	$("#lang_america").html(language('America'));
	$("#lang_europe").html(language('Europe'));
	$("#lang_customize").html(language('Customize'));
	$("#lang_account").html(language('Account'));
	$("#lang_account_help").html(language('cloud help@adv-account', "the account which is registered in OpenVox cloud center."));
	$("#lang_password").html(language('Password'));
	$("#lang_password_help").html(language('cloud help@adv-password',"The password of cloud account."));
	$("#lang_connection_status").html(language('Connection Status'));
	$("#lang_connection_status_help").html(language('cloud help@adv-Connection Status',"Cloud management connection status."));
	$("#lang_save").val(language('Save'));
	$("#lang_cloud_signmessage_help").html(language('cloud signmessage help',"Don't have an account?")+'<a href="https://cloud.openvox.com.cn" target="black" >'+language('cloud sign help',"Sign up")+'</a>');
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
		get_state();
	}else{
		object.AGAdvCloudGetStatus(state_success_back_open, state_error_back_open);
	}
})();

/******************************************************************************************/
function show_cloud(cloud_data){
	if(cloud_data['_enabled'] == 1){
		$("#enable_ami").attr('checked','checked');
	}
	
	if(cloud_data['_country'] == ""){
		cloud_data['_country'] = "china";
	}
	document.getElementById('service_mode').value = cloud_data['_country'];
	
	document.getElementById('username').value = cloud_data['_username'];
	
	document.getElementById('password').value = cloud_data['_secret'];
	
	document.getElementById('customize_server').value = cloud_data['_url'];
}

object.AGAdvCloudGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var cloud_data = data_temp['_general'];
	
	header(data_temp['_combuf']);
	show_cloud(cloud_data);
	footer();
	
	$("#lang_save").click(function(){
		if(check_op() && save_only_once()){
			$("#loading_image").show();
			save_cloud();
		}
	});
	
	onload_show();
}

function error_back(data){
	window.location.href = 'error.html';
}

/******************************************************************************************/
function save_cloud(){
	var general = new AST_AdvCloudGeneral();
	
	if(document.getElementById('enable_ami').checked){
		var enabled = 1;
	}else{
		var enabled = 0;
	}
	general._enabled = enabled;
	
	
	var username = document.getElementById('username').value;
	general._username = username;
	
	var _password = document.getElementById('password').value;
	general._secret = _password;
	
	var service_mode = document.getElementById('service_mode').value;
	general._country = service_mode;
	
	var customize_server = document.getElementById('customize_server').value;
	general._url = customize_server;
	
	var AdvCloudSave = new AST_AdvCloudSave();
	AdvCloudSave._general = general;
	
	object.AGAdvCloudSave(save_succeed_back, save_error_back, AdvCloudSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-cloud.html?save=true';
	}
}

function save_error_back(data){
	save_click_falg = 0;
	alert(language('save failed'));
}

/******************************************************************************************/
var times = 0;
var interval;
var connect_ok = "<span style='color:green'>"+language('connected')+"</span>";
function get_state(){
	$(".connect").html('<img src="/images/loading.gif" />');
	interval = setInterval(function(){object.AGAdvCloudGetStatus(state_success_back, state_error_back);}, 10000);
}

function state_success_back_open(data){
	var result = data['_cloudstatus'];
	
	if(result == 200){
		$(".connect").html(connect_ok);
	}else{
		if(result == 440){
			var str = language("Password error");
		}else if(result == 441){
			var str = language("User does not exist");
		}else if(result == 442){
			var str = language("You have been blacklisted");
		}else{
			var str = language("Failed to connect");
		}
		var connect_no = "<span style='color:red'>"+str+"</span>";
		$(".connect").html(connect_no);
	}
}

function state_success_back(data){
	var result = data['_cloudstatus'];
	
	if(result == 200){
		$(".connect").html(connect_ok);
		window.clearInterval(interval);
	}else if(result == 0){
		$(".connect").html('<img src="/images/loading.gif" />');
		
		times++;
	}else if(times >= 30){
		var str = language("Connection timed out");;
		window.clearInterval(interval);
	}else{
		if(result == 440){
			var str = language("Password error");
			window.clearInterval(interval);
		}else if(result == 441){
			var str = language("User does not exist");
			window.clearInterval(interval);
		}else if(result == 442){
			var str = language("You have been blacklisted");
			window.clearInterval(interval);
		}
		var connect_no = "<span style='color:red'>"+str+"</span>";
		$(".connect").html(connect_no);
	}
}

function state_error_back_open(data){
	alert("Get State Error");
}
function state_error_back(data){
	alert("Get State Error");
}