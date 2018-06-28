

// Keypress event for the breadcrumb (using TAB - Aria)
$(document).ready( function() {
let bread = $(".breadbutton");
let crumb = $('#breadcrumb');
bread.on('keypress', function(e) {
	if(e.keyCode == 13) {
		crumb.show("slow").css('right', '-50px');

  } else {
  	crumb.hide();

	   }
   });
 });


// Listener for resize and scroll for the menu button to dissappear.

window.addEventListener('resize', function()  {
 $('#breadcrumb').hide('slow');

});
window.addEventListener('scroll', function()  {
 $('#breadcrumb').hide('slow');
});


// Trying to disable outline focus on click.

$('*').on('click', function() {
$('*').blur();

});


// Trigger on menubutton click.
openBreadCrumb = () => {

  let bread = $(".breadbutton");
   let crumb = $('#breadcrumb');

   bread.on('click', function() {

        if(crumb.is(":hidden")) {
  	crumb.show("slow").css('right', '-50px');

  }
});


}





