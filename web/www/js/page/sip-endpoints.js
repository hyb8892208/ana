/********************SHOW ALL SIP ENDPOINTS BEGIN***********************************/
(function(){
	$("#endpoint_name").html(language("Endpoint Name"));
	$("#registration").html(language("Registration"));
	$("#credentials").html(language("Credentials"));
	$("#actions").html(language("Actions"));
	$(".add_input").val(language("Add New SIP Endpoint"));
	$(".delete_input").val(language("Delete"));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}else if(url['del'] == 'true'){
		$("#feed_back_tip").html(language('Delete Successfully'));
	}else if(url['new'] == 'true'){
		$("#feed_back_tip").html(language('Create Successfully'));
	}
}());

function show_sip_endpoints(sip_info){
	var htmlstr = '';
	for(var item in sip_info){
		var order = sip_info[item]['_order'];
		if(sip_info[item]['_registration'] == 0){
			var registration = 'none';
		}else if(sip_info[item]['_registration'] == 1){
			var registration = 'client';
		}else if(sip_info[item]['_registration'] == 2){
			var registration = 'server';
		}
		
		var section = sip_info[item]['_section'];
		var credentials = sip_info[item]['_username'];
		
		var host = sip_info[item]['_host'];
		if(host != 'dynamic' && host != ''){
			credentials += '@'+host;
		}
		
		htmlstr += '<tr>'+
				'<td><input class="sips_checkbox" type="checkbox" name="log[]" value="'+section+'" /></td>'+
				'<td>'+section+'</td>'+
				'<td>'+registration+'</td>'+
				'<td>'+credentials+'</td>'+
				'<td>'+
					'<a href="./sip-endpoints-edit.html?name='+section+'&edit=edit" onclick="javascript:window.location.href=this.href" style="margin:0 4px 0 4px;">'+
						'<button type="submit" value="Modify" style="width:32px;height:32px;" ><img src="../images/edit.gif"></button>'+
					'</a>'+
					'<button class="delete_button" type="button" value="Delete" style="width:32px;height:32px;">'+
						'<input type="hidden" class="delete_value" value="'+section+'" />'+
						'<img src="../images/delete.gif">'+
					'</button>'+
				'</td>'+
			'</tr>';
	}
	
	$("#htmlstr").html(htmlstr);
	var sip_temp = sort_2d_arr(sip_info, '_order');
	if(item != undefined){
		var last_order = sip_temp[item]['_order'];
	}
	$(".add_input").parent('a').attr("href", "./sip-endpoints-edit.html?order="+(parseInt(last_order)+1)+"&edit=new");
	$(".add_input").click(function(){
		window.location.href = "./sip-endpoints-edit.html?order="+(parseInt(last_order)+1)+"&edit=new";
	});
}

object.AGSipEndpointGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var sip_info = data_temp['_sips']['_item'];
	
	header(data_temp['_combuf']);
	if(sip_info.length != 0){
		show_sip_endpoints(sip_info);
	}else{
		$(".add_input").parent('a').attr("href", "./sip-endpoints-edit.html?order="+1+"&edit=new");
	}
	footer();
	
	//delete endpoint
	$(".delete_button").click(function(){
		ret = confirm("Are you sure to delete you selected ?");
		var SectionArr = new AST_SectionArr();
		var ast_section = new AST_Section();
		if(ret){
			var endpoint_name = $(this).children(".delete_value").val();
			ast_section._section = endpoint_name;
			SectionArr._item.push(ast_section);
			object.AGSipEndpointsDel(del_succeed_back, del_error_back, SectionArr);
		}
		return false;
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

/********************SHOW ALL SIP ENDPOINTS END***********************************/

/********************DELETE SIP ENDPOINTS BEGIN***********************************/
function delete_endpoints(){
	//delete endpoints
	$(".delete_input").click(function(){
		ret = confirm("Are you sure to delete you selected ?");
		if(ret){
			var endpoint_names = '';
			var flag = 0;
			var SectionArr = new AST_SectionArr();
			$(".sips_checkbox").each(function(){
				if($(this).is(":checked")){
					var ast_section = new AST_Section();
					ast_section._section = $(this).val();
					SectionArr._item.push(ast_section);
					flag = 1;
				}
			});
			
			if(flag == 0){
				alert("Please select sips that need to be deleted");
			}else{
				endpoint_names = endpoint_names.substring(0,endpoint_names.length-1);
				object.AGSipEndpointsDel(del_succeed_backs, del_error_backs, SectionArr);
			}
		}
	});
}
delete_endpoints();

function del_succeed_backs(data){
	if(error_tip(data['_result'])){
		var url = get_url();
		location.href = url+'?del=true';
	}
}
function del_succeed_back(data){
	if(error_tip(data['_result'])){
		var url = get_url();
		location.href = url+'?del=true';
	}
}
function del_error_backs(data){
	alert(language('delete failed'));
}
function del_error_back(data){
	alert(language('delete failed'));
}
/********************DELETE SIP ENDPOINTS BEGIN***********************************/