
jQuery(function($){

  function setSizes() {
    // initialize
    var winW = window.innerWidth,
        winH = window.innerHeight,
        is_landscape = winW > winH;

    
    // procedure for horizontal aspect ratio (landscape mode)
    if (is_landscape) {
      
      // set navigation font sizes and distances
      var contentWidth = $("#navigation .content").width(),
          motherWidth = $("#mother").width(),
          motherHeight = $("#mother").height(),
          arrowSize = contentWidth / 17.3,
          headlineFontSize = contentWidth / 8.8 + "px";

      $(".navigation.headline").css({
        "font-size": headlineFontSize,
        "margin-left": arrowSize * 1.5 + "px"
      });
      
      $("#foldout-btn").css({
        "width": arrowSize + "px",
        "height": arrowSize + "px",
        "margin-top": (contentWidth / 55) - 6.5 + "px"
      });

      $("portfolio-list").css("margin-left", arrowSize * 1.5 + "px");

      // set mother div dimensions
      $("#mother").css({"width": "1014px", "height": "594px"});
      if (winW > 1020 && winH > 600) {
        $("#mother").css({"width": winW - 6 + "px", "height": winH - 6 + "px"});
      } else if (winW < 1020 && winH > 600) {
        $("#mother").css({"width": "1014px", "height": winH - 21 + "px"});
      } else if (win_w > 1020 && win_h < 600) {
        $("#mother").css({"width": winW - 21 + "px", "height": "594px"});
      }

      // set content boxes portfolio, teaching, faq, contact
      $("#portfolio").css({
        "width": motherWidth * 0.43 - 3 + "px",
        "height": motherHeight + "px",
        "left": motherWidth + "px"
      });
      $("#teaching").css({
        "width": motherWidth * 0.4 + "px",
        "height": motherHeight * 0.35 + "px",
        "left": motherWidth * 0.6 + "px",
        "top": motherWidth * 0.65 + "px"
      });
      $("#contact").css({
        "width": motherWidth * 0.2 - 3 + "px",
        "height": motherHeight * 0.65 - 6 + "px",
        "left": motherWidth * 0.6 + "px"
      });
      $("#faq").css({
        "width": motherWidth * 0.2 - 3 + "px",
        "height": motherHeight * 0.65 - 6 + "px",
        "left": motherWidth * 0.8 + "px",
        "top": motherWidth * 0.65 + "px"
      });
      $("#faq #map").css("height", motherHeight * 0.65 * 0.4 + "px");

    } else { 
      // procedure for vertical aspect ratio (portrait mode)
    }
    
    // set font-sizes in content boxes (both landscape and portrait mode)
    setTimeout(function() {
      // measure area of each content box
      var teachingArea = $('#teaching').width() * $('#teaching').height(),
          contactArea = $('#contact').width() * $('#contact').height(),
          faqArea = $('#faq').width() * $('#faq').height(),
          portfolioWidth = $("#portfolio").width();
      
      $("#portfolio .text").css({
        "font-size": portfolioWidth / 23 + "px",
        "line-height": portfolioWidth / 16.5 + "px"
      });
      
      $("#teaching .content").css({
        "font-size": teachingArea / 7600 + "px",
        "line-height": teachingArea / 5100 + "px"
      });
      
      if (contactArea > 250000) {
        $("#contact .content").css({
          "font-size": contactArea / 12000 + "px",
          "line-height": contactArea / 7500 + "px"
        });
      } else {
        $("#contact .content").css({
          "font-size": "11px",
          "line-height": "1.6em"
        });
      }
      
      if (faqArea > 250000) {
        $("#faq .content").css({
          "font-size": faqArea / 12000 + "px",
          "line-height": faqArea / 7500 + "px"
        });
      } else {
        $("#faq .content").css({
          "font-size": "11px",
          "line-height": "1.6em"
        });
      }
    }, 500); 
  }

  function updateDisplay() {
    // var p = false;
    // var t = false;
    // var c = false;
    // var f = false;
    // if($('portfolio-toggle').hasClass('on')) {
    //   p = true;  
    // }
    // if($('teaching-toggle').hasClass('on')) {
    //   t = true;  
    // }
    // if($('contact-toggle').hasClass('on')) {
    //   c = true;
    // }
    // if($('faq-toggle').hasClass('on')) {
    //   f = true;  
    // }
    // if (p) {
    //   if (t && c && f || t && c || t && f || c && f) {
    //     console.log('p_w = 43%');
    //   } else if (f || c || t) {
    //     console.log('p_w = 63 %');
    //   } else {
    //     console.log('p_w = 83 %');
    //   }
    // }
    
    $('.toggle').each(function(idx, elm) {
      var sel = "#" + this.id.replace('-toggle', '');
      if($(this).hasClass('on')) {
        $(sel).css('display', 'block');
      } else {
        $(sel).css('display', 'none');
      }
    });
    
  }

  $(window).resize(function() {
    var oldWidth = window.innerWidth,
        oldHeight = window.innerHeight;
    setTimeout(function() {
      if (oldWidth == window.innerWidth && oldHeight == window.innerHeight) {
        set_sizes();
      }
    }, 250);
  });

  setSizes();
  updateDisplay();
});


/*window.addEvent('domready', function() {
  
  set_sizes();
  update_display();
  init_map();
  
  // Navigation
  $$('.toggle').each(function(e) {
    e.addEvent('click', function() {
      e.toggleClass('on');
      update_display();
    });
  });
  
  // Portfolio-Liste ein-/ausklappen
  $('portfolio-foldout').addEvent('click', function() {
    $('foldout-btn').toggleClass('down');
    $('portfolio-list').toggleClass('hidden');
  });
  
  // Portfolio: Bild/Text zoomen
  $$('.toggle-project').each(function(e) {
    e.addEvent('click', function() {
      e.getParent().getElement('.toggle-project.text').getFirst().toggleClass('zoom');
      e.getParent().getElement('.toggle-project.image').getFirst().toggleClass('zoom');
    });
  });
  
});

window.addEvent('resize', function() {
  var old_width = window.innerWidth;
  var old_height = window.innerHeight;
  setTimeout(function() {
    if (old_width == window.innerWidth && old_height == window.innerHeight) {
      set_sizes();
    }
  }, 250);
});

// sets the layout depending on what content has been selected in the navigation
function update_display() {
  var p = false;
  var t = false;
  var c = false;
  var f = false;
  if($('portfolio-toggle').hasClass('on')) {
    p = true;  
  }
  if($('teaching-toggle').hasClass('on')) {
    t = true;  
  }
  if($('contact-toggle').hasClass('on')) {
    c = true;
  }
  if($('faq-toggle').hasClass('on')) {
    f = true;  
  }
  if (p) {
    if (t && c && f || t && c || t && f || c && f) {
      console.log('p_w = 43%');
    } else if (f || c || t) {
      console.log('p_w = 63 %');
    } else {
      console.log('p_w = 83 %');
    }
  }
  
  $$('.toggle').each(function(e) {
    var x = e.id.replace('-toggle', '');
    if(e.hasClass('on')) {
      $(x).setStyle('display', 'block');
    } else {
      $(x).setStyle('display', 'none');
    }
  });
  
}

// Map shit
var map;
var service;
var infowindow;

function init_map() {
  if (window.google === undefined) { return; }
  var hb = new google.maps.LatLng(53.086438,8.805309);
    
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: hb,
        zoom: 18
      });
  
    var request = {
      location: hb,
      radius: '500',
      types: ['store']
    };
      
    service = new google.maps.places.PlacesService(map);
    service.search(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]); 
    }
  }
}

function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(placeLoc.lat(), placeLoc.lng())
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
// END of Map shit

function set_sizes() {
  // initialize
  var win_w = window.innerWidth;
  var win_h = window.innerHeight;
  
  // procedure for horizontal aspect ratio (landscape mode)
  if (win_w/win_h > 1) {
    console.log('width: ' + win_w + ', height: ' + win_h + ' — entering landscape mode');
    
    // set navigation font sizes and distances
    var arrowsize = $('navigation').getElement('.content').getWidth() / 17.3;
    $$('.navigation.headline').each(function(e) {
      e.setStyles({
        'font-size': $('navigation').getElement('.content').getWidth() / 8.8 + 'px',
        'margin-left': arrowsize * 1.5 + 'px'
      });
    });
    $('foldout-btn').setStyles({
      'width': arrowsize  + 'px',
      'height': arrowsize  + 'px',
      'margin-top': ($('navigation').getElement('.content').getWidth() / 55)  - 6.5 + 'px'
    });
    $('portfolio-list').setStyle('margin-left', arrowsize * 1.5);
    
    // set mother div dimensions
    $('mother').setStyle('width', '1014px');
    $('mother').setStyle('height', '594px');
    if (win_w > 1020 && win_h > 600) {
      $('mother').setStyle('width', win_w-6);
      $('mother').setStyle('height', win_h-6);
    } else if (win_w < 1020 && win_h > 600) {
      $('mother').setStyle('width', '1014px');
      $('mother').setStyle('height', win_h-21);
    } else if (win_w > 1020 && win_h < 600) {
      $('mother').setStyle('width', win_w-21);
      $('mother').setStyle('height', '594px');
    }
    
    // set content boxes portfolio, teaching, faq, contact
    $$('.box').each(function(b) {
      switch (b.id) {
        case 'portfolio':
          b.setStyle('width', ($('mother').getWidth()*0.43) - 3);
          b.setStyle('height', $('mother').getHeight());
          b.setStyle('left', $('mother').getWidth()*0.17);
          break;
        case 'teaching':
          b.setStyle('width', $('mother').getWidth()*0.4);
          b.setStyle('height', $('mother').getHeight()*0.35);
          b.setStyle('left', $('mother').getWidth()*0.6);
          b.setStyle('top', $('mother').getHeight()*0.65);
          break;
        case 'contact':
          b.setStyle('width', ($('mother').getWidth()*0.2)-3);
          b.setStyle('height', ($('mother').getHeight()*0.65) - 6);
          b.setStyle('left', $('mother').getWidth()*0.6);
          break;
        case 'faq':
          b.setStyle('width', ($('mother').getWidth()*0.2) - 3);
          b.setStyle('height', ($('mother').getHeight()*0.65) - 6);
          b.setStyle('left', $('mother').getWidth()*0.8);
          b.getElement($('map')).setStyle('height', b.getHeight()*0.4);
          break;
      }
    });
  } 
  
  // procedure for vertical aspect ratio (portrait mode)
  else {
    console.log('width: ' + win_w + ', height: ' + win_h + ' — entering portrait mode');
  }
  
  // set font-sizes in content boxes (both landscape and portrait mode)
  setTimeout(function() {
    // measure area of each content box
    var t_area = $('teaching').getWidth() * $('teaching').getHeight();
    var c_area = $('contact').getWidth() * $('contact').getHeight();
    console.log('c_area = ' + c_area);
    var f_area = $('faq').getWidth() * $('faq').getHeight();
    // portfolio
    $('portfolio').getElements('.text').setStyles({
      'font-size': $('portfolio').getWidth() / 23,
      'line-height': $('portfolio').getWidth() / 16.5
    });
    // teaching
    $('teaching').getElement('.content').setStyles({
      'font-size': t_area/7600,
      'line-height': t_area/5100
    });
    // contact – doesn't scale under a certain area size
    if (c_area > 250000) {
      $('contact').getElement('.content').setStyles({
        'font-size': c_area/12000,
        'line-height': c_area/7500
      });
    } else {
      $('contact').getElement('.content').setStyles({
        'font-size': '11px',
        'line-height': '1.6em'
      });
    }
    // faq – doesn't scale under a certain area size
    if (f_area > 250000) {
      $('faq').getElement('.content').setStyles({
        'font-size': f_area/12000,
        'line-height': f_area/7500
      });
    } else {
      $('faq').getElement('.content').setStyles({
        'font-size': '11px',
        'line-height': '1.6em'
      });
    }
  }, 500); 
}*/
