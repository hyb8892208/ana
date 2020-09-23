object.AGLogGetAll(succeed_back, error_back);
$("#lps span").html(language('resource error'));
$("#lps a").html(language('back'));
$("#lps a").click(function(){
	window.history.go(-1);
});

function succeed_back(data){
	header(data['_combuf']);
	footer();
}

function error_back(data){}