$(document).ready(function() {
  $(document).scroll(function() {
    if ($(this).scrollTop() > $('#nav-start').offset().top) {
      $('.navbar').addClass('navbar-fixed-top');
    } else {
      $('.navbar').removeClass('navbar-fixed-top');
    }
  })
});


// $(document).ready(function() {
//   /* http://stackoverflow.com/questions/23706003/changing-nav-bar-color-after-scrolling */
//   var scroll_start = 0;
//   var start_change = $('#change-navbar');
//   var offset = start_change.offset();
//
//   if (start_change.length){
//     $(document).scroll(function() {
//       scroll_start = $(this).scrollTop();
//       if(scroll_start > offset.top) {
//         $('.header .navbar-default').css('background-color', 'rgba(0, 0, 0, 0.5)');
//       } else {
//         $('.header .navbar-default').css('background-color', 'transparent');
//       }
//     });
//   }
// });
