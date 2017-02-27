/*Responsable de que es desplegui el menu quan estem a un movil i  fem click al #menumovil (ralletes menu desplegable)
	
*/

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