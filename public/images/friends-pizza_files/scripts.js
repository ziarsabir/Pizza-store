
/*===========================
RESPONSIVE MENU TOGGLE
============================*/

/* Opens the menu */
$(".fa-bars").click(function() {
$("#mobile_nav").removeClass("notvisible");
$(".fa-bars").addClass("notvisible");
$(".fa-close").removeClass("notvisible");
});

/* Closes the menu */
$(".fa-close").click(function() {
$("#mobile_nav").addClass("notvisible");
$(".fa-bars").removeClass("notvisible");
$(".fa-close").addClass("notvisible");
});

/* If needed, toggles search bar */
$("#mobile_searchicon").click(function() {
$("#mobile_nav #search_form").slideToggle();
});

/* Mobile Condensed Sub Menus*/
$("#menu-mobile-menu  li.menu-item-has-children, #menu-primary  li.menu-item-has-children").click(function(e) {
  console.log(e);
  console.log(e.target.nodeName);
  if(e.target.nodeName != 'A'){
    $(this).children("ul").toggleClass("active");
    $(this).toggleClass("active-parent");
  }
});

/*===========================
SMOOTH SCROLL
============================*/

$(document).ready(function(){
  // Add smooth scrolling to all links
  $(".anchor").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/*======================================================
EQUALHEIGHT
========================================================*/

/* Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.gridcontent');
  equalheight('.grid_single');
  equalheight('.solution h3');
  equalheight('h3.single_sol_h3');
  equalheight('.grid_page_box p');
    equalheight('.single_sol_content');
 
 
});


$(window).resize(function(){
  equalheight('.grid-content');
  equalheight('.grid_single');
  equalheight('.solution h3');
equalheight('h3.single_sol_h3');
equalheight('.grid_page_box p');
 equalheight('.single_sol_content');

});
/*===================
GOOGLE MAP
===================*/
(function($) {

/*
*  new_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type  function
*  @date  8/11/2013
*  @since 4.3.0
*
*  @param $el (jQuery element)
*  @return  n/a
*/

function new_map( $el ) {
  
  // var
  var $markers = $el.find('.marker');
  
  
  // vars
  var args = {
    zoom    : 16,
    center    : new google.maps.LatLng(0, 0),
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  
  
  // create map           
  var map = new google.maps.Map( $el[0], args);
  
  
  // add a markers reference
  map.markers = [];
  
  
  // add markers
  $markers.each(function(){
    
      add_marker( $(this), map );
    
  });
  
  
  // center map
  center_map( map );
  
  
  // return
  return map;
  
}

/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type  function
*  @date  8/11/2013
*  @since 4.3.0
*
*  @param $marker (jQuery element)
*  @param map (Google Map object)
*  @return  n/a
*/

function add_marker( $marker, map ) {

  // var
  var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

  // create marker
  var marker = new google.maps.Marker({
    position  : latlng,
    map     : map
  });

  // add to array
  map.markers.push( marker );

  // if marker contains HTML, add it to an infoWindow
  if( $marker.html() )
  {
    // create info window
    var infowindow = new google.maps.InfoWindow({
      content   : $marker.html()
    });

    // show info window when marker is clicked
    google.maps.event.addListener(marker, 'click', function() {

      infowindow.open( map, marker );

    });
  }

}

/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type  function
*  @date  8/11/2013
*  @since 4.3.0
*
*  @param map (Google Map object)
*  @return  n/a
*/

function center_map( map ) {

  // vars
  var bounds = new google.maps.LatLngBounds();

  // loop through all markers and create bounds
  $.each( map.markers, function( i, marker ){

    var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

    bounds.extend( latlng );

  });

  // only 1 marker?
  if( map.markers.length == 1 )
  {
    // set center of map
      map.setCenter( bounds.getCenter() );
      map.setZoom( 16 );
  }
  else
  {
    // fit to bounds
    map.fitBounds( bounds );
  }

}

/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type  function
*  @date  8/11/2013
*  @since 5.0.0
*
*  @param n/a
*  @return  n/a
*/
// global var
var map = null;

$(document).ready(function(){

  $('.acf-map').each(function(){

    // create map
    map = new_map( $(this) );

  });

});

})(jQuery);

/*======================================================
FAQ
========================================================*/
$('.faq-question').click(function () {
    $(this).find('.entry-content').slideToggle();
    $(this).find('h3').toggleClass('open');
});

/*======================================================
STICKY MENU
========================================================*/

  $(function() {
    var header = $("#masthead");
    var hero = $("#home_hero");
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 30) {
        header.addClass("mini-header");
        hero.addClass("hidden");
      } else {
        header.removeClass("mini-header");
        hero.removeClass("hidden");
      }
    });
  });