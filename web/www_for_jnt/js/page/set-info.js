function HeaderImg_change(){
	var header_image = document.getElementById('header_image');
	var imgUrl = window.URL.createObjectURL(header_image.files[0]);
	var imgheader = document.getElementById('imgheader');
	imgheader.setAttribute('src',imgUrl);
}
function FooterImg_change(){
	var footer_image = document.getElementById('footer_image');
	var imgUrl = window.URL.createObjectURL(footer_image.files[0]);
	var imgfooter = document.getElementById('imgfooter');
	imgfooter.setAttribute('src',imgUrl);
}

function onload_show(){
	$(".zoom_img img").zoomify();
	$("#switch").iButton();
}

function check(){
	if(document.getElementById('switch').checked){
		var product_name = document.getElementById('product_name').value;
		if(product_name.length > 128){
			document.getElementById('product_name').focus();
			return false;
		}
		
		var address = document.getElementById('address').value;
		if(address.length > 256){
			document.getElementById('address').focus();
			return false;
		}
		
		var tel = document.getElementById('tel').value;
		if(tel.length > 128){
			document.getElementById('tel').focus();
			return false;
		}
		
		var fax = document.getElementById('fax').value;
		if(fax.length > 128){
			document.getElementById('fax').focus();
			return false;
		}
		
		var email = document.getElementById('email').value;
		if(email.length > 128){
			document.getElementById('email').focus();
			return false;
		}
		
		var web_site = document.getElementById('web_site').value;
		if(web_site.length > 256){
			document.getElementById('web_site').focus();
			return false;
		}
		
		var copyright = document.getElementById('copyright').value;
		if(copyright.length > 256){
			document.getElementById('copyright').focus();
			return false;
		}
	}
	
	return true;
}
/***************************************************************************/
(function(){
	$("#lang_set_information").html(language('Set Information'));
	$("#lang_switch").html(language('Switch@setinfo','Switch'));
	$("#lang_switch_help").html(language('Switch help@setinfo','If this switch is enabled, the following parameter information will be used.'));
	$("#lang_product_name").html(language('Product Name'));
	$("#lang_product_name_help").html(language('Product Name help','Product Name'));
	$("#lang_contact_address").html(language('Contact Address'));
	$("#lang_contact_address_help").html(language('Contact Address help','Contact Address'));
	$("#lang_tel").html(language('Tel'));
	$("#lang_tel_help").html(language('Tel help','Tel'));
	$("#lang_fax").html(language('Fax'));
	$("#lang_fax_help").html(language('Fax help','Fax'));
	$("#lang_email").html(language('E-Mail'));
	$("#lang_email_help").html(language('E-Mail help','E-Mail'));
	$("#lang_web_site").html(language('Web Site'));
	$("#lang_web_site_help").html(language('Web Site help','Web Site'));
	$("#lang_copyright").html(language('Copyright'));
	$("#lang_copyright_help").html(language('Copyright help','Copyright'));
	$("#lang_header_image").html(language('Header Image'));
	$("#lang_header_image_help").html(language('Header Image help','Header background picture, the size of the picture is 1280x417, can be seen in the following case picture.'));
	$("#lang_footer_image").html(language('Footer Image'));
	$("#lang_footer_image_help").html(language('Footer Image help','Footer background picture, the size of the picture is 1280x105, can be seen in the following case picture.'));
	$(".lang_download_sample_images").html(language('Download Sample Images'));
	$("#lang_download_sample_images_help").html(language('Download Sample Images help','Download the case picture and modify it according to the size of the picture.'));
	
	$("#submit").val(language('Save'));
}());

function show_set_info(data_temp){
	var sw = data_temp['_get']['_sw'];
	if(sw == 1){
		document.getElementById('switch').checked = true;
	}else{
		document.getElementById('switch').checked = false;
	}
	
	var modelname = data_temp['_get']['_modelname'];
	document.getElementById('product_name').value = modelname;
	
	var address = data_temp['_get']['_address'];
	document.getElementById('address').value = address;
	
	var tel = data_temp['_get']['_tel'];
	document.getElementById('tel').value = tel;
	
	var fax = data_temp['_get']['_fax'];
	document.getElementById('fax').value = fax;
	
	var email = data_temp['_get']['_email'];
	document.getElementById('email').value = email;
	
	var website = data_temp['_get']['_website'];
	document.getElementById('web_site').value = website;
	
	var copyright = data_temp['_get']['_copyright'];
	document.getElementById('copyright').value = copyright;
	
	var rand = Math.random();
	var headerimagepath = data_temp['_get']['_headerimagepath']+'?v='+rand;
	if(headerimagepath == ''){
		headerimagepath = '/data/images/bg.jpeg?v='+rand;
	}
	$("#imgheader").attr("src", headerimagepath);
	
	var footerimagepath = data_temp['_get']['_footerimagepath']+'?v='+rand;
	if(footerimagepath == ''){
		footerimagepath = '/data/images/boot.jpeg?v='+rand;
	}
	$("#imgfooter").attr("src", footerimagepath);
}

object.AGOEMSettingInfoGet(success_back, error_back);

function success_back(data){
	var data_temp = data['_get'];
	header(data['_get']['_combuf']);
	show_set_info(data_temp);
	footer();
	onload_show();
	
	$("#submit").click(function(){
		if(check()){
			if(save_only_once()){
				save_set_info();
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

/***************************************************************************/
function save_set_info(){
	var oemsettinginfo = new AST_OEMSettingInfo();
	
	if(document.getElementById('switch').checked){
		var sw = 1;
	}else{
		var sw = 0;
	}
	oemsettinginfo._sw = sw;
	
	var modelname = document.getElementById('product_name').value;
	oemsettinginfo._modelname = modelname;
	
	var address = document.getElementById('address').value;
	oemsettinginfo._address = address;
	
	var tel = document.getElementById('tel').value;
	oemsettinginfo._tel = tel;
	
	var fax = document.getElementById('fax').value;
	oemsettinginfo._fax = fax;
	
	var email = document.getElementById('email').value;
	oemsettinginfo._email = email;
	
	var website = document.getElementById('web_site').value;
	oemsettinginfo._website = website;
	
	var copyright = document.getElementById('copyright').value;
	oemsettinginfo._copyright = copyright;
	
	var headerimagepath = '';
	oemsettinginfo._headerimagepath = headerimagepath;
	
	var footerimagepath = '';
	oemsettinginfo._footerimagepath = footerimagepath;
	
	var OEMSettingInfoSave = new AST_OEMSettingInfoSave();
	OEMSettingInfoSave._save = oemsettinginfo;
	
	object.AGOEMSettingInfoSave(save_succeed_back, save_error_back, OEMSettingInfoSave);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		var header_image = document.getElementById('header_image').value;
		var footer_image = document.getElementById('footer_image').value;
		
		if(header_image != '' || footer_image != ''){
			$("#img_form").submit();
		}else{
			window.location.href = 'set-info.html?tip=true';
		}
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save failed'));
}