function check(){
	// if(document.getElementById('enable').checked == true){
		// var timeout = document.getElementById('timeout').value;
		
		// document.getElementById('ctimeout').innerHTML = '';
		// if(timeout == '' || isNaN(timeout) || parseInt(timeout) > 300 || parseInt(timeout) < 1){
			// document.getElementById('ctimeout').innerHTML = con_str("Range: 1-300.");
			// document.getElementById('timeout').focus();
			// return false;
		// }
	// }
	
	var file_name = document.getElementById('uploadfile1').value;
	if(file_name != '' && file_name.indexOf('.ulaw') == -1){
		alert(language('Voice File tip','File format can only be. Ulaw'));
		return false;
	}
	
	return true;
}

function onload_func(){
	$("#enable").iButton();
}

/*********************************SHOW CALL TEST BEGIN*********************************/
(function(){
	$("#lang_general").html(language('General'));
	$("#lang_enable").html(language('Enable'));
	$("#lang_enable_help").html(language('Enable help'));
	// $("#lang_timeout").html(language('Timeout'));
	// $("#lang_timeout_help").html(language('Timeout help','Timeout'));
	$("#lang_voicefile").html(language('Voice File'));
	$("#lang_voicefile_help").html(language('Voice File help'));
	$("#lang_port").html(language('Port'));
	$("#lang_type").html(language('Type'));
	$("#lang_name").html(language('Name'));
	$("#lang_result").html(language('Result'));
	$("#lang_action").html(language('Action'));
	$("#lang_test").val(language('Test'));
	$("#lang_save").val(language('Save'));
}());

function show_calltest(data_temp){
	var enable = data_temp['_sw'];
	if(enable == 1){
		document.getElementById('enable').checked = true;
	}else{
		document.getElementById('enable').checked = false;
	}
	
	// var timeout = data_temp['_timeout'];
	// document.getElementById('timeout').value = timeout;
	
	var file_status = data_temp['_OriFileSta'];
	if(file_status == 1){
		var str = "<span id='file_exist' style='color:green' value='1'>"+language('File already exist')+"</span>";
	}else{
		var str = "<span id='file_exist' style='color:red' value='0'>"+language('File does not exist')+"</span>";
	}
	$("#uploadfile1").after(str);
	
	//list
	var str = '';
	var lang_test_str = language('Test');
	for(var i=0;i<data_temp['_ana']['_item'].length;i++){
		var channel = data_temp['_ana']['_item'][i]['_channel'];
		var name = data_temp['_ana']['_item'][i]['_name'];
		if(name == ''){
			name = 'port-'+channel;
		}
		if(data_temp['_ana']['_item'][i]['_signalling'] == 1){
			var type = 'S Ports';
		}else if(data_temp['_ana']['_item'][i]['_signalling'] == 2){
			var type = 'FXO';
		}else{
			var type = '';
		}
		
		str += '<tr>'+
				'<td><input type="checkbox" class="port" name="port[]"/></td>'+
				'<td class="channel">'+channel+'</td>'+
				'<td class="name">'+name+'</td>'+
				'<td class="type">'+type+'</td>'+
				'<td class="result"></td>'+
				'<td style="text-align:center;" >'+'<button class="cancel_input" onclick="Test_one(this)">'+lang_test_str+'</button>'+'</td>'+
				'</tr>';
	}
	
	$(".tshow").append(str);
}

object.AGAlgAutoCallGet(success_back, error_back);

function success_back(data){
	var data_temp = data['_get'];
	
	header(data_temp['_combuf']);
	show_calltest(data_temp);
	footer();
	
	onload_func();
	
	$("#lang_save").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				save_calltest();
			}
		}
	});
	
	var url = get_url_para();
	if(url['tip'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}

function error_back(data){
	window.location.href = 'error.html';
}
/********************************SHOW CALL TEST END**********************************/



/*********************************SAVE CALL TEST BEGIN*********************************/
function save_calltest(){
	var AutoCallSave = new AST_AutoCallSave();
	
	if(document.getElementById('enable').checked){
		var enable = 1;
	}else{
		var enable = 0;
	}
	AutoCallSave._sw = enable;
	
	// var timeout = document.getElementById('timeout').value;
	AutoCallSave._timeout = 200;
	
	object.AGAlgAutoCallSave(save_success_back, save_error_back, AutoCallSave);
}

function save_success_back(data){
	if(error_tip(data['_result'])){
		var file = document.getElementById('uploadfile1').value;
		
		if(file != ''){
			$("#file_form").submit();
		}else{
			window.location.href = 'alg-calltest.html?tip=true';
		}
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}
/*********************************SAVE CALL TEST END*********************************/


/****************************************TEST BEGIN**********************************/
function Test_one(that){
	if($('#file_exist').attr('value') == '1'){
		$(that).parent().siblings('.result').html("<img src='/images/loading1.gif' />");
		
		var port = $(that).parent().siblings('.channel').text();
		var name = $(that).parent().siblings('.name').text();
		if(name == ''){
			name = 'port-'+port;
		}
		var type = $(that).parent().siblings('.type').text();
		if(type == 'S Ports'){
			type = 1;
		}else{
			type = 0;
		}
		
		var AutoCallChnArr = new AST_AutoCallChnArr();
		
		var AutoCallChn = new AST_AutoCallChn();
		AutoCallChn._channel = port;
		AutoCallChn._name = name;
		AutoCallChn._signalling = type;
		AutoCallChnArr._item.push(AutoCallChn);
		
		var AutoCallTest = new AST_AutoCallTest();
		AutoCallTest._ana = AutoCallChnArr;
		
		object.AGAlgAutoCallTest(test_success_back, test_error_back, AutoCallTest);
	}else{
		alert(language('Please upload the file first'));
	}
}

function Test_all(){
	if($('#file_exist').attr('value') == '1'){
		var AutoCallTest = new AST_AutoCallTest();
		var AutoCallChnArr = new AST_AutoCallChnArr();
		
		$(".port").each(function(){
			if($(this).prop("checked")){
				$(this).parent().siblings('.result').html("<img src='/images/loading1.gif' />");
				
				var channel = $(this).parent().siblings('.channel').text();
				var name = $(this).parent().siblings('.name').text();
				if(name == ''){
					name = 'port-'+channel;
				}
				var type = $(this).parent().siblings('.type').text();
				if(type == 'S Ports'){
					type = 1;
				}else{
					type = 0;
				}
				
				var AutoCallChn = new AST_AutoCallChn();
				AutoCallChn._channel = channel;
				AutoCallChn._name = name;
				AutoCallChn._signalling = type;
				AutoCallChnArr._item.push(AutoCallChn);
			}
		});
		
		AutoCallTest._ana = AutoCallChnArr;
		object.AGAlgAutoCallTest(test_success_back, test_error_back, AutoCallTest);
	}else{
		alert(language('Please upload the file first'));
	}
}

function test_success_back(data){
	var result = data['_result'];
	var temp = result.split('\n');
	var arr = [];
	for(var i=0;i<temp.length;i++){
		var tmp = temp[i].split(';');
		var port = tmp[0];
		var res = tmp[1];
		
		arr.push([port, res]);
	}
	
	$(".channel").each(function(){
		var channel = $(this).text();
		
		for(var i=0;i<arr.length;i++){
			if(channel == arr[i][0]){
				if(arr[i][1].indexOf('success') != -1){
					$(this).siblings('.result').html("<span style='color:green'>"+arr[i][1]+"</span>");
				}else{
					$(this).siblings('.result').html("<span style='color:red'>"+arr[i][1]+"</span>");
				}
			}
		}
	});
}

function test_error_back(data){
	alert('Test error');
}
/****************************************TEST END**********************************/