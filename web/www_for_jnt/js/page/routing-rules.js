function onload_show(){
	$(function() {
		$(".drag_sort").sortable({
			opacity: 0.6, cursor: 'move', update: function() {
				var order = $(this).sortable("serialize") + '&action=updateRecordsListings'; 
			}                                                                 
		});
	});
}
/**************************************************************************************/

/**************************************SHOW ROUTINGS BEGIN*******************************************/
(function(){
	$("#lang_move").html(language('Move'));
	$("#lang_order").html(language('Order'));
	$("#lang_rule_name").html(language('Rule Name'));
	$("#lang_from").html(language('From'));
	$("#lang_to").html(language('To'));
	$("#lang_actions").html(language('Actions'));
	
	$("#lang_new_call_routing_rule").val(language('New Call Routing Rule'));
	$("#lang_delete").val(language('Delete'));
	$("#save_orders_input").val(language('Save Orders'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}else if(url['del'] == 'true'){
		$("#feed_back_tip").text(language('Delete Successfully'));
	}else if(url['new'] == 'true'){
		$("#feed_back_tip").text(language('Create Successfully'));
	}
}());

function show_routings(data_temp){
	var routing_data = data_temp['_ruls']['_item'];
	//routing_data = sort_2d_arr(routing_data, '_order');
	
	var html_str = "<tr>"+
			"<td colspan=7 style='border:0;margin:0;padding:0'>"+
						"<ul class='drag_sort' style='border:none;margin:0;padding:0;cursor:n-resize;list-style:none;'>";
	
	if(data_temp['_combuf']['_systemtype'] == 'emetrotel'){
		var bgcolor = '#E2F0D9';
	}else{
		var bgcolor = '#E8EFF7';
	}
	for(var i=0;i<routing_data.length;i++){
		var from_channel = routing_data[i]['_fromchannel'];
		var to_channel = routing_data[i]['_tochannel'];
		// var from_channel_name = from_channel.substr(4);
		
		// var to_channel_temp = to_channel.split(",");
		// var show = '';
		// for(var j=0;j<to_channel_temp.length;j++){
			// if(to_channel_temp[j].indexOf('-') == 3){
				// var name = to_channel_temp[j].substr(4);
				// show += name+', ';
			// }else{
				// show += to_channel_temp[j]+', ';
			// }
		// }
		// show = show.substring(0,show.length-2);
		
		html_str +=	"<li style='border:none;margin:0;padding:0;cursor:n-resize;list-style:none;'>"+
			"<table width='100%' class='tdrag' style='border:0;'>"+
				"<tr bgcolor='"+bgcolor+"'>"+
					"<td width='3%'><input type='checkbox' class='routing_checkbox' name='rules[]' value='"+routing_data[i]['_name']+"' /></td>"+
					"<td width='4%' class='drag'></td>"+
					"<td width='6%' >"+routing_data[i]['_order']+"</td>"+
					"<td width='20%'>"+routing_data[i]['_name']+"</td>"+
					"<td width='30%'>"+from_channel+"</td>"+
					"<td width='30%'>"+to_channel+"</td>"+
					"<td width='7%'>"+
						"<a href='routing-rules-edit.html?routing="+routing_data[i]['_name']+"&edit=edit' onclick='javascript:window.location.href=this.href' style='margin-right:5px;'>"+
							"<button type='button'  value='Modify' style='width:32px;height:32px;cursor:pointer;'><img src='../images/edit.gif'></button>"+
						"</a>"+
						"<button type='button' class='delete_button' value='Delete' style='width:32px;height:32px;cursor:pointer;' >"+
							"<input type='hidden' class='delete_value' value='"+routing_data[i]['_name']+"'>"+
							"<img src='../images/delete.gif'>"+
						"</button>"+
						"<input type='hidden' class='routing_name' value='"+routing_data[i]['_name']+"' >"+
					"</td>"+
				"</tr>"+
			"</table>"+
		"</li>";
	}
	html_str += "</ul></td></tr>";
	if(routing_data.length != 0){
		$("#content").html(html_str);
	}
	
	//new routing rule
	if(routing_data.length != 0){
		var routing_order = parseInt(routing_data[i-1]['_order'])+1;
	}else{
		var routing_order = 1;
	}
	$("#new_routing_rule_a").attr("href", "./routing-rules-edit.html?edit=add&order="+routing_order);
	$("#new_routing_rule_a").click(function(){
		window.location.href = "./routing-rules-edit.html?edit=add&order="+routing_order;
	});
}

object.AGRoutingRulsGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_routings(data_temp);
	footer();
	
	onload_show();
	
	//save orders
	$("#save_orders_input").click(function(){
		save_orders();
	});
	
	//delete routings
	$(".delete_input").click(function(){
		var ret = confirm("Are you sure to delete you selected ?");
		if(ret){
			delete_routing();
		}
	});

	//delete one routing
	$(".delete_button").click(function(){
		var ret = confirm("Are you sure to delete you selected ?");
		if(ret){
			var SectionArr = new AST_SectionArr();
			var section = new AST_Section();
			var value = $(this).children(".delete_value").val();
			section._section = value;
			SectionArr._item.push(section);
			object.AGRoutingRulesDel(del_succeed_back, del_error_back, SectionArr);
		}
	});
}
function error_back(data){
	window.location.href = 'error.html';
}
/**************************************SHOW ROUTINGS END*******************************************/


/**************************************DELETE ROUTINGS BEGIN*******************************************/
function delete_routing(){
	var sections = '';
	var SectionArr = new AST_SectionArr();
	$(".routing_checkbox").each(function(){
		if($(this).is(":checked")){
			var section = new AST_Section();
			section._section = $(this).val();
			SectionArr._item.push(section);
		}
	});
	object.AGRoutingRulesDel(del_succeed_back, del_error_back, SectionArr);
}

function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'routing-rules.html?del=true';
	}
}

function del_error_back(data){
	alert('delete failed');
}
/**************************************DELETE ROUTINGS END*******************************************/


/**************************************SAVE ROUTINGS ORDER BEGIN*******************************************/
function save_orders(){
	var i = 1;
	var LineArr = new AST_LineArr();
	$(".routing_name").each(function(){
		var line = new AST_Line();
		line._key = $(this).val();
		line._value = i;
		LineArr._item.push(line);
		i++;//order
	});
	object.AGRoutingRulesSaveOrder(save_succeed_back, save_error_back, LineArr);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'routing-rules.html?save=true';
	}
}

function save_error_back(data){
	alert(language('save order failed'));
}
/**************************************SAVE ROUTINGS ORDER END*******************************************/