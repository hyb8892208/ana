object.AGLogGetAll(succeed_back, error_back);
$("#lps h1").html(language('page not found'));

function succeed_back(data){
	header(data['_combuf']);
	show_404();
	footer();
}

function error_back(data){}

function show_404(){}