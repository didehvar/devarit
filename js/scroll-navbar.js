$(document).ready(function() {
  $(document).scroll(function() {
    if ($(this).scrollTop() > $('#nav').offset().top) {
      // scrolled below nav, fix it
      $('.navbar').addClass('navbar-fixed-top');

      // fix anchors (account for fixed navbar offset)
      $('.navbar-anchor').addClass('navbar-anchor-fixed');

      // special cases for home anchor
      $('#home').addClass('navbar-anchor-none');
      $('#home').removeClass('navbar-anchor-home');
    } else {
      // scrolled above nav, unfix it
      $('.navbar').removeClass('navbar-fixed-top');

      // fix anchors (account for fixed navbar offset)
      $('.navbar-anchor').removeClass('navbar-anchor-fixed');

      // special cases for home anchor
      $('#home').addClass('navbar-anchor-home');
      $('#home').removeClass('navbar-anchor-none');
    }
  })
});
