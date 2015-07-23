$(document).ready(function() {
  // fix navbar initially if page loads in scrolled down (e.g. anchors)
  if ($(this).scrollTop() > $('#nav').offset().top) {
    $('.navbar').addClass('navbar-fixed-top');
  }

  function checkNav() {
    // -50 accounts for offset in .navbar-anchor-fixed
    // hey maybe we can jquery that
    var offset = parseInt($('.navbar-anchor-fixed').css('top'), 10); // we can so jquery that!

    if ($(this).scrollTop() >= $('#section-clients').offset().top + offset) {
      if ($(this).scrollTop() >= $('#section-contact').offset().top + offset) {
        return setNav('contact');
      } else {
        return setNav('clients');
      }
    }

    return setNav('home');
  }

  function setNav(ele) {
    if (ele == currentNav) {
      return;
    }

    currentNav = ele;

    $('.navbar-nav > li').each(function() {
      $(this).removeClass('active');
    });

    $('.navbar-nav a[href="#' + ele + '"]').parent().addClass('active');
  }

  var currentNav = 'home';

  $(document).scroll(function() { // navbar fixed to top scrolling
    if ($(this).scrollTop() > $('#nav').offset().top) {
      // scrolled below nav, fix it
      $('.navbar').addClass('navbar-fixed-top');

      // fix anchors (account for fixed navbar offset)
      $('.navbar-anchor').addClass('navbar-anchor-fixed');

      // special cases for home anchor
      $('#home').addClass('navbar-anchor-none');
      $('#home').removeClass('navbar-anchor-home');

      checkNav();
    } else {
      // scrolled above nav, unfix it
      $('.navbar').removeClass('navbar-fixed-top');

      // fix anchors (account for fixed navbar offset)
      $('.navbar-anchor').removeClass('navbar-anchor-fixed');

      // special cases for home anchor
      $('#home').addClass('navbar-anchor-home');
      $('#home').removeClass('navbar-anchor-none');
    }
  });

  $('.navbar-nav a').click(function(event) { // pretty scrolling
    event.preventDefault();

    var link = this.hash;
    $.smoothScroll({
      scrollTarget: link
    });

    // setNav(link.substr(1, link.length));
  });

  $('.home-helper a').click(function(event) { // scroll down from main page
    event.preventDefault();

    var link = this;
    $.smoothScroll({
      scrollTarget: link.hash
    });
  });

  $('.navbar-brand').click(function(event) { // scroll up from brand
    event.preventDefault();

    var link = this;
    $.smoothScroll({
      scrollTarget: link.hash
    });
  });
});
