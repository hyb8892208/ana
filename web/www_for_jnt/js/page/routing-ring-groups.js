/*****************************SHOW GROUPS BEGIN***************************************/
(function(){
	$("#lang_group_number").html(language('Group Number'));
	$("#lang_members").html(language('Members'));
	$("#lang_timeout").html(language('Timeout'));
	$("#lang_actions").html(language('Actions'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}else if(url['del'] == 'true'){
		$("#feed_back_tip").text(language('Delete Successfully'));
	}else if(url['new'] == 'true'){
		$("#feed_back_tip").text(language('Create Successfully'));
	}
}());

function show_groups_dial(data_temp){
	var groups_data = data_temp['_group']['_item'];
	
	var html_str = '';
	for(var i=0;i<groups_data.length;i++){
		var group_number = groups_data[i]['_dialnumber'];
		var timeout = groups_data[i]['_dialtimeout'];
		var members = groups_data[i]['_members'].replace(/fxs/g,'S');
		
		html_str += "<tr bgColor=#E8EFF7>"+
			"<td>"+group_number+"</td>"+
			"<td>"+members+"</td>"+
			"<td>"+timeout+"</td>"+
			"<td>"+
				"<a href='routing-ring-groups-edit.html?name="+group_number+"&edit=edit' onclick='javascript:window.location.href=this.href' style='margin-left:2px;margin-right:8px;'>"+
					"<button type='button' value='Modify' style='width:32px;height:32px;' ><img src='../images/edit.gif'></button>"+
				"</a>"+
				"<button type='submit' class='delete_input' value='"+group_number+"' style='width:32px;height:32px;' >"+
					"<img src='../images/delete.gif'>"+
				"</button>"+
			"</td>"+
		"</tr>";
	}
	
	$("#tab_groups").html(html_str);
	$(".tdrag").after(
		'<a style="margin-top:15px;display:inline-block" href="./routing-ring-groups-edit.html?edit=new" onclick="javascript:window.location.href=this.href">'+
			'<input type="button" class="save_input" id="new_group_input" value="'+language('New Group')+'" />'+
		'</a>'
	);
}

object.AGRoutingGroupsDialGetAll(succeed_back, error_back);

function succeed_back(data){
	console.log(data)
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_groups_dial(data_temp);
	footer();
	
	delete_groups_dial();
}

function error_back(){
	window.location.href = 'error.html';
}
/*****************************SHOW GROUPS END***************************************/


/*****************************DELETE GROUPS BEGIN***************************************/
function delete_groups_dial(){
	$(".delete_input").click(function(){
		ret = confirm('Are you sure to delete you selected ?');
		if(ret){
			var SectionArr = new AST_SectionArr();
			var section = new AST_Section();
			var value = $(this).val();
			section._section = value;
			SectionArr._item.push(section);
			object.AGRoutingGroupsDialDel(del_succeed_back, del_error_back, SectionArr);
		}
	})
}

function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'routing-ring-groups.html?del=true';
	}
}

function del_error_back(data){
	alert(language('delete failed'));
}
/*****************************DELETE GROUPS BEGIN***************************************/