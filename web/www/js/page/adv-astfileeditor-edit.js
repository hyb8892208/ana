function goto()
{
	window.location.href = "adv-astfileeditor.html";
}
/***********************************************************************************/


/************************SHOW ADV ASTFILEEDITOR EDIT BEGIN*******************************/
function adv_show(context){
	$("#context").text(context);
	if(url['section'] != undefined){
		$("#file_name_span").text(url['section']);
	}else{
		$("#file_name_span").after('<input type="text" id="new_file_name" style="width:120px;" />.conf');
	}
	
	/* other info */
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	$(".delete_input").val(language('Delete File'));
	$("#lang_edit").html(language("Edit"));
	if(url['section'] == undefined){
		$(".delete_input").css('display', 'none');
	}
}

var url = get_url_para();
var section = '/etc/asterisk/'+url['section'];

object.AGAdvAstfileeditorEditGetOne(succeed_back, error_back, section);

function succeed_back(data){
	var data_temp = data['_get'];
	var context = data_temp['_result'];
	
	header(data_temp['_combuf']);
	adv_show(context);
	footer();
	
	$(".save_input").click(function(){
		if(save_only_once()){
			$("#loading_image").show();
			adv_save();
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/************************SHOW ADV ASTFILEEDITOR EDIT END*******************************/



/************************SAVE ADV ASTFILEEDITOR EDIT BEGIN*******************************/
function adv_save(){
	var context = document.getElementById('context').value;
	
	var fname = '/etc/asterisk/'
	if(url['section'] != undefined){
		fname += $("#file_name_span").text();
	}else{
		fname += $("#new_file_name").val()+'.conf';
	}
	
	object.AGAdvAstfileeditorEditSave(save_succeed_back, save_error_back, fname, context);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-astfileeditor.html?save=true';
	}
}

function save_error_back(data){
	alert(language('save failed'));
}
/************************SAVE ADV ASTFILEEDITOR EDIT END*******************************/


/************************DEL ADV ASTFILEEDITOR EDIT BEGIN*******************************/
function del_save(){
	var filepath = section;
	
	object.AGAdvAstfileeditorEditDel(del_succeed_back, del_error_back, filepath);
}
$(".delete_input").click(function(){
	var ret = confirm(language('file delete tip', 'Are you sure to delete this file?'));
	if(ret){
		del_save();
	}
});

function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'adv-astfileeditor.html?del=true';
	}
}

function del_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/************************DEL ADV ASTFILEEDITOR EDIT END*******************************/