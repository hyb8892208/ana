function show_last()
{
	var t = document.getElementById("showlog");
	t.scrollTop = t.scrollHeight;
}

function change_refresh_rate(value) {
	setCookie("sip_cookieInterval", value);
	value = value*1000;
	setTimeout(system_repeat(value),1000);
}


function cookie_update() {
	var sip_cookieInterval = getCookie('sip_cookieInterval');
	var nowInterval = document.getElementById("interval");

	if (sip_cookieInterval == null) {
		setCookie("sip_cookieInterval", nowInterval.value);
	} else {
		nowInterval.value = sip_cookieInterval;
	}
}

function onload_show(){
	cookie_update();
	show_last();
	var timeout = $("#interval").attr("value");
	timeout = 1000*timeout;
	setTimeout(system_repeat(timeout),1000);
}
/******************************************************************************/



/******************************SHOW LOG SIP BEGIN******************************/
object.AGLogGetAll(succeed_back, error_back);

function succeed_back(data){
	header(data['_combuf']);
	logsip_show();
	footer();
	
	onload_show();
	
	/* other info */
	$("#sip_logs_li").text(language('SIP Logs'));
	$("#refresh_rate_td").text(language('Refresh Rate')+':');
	$(".refresh_input").val(language('Refresh'));
	$(".clean_up_input").val(language('Clean Up'));
}

function error_back(data){
	window.location.href = 'error.html';
}

var old_data_len;
function logsip_show(){
	$.ajax({
		url: "/log/sip-log",
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
/******************************SHOW LOG SIP END******************************/



/*****************************Refresh Rate BEGIN*****************************/
var cc;
function system_repeat(time){
	clearTimeout(cc);
	if(time != 0){
		$.ajax({
			url: "/log/sip-log",
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
	object.AGLogDelAll(del_succeed_back, del_error_back, 'log-sip');
}

function del_succeed_back(data){
	document.getElementById("showlog").innerHTML = '';
	show_last();
}

function del_error_back(data){
	alert(language('clean up failed'));
}
/*********************************Clean Up END*******************************/