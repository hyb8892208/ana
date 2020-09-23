function textSelect (o, a, b) {
	var a = parseInt(a, 10), b = parseInt(b, 10);
	var l = o.value.length;
	if (l) {
		if (!a) { a = 0; }
		if (!b) { b = l; }
		if (a > l) { a = l; }
		if (b > l) { b = l; }
		if (a < 0) { a = l + a; }
		if (b < 0) { b = l + b; }
		if (o.createTextRange) {
			var range = o.createTextRange();

			b = b - a;
			range.moveStart("character", -l);
			range.moveEnd("character", -l);
			range.moveStart("character", a);
			range.moveEnd("character", b);
			range.select();
		} else {
			o.setSelectionRange(a, b);
			o.focus();
		}
	}
}

function lineCount(o) {
	var ovalue = o.value;

	return ovalue.split('\n').length;
}

function lineText(o, i) {
	var l = lineCount(o);
	var ovalue = o.value;

	if (!i) { i = 1; }
	if (i > l) { i = 1; }
	if (i <= 0) { i = 1; }
	return ovalue.split('\n')[i - 1];
}

function lineIndex (o, i) {
	var l = lineCount(o);
	var index = 0;
	if (!i) { i = 1; }
	if (i > l || i <= 0) { i = 1; }
	for (j = 1; j <= i; j++) {
		if (j == 1) { index = 0; }
		else {
			if (o.createTextRange) {
				index += lineText(o, j - 1).length;
			} else {
				index += lineText(o, j - 1).length + 1;
			}
	       	}
	}
	return index;
}

function lineSelect (o, i) {
	var a = lineIndex(o, i);
	var b = a + lineText(o, i).length;
	textSelect(o, a, b);
} 

function check()
{
	var rules = document.getElementById('all_matching_rules').value;

	var rule = rules.split("\n");
	for (i = 0; i < rule.length; i++) {
		if (trim(rule[i]) == "")
			continue;
		if (!check_dialmatchingrule(trim(rule[i]))) {
			alert(language("Allowed character must be any of [_.-*#[]0-9XZN],2 - 32 characters"));
			lineSelect(document.getElementById('all_matching_rules'), i + 1);
			return false;
		}
	}
	return true;
}
/*******************************************************************************/

/********************************SHOW DIALTABLE BEGIN********************************/
function dial_show(dial_data){
	
	var show_data = '';
	
	for(var i=0;i<dial_data.length;i++){
		show_data += dial_data[i]['_value'] + '\n';
	}
	
	$("#all_matching_rules").text(show_data);
	$("#helpinfo").html(language("Dial Matching Rule help")); 
	
	/* other info */
	$(".save_input").val(language('Save'));
	$(".save_cancel").val(language('Cancel'));
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}

object.AGAlgDialtableGet(succeed_back, error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var dial_data = data_temp['_lines']['_item'];
	
	header(data_temp['_combuf']);
	dial_show(dial_data);
	footer();
	
	/* save data */
	$(".save_input").click(function(){
		if(check()){
			if(save_only_once()){
				$("#loading_image").show();
				dial_save();
			}
		}
	});
}

function error_back(data){
	window.location.href = 'error.html';
}
/********************************SHOW DIALTABLE END********************************/


/********************************SAVE DIALTABLE BEGIN********************************/
function dial_save(){
	var datachunk = '';
	var dial_info = $("#all_matching_rules").val();
	dial_temp = dial_info.split("\n");
	var LineArr = new AST_LineArr();
	for(var i=0;i<dial_temp.length;i++){
		if(dial_temp[i] != ''){
			var line = new AST_Line();
			line._key = i;
			line._value = dial_temp[i];
			LineArr._item.push(line);
		}
	}
	var AlgDialtableSave = new AST_AlgDialtableSave();
	AlgDialtableSave._lines = LineArr;
	object.AGAlgDialtableSave(save_succeed_back, save_error_back, AlgDialtableSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-dialtable.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save falied'));
}
/********************************SAVE DIALTABLE END********************************/