
jQuery(function($){

  function setSizes() {
    // initialize
    var winW         = window.innerWidth,
        winH         = window.innerHeight,
        is_landscape = winW > winH,
        mother       = $("#mother");

    // procedure for horizontal aspect ratio (landscape mode)
    if (is_landscape) {
      // set navigation font sizes and distances
      var contentWidth = $("#navigation .content").width(),
          arrowSize    = contentWidth / 17.3;

      $(".navigation.headline").css({
        "font-size":   contentWidth / 8.8 + "px",
        "margin-left": arrowSize * 1.5 + "px"
      });

      $("#foldout-btn").css({
        "width":      arrowSize + "px",
        "height":     arrowSize + "px",
        "margin-top": (contentWidth / 55) - 6.5 + "px"
      });

      $("#portfolio-list").css("margin-left", arrowSize * 1.5 + "px");

      // set mother div dimensions
      var motherWidth  = 1014,
          motherHeight = 594;
      if (winW > 1020 && winH > 600) {
        motherWidth  = winW - 6;
        motherHeight = winH - 6;
      } else if (winW < 1020 && winH > 600) {
        motherWidth  = 1014;
        motherHeight = winH - 21;
      } else if (winW > 1020 && winH < 600) {
        motherWidth  = winW - 21;
        motherHeight = 594;
      }
      mother.css({
        "width":  motherWidth + "px",
        "height": motherHeight + "px"
      });

      // set content boxes portfolio, teaching, faq, contact
      $("#portfolio").css({
        "width":  motherWidth * 0.43 - 3 + "px",
        "height": motherHeight + "px",
        "left":   motherWidth * 0.17 + "px"
      });
      $("#teaching").css({
        "width":  motherWidth * 0.4 + "px",
        "height": motherHeight * 0.35 + "px",
        "left":   motherWidth * 0.6 + "px",
        "top":    motherHeight * 0.65 + "px"
      });
      $("#contact").css({
        "width":  motherWidth * 0.2 - 3 + "px",
        "height": motherHeight * 0.65 - 6 + "px",
        "left":   motherWidth * 0.6 + "px"
      });
      $("#faq").css({
        "width":  motherWidth * 0.2 - 3 + "px",
        "height": motherHeight * 0.65 - 6 + "px",
        "left":   motherWidth * 0.8 + "px",
      });
      $("#faq #map").css("height", motherHeight * 0.4 + "px");

    } else {
      // procedure for vertical aspect ratio (portrait mode)
    }

    // set font-sizes in content boxes (both landscape and portrait mode)
    setTimeout(function() {
      // measure area of each content box
      var teachingArea   = $('#teaching').width() * $('#teaching').height(),
          contactArea    = $('#contact').width() * $('#contact').height(),
          faqArea        = $('#faq').width() * $('#faq').height(),
          portfolioWidth = $("#portfolio").width(),
          maxArea        = 250000;

      $("#portfolio .text").css({
        "font-size":   portfolioWidth / 23 + "px",
        "line-height": portfolioWidth / 16.5 + "px"
      });

      $("#teaching .content").css({
        "font-size":   teachingArea / 7600 + "px",
        "line-height": teachingArea / 5100 + "px"
      });

      if (contactArea > maxArea) {
        $("#contact .content").css({
          "font-size":   contactArea / 12000 + "px",
          "line-height": contactArea / 7500 + "px"
        });
      } else {
        $("#contact .content").css({
          "font-size":   "11px",
          "line-height": "1.6em"
        });
      }

      if (faqArea > maxArea) {
        $("#faq .content").css({
          "font-size":   faqArea / 12000 + "px",
          "line-height": faqArea / 7500 + "px"
        });
      } else {
        $("#faq .content").css({
          "font-size":   "11px",
          "line-height": "1.6em"
        });
      }
    }, 500);
  }

  function updateDisplay() {
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
    var oldWidth  = window.innerWidth,
        oldHeight = window.innerHeight;
    setTimeout(function() {
      if (oldWidth == window.innerWidth && oldHeight == window.innerHeight) {
        setSizes();
      }
    }, 250);
  });

  $('.toggle').click(function(evt) {
    evt.preventDefault();
    $(this).toggleClass('on');
    updateDisplay();
  });

  // Portfolio-Liste ein-/ausklappen
  $('#portfolio-foldout').click(function(evt) {
    evt.preventDefault();
    $('#foldout-btn').toggleClass('down');
    $('#portfolio-list').toggleClass('hidden');
  });

  // Portfolio: Bild/Text zoomen
  $('.toggle-project').click(function(evt) {
    evt.preventDefault();
    // e.getParent().getElement('.toggle-project.text').getFirst().toggleClass('zoom');
    // e.getParent().getElement('.toggle-project.image').getFirst().toggleClass('zoom');
  });

  setSizes();
  updateDisplay();
});
