/***************************************SHOW SYSTEM BACKUP BEGIN*************************************/
(function(){
	$(".lang_new_label").html(language('New Label'));
	$("#lang_new_label_help").html(language('New Label help'));
	$("#new_tag_button").html(language('Save'));
	$("#lang_label").html(language('Labels'));
	$("#lang_label_name").html(language('Label Name'));
	$("#lang_actions").html(language('Actions'));
	$("#lang_commit_open_tip").html('*'+language('Commit Open help','If you need to use the label function, please open the configuration record switch on the configuration record page.'));
}());

object.AGTagList(succeed_back, error_back, 1);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_system_tag(data_temp);
	footer();
	
	//backup
	backup();
	
	//add 
	tag_add();
	
	//delete
	tag_del();
}

function error_back(data){
	window.location.href = 'error.html';
}

function show_system_tag(data_temp){
	var tag_data = data_temp['_tags']['_item'];
	var num = data_temp['_nums'];
	var commitsw = data_temp['_commitsw'];
	
	var tag_html = '';
	for(var item in tag_data){
		if(commitsw == 0){
			var _disabled = 'disabled';
		}
		
		tag_html +=	"<tr>"+
			"<td style='text-align:center;'>"+
				(parseInt(item)+1)+
			"</td>"+
			"<td class='name'>"+tag_data[item]['_section']+"</td>"+
			"<td>"+
				"<button type='button' class='back_button' style='margin:0 10px;' "+_disabled+" >"+language('Back')+"</button>"+
				"<button type='button' class='del_button' "+_disabled+" >"+language('Delete')+"</button>"+
			"</td>"+
		"</tr>";
	}
	$("#tag_content").html(tag_html);
	
	if(commitsw == 0){
		$("#new_tag_button").attr("disabled", "disabled");
		$("#lang_commit_open_tip").show();
	}
	
	var url = get_url_para();
	if(url['del'] == 'true'){
		$("#feed_back_tip").text(language('Delete Successfully'));
	}
}
/***************************************SHOW SYSTEM BACKUP END*************************************/


/**********************************************TAG ADD BEGIN*************************************/
function tag_add(){
	$("#new_tag_button").click(function(){
		var tag_name = $("#tag_name").val();
		if(tag_name != ''){
			object.AGTagAdd(tag_succeed_back, tag_error_back, tag_name);
		}else{
			alert(language('label save tip', 'Label Name can not be null!'));
		}
	});
}

function tag_succeed_back(data){
	window.location.href = "system-label.html?tip=true";
}

function tag_error_back(data){
	alert(language('new failed'));
}
/**********************************************TAG ADD END*************************************/


/**********************************************BACKUP BEGIN*************************************/
function backup(){
	var message = '';
	var commit_id = '';
	
	$(".back_button").click(function(){
		var tag_name = $(this).parent().siblings('.name').text();
		var ret = confirm(language('label back tip', 'Are you sure return to label name')+' : '+tag_name+'?');
		if(ret){
			message = 'Revert Label: ' + tag_name;
			object.AGCommitChekout(backup_succeed_back, backup_error_back, message, tag_name);
		}
	});
}

function backup_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'system-record.html';
	}
}

function backup_error_back(data){
	alert(language('back failed'));
}
/**********************************************BACKUP END*************************************/


/**********************************************DELETE BEGIN*************************************/
function tag_del(){
	$(".del_button").click(function(){
		var ret = confirm(language('label delete tip','Are you sure delete this label?'));
		if(ret){
			var tag_name = $(this).parent().siblings('.name').text();
			object.AGTagDel(del_succeed_back, del_error_back, tag_name);
		}
	});
}

function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'system-label.html?del=true';
	}
}

function del_error_back(data){
	alert(language('delete failed'));
}
/**********************************************DELETE END*************************************/