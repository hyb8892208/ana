function show_last()
{
	var t = document.getElementById("showlog");
	t.scrollTop = t.scrollHeight;
}

function change_refresh_rate(value) {
	setCookie("ast_cookieInterval", value);
	value = value*1000;
	setTimeout(system_repeat(value),1000);
}


function cookie_update() {
	var ast_cookieInterval = getCookie('ast_cookieInterval');
	var nowInterval = document.getElementById("interval");

	if (ast_cookieInterval == null) {
		setCookie("ast_cookieInterval", nowInterval.value);
	} else {
		nowInterval.value = ast_cookieInterval;
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



/******************************SHOW LOG AST BEGIN******************************/
var old_data_len;
function ast_show(){
	$.ajax({
		url: "/log/log4gw",
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
	ast_show();
	footer();
	
	onload_show();
	
	/* other info */
	$("#refresh_rate_td").text(language('Refresh Rate')+':');
	$("#lang_asterisk_logs").html(language("Asterisk Logs"));
	$(".refresh_input").val(language('Refresh'));
	$(".clean_up_input").val(language('Clean Up'));
}

function error_back(data){
	window.location.href = 'error.html';
}
/******************************SHOW LOG AST END******************************/


/*****************************Refresh Rate BEGIN*****************************/
var cc;
function system_repeat(time){
	clearTimeout(cc);
	if(time != 0){
		$.ajax({
			url: "/log/log4gw",
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
	object.AGLogDelAll(del_succeed_back, del_error_back, 'log-ast');
}

function del_succeed_back(data){
	document.getElementById("showlog").innerHTML = '';
	show_last();
}

function del_error_back(data){
	alert(language('clean up failed'));
}
/*********************************Clean Up END*******************************/