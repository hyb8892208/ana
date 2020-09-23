var float_num = 1;
function close_btn()
{
 		$("#float_btn2").css({display:"none"}); 
 		$("#to_top").css({display:"none"}); 
 		$(".float_close").css({display:"none"});
 		$(".float_btn_tr").css({display:"block"}); 
   		$("#float_btn1").removeClass("float_btn1");
 		float_num = 0;
}
$(document).ready(function (){ 
		var btn1_left = $(".float_btn").offset().left;
		$("#to_top").mouseover(function(){
		  $("#to_top").css({opacity:"1",filter:"alpha(opacity=100)"});
		});
		$("#to_top").mouseleave(function(){
		  $("#to_top").css({opacity:"0.5",filter:"alpha(opacity=50)"});
		});
		$("#float_button_1").mouseover(function(){
		  $("#float_button_1").css({opacity:"1",filter:"alpha(opacity=100)"});
		});
		$("#float_button_1").mouseleave(function(){
		  $("#float_button_1").css({opacity:"0.5",filter:"alpha(opacity=50)"});
		});
		$("#float_button_2").mouseover(function(){
		  $("#float_button_2").css({opacity:"1",filter:"alpha(opacity=100)"});
		});
		$("#float_button_2").mouseleave(function(){
		  $("#float_button_2").css({opacity:"0.5",filter:"alpha(opacity=50)"});
		});
		$(".float_close").mouseover(function(){
		  $(".float_close").addClass("float_close_new");
		});
		$(".float_close").mouseleave(function(){
		  $(".float_close").removeClass("float_close_new");
		});
		$("#to_top").click(function(){
		  document.documentElement.scrollTop = document.body.scrollTop =0;
		});
		var save_to_other_height = $("#save_to_other_channels").height();
		$("#save_to_other_channels").height(save_to_other_height);

	   var roll=$(window).scroll(function(){
		   var hh = $("#save_to_other").height();
		   $("#save_to_other_channels").height(hh);
			if(float_num == 1){
			   	if($(".float_btn").offset().top >= $("#float_btn1").offset().top){
			   		$("#float_btn1").addClass("float_btn1");
		   			$(".float_close").css({display:"block"}); 
			   		$("#float_btn2").css({display:"block"}); 
			   		$("#to_top").css({display:"block"}); 
			   		$(".float_btn_tr").css({display:"none"}); 
			   		$("#float_btn2").offset({left: btn1_left });
			   	}else{
			   		$("#to_top").css({display:"none"});
			   		$("#float_btn2").css({display:"none"});
			   		$(".float_btn_tr").css({display:"block"}); 
			   		$("#float_btn1").removeClass("float_btn1");
		   			$(".float_close").css({display:"none"});
			   	}
		   	}
	   });
}); 
   
