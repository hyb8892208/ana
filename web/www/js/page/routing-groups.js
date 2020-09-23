/*******************************SHOW GROUPS BEGIN*********************************/
(function(){
	$("#lang_group_name").html(language('Group Name'));
	$("#lang_type").html(language('Type'));
	$("#lang_policy").html(language('Policy'));
	$("#lang_members").html(language('Members'));
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

function show_groups(data_temp){
	var group_data = data_temp['_group']['_item'];
	
	var max_order = 0;
	if(group_data.length != 0){
		var order_arr = [];
		for(var item in group_data){
			order_arr.push(group_data[item]['_order']);
		}
		order_arr.sort(function(x, y){
			return x - y;
		});
		max_order = order_arr[order_arr.length-1];
	}
	
	var html_str = '';
	if(data_temp['_combuf']['_systemtype'] == 'emetrotel'){
		var bgcolor = '#E2F0D9';
	}else{
		var bgcolor = '#E8EFF7';
	}
	for(var i=0;i<group_data.length;i++){
		if(group_data[i]['_type'] == 0){
			var type = 'sip';
		}else if(group_data[i]['_type'] == 1){
			var type = 'fxo';
		}
		
		if(group_data[i]['_policy'] == 0){
			var policy = 'Ascending';
		}else if(group_data[i]['_policy'] == 1){
			var policy = 'Descending';
		}else if(group_data[i]['_policy'] == 2){
			var policy = 'Roundrobin';
		}else if(group_data[i]['_policy'] == 3){
			var policy = 'Reverse Roundrobin';
		// }else if(group_data[i]['_policy'] == 4){
			// var policy = 'leastrecent';
		// }else if(group_data[i]['_policy'] == 5){
			// var policy = 'fewestcalls';
		// }else if(group_data[i]['_policy'] == 6){
			// var policy = 'random';
		}else if(group_data[i]['_policy'] == 4){
			var policy = 'Ringall';
		}
		
		var temp = group_data[i]['_members'].split(',');
		var name = '';
		if(temp[0] != ''){
			for(var item in temp){
				var tmp = temp[item].split('-');
				name += tmp[1]+', ';
			}
		}
		name = name.substring(0,name.length-2);
		html_str +=	"<tr bgcolor='"+bgcolor+"'>"+
				"<td>"+group_data[i]['_section']+"</td>"+
				"<td>"+type+"</td>"+
				"<td>"+language(policy)+"</td>"+
				"<td>"+name+"</td>"+
				"<td>"+
					"<a href='routing-groups-edit.html?name="+group_data[i]['_section']+"&edit=edit&order="+(parseInt(max_order)+1)+"' onclick='javascript:window.location.href=this.href' style='margin-left:2px;margin-right:8px;'>"+
						"<button type='button' value='Modify' style='width:32px;height:32px;' ><img src='../images/edit.gif'></button>"+
					"</a>"+
					"<button type='submit' class='delete_input' value='"+group_data[i]['_section']+"' style='width:32px;height:32px;' >"+
						"<img src='../images/delete.gif'>"+
					"</button>"+
				"</td>"+
			"</tr>"
	}
	
	$("#tab_groups").html(html_str);
	$(".tdrag").after(
		'<a style="margin-top:15px;display:inline-block" href="./routing-groups-edit.html?edit=new&order='+(parseInt(max_order)+1)+'" onclick="javascript:window.location.href=this.href">'+
			'<input type="button" class="save_input" id="new_group_input" value="'+language('New Group')+'" />'+
		'</a>'
	);
}

object.AGRoutingGroupGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_groups(data_temp);
	footer();
	
	delete_groups();
}

function error_back(data){
	window.location.href = 'error.html';
}
/*******************************SHOW GROUPS END*********************************/


/*******************************DELETE GROUPS BEGIN*********************************/
function delete_groups(){
	$(".delete_input").click(function(){
		ret = confirm("Are you sure to delete you selected ?");
		if(ret) {
			var SectionArr = new AST_SectionArr();
			var section = new AST_Section();
			var value = $(this).val();
			section._section = value;
			SectionArr._item.push(section);
			object.AGRoutingGroupsDel(del_succeed_back, del_error_back, SectionArr);
		}
	});
}

function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'routing-groups.html?del=true';
	}
}

function del_error_back(data){
	alert(language('delete failed'));
}
/*******************************DELETE GROUPS END*********************************/