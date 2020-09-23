function getpage(page)
{
	var url = 'log-cdr.html'+'?';

	if(page == 0)
		page = document.getElementById("current_page_flag").value;
	if(page != '')
		url += "page="+page+"&";

	var caller_from_filter = document.getElementById("caller_from_filter_flag").value;
	if(caller_from_filter != '')
		url += "caller_from_filter="+encodeURIComponent(caller_from_filter)+"&";
	var caller_to_filter = document.getElementById("caller_to_filter_flag").value;
	if(caller_to_filter != '')
		url += "caller_to_filter="+encodeURIComponent(caller_to_filter)+"&";
	var channel_from_filter = document.getElementById("channel_from_filter_flag").value;
	if(channel_from_filter != '')
		url += "channel_from_filter="+encodeURIComponent(channel_from_filter)+"&";
	var channel_to_filter = document.getElementById("channel_to_filter_flag").value;
	if(channel_to_filter != '')
		url += "channel_to_filter="+encodeURIComponent(channel_to_filter)+"&";
	var starttime_from_filter = document.getElementById("starttime_from_filter_flag").value;
	if(starttime_from_filter != 'from')
		url += "starttime_from_filter="+encodeURIComponent(starttime_from_filter)+"&";
	var starttime_to_filter = document.getElementById("starttime_to_filter_flag").value;
	if(starttime_to_filter != 'to')
		url += "starttime_to_filter="+encodeURIComponent(starttime_to_filter)+"&";
	var duration_from_filter = document.getElementById("duration_from_filter_flag").value;
	if(duration_from_filter != 'from')
		url += "duration_from_filter="+encodeURIComponent(duration_from_filter)+"&";
	var duration_to_filter = document.getElementById("duration_to_filter_flag").value;
	if(duration_to_filter != 'to')
		url += "duration_to_filter="+encodeURIComponent(duration_to_filter)+"&";
	var result_filter = document.getElementById("result_filter_flag").value;
	if(result_filter != '')
		url += "result_filter="+encodeURIComponent(result_filter)+"&";

	var _sort = document.getElementById("sort_flag").value;
	if(_sort != '')
		url += "_sort="+_sort+"&";
	var order = document.getElementById("order_flag").value;
	if(order != '')
		url += "order="+order+"&";

	window.location.href = url;
}	

function sort_click(obj, type)
{
	document.getElementById("sort_flag").value=type;
	if(document.getElementById("order_flag").value == "des")
		document.getElementById("order_flag").value = "asc";
	else
		document.getElementById("order_flag").value = "des";
	getpage(0);
}

function check_filter()
{
		var pattern = /^[-+*_0-9]*$/;
		var caller_from = document.getElementById("caller_from_filter").value;
		var caller_to = document.getElementById("caller_to_filter").value;

		var result = pattern.exec(caller_from);
		if(result != null){
				return true;
		}else{
				alert("invalid Caller ID!");
				return false;
		}

		var result = pattern.exec(caller_to);
		if(result != null){
				return true;
		}else{
				alert("invalid Callee ID!");
				return false;
		}
}

function filter()
{
	if(!check_filter()){
		return;
	}

	document.getElementById("caller_from_filter_flag").value = document.getElementById("caller_from_filter").value;
	document.getElementById("caller_to_filter_flag").value = document.getElementById("caller_to_filter").value;
	document.getElementById("channel_from_filter_flag").value = document.getElementById("channel_from_filter").value;
	document.getElementById("channel_to_filter_flag").value = document.getElementById("channel_to_filter").value;
	document.getElementById("starttime_from_filter_flag").value = document.getElementById("starttime_from_filter").value;
	document.getElementById("starttime_to_filter_flag").value = document.getElementById("starttime_to_filter").value;
	document.getElementById("duration_from_filter_flag").value = document.getElementById("duration_from_filter").value;
	document.getElementById("duration_to_filter_flag").value = document.getElementById("duration_to_filter").value;
	document.getElementById("result_filter_flag").value = document.getElementById("result_filter").value;

	getpage(1);
}

function clear_filter()
{
	document.getElementById("current_page_flag").value = 1;

	document.getElementById("caller_from_filter").value = "";
	document.getElementById("caller_to_filter").value = "";
	document.getElementById("channel_from_filter").value = "";
	document.getElementById("channel_to_filter").value = "";
	document.getElementById("starttime_from_filter").value = "from";
	document.getElementById("starttime_to_filter").value = "to";
	document.getElementById("duration_from_filter").value = "from";
	document.getElementById("duration_to_filter").value = "to";
	document.getElementById("result_filter").value = "all";

	document.getElementById("caller_from_filter_flag").value = "";
	document.getElementById("caller_to_filter_flag").value = "";
	document.getElementById("channel_from_filter_flag").value = "";
	document.getElementById("channel_to_filter_flag").value = "";
	document.getElementById("starttime_from_filter_flag").value = "from";
	document.getElementById("starttime_to_filter_flag").value = "to";
	document.getElementById("duration_from_filter_flag").value = "from";
	document.getElementById("duration_to_filter_flag").value = "to";
	document.getElementById("result_filter_flag").value = "all";

	document.getElementById("sort_flag").value = "";
	document.getElementById("order_flag").value = "";
}

function keypress(e)
{
	if(window.event){ // IE
		var keynum = e.keyCode;
	}else if(e.which){ // Netscape/Firefox/Opera
		var keynum = e.which;
	}
	//alert("he "+keynum);

	if(keynum == 13) {
		getpage(document.getElementById("input_page").value);
	}
}

function selectAll(){
	$("#selall").click(function(){
		if($(this).attr('checked') == 'checked'){
			$(".log").attr('checked', 'checked');
		}else{
			$(".log").removeAttr('checked');
		}
	});
}


function onload_show(){
	$( "#starttime_from_filter" ).datetimepicker({dateFormat: "yy-mm-dd", timeFormat: "HH:mm:ss"});
	$( "#starttime_to_filter" ).datetimepicker({dateFormat: "yy-mm-dd", timeFormat: "HH:mm:ss"});
	$( "#duration_from_filter" ).timepicker({timeFormat: "HH:mm:ss"});
	$( "#duration_to_filter" ).timepicker({timeFormat: "HH:mm:ss"});

	$( "#starttime_from_filter" ).datetimepicker();
	$( "#starttime_tofilter" ).datetimepicker();
	$( "#duration_from_filter" ).timepicker();
	$( "#duration_to_filter" ).timepicker();
	
	$("form").keypress(function(e){
		if(window.event){ // IE
			var keynum = e.keyCode;
		}else if(e.which){ // Netscape/Firefox/Opera
			var keynum = e.which;
		}

		if(keynum == 13) {
			return false;
		}
	});
	
	selectAll();
}
/********************************************************************************/


/************************SHOW LOG CDR BEGIN********************************/
function lang_show(num){
	$(".lang_caller_id").html(language("Caller ID"));
	$(".lang_callee_id").html(language("Callee ID"));
	$(".lang_from").html(language("From"));
	$(".lang_to").html(language("To"));
	$(".lang_start_time").html(language("Start Time"));
	$(".lang_duration").html(language("Duration"));
	$(".lang_result").html(language("Result"));
	$(".filter_input").val(language("Filter"));
	$(".clean_filter_input").val(language("Clean Filter"));
	$("#total_records_span").html(language("Total Records"));
	
	/* other info */
	$("#total_records_span").text(language('Total Records') + num);
	$(".delete_input").val(language('Delete'));
	$(".clean_up_input").val(language('Clean Up'));
	$(".export_input").val(language('Export'));
	
	var url = get_url_para();
	if(url['del'] == 'true'){
		$("#feed_back_tip").text(language('Delete Successfully'));
	}
}

function get_sql(){
	var caller_from_val = '';
	if(url['caller_from_filter'] != '' && url['caller_from_filter'] != undefined){
		caller_from_val = url['caller_from_filter'];
	}
	var caller_to_val = '';
	if(url['caller_to_filter'] != '' && url['caller_to_filter'] != undefined){
		caller_to_val = url['caller_to_filter'];
	}
	var channel_from_val = '';
	if(url['channel_from_filter'] != '' && url['channel_from_filter'] != undefined){
		channel_from_val = url['channel_from_filter'];
	}
	var channel_to_val = '';
	if(url['channel_to_filter'] != '' && url['channel_to_filter'] != undefined){
		channel_to_val = url['channel_to_filter'];
	}
	var starttime_from_val = '';
	if(url['starttime_from_filter'] != '' && url['starttime_from_filter'] != undefined){
		starttime_from_val = url['starttime_from_filter'];
		starttime_from_val = starttime_from_val.replace(/%20/g, ' ');
		starttime_from_val = starttime_from_val.replace(/%3A/g, ':');
	}
	var starttime_to_val = '';
	if(url['starttime_to_filter'] != '' && url['starttime_to_filter'] != undefined){
		starttime_to_val = url['starttime_to_filter'];
		starttime_to_val = starttime_to_val.replace(/%20/g, ' ');
		starttime_to_val = starttime_to_val.replace(/%3A/g, ':');
	}
	var duration_from_val = '';
	if(url['duration_from_filter'] != '' && url['duration_from_filter'] != undefined){
		duration_from_val = url['duration_from_filter'];
		duration_from_val = duration_from_val.replace(/%3A/g, ':');
	}
	var duration_to_val = '';
	if(url['duration_to_filter'] != '' && url['duration_to_filter'] != undefined){
		duration_to_val = url['duration_to_filter'];
		duration_to_val = duration_to_val.replace(/%3A/g, ':');
	}
	var result_val = '';
	if(url['result_filter'] != '' && url['result_filter'] != undefined){
		result_val = url['result_filter'];
		result_val = result_val.replace(/%20/g, ' ');
	}

	if(caller_from_val != '' || caller_to_val != '' || channel_from_val != '' || channel_to_val != '' || starttime_from_val != 'from' || starttime_to_val != 'to' || duration_from_val != 'from' || duration_to_val != 'to' || result != ''){
		var sql_filter = '';
		
		if(caller_from_val != ''){
			sql_filter += "where callerid like '"+caller_from_val+"' ";
		}
		
		if(caller_to_val != ''){
			if(sql_filter == ''){
				sql_filter += "where calleeid like '"+caller_to_val+"' ";
			}else{
				sql_filter += "and calleeid like '"+caller_to_val+"' ";
			}
		}
		
		if(channel_from_val != ''){
			if(sql_filter == ''){
				sql_filter += "where \"fromdd\"='"+channel_from_val+"' ";
			}else{
				sql_filter += "and \"fromdd\"='"+channel_from_val+"' ";
			}
		}
		
		if(channel_to_val != ''){
			if(sql_filter == ''){
				sql_filter += "where \"todd\"='"+channel_to_val+"' ";
			}else{
				sql_filter += "and \"todd\"='"+channel_to_val+"' ";
			}
		}
		
		if(starttime_from_val != ''){
			if(sql_filter == ''){
				sql_filter += "where starttime >= '"+starttime_from_val+"' ";
			}else{
				sql_filter += "and starttime >= '"+starttime_from_val+"' ";
			}
		}
		
		if(starttime_to_val != ''){
			if(sql_filter == ''){
				sql_filter += "where starttime <= '"+starttime_to_val+"' ";
			}else{
				sql_filter += "and starttime <= '"+starttime_to_val+"' ";
			}
		}
		
		if(duration_from_val != ''){
			if(sql_filter == ''){
				sql_filter += "where duration >= '"+duration_from_val+"' ";
			}else{
				sql_filter += "and duration >= '"+duration_from_val+"' ";
			}
		}
		
		if(duration_to_val != ''){
			if(sql_filter == ''){
				sql_filter += "where duration <= '"+duration_to_val+"' ";
			}else{
				sql_filter += "and duration <= '"+duration_to_val+"' ";
			}
		}
		
		if(result_val != ''){
			if(sql_filter == ''){
				sql_filter += "where result='"+result_val+"'";
			}else{
				sql_filter += "and result='"+result_val+"'";
			}
		}
	}

	var _sort = '';
	if(url['_sort'] != '' && url['_sort'] != undefined){
		_sort = url['_sort'];
	}
	var order = '';
	if(url['order'] != '' && url['order'] != undefined){
		order = url['order'];
	}
	var sort_sql = 'order by "id" desc';
	var callerid_class = '_sort';
	var calleeid_class = '_sort';
	var from_class = '_sort';
	var to_class = '_sort';
	var starttime_class = '_sort';
	var duration_class = '_sort';
	var result_class = '_sort';

	var callerid_order = 'des';
	var calleeid_order = 'des';
	var from_order = 'des';
	var to_order = 'des';
	var starttime_order = 'des';
	var duration_order = 'des';
	var result_order = 'des';

	switch(_sort){
		case 'callerid':
			if(order == 'des'){
				callerid_order = 'asc';
				callerid_class = 'asc';
				sort_sql = 'order by "callerid" asc';
			}else{
				callerid_class = 'des';
				sort_sql = 'order by "callerid" desc';
			}
			break;
		case 'calleeid':
			if(order == 'des'){
				calleeid_order = 'asc';
				calleeid_class = 'asc';
				sort_sql = 'order by "calleeid" asc';
			}else{
				calleeid_class = 'des';
				sort_sql = 'order by "calleeid" desc';
			}
			break;
		case 'from':
			if(order == 'des'){
				from_order = 'asc';
				from_class = 'asc';
				sort_sql = 'order by "fromdd" asc';
			}else{
				from_class = 'des';
				sort_sql = 'order by "fromdd" desc';
			}
			break;
		case 'to':
			if(order == 'des'){
				to_order = 'asc';
				to_class = 'asc';
				sort_sql = 'order by "todd" asc';
			}else{
				to_class = 'des';
				sort_sql = 'order by "todd" desc';
			}
			break;
		
		case 'starttime':
			if(order == 'des'){
				starttime_order = 'asc';
				starttime_class = 'asc';
				sort_sql = 'order by "starttime" asc';
			}else{
				starttime_class = 'des';
				sort_sql = 'order by "starttime" desc';
			}
			break;
		case 'duration':
			if(order == 'des'){
				duration_order = 'asc';
				duration_class = 'asc';
				sort_sql = 'order by "duration" asc';
			}else{
				duration_class = 'des';
				sort_sql = 'order by "duration" desc';
			}
			break;
		case 'result':
			if(order == 'des'){
				result_order = 'asc';
				result_class = 'asc';
				sort_sql = 'order by "result" asc';
			}else{
				result_class = 'des';
				sort_sql = 'order by "result" desc';
			}
			break;
	}

	var sql = sql_filter + ' ' + sort_sql;
	return sql;
}

function formatSeconds(s) {
	var t;
	if(s > -1){
		hour = Math.floor(s/3600);
		min = Math.floor(s/60) % 60;
		sec = s % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			if(hour < 10){hour = '0'+hour;}
			t = day + " - " + hour + ":";
		}
		else {
			if(hour < 10){hour = '0'+hour;}
			t = hour + ":";
		}
		if(min < 10){t += "0";}
			t += min + ":";
		if(sec < 10){t += "0";}
			t += sec;
	}
	return t;
} 

function cdr_show(cdr_data, num){
	var _sort = '';
	if(url['_sort'] != '' && url['_sort'] != undefined){
		_sort = url['_sort'];
	}
	var order = '';
	if(url['order'] != '' && url['order'] != undefined){
		order = url['order'];
	}
	
	var sort_sql = 'order by "id" desc';
	var callerid_class = 'sort';
	var calleeid_class = 'sort';
	var from_class = 'sort';
	var to_class = 'sort';
	var starttime_class = 'sort';
	var duration_class = 'sort';
	var result_class = 'sort';

	var callerid_order = 'des';
	var calleeid_order = 'des';
	var from_order = 'des';
	var to_order = 'des';
	var starttime_order = 'des';
	var duration_order = 'des';
	var result_order = 'des';

	switch(_sort){
		case 'callerid':
			if(order == 'des'){
				callerid_order = 'asc';
				callerid_class = 'asc';
			}else{
				callerid_class = 'des';
			}
			break;
		case 'calleeid':
			if(order == 'des'){
				calleeid_order = 'asc';
				calleeid_class = 'asc';
			}else{
				calleeid_class = 'des';
			}
			break;
		case 'from':
			if(order == 'des'){
				from_order = 'asc';
				from_class = 'asc';
			}else{
				from_class = 'des';
			}
			break;
		case 'to':
			if(order == 'des'){
				to_order = 'asc';
				to_class = 'asc';
			}else{
				to_class = 'des';
			}
			break;
		
		case 'starttime':
			if(order == 'des'){
				starttime_order = 'asc';
				starttime_class = 'asc';
			}else{
				starttime_class = 'des';
			}
			break;
		case 'duration':
			if(order == 'des'){
				duration_order = 'asc';
				duration_class = 'asc';
			}else{
				duration_class = 'des';
			}
			break;
		case 'result':
			if(order == 'des'){
				result_order = 'asc';
				result_class = 'asc';
			}else{
				result_class = 'des';
			}
			break;
	}
	
	var caller_from_val = '';
	if(url['caller_from_filter'] != '' && url['caller_from_filter'] != undefined){
		caller_from_val = url['caller_from_filter'];
	}
	var caller_to_val = '';
	if(url['caller_to_filter'] != '' && url['caller_to_filter'] != undefined){
		caller_to_val = url['caller_to_filter'];
	}
	var channel_from_val = '';
	if(url['channel_from_filter'] != '' && url['channel_from_filter'] != undefined){
		channel_from_val = url['channel_from_filter'];
	}
	var channel_to_val = '';
	if(url['channel_to_filter'] != '' && url['channel_to_filter'] != undefined){
		channel_to_val = url['channel_to_filter'];
	}
	var starttime_from_val = 'from';
	if(url['starttime_from_filter'] != '' && url['starttime_from_filter'] != undefined){
		var sf_temp = url['starttime_from_filter'].replace(/%20/,' ');
		sf_temp = sf_temp.replace(/%3A/g,':');
		starttime_from_val = sf_temp;
	}
	var starttime_to_val = 'to';
	if(url['starttime_to_filter'] != '' && url['starttime_to_filter'] != undefined){
		var sf_temp = url['starttime_to_filter'].replace(/%20/,' ');
		sf_temp = sf_temp.replace(/%3A/g,':');
		starttime_to_val = sf_temp;
	}
	var duration_from_val = 'from';
	if(url['duration_from_filter'] != '' && url['duration_from_filter'] != undefined){
		duration_from_val = url['duration_from_filter'].replace(/%3A/g,':');
	}
	var duration_to_val = 'to';
	if(url['duration_to_filter'] != '' && url['duration_to_filter'] != undefined){
		duration_to_val = url['duration_to_filter'].replace(/%3A/g,':');
	}
	var result_val = '';
	if(url['result_filter'] != '' && url['result_filter'] != undefined){
		result_val = url['result_filter'].replace(/%20/,' ');
	}
	
	var result_selete = '<select style="width:98%" id="result_filter" >';
	result_selete += '<option value="" selected>'+language('All')+'</option>';
	if(result_val == "ANSWERED"){
		result_selete += '<option value="ANSWERED" selected >'+language('ANSWERED')+'</option>';
	}else{
		result_selete += '<option value="ANSWERED" >'+language('ANSWERED')+'</option>';
	}
	if(result_val == "BUSY"){
		result_selete += '<option value="BUSY" selected >'+language('BUSY')+'</option>';
	}else{
		result_selete += '<option value="BUSY" >'+language('BUSY')+'</option>';
	}
	if(result_val == "FAILED"){
		result_selete += '<option value="FAILED" selected >'+language('FAILED')+'</option>';
	}else{
		result_selete += '<option value="FAILED" >'+language('FAILED')+'</option>';
	}
	if(result_val == "NO ANSWER"){
		result_selete += '<option value="NO ANSWER" selected >'+language('NO ANSWER')+'</option>';
	}else{
		result_selete += '<option value="NO ANSWER" >'+language('NO ANSWER')+'</option>';
	}
	result_selete += '</select>';
	//value
	document.getElementById('caller_from_filter').value = caller_from_val;
	document.getElementById('caller_to_filter').value = caller_to_val;
	document.getElementById('channel_from_filter').value = channel_from_val;
	document.getElementById('channel_to_filter').value = channel_to_val;
	document.getElementById('starttime_from_filter').value = starttime_from_val;
	document.getElementById('starttime_to_filter').value = starttime_to_val;
	document.getElementById('duration_from_filter').value = duration_from_val;
	document.getElementById('duration_to_filter').value = duration_to_val;
	$("#result_selete").html(result_selete);
	
	$("#log_cdr_content").append(
		'<tr id="cdr_title">'+
			'<th style="width:03%" class="nosort">'+
				'<input type="checkbox" name="selall" id="selall" />'+
			'</th>'+
			'<th style="width:12%" class="'+callerid_class+'" onclick="sort_click(this,\'callerid\')">'+language('Caller ID')+'</th>'+
			'<th style="width:12%" class="'+calleeid_class+'" onclick="sort_click(this,\'calleeid\')">'+language('Callee ID')+'</th>'+
			'<th style="width:14%" class="'+from_class+'" onclick="sort_click(this,\'from\')">'+language('From')+'</th>'+
			'<th style="width:14%" class="'+to_class+'" onclick="sort_click(this,\'to\')">'+language('To')+'</th>'+
			'<th style="width:20%" class="'+starttime_class+'" onclick="sort_click(this,\'starttime\')">'+language('Start Time')+'</th>'+
			'<th style="width:14%" class="'+duration_class+'" onclick="sort_click(this,\'duration\')">'+language('Duration')+'</th>'+
			'<th style="width:12%" class="'+result_class+'" onclick="sort_click(this,\'result\')">'+language('Result')+'</th>'+
		'</tr>'
	);
	
	var cdr_html = '';
	for(var item in cdr_data){
		cdr_html += '<tr>'+
				'<td>'+
					'<input type="checkbox" class="log" value="'+cdr_data[item]['_num']+'" />'+
				'</td>'+
				'<td>'+cdr_data[item]['_caller']+'</td>'+
				'<td>'+cdr_data[item]['_callee']+'</td>'+
				'<td>'+cdr_data[item]['_from']+'</td>'+
				'<td>'+cdr_data[item]['_to']+'</td>'+
				'<td>'+cdr_data[item]['_start']+'</td>'+
				'<td>'+formatSeconds(cdr_data[item]['_time'])+'</td>'+
				'<td>'+language(cdr_data[item]['_result'])+'</td>'+
			'</tr>';
	}
	$("#cdr_title").after(cdr_html);
	
	$("#current_page_flag").val(page);
	$("#sort_flag").val(_sort);
	$("#order_flag").val(order);
	$("#caller_from_filter_flag").val(caller_from_val);
	$("#caller_to_filter_flag").val(caller_to_val);
	$("#channel_from_filter_flag").val(channel_from_val);
	$("#channel_to_filter_flag").val(channel_to_val);
	$("#starttime_from_filter_flag").val(starttime_from_val);
	$("#starttime_to_filter_flag").val(starttime_to_val);
	$("#duration_from_filter_flag").val(duration_from_val);
	$("#duration_to_filter_flag").val(duration_to_val);
	$("#result_filter_flag").val(result_val);
	
	//Pagination
	var page_count = Math.ceil(num/each_page_num);
	if(page > page_count){
		page = page_count;
	}
	
	if(page_count >= 2){
		if(page > 1){
			var prev_page = page - 1;
			$(".pg").append(
				'<a href="javascript:void" title="'+language('Previous page')+'" onclick="getpage('+prev_page+')" class="prev" ></a>'
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
				$(".pg").append('<a href="javascript:void" onclick="getpage('+i+')" >'+i+'</a>');
			}else{
				$(".pg").append('<strong>'+page+'</strong>');
			}
		}
		
		if(page < page_count){
			var next_page = parseInt(page) + 1;
			$(".pg").append('<a href="javascript:void" title="'+language('Next page')+'" onclick="getpage('+next_page+')" class="nxt" ></a>');
		}
		
		$(".pg").append(
			'<label>'+
				'<input type="text" id="page" name="page" value="'+page+'" size="2" class="px" title="'+language('input page help','Please input your page number, and press [Enter] to skip to.')+'" >'+
				'<span title="'+language('total pages')+': '+page_count+'" > / '+page_count+'</span>'+
			'</label>'+
			
			'<a href="javascript:void" title="'+language('goto input page')+'" style="cursor:pointer;" onclick="getpage(document.getElementById(\'page\').value)">'+language('go')+'</a>'
		);
	}
}

var url = get_url_para();

if(url['page'] != '' && url['page'] != undefined){
	var page = url['page'];
}else{
	var page = 1;
}

var each_page_num = 10;

object.AGLogCdrGet(succeed_back, error_back, get_sql(), 'cdr', page, each_page_num);

function succeed_back(data){
	var data_temp = data['_get'];
	var cdr_data = data_temp['_cdrs']['_item'];
	var num = data_temp['_num'];
	
	header(data_temp['_combuf']);
	cdr_show(cdr_data, num);
	footer();
	
	lang_show(num);
	onload_show();
}

function error_back(data){
	window.location.href = 'error.html';
}
/************************SHOW LOG CDR END********************************/


/************************DEL LOG CDR BEGIN********************************/
function del_log(){
	var log_datachunk = 'where ';
	
	var flag = 0;
	$(".log").each(function(){
		if($(this).attr('checked') == 'checked'){
			log_datachunk += 'id='+$(this).val()+' or ';
			flag = 1;
		}
	});
	if(flag == 1){
		log_datachunk=log_datachunk.substring(0,log_datachunk.length-4);
		object.AGLogCdrDel(del_succeed_back, del_error_back, log_datachunk, 'cdr');
	}else{
		alert('You have not chosen any option.');
		return false;
	}
}

$(".delete_input").click(function(){
	var ret = confirm('Are you sure to delete you selected ?');
	if(ret){
		del_log();
	}
});

function del_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'log-cdr.html?del=true';
	}
}

function del_error_back(data){
	alert('delete failed');
}
/************************DEL LOG CDR END********************************/



/************************Clean Up LOG CDR BEGIN********************************/
function clean_up_log(){
	object.AGLogCdrDel(clean_succeed_back, clean_error_back, '', 'cdr');
}

$(".clean_up_input").click(function(){
	var ret = confirm(language('Clean Up confirm','Are you sure to delete all logs ?'));
	if(ret){
		clean_up_log();
	}
});

function clean_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'log-cdr.html';
	}
}

function clean_error_back(data){
	alert(language('clean up failed'));
}
/************************Clean Up LOG CDR END********************************/


/************************General CDR Log BEGIN********************************/
var date = new Date();
var _year;
var _month;
var _date;
var _hour;
var _minute;
var _second;
var file_name;

function general_log(){
	_year = date.getFullYear();
	_month = date.getMonth() + 1;
	_date = date.getDate();
	_hour = date.getHours();
	_minute = date.getMinutes();
	_second = date.getSeconds();
	file_name = 'cdr-'+_year+'-'+_month+'-'+_date+'-'+_hour+'-'+_minute+'-'+_second+'.csv';
	object.AGLogCdrGenFile(general_succeed_back, general_error_back, '/tmp/'+file_name, 'cdr');
}

$(".export_input").click(function(){
	general_log();
});

function general_succeed_back(data){
	if(error_tip(data['_result'])){
		$(".downloadfile").val(file_name);
		$(".cdr_form").submit();
	}
}

function general_error_back(data){
	alert(language('export failed'));
}
/************************General CDR Log END********************************/