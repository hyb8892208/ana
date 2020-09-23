function goto()
{
	window.location.href="adv-astfileeditor.html";
}

function gotopage(page)
{
	if(event.keyCode == 13) {
		event.keyCode = 0;  //Must set
		event.which = 0;
		window.location.href="adv-astfileeditor.html?page="+page;
	}
}

function goto_inputpage()
{
	window.location.href="adv-astfileeditor.html?page="+document.getElementById('page').value;
}
/********************************************************************************/


/************************SHOW ADV ASTFILEEDITOR BEGIN*******************************/
var url = get_url_para();
(function(){
	$("#lang_file_name").html(language("File Name"));
	$("#lang_file_size").html(language("File Size"));
	$("#config_file_li").html(language('Configuration Files'));
	$(".new_file_input").val(language('New Configuration File'));
	$(".reload_asterisk_input").val(language('Reload Asterisk'));
	$(".reload_asterisk_input").click(function(){
		var ret = confirm(language('reload asterisk tip' ,'Are you sure to reload asterisk now?'));
		if(ret){
			object.AGAdvAstcliRun(reload_succeed_back, reload_error_back, 'core reload');
		}
	});
	$(".new_file_input").click(function(){
		window.location.href = 'adv-astfileeditor-edit.html';
	});
	
	if(url['save'] == 'true'){
		$("#feed_back_tip").html(language('Save Successfully'));
	}else if(url['del'] == 'true'){
		$("#feed_back_tip").html(language('Delete Successfully'));
	}
}());

function reload_succeed_back(data){
	window.location.reload();
}

function reload_error_back(data){}

function editor_show(file_data){
	
	if(url['page'] != undefined){
		var page = url['page'];
	}else{
		var page = 1;
	}
	
	for(var i=(page-1)*10; i<(page-1)*10+10;i++){
		if(file_data[i] == undefined){break;}
		$(".tshow").append(
			'<tr>'+
				'<td><a href="adv-astfileeditor-edit.html?section='+file_data[i]['_filename']+'">'+file_data[i]['_filename']+'</a></td>'+
				'<td>'+file_data[i]['_filesize']+'</td>'+
			'</tr>'
		);
	}
	
	var page_count = Math.ceil(file_data.length/10);
	if(page > page_count){
		page = page_count;
	}
	
	if(page_count >= 2){
		if(page > 1){
			var prev_page = page - 1;
			$(".pg").append(
				'<a title="'+language('Previous page')+'" href="adv-astfileeditor.html?page='+prev_page+'" class="prev" ></a>'
			);
		}
		
		if(page-5 > 1){
			var s = page - 5;
		}else{
			var s = 1;
		}
		
		if(s + 10 < page_count){
			var e = s + 10;
		}else{
			var e = page_count;
		}
		
		for(var i=s;i<=e;i++){
			if(page != i){
				$(".pg").append('<a href="adv-astfileeditor.html?page='+i+'" >'+i+'</a>');
			}else{
				$(".pg").append('<strong>'+page+'</strong>');
			}
		}
		
		if(page < page_count){
			var next_page = parseInt(page) + 1;
			$(".pg").append('<a title="'+language('Next page')+'" href="adv-astfileeditor.html?page='+next_page+'" class="nxt" ></a>');
		}
		
		$(".pg").append(
			'<label>'+
				'<input type="text" id="page" name="page" value="'+page+'" size="2" class="px" title="'+language('input page help','Please input your page number, and press [Enter] to skip to.')+'" onkeypress="gotopage(this.value)" >'+
				'<span title="'+language('total pages')+': '+page_count+'" > / '+page_count+'</span>'+
			'</label>'+
			
			'<a title="'+language('goto input page')+'" style="cursor:pointer;" onclick="goto_inputpage()">'+language('go')+'</a>'
		);
	}
}

object.AGAdvAstfileeditorEditGetAll(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_files'];
	var file_data = data_temp['_files']['_item'];
	
	header(data_temp['_combuf']);
	editor_show(file_data);
	footer();
}

function error_back(data){
	window.location.href = 'error.html';
}
/************************SHOW ADV ASTFILEEDITOR END*******************************/