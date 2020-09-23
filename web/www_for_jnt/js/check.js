// Check valid ip addres or network address
function check_domain(str)
{
	//false: 'Invalid domain or IP address.'
	var rex=/^(([a-z0-9](w|-){0,61}?[a-z0-9]|[a-z0-9]).){1,}(aero|arpa|asia|biz|cat|com|coop|co|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])(.[a-z][a-z]){0,1}$/i;
	if(rex.test(str)) {
		return true;
	}

	rex=/^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

// Check valid name (DIY)
// -_+.0-9a-zA-Z>, 32 character long
function check_diyname(str)
{
	// Allowed character must be any of [-_+.<>&0-9a-zA-Z],1 - 32 characters. 
	var rex=/^[-_+.<>&0-9a-zA-Z]{1,32}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_ssh_diyname(str)  
{
  	// Allowed character must be any of [-_+.<>&0-9a-zA-Z],1 - 25 characters.
  	var rex=/^[-_+.<>&0-9a-zA-Z]{1,25}$/i;
  	if(rex.test(str)) {
  		return true;
	}  	
	
	return false;
}

function check_diypwd(str)
{
	// Allowed character must be any of [-_+.<>&0-9a-zA-Z],4 - 32 characters. 
	var rex=/^[-_+.<>&0-9a-zA-Z]{4,32}$/i;

	if(rex.test(str)) {
		return true;
	}

	return false;
}

// Check valid email address
function check_email(str)
{
	var rex=/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)$/;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

// '<?php echo htmlentities(language('js check sipendp','Allowed character must be any of [0-9a-zA-Z`~\+!@#$%^*()_{}:|?-=.], 1-32 characters.'));?>'
function check_sipendp(str)
{
	var rex=/^[0-9a-zA-Z`~\+!@#$%^*()_{}:|?\-=.]{1,32}$/i;

	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_sipname(str)
{
	var rex=/^[0-9a-zA-Z$*\+\-=_.]{1,32}$/i;

	if(rex.test(str)) {
		return true;
	}

	return false;
}

// '<?php echo htmlentities(language('js check sippwd','Allowed character must be any of [0-9a-zA-Z`~!#@$%^&*()_+{}|<>?-=[],./],1 - 32 characters.'));?>'
function check_sippwd(str)
{
	var rex=/^[0-9a-zA-Z`~!#@$%^&*()_+\{\}|<>\-=\[\]\,.]{1,32}$/i;
	var rexblank = /\s+/;
	if(rex.test(str) || rexblank.test(str) || !str) {
		return true;
	}

	return false;
}

function check_sipnumber(str)
{
	// Only allow digits characters, length: 1-32.
	var rex=/^[0-9\+]{1,32}$/i;

	if(rex.test(str)) {
		return true;
	}

	return false;
}

// Check valid network port
function check_networkport(str)
{
	// Please input valid port number (1-65535).
	var val = parseInt(str);
	if(val >= 1 && val <= 65535) {
		return true;
	}

	return false;
}

// Check valid smtp user
function check_smtpuser(str)
{
	// Please input a valid STMP user name
	var rex=/^[\w@.]{1,64}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

// Check valid smtp password
function check_smtppwd(str)
{
	// Password character range: 1-64.
	var rex=/^[\w@.`~!#$%^&*()+=\-\{\}\\\|:;\'"<>,.\?]{1,64}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_ntpserver(str)
{
	return check_domain(str);
}

function check_phonenum(str)
{
	// Please input a valid phone number!
	var rex=/^[0-9\+]{1,32}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_ussd(str)
{
	// Please input a valid USSD number!
	var rex=/^[0-9\+\*\#]{1,32}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_ip(str)
{
	// Please input a valid IP address!
	var rex=/^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_mac(str)
{
	// Please input a valid MAC address.
	var rex=/^([0-9a-fA-F]{2}:){5}([0-9a-fA-F]){2}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_pppoeuser(str)
{
	// Please input valid username.
	var rex=/^[\w@.`~!#$%^&*()+=\-\{\}\\\|:;\'"<>,.\?]{1,64}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function check_pppoepwd(str)
{
	// Please input valid password.
	var rex=/^[\w@.`~!#$%^&*()+=\-\{\}\\\|:;\'"<>,.\?]{1,64}$/i;
	if(rex.test(str)) {
		return true;
	}

	return false;
}

function con_str(str)
{
	return '<font color=ff0000>&nbsp;&nbsp;*'+str+'</font>';
}

function check_dialmatchingrule(str)
{
	// Please input a valid dial matching rule!
	var rex=/^[_0-9\*\#\[][0-9\-\*\#\[\]\.,XZN]{1,32}$/i;
	var rex1=/^_[XNZ]\.$/i;
	if(rex.test(str)) {
		return true;
	}
	if(rex1.test(str)) {
		return true;
	}
	alert(str);

	return false;
}

