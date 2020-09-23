function gotopage(page)
{
	if(event.keyCode == 13) {
		event.keyCode = 0;  //Must set
		event.which = 0;
		window.location.href="system-record.html?page="+page;
	}
}

function goto_inputpage()
{
	window.location.href="system-record.html?page="+document.getElementById('page').value;
}
/***********************************************************************************************/


/**********************************************SHOW SYSTEM BACKUP BEGIN*************************************/
(function(){
	$("#lang_record").html(language('Config Record'));
	$("#lang_record_message").html(language('Record Message'));
	$("#lang_date").html(language('Date'));
	$("#lang_actions").html(language('Actions'));
	$("#lang_record_sw").html(language('Config Record Switch')+':');
})();

var url = get_url_para();
if(url['page'] != undefined){
	var page = url['page'];
}else{
	var page = 1;
}

object.AGCommitLookup(succeed_back, error_back, page);

function succeed_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_system_backup(data_temp);
	footer();
	
	backup();
	commit();
}

function error_back(data){
	window.location.href = 'error.html';
}

function show_system_backup(data_temp){
	var log_data = data_temp['_logs']['_item'];
	var log_num = data_temp['_nums'];
	var commit_sw = data_temp['_commitsw'];
	
	if(commit_sw == 0){
		$("#backup_content").hide();
		$(".pg").hide();
	}
	
	var backup_html = '';
	for(var item in log_data){
		backup_html += "<tr>"+
			"<td style='text-align:center;'>"+
				((parseInt(page)-1)*10+(parseInt(item)+1))+
				'<input type="hidden" class="log_id" value="'+log_data[item]['_commit']+'" />'+
			"</td>"+
			"<td>"+log_data[item]['_message']+"</td>"+
			"<td class='date'>"+log_data[item]['_data']+"</td>"+
			"<td><button type='button' class='back_button' >"+language('Back')+"</button></td>"+
		"</tr>";
	}
	$("#backup_content").html(backup_html);
	
	var page_num = Math.ceil(log_num/10);
	if(page > page_num){
		page = page_num;
	}
	
	if(page_num >=2){
		if(page > 1){
			var prev_page = page - 1;
			$(".pg").append(
				'<a title="'+language('Previous page')+'" href="system-record.html?page='+prev_page+'" class="prev" ></a>'
			);
		}
		
		if(page-5 > 1){
			var s = page - 5;
		}else{
			var s = 1;
		}
		
		if(s + 10 < page_num){
			var e = s + 10;
		}else{
			var e = page_num;
		}
		
		for(var i=s;i<=e;i++){
			if(page != i){
				$(".pg").append('<a href="system-record.html?page='+i+'" >'+i+'</a>');
			}else{
				$(".pg").append('<strong>'+page+'</strong>');
			}
		}
		
		if(page < page_num){
			var next_page = parseInt(page) + 1;
			$(".pg").append('<a title="'+language('Next page')+'" href="system-record.html?page='+next_page+'" class="nxt" ></a>');
		}
		
		$(".pg").append(
			'<label>'+
				'<input type="text" id="page" name="page" value="'+page+'" size="2" class="px" title="'+language('input page help','Please input your page number, and press [Enter] to skip to.')+'" onkeypress="gotopage(this.value)" >'+
				'<span title="'+language('total pages')+': '+page_num+'" > / '+page_num+'</span>'+
			'</label>'+
			
			'<a title="'+language('goto input page')+'" style="cursor:pointer;" onclick="goto_inputpage()">'+language('go')+'</a>'
		);
	}
	
	//commit
	if(commit_sw == 1){
		document.getElementById('commit').checked = true;
	}else{
		document.getElementById('commit').checked = false;
	}
	$("#commit").iButton();
}
/**********************************************SHOW SYSTEM BACKUP END*************************************/

/**********************************************COMMIT BEGIN*************************************/
function commit(){
	$("#commit").change(function(){
		var checked = document.getElementById('commit').checked;
		
		if(checked){
			var commit = 1;
		}else{
			var commit = 0;
		}
		
		if(commit == 1){
			$("#backup_content").show();
			$(".pg").show();
		}else{
			$("#backup_content").hide();
			$(".pg").hide();
		}
		
		object.AGCommitSwitch(commit_succeed_back, commit_error_back, commit);
	});
}

function commit_succeed_back(data){
	console.log(data);
}

function commit_error_back(data){
	alert('failed');
}
/**********************************************COMMIT END*************************************/

/**********************************************BACKUP BEGIN*************************************/
function backup(){
	var message = '';
	var commit_id = '';
	
	$(".back_button").click(function(){
		var ret = confirm(language('backup tip','Back will cause call interruption. Are you sure you want to return to this record?'));
		if(ret){
			var _date = $(this).parent().siblings('.date').text();
			message = 'Revert: ' + _date;
			
			commit_id = $(this).parent().siblings().children('.log_id').val();
			object.AGCommitChekout(backup_succeed_back, backup_error_back, message, commit_id);
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