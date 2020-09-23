function check()
{
	var command = document.getElementById("command").value;

	if(trim(command) == '') {
		return false;
	}

	return true;
}
/*****************************************************************************************/

/*********************************SHOW ADV ASTCLI BEGIN******************************/
(function(){
	$("#lang_command").html(language("Command"));
	$("#lang_command_help").html(language('Command help@adv-astcli','Type your Asterisk CLI commands here to check or debug your gateway.<br/>e.g, type \'help\' or \'?\' you will get all help information.'));
	$("#lang_excute").val(language("Execute"));
	$("#asterisk_cli_li").html(language('Asterisk CLI'));
}());

object.AGAdvAstcliGet(succeed_back, error_back);

function succeed_back(data){
	header(data['_combuf']);
	footer();
	
	$(".execute_input").click(function(){
		if(check()){
			astcli_save();
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/*********************************SHOW ADV ASTCLI END******************************/


/*********************************SAVE ADV ASTCLI BEGIN******************************/
function astcli_save(){
	var command = document.getElementById('command').value;
	
	if(command != ''){
		if(command == 'help' || command == '?'){
			command = 'core show help';
		}
		var ast_cmd = "asterisk -rx '"+command+"'";
		object.AGAdvAstcliRun(save_succeed_back, save_error_back, ast_cmd);
	}
}

var i = 1;
function save_succeed_back(data){
	if(i == 10){
		$("#content").html("");
	}
	$("#content").prepend(
		"<pre style='font-size:16px;'>"+language("output")+':<br>'+
			data['_result']+
		"</pre>"+
		"<hr />"
	);
	i++;
}

function save_error_back(data){
	alert(language('execute failed'));
}
/*********************************SAVE ADV ASTCLI END******************************/