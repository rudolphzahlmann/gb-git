
jQuery(function($){
  // cfpt
  var rules = {
    "nav":   17,
    "c":     [[100, 100, 0, 0]],
    "f":     [[100, 100, 0, 0]],
    "p":     [[100, 100, 0, 0]],
    "t" :    [[100, 100, 0, 0]],
    "cf":    [[50, 100, 0, 0], [50, 100, 50, 0]],
    "cp":    [[24, 100, 76, 0], [76, 100, 0, 0]],
    "ct":    [[100, 65, 0, 0], [100, 35, 0, 65]],
    "fp":    [[24, 100, 76, 0], [76, 100, 0, 0]],
    "ft":    [[100, 65, 0, 0], [100, 35, 0, 65]],
    "pt":    [[76, 100, 0, 0], [24, 100, 76, 0]],
    "cfp":   [[24, 100, 52, 0], [24, 100, 76, 0], [52, 100, 0, 0]],
    "cft":   [[50, 65, 0, 0],  [50, 65, 50, 0],  [100, 35, 0, 65]],
    "cpt":   [[24, 65, 76, 0], [76, 100, 0, 0], [24, 35, 76, 65]],
    "fpt":   [[24, 100, 52, 0], [52, 100, 0, 0], [24, 100, 76, 0]],
    "cfpt":  [[24, 65, 52, 0],  [24, 65, 76, 0],  [52, 100, 0, 0], [48, 35, 52, 35]]
  }

  function setBoxSizes() {
    // initialize
    var winWidth     = window.innerWidth,
        winHeight    = window.innerHeight,
        spaceWidth   = 3,
        minWidth     = 1020,
        minHeight    = 600,
        is_landscape = winWidth > winHeight,
        mother       = $("#mother");

    function getDimensions() {
      var selected = [],
          ruleKey = [],
          scales,
          dimensions = {"contact": {}, "faq": {}, "portfolio": {}, "teaching": {}};
      $('.toggle.on').each(function(idx, elm) {
        var key = this.id.replace("-toggle", "");
        selected.push(key);
        ruleKey.push(key[0]);
      });
      ruleKey = ruleKey.sort().join("");
      selected.sort();
      scales = rules[ruleKey];
      $(selected).each(function(idx) {
        dimensions[this] = {};
        dimensions[this].width  = scales[idx][0] / 100 * ((100 - rules.nav) / 100);
        dimensions[this].height = scales[idx][1] / 100;
        dimensions[this].left   = scales[idx][2] / 100 + ((rules.nav) / 100);
        dimensions[this].top    = scales[idx][3] / 100;
      });
      return dimensions;
    }

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
      var motherWidth  = minWidth - 2 * spaceWidth,
          motherHeight = minHeight - 2 * spaceWidth;
      if (winWidth > minWidth && winHeight > minHeight) {
        motherWidth  = winWidth - 2 * spaceWidth;
        motherHeight = winHeight - 2 * spaceWidth;
      } else if (winWidth < minWidth && winHeight > minHeight) {
        motherWidth  = minHeight - 2 * spaceWidth;
        motherHeight = winHeight - 21;
      } else if (winWidth > minWidth && winHeight < minHeight) {
        motherWidth  = winWidth - 21;
        motherHeight = minHeight - 2 * spaceWidth;
      }
      mother.css({
        "width":  motherWidth + "px",
        "height": motherHeight + "px"
      });

      // set content boxes portfolio, teaching, faq, contact
      var dim = getDimensions();
      console.log(dim);
      $("#portfolio").css({
        "width":  (motherWidth * dim.portfolio.width) - 3 + "px",
        "height": (motherHeight * dim.portfolio.height) + "px",
        "left":   (motherWidth * dim.portfolio.left) + "px",
        "top":    (motherHeight * dim.portfolio.top) + "px"
      });
      $("#teaching").css({
        "width":  (motherWidth * dim.teaching.width) + "px",
        "height": (motherHeight * dim.teaching.height) + "px",
        "left":   (motherWidth * dim.teaching.left) + "px",
        "top":    (motherHeight * dim.teaching.top) + "px"
      });
      $("#contact").css({
        "width":  (motherWidth * dim.contact.width) - 3 + "px",
        "height": (motherHeight * dim.contact.height) - 6 + "px",
        "left":   (motherWidth * dim.contact.left) + "px",
        "top":    (motherHeight * dim.contact.top) + "px"
      });
      $("#faq").css({
        "width":  (motherWidth * dim.faq.width) - 3 + "px",
        "height": (motherHeight * dim.faq.height) - 6 + "px",
        "left":   (motherWidth * dim.faq.left) + "px",
        "top":    (motherHeight * dim.faq.top) + "px"
      });
      $("#faq #map").css("height", motherHeight * 0.4 + "px");

    } else {
      // procedure for vertical aspect ratio (portrait mode)
    }

  }

  function setFontSizes() {
    // set font sizes in content boxes (both landscape and portrait mode)
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
        setBoxSizes();
        setFontSizes();
      }
    }, 250);
  });

  $('.toggle').click(function(evt) {
    evt.preventDefault();
    $(this).toggleClass('on');
    updateDisplay();
    setBoxSizes();
    setFontSizes();
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

  setBoxSizes();
  setFontSizes()
  updateDisplay();
});
