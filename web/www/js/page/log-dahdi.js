function show_last()
{
	var t = document.getElementById("showlog");
	t.scrollTop = t.scrollHeight;
}

function change_refresh_rate(value) {
	setCookie("dahdi_cookieInterval", value);
	value = value*1000;
	setTimeout(system_repeat(value),1000);
}


function cookie_update() {
	var dahdi_cookieInterval = getCookie('dahdi_cookieInterval');
	var nowInterval = document.getElementById("interval");

	if (dahdi_cookieInterval == null) {
		setCookie("dahdi_cookieInterval", nowInterval.value);
	} else {
		nowInterval.value = dahdi_cookieInterval;
	}
}

function onload_show(){
	cookie_update();
	show_last();
	var timeout = $("#interval").attr("value");
	timeout = 1000*timeout;
	setTimeout(system_repeat(timeout),1000);
}
/********************************************************************************/



/******************************SHOW LOG DAHDI BEGIN******************************/
var old_data_len;
function dahdi_show(){
	$.ajax({
		url: "/log/dahdi-log",
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
	dahdi_show();
	footer();
	
	onload_show();
	
	/* other info */
	$("#refresh_rate_td").text(language('Refresh Rate')+':');
	$("#lang_dahdi_logs").html(language("DAHDI Logs"));
	$(".refresh_input").val(language('Refresh'));
	$(".clean_up_input").val(language('Clean Up'));
}

function error_back(data){
	window.location.href = 'error.html';
}
/******************************SHOW LOG DAHDI END******************************/


/*****************************Refresh Rate BEGIN*****************************/
var cc;
function system_repeat(time){
	clearTimeout(cc);
	if(time != 0){
		$.ajax({
			url: "/log/dahdi-log",
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
	object.AGLogDelAll(del_succeed_back, del_error_back, 'log-dahdi');
}

function del_succeed_back(data){
	document.getElementById("showlog").innerHTML = '';
	show_last();
}

function del_error_back(data){
	alert(language('clean up failed'));
}
/*********************************Clean Up END*******************************/