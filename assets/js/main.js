(function($) {
  "use strict";
  // Add "loaded" class when a section has been loaded
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    $(".section").each(function() {
      var elementTop = $(this).offset().top - $('#header').outerHeight();
      if(scrollTop >= elementTop) {
        $(this).addClass('loaded');
      }
    });
  });

  //map

  function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
          center: new google.maps.LatLng(19.3594418,-99.258399),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          scaleControl: false,
          mapTypeControl: false
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
      }
      google.maps.event.addDomListener(window, 'load', initialize);

  options = $.extend({
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}, options);

  // One Page Navigation Setup
  $('.one-page-nav #navigation').singlePageNav({
    offset: $('.one-page-nav').outerHeight(),
    filter: ':not(.external)',
    speed: 750,
    currentClass: 'active',

    beforeStart: function() {
    },
    onComplete: function() {
    }
  });

  // Sticky Navbar Affix
  $('.one-page-nav').affix({
    offset: {
      top: $('#topbar').outerHeight(),
    }
  });

  // Smooth Hash Link Scroll
  $('.smooth-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  $('.nav a').on('click', function(){
    if($('.navbar-toggle').css('display') !=='none'){
      $(".navbar-toggle").click();
    }
  });

  var $container = $('.portfolio-isotope');
  $container.imagesLoaded(function(){
    $container.isotope({
      itemSelector : '.portfolio-item',
      resizable: true,
      resizesContainer: true
    });
  });

  $('section#challenge a').on('click', function(){
    $('#project-modal img').attr('src', $(this).attr('data-image-url'));
    if ($(this).attr('data') == "texto1") {
         $('#project-modal p.prueba').html('Esto es el texto del reto 1.');
    }
    if ($(this).attr('data') == "texto2") {
         $('#project-modal p.prueba').html('Esto es el texto del reto 2');
    }
    // if(){
    //   $('#project-modal p.prueba').html('Así se puede hacer un texto dinámico chinga!');
    // }
  });

  // filter items when filter link is clicked
  $('#filters a').click(function(){
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
  });

  $('#contactform').submit(function() {
    var action = $(this).attr('action');
    var values = $(this).serialize();

    $.post(action, values, function(data) {
      $('.results').hide().html(data).slideDown('slow');
      $('#contactform').find('.form-control').val('');
    });
    return false;
  });

  $('.iphone-carousel').on('slid.bs.carousel', function () {
    var carouselData = $(this).data('bs.carousel');
    var currentIndex = carouselData.getActiveIndex();
    $('.section-iphone-features .feature-block').removeClass('active');
    $(".section-iphone-features").find("[data-slide-to='" + currentIndex + "']").addClass('active');
  });
})(jQuery);