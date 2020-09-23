function show_last()
{
	var t = document.getElementById("showlog");
	t.scrollTop = t.scrollHeight;
}

function change_refresh_rate(value) {
	setCookie("sys_cookieInterval", value);
	value = value*1000;
	setTimeout(system_repeat(value),1000);
}


function cookie_update() {
	var sys_cookieInterval = getCookie('sys_cookieInterval');
	var nowInterval = document.getElementById("interval");

	if (sys_cookieInterval == null) {
		setCookie("sys_cookieInterval", nowInterval.value);
	} else {
		nowInterval.value = sys_cookieInterval;
	}
}

function onload_show(){
	cookie_update();
	show_last();
	var timeout = $("#interval").attr("value");
	timeout = 1000*timeout;
	setTimeout(system_repeat(timeout),1000);
}
/***************************************************************************/


/*****************************SHOW LOG SYS BEGIN*****************************/
var old_data_len;
function sys_show(sys_data){
	$.ajax({
		url: "/log/sys-log",
		cache: false,
		success: function(data){
			if(data.indexOf('<title>404</title>') != -1){
				$("#showlog").text('');
			}else{
				$("#showlog").text(data);
				show_last();
			}
		},
		error: function(){
			$("#showlog").text('');
		}
	});
}

object.AGLogGetAll(succeed_back, error_back);

function succeed_back(data){
	header(data['_combuf']);
	sys_show();
	footer();
	
	onload_show();
	
	/* other info */
	$("#system_logs_li").text(language('System Logs'));
	$("#refresh_rate_td").text(language('Refresh Rate')+':');
	$(".refresh_input").val(language('Refresh'));
	$(".clean_up_input").val(language('Clean Up'));
}

function error_back(data){
	window.location.href = 'error.html';
}
/*****************************SHOW LOG SYS END*****************************/


/*****************************Refresh Rate BEGIN*****************************/
var cc;
function system_repeat(time){
	clearTimeout(cc);
	if(time != 0){
		$.ajax({
			url: "/log/sys-log",
			cache: false,
			success: function(data){
				if(data.indexOf('<title>404</title>') != -1){
					$("#showlog").text('');
				}else{
					$("#showlog").text(data);
					show_last();
				}
			},
			error: function(){
				$("#showlog").text('');
			}
		});
		
		cc = setTimeout(function(){system_repeat(time);}, time);
	}
}
/*****************************Refresh Rate END*****************************/



/*********************************Clean Up BEGIN*******************************/
function CleanUp()
{
	if(!confirm(language('Clean Up confirm','Are you sure to clean up all logs!'))) return false;
	object.AGLogDelAll(del_succeed_back, del_error_back, 'log-sys');
}

function del_succeed_back(data){
	document.getElementById("showlog").innerHTML = '';
	show_last();
}

function del_error_back(data){
	alert(language('clean up failed'));
}
/*********************************Clean Up END*******************************/