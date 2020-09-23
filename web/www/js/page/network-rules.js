function delete_click(value1,value2){
	var ret = confirm(language("Delete confirm","Are you sure to delete you selected ?"));

	if(ret) {
		document.getElementById('sel_rule_name').value = value1;
		document.getElementById('order').value = value2;
		return true;
	}

	return false;
}

/*************************************************************************/
(function(){
	$("#lang_rule_name").html(language('Rule Name'));
	$("#lang_type").html(language('Type'));
	$("#lang_protocol").html(language('Protocol'));
	$("#lang_ip").html(language('IP'));
	$("#lang_port").html(language('Port'));
	$("#lang_actions").html(language('Actions'));
	$("#lang_new_rule").val(language('New Rule'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}else if(url['del'] == 'true'){
		$("#feed_back_tip").html(language('Delete Successfully'));
	}else if(url['new'] == 'true'){
		$("#feed_back_tip").html(language('Create Successfully'));
	}
}());

function show_network_rules(rules_data){
	var html_str = '';
	
	for(var item in rules_data){
		var name = rules_data[item]['_name'];
		
		if(rules_data[item]['_port1'] != 0 && rules_data[item]['_port2'] != 0){
			var port = rules_data[item]['_port1'] + ':' + rules_data[item]['_port2'];
		}else{
			if(rules_data[item]['_port1'] != 0){
				var port = rules_data[item]['_port1'];
			}else if(rules_data[item]['_port2'] != 0){
				var port = rules_data[item]['_port2'];
			}else{
				var port = '';
			}
		}
		
		if(rules_data[item]['_ip'] != 0 && rules_data[item]['_mask'] != 0){
			var ip = rules_data[item]['_ip'] + '/' + rules_data[item]['_mask'];
		}else{
			if(rules_data[item]['_ip'] != 0){
				var ip = rules_data[item]['_ip'];
			}else if(rules_data[item]['_mask'] != 0){
				var ip = rules_data[item]['_mask'];
			}else{
				var ip = '';
			}
		}
		
		if(rules_data[item]['_proto'] == 2){
			var type = 'ICMP';
		}else if(rules_data[item]['_proto'] == 1){
			var type = 'UDP';
		}else{
			var type = 'TCP';
		}
		
		if(rules_data[item]['_actions'] == 1){
			var protocol = 'DROP';
		}else{
			var protocol = 'ACCEPT';
		}
		
		html_str += '<tr bgcolor="#E8EFF7">'+
						'<td>'+name+'</td>'+
						'<td>'+type+'</td>'+
						'<td>'+protocol+'</td>'+
						'<td>'+ip+'</td>'+
						'<td>'+port+'</td>'+
						'<td>'+
							'<a href="network-rules-edit.html?name='+name+'&edit=edit" onclick="javascript:window.location.href=this.href" style="margin-right:5px;">'+
								'<button type="button" value="Modify" style="width:32px;height:32px;"  ><img src="../images/edit.gif"></button>'+
							'</a>'+
							'<button type="button" class="delete_button" value="Delete" style="width:32px;height:32px;" >'+
								'<input type="hidden" class="delete_value" value="'+name+'" />'+
								'<img src="../images/delete.gif">'+
							'</button>'+
						'</td>'+
					'</tr>';
	}
	
	$("#content").html(html_str);
	var rules_temp = sort_2d_arr(rules_data, '_order');
	if(item != undefined){
		var last_order = rules_data[item]['_order'];
	}
	$("#lang_new_rule").parent('a').attr("href", "./network-rules-edit.html?order="+(parseInt(last_order)+1)+"&edit=new");
	$("#lang_new_rule").click(function(){
		window.location.href = "./network-rules-edit.html?order="+(parseInt(last_order)+1)+"&edit=new";
	});
}

object.AGNetworkRulesGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var rules_data = data_temp['_rules']['_item'];
	
	header(data_temp['_combuf']);
	if(rules_data.length != 0){
		show_network_rules(rules_data);
	}else{
		$("#lang_new_rule").parent('a').attr("href", "./network-rules-edit.html?order=1&edit=new");
	}
	footer();
	
	//delete rules
	$(".delete_button").click(function(){
		var ret = confirm("Are you sure to delete you selected ?");
		if(ret){
			var SectionArr = new AST_SectionArr();
			var section = new AST_Section();
			var value = $(this).children('.delete_value').val();
			section._section = value;
			SectionArr._item.push(section);
			object.AGNetworkRulesDel(del_succeed_back, del_error_back, SectionArr);
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*************************************************************************/
function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'network-rules.html?del=true';
	}
}

function del_error_back(data){
	alert(language('delete failed'));
}