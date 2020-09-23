function onload_show(){
	$("#enable").iButton();
}

(function(){
	$("#dhcp_update_li").html(language('DHCP Update'));
	$("#lang_enable").html(language('Enable'));
	$("#lang_enable_help").html(language('Enable help', 'Enable'));
	
	$('.save_input').val(language('Save'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

/*********************************************************************************/
function dhcp_update_show(data_temp){
	if(data_temp['_enable'] == 1){
		var enable = true;
	}else{
		var enable = false;
	}
	
	document.getElementById('enable').checked = enable;
}

object.AGSystemDHCPUpdateGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	dhcp_update_show(data_temp);
	footer();
	
	onload_show();
	
	$('.save_input').click(function(){
		if(save_only_once()){
			$("#loading_image").show();
			dhcp_update_save();
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*********************************************************************************/

/*********************************************************************************/
function dhcp_update_save(){
	if(document.getElementById('enable').checked){
		var enable = 1;
	}else{
		var enable = 0;
	}
	
	object.AGSystemDHCPUpdateSave(save_succeed_back, save_error_back, enable);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'dhcp-update.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*********************************************************************************/