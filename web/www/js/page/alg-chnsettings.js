function siptrunk_change_new(analog_data, routing_data)
{
	$(".associated_sip").change(function(){
		var asschannel_old = $(this).siblings('.associated_chnnl_oldvalue').val();
		var asschannel = $(this).val();
		var channel = $(this).siblings(".channel_name").val();
		
		if(asschannel != 'none'){
			for(var i=0;i<analog_data.length; i++){
				if(analog_data[i]['_signalling'] != 1) continue;
				
				if(channel != analog_data[i]['_channel']){
					otherchannel = document.getElementById('associated_chnnl'+analog_data[i]['_channel']).value;
					if((otherchannel == asschannel && otherchannel != 'none') || (is_routing_use(routing_data, asschannel) && _Define['type'] != 2)){
						if(is_routing_use(routing_data, asschannel) && _Define['type'] != 2){
							alert(asschannel + " has already used by routing!");
							if(asschannel_old != ''){
								document.getElementById('associated_chnnl'+channel).value = asschannel_old;
							}else{
								document.getElementById('associated_chnnl'+channel).value = 'none';
							}
							return;
						}
						alert(asschannel + " has already used by Port " + analog_data[i]['_channel'] + "!");
						if(asschannel_old != ''){
							document.getElementById('associated_chnnl'+channel).value = asschannel_old;
						}else{
							document.getElementById('associated_chnnl'+channel).value = 'none';
						}
						return;
					}
				}
			}
		}
	});
}

function check_channel(sigtype){
	if(sigtype == 3){
		alert('Port NULL');
		return false;
	}
}
/*******************************************************************************/


/*******************************SHOW ALG CHNSETTINGS BEGIN***************************/
function get_all_sip(channel,line,sip_data){
	var _select = '<input type="hidden" class="associated_chnnl_oldvalue" value="'+line+'">'+
				'<input type="hidden" class="channel_name" value="'+channel+'">'+
			'<select size=1 name="associated_chnnl'+channel+'" class="associated_sip" id="associated_chnnl'+channel+'" >'+
			'<option value="none">None</option>'+
			'<optgroup label="SIP">';
	for(var item in sip_data){
		var sip_sec = sip_data[item]['_section'];
		var temp = sip_sec.split('-');
		if(temp[1] != undefined){continue;}
		if(line == sip_data[item]['_section']){
			_select = _select+'<option value="'+sip_data[item]['_section']+'" selected>'+sip_data[item]['_section']+'</option>';
		}else{
			_select = _select+'<option value="'+sip_data[item]['_section']+'">'+sip_data[item]['_section']+'</option>';
		}
	}
	_select = _select+'</optgroup></select>';
	return _select;
}

(function(){
	$("#lang_port").html(language('Port'));
	$("#lang_type").html(language('Type'));
	$("#lang_name").html(language('Name'));
	$("#lang_line_status").html(language('Line Status/Sip Account'));
	$("#lang_port_status").html(language('Port Status'));
	$("#lang_actions").html(language('Actions'));
	$(".save_input").val(language('Save'));
	$(".cancel_input").val(language('Cancel'));
	
	/* Call Limit begin */
	$("#lang_call_status").html(language('Call Status'));
	$("#lang_hour_call_count").html(language('Hour Call Count'));
	$("#lang_daily_call_count").html(language('Daily Call Count'));
	$("#lang_daily_answer_count").html(language('Daily Answer Count'));
	/* Call Limit begin */
	
	var url = get_url_para();
	if(url['save'] == 'true'){
		$("#feed_back_tip").text(language('Save Successfully'));
	}
}());

function show_chnls(analog_data, channel_data, sip_data, routing_data, calllimit_data, flex_routing_sw){
	var n = analog_data.length;

	var html_str = '';
	if(n==0){
		for(i=1;i<=8;i++){
			html_str += '<tr id=list'+i+'>'+
				'<td>'+i+'</td>'+
				'<td>Port NULL</td>'+
				'<td></td>'+
				'<td></td>'+
				'<td>Inactive</td>'+
				'<td></td>'+
				'<td></td>'+
				'<td></td>'+
				'<td></td>'+
				'<td></td>'+
			'</tr>'
		}
	}else{
		var analog = [];
		for(var item in analog_data){
			if(channel_data.length < 4){
				var _status = '';
				var _line = '';
			}else{
				var _status = channel_data[item]['_status'];
				var _line = channel_data[item]['_line'];
			}
				
			analog[item] = [];
			analog[item]['channel'] = analog_data[item]['_channel'];
			
			if(analog_data[item]['_name'] != ''){
				analog[item]['name'] = analog_data[item]['_name'];
			}else{
				analog[item]['name'] = 'port-'+(parseInt(item)+1);
			}
			
			analog[item]['callerid'] = analog_data[item]['_cidnumber'];
			
			if(analog_data[item]['_associatedchnnl'] != ''){
				var associated_chnnl = analog_data[item]['_associatedchnnl'];
				if(associated_chnnl == 'none' || associated_chnnl.substr(0,3) != 'sip'){
					analog[item]['siptrunk'] = '';
				}else{
					analog[item]['siptrunk'] = associated_chnnl.substr(4);
				}
			}else{
				analog[item]['siptrunk'] = '';
			}
			
			if(analog[item]['sigtype'] == 3){
				analog[item]['status'] = 'Inactive';
			}else{
				analog[item]['status'] = _status;
			}
			
			analog[item]['line'] = _line;
			
			analog[item]['sigtype'] = analog_data[item]['_signalling'];
			if(analog[item]['sigtype'] == 2){
				analog[item]['sigtype'] = 'FXO';
			}else if(analog[item]['sigtype'] == 1){
				analog[item]['sigtype'] = 'FXS';
			}else{
				analog[item]['sigtype'] = 'Port NULL';
				continue;
			}
			
			//call limit
			if(calllimit_data[item]['_limitsta'] == 1){
				var limit_status = language('Limited');
				var limit_img = '<img src="/images/limit.png">';
			}else{
				var limit_status = language('Unlimited');
				var limit_img = '<img src="/images/unlimit.png">';
			}
			var hour_call_count = calllimit_data[item]['_hourtotal'];
			var daily_call_count = calllimit_data[item]['_daytotal'];
			var daily_answer_count = calllimit_data[item]['_answertotal'];
			
			html_str += '<tr id=list'+analog[item]['channel']+'>';
			html_str += '<td>'+analog[item]['channel']+'</td>' + '<td>'+analog[item]['sigtype']+'</td>';
			
			if(_Define['type']==2){//all S
				if(flex_routing_sw == 0){
					html_str += '<td><input type="text" name="portname'+analog[item]['channel']+'" id="portname'+analog[item]['channel']+'" value="'+analog[item]['name']+'" /></td>';
				}else{
					html_str += '<td>'+analog[item]['name']+'</td>';
				}
			}else{
				html_str += '<td>'+analog[item]['name']+'</td>';
			}
			
			if(analog[item]['sigtype'] == 'FXS'){
				if(flex_routing_sw == 0){
					if(_Define['type']==1){//S&O
						html_str += '<td>'+analog[item]['callerid']+'</td>';
					}else{
						html_str += '<td>'+get_all_sip(analog[item]['channel'],analog[item]['siptrunk'],sip_data)+'</td>';
					}
				}else{
					html_str += '<td>'+analog[item]['callerid']+'</td>';
				}
			}else{
				html_str += '<td>'+analog[item]['line']+'</td>';
			}
			
			html_str += '<td>'+analog[item]['status']+'</td>';
			
			//call limit
			html_str += '<td>'+hour_call_count+'</td>';
			html_str += '<td>'+daily_call_count+'</td>';
			html_str += '<td>'+daily_answer_count+'</td>';
			
			html_str += '<td>';
			html_str += limit_status;
			html_str += '<button type="button" onclick="Unlimited(\''+(parseInt(item)+1)+'\',\''+calllimit_data[item]['_limitsta']+'\')" style="width=32px;height:32px;float:right;margin-right:20px;" >';
			html_str += limit_img;
			html_str += '</button>';
			html_str += '</td>';
			
			html_str +=	'<td style="text-align:center;"><a href="alg-chnsettings-edit.html?chnl_num='+analog[item]['channel']+'&chnl_type='+analog[item]['sigtype']+'" onclick="return check_channel('+analog_data[item]['_signalling']+');javascript:window.location.href=this.href"><button style="width:32px;height:32px;"><img src="../images/edit.gif"></button></a></td>';
			
			html_str += '</tr>';
		}
	}
	$("#html_str").html(html_str);
	
	if(flex_routing_sw == 0){
		if(_Define['type']==2){
			$("#button_show").css('display','block');
		}
	}
}

object.AGAlgChannelGetAll(succeed_back,error_back);

function succeed_back(data){
	var data_temp = data['_get'];
	var analog_data = data_temp['_ana']['_item'];
	var channel_data = data_temp['_chn']['_item'];
	var sip_data = data_temp['_sip']['_item'];
	var routing_data = data_temp['_routing']['_item'];
	var calllimit_data = data_temp['_limitStatus']['_item'];
	var flex_routing_sw = data_temp['_combuf']['_FlexRoutingSw'];
	
	header(data_temp['_combuf']);
	show_chnls(analog_data, channel_data, sip_data, routing_data, calllimit_data, flex_routing_sw);
	footer();
	
	siptrunk_change_new(analog_data, routing_data);
	$(".save_input").click(function(){
		if(save_only_once()){
			$("#loading_image").show();
			save_chnls(analog_data);
		}
	});
}
function error_back(data){
	window.location.href = 'error.html';
}
/*******************************SHOW ALG CHNSETTINGS END***************************/


/*******************************SAVE ALG CHNSETTINGS BEGIN***************************/
function save_chnls(analog_data){
	var AnaFxsAll = new AST_AnaFxsAll();
	
	$(".channel_name").each(function(){
		var channel = (parseInt($(this).val())-1);
		
		var anafxs = new AST_AnaFxs();
		
		anafxs._channel = analog_data[channel]['_channel'];
		
		var name = document.getElementById('portname'+analog_data[channel]['_channel']).value;
		anafxs._name = name;
		
		var associated_chnnl = document.getElementById('associated_chnnl'+analog_data[channel]['_channel']).value;
		anafxs._associatedchnnl = associated_chnnl;
		
		AnaFxsAll._item.push(anafxs);
	});
	
	object.AGAlgChannelSaveAll(save_succeed_back, save_error_back, AnaFxsAll);
}

function save_succeed_back(data){
	if(error_tip(data['_result'])){
		window.location.href = 'alg-chnsettings.html?save=true';
	}
}

function save_error_back(data){
	save_click_flag = 0;
	alert(language('save falied'));
}
/*******************************SAVE ALG CHNSETTINGS END***************************/

/*******************************Unlimited BEGIN***************************/
function Unlimited(channel, limit_status){
	if(limit_status == 1){
		var ret = confirm(language('Unlimit Tip','Are you sure you want to unlimit it?'));
		if(ret){
			object.AGAlgChannelUnlimited(unlimit_succeed_back, unlimit_error_back, channel);
		}
	}else{
		alert(language('Port Status Unlimit','Port Status:Unlimit.'));
	}
}

function unlimit_succeed_back(data){
	window.location.reload();
}

function unlimit_error_back(data){
	alert("Unlimit failed!");
}
/*******************************Unlimited END***************************/