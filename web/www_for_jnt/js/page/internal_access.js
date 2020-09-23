(function(){
	$("#save_input").val(language('Save'));
	$("#lang_demo_enable").html(language('Demo Enable'));
	$("#lang_demo_enable_help").html(language('Demo Enable'));
	
}());

function show_demo_enable(data){
	var demo_enable = data['_combuf']['_funcflag']['_DemoFuncFlag'];
	
	if(demo_enable == 1){
		var demo_enable_checked = true;
	}else{
		var demo_enable_checked = false;
	}
	document.getElementById('demo_enable').checked = demo_enable_checked;
}

object.AGLogGetAll(succeed_back, error_back);

function succeed_back(data){
	header(data['_combuf']);
	show_demo_enable(data);
	footer();
	
	$("#demo_enable").iButton();
	
	$("#save_input").click(function(){
		save_demo_enable();
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

/*****************************Save Demo Enable*******************************/
function save_demo_enable(){
	if(document.getElementById('demo_enable').checked){
		var demo_enable = 1;
	}else{
		var demo_enable = 0;
	}
	
	object.AGSystemDemoFlagSave(save_succeed_back, save_error_back, demo_enable);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'internal_access.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}