//g

$(function(){
	var boton = $('#menumovil');
	menu =     $('nav ul');
	menuHeight=menu.height();

	$(boton).on('click', function(e){
		e.preventDefault();
		menu.slideToggle();
	});
	$(window).resize(function(){

		var w=$(window).width();
		if(w > 320 && menu.is(':hidden')){
			menu.removeAttr('style');
		}
	});
});