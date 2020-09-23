function ctime(c, Y, M, D, sec) {
	sec++;
	var H=Math.floor(sec/3600)%24;
	var I=Math.floor(sec/60)%60;
	var S=sec%60;
	if(S<10) S='0'+S;
	if(I<10) I='0'+I;
	if(H<10) H='0'+H;
	if (H=='00' & I=='00' & S=='00') D=D+1; 
	if (M==2) { 
		if (Y%4==0 && !Y%100==0 || Y%400==0) { 
			if (D==30){
				M+=1;D=1;
			}
		} else { 
			if (D==29) {
				M+=1;D=1;
			} 
		}
	} else { 
		if (M==4 || M==6 || M==9 || M==11) { 
			if (D==31) {
				M+=1;D=1;
			} 
		} else { 
			if (D==32) {
				M+=1;D=1;
			} 
		}
	}

	if (M==13) {
		Y+=1;M=1;
	}
	setTimeout("ctime("+c+","+Y+","+M+","+D+","+sec+")", 1000);
	document.getElementById("currenttime").innerHTML = Y+'-'+M+'-'+D+' '+H+':'+I+':'+S;
}

function utime(sec2) {
	sec2++;
	var day=Math.floor(sec2/3600/24);
	var hour=Math.floor(sec2/3600)%24;
	var minute=Math.floor(sec2/60)%60;
	var second=sec2%60;
	if(hour<10) hour = '0' + hour;
	if(minute<10) minute = '0' + minute;
	if(second<10) second = '0' + second;

	document.getElementById("uptime").innerHTML = day+' days  '+hour+':'+minute+':'+second;
	setTimeout("utime("+sec2+")", 1000);
}

/**********************************************************************/


/*******************************SHOW SYSTEM INFO BEGIN***************************************/
(function(){
	$("#lang_model_name").html(language("Model Name"));
	$("#lang_software_version").html(language("Software Version"));
	$("#lang_hardware_version").html(language("Hardware Version"));
	$("#lang_slot_number").html(language("Slot Number"));
	$("#lang_storage_usage").html(language("Storage Usage"));
	$("#lang_memory_usage").html(language("Memory Usage"));
	$("#memory_clean").html(language("Memory Clean"));
	$("#lang_build_time").html(language("Build Time"));
}());

function info_show(info_data, date_data){
	var update_temp = info_data['_uptime'].split('.');
	var start_time = update_temp[0];
	
	var c = 0;
	var Y = date_data['_year'];
	var M = date_data['_month'];
	var D = date_data['_day'];
	var sec = parseInt(date_data['_hour']*3600) + parseInt(date_data['_minute']*60) + parseInt(date_data['_second']);
	
	//value
	$("#modelname").html(info_data['_modelname']);
	$("#_version").html(info_data['_version']);
	$("#stacknum").html(info_data['_stacknum']);
	$("#printdata").html(info_data['_printData']);
	$("#printmen").html(info_data['_printMen']+"%");
	$("#build_time").html(info_data['_buildtime']);
	
	//company info
	var addressen = info_data['_compyinfo']['_addressen'];
	var addresscn = info_data['_compyinfo']['_addresscn'];
	var tel = info_data['_compyinfo']['_tel'];
	var fax = info_data['_compyinfo']['_fax'];
	var email = info_data['_compyinfo']['_email'];
	var website = info_data['_compyinfo']['_website'];
	
	if(addressen == "" && addresscn == ""){
		$("#contact_address_tr").hide();
	}else{
		$("#lang_contact_address").html(language('Contact Address'));
		
		var lang_flag = language("Model Name");
		if(lang_flag != "Model Name"){
			$("#contact_address").html(addresscn);
		}else{
			$("#contact_address").html(addressen);
		}
	}
	
	if(tel == ""){
		$("#tel_tr").hide();
	}else{
		$("#lang_tel").html(language('Tel'));
		$("#tel").html(tel);
	}
	
	if(fax == ""){
		$("#fax_tr").hide();
	}else{
		$("#lang_fax").html(language('Fax'));
		$("#fax").html(fax);
	}
	
	if(email == ""){
		$("#email_tr").hide();
	}else{
		$("#lang_email").html(language('E-Mail'));
		$("#email").html('<a href="mailto:'+email+'">'+email+'</a>');
	}
	
	if(website == ""){
		$("#web_site_tr").hide();
	}else{
		$("#lang_web_site").html(language('Web Site'));
		$("#web_site").html('<a href="'+website+'" target="_blank">'+website+'</a>');
	}
	
	var html_str = "<tr>"+
			"<th>"+language('System Time')+":</th>"+
			"<td><span id='currenttime'></span></td>"+
		"</tr>"+
		"<tr>"+
			"<th>"+language('System Uptime')+":</th>"+
			"<td><span id='uptime'></span></td>"+
		"</tr>";
	
	$("#html_str").append(html_str);
	
	/* other info */
	ctime(c, Y, M, D, sec);
	utime(start_time);
}

object.AGSystemInfoGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var info_data = data_temp['_info'];
	var date_data = data_temp['_date'];
	
	header(data_temp['_combuf']);
	info_show(info_data, date_data);
	footer();
	
	$("#memory_clean").click(function(){
		memory_clean();
	});
}

function error_back(data){
	window.location.href = 'error.html';
}

/*******************************SHOW SYSTEM INFO END***************************************/



/*******************************MEMORY CLEAN BEGIN***************************************/
function memory_clean(){
	object.AGSystemInfoMemoryClean(clean_succeed_back, clean_error_back);
}

function clean_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'system-info.html';
	}
}

function clean_error_back(data){
	alert(language('clean failed'));
}
/*******************************MEMORY CLEAN END***************************************/