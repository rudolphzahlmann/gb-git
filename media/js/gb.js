
jQuery(function($){
  // cfpt 
  // width height left top hspace vspace
  var rules = {
    "c":     [[83, 100, 17, 0, 0, 0]],
    "f":     [[83, 100, 17, 0, 0, 0]],
    "p":     [[83, 100, 17, 0, 0, 0]],
    "t" :    [[83, 100, 17, 0, 0, 0]],
    "cf":    [[41.5, 100, 17, 0, 3, 0],
              [41.5, 100, 58.5, 0, 0, 0]],
    "cp":    [[20, 100, 80, 0, 0, 0],
              [63, 100, 17, 0, 3, 0]],
    "ct":    [[83, 65, 17, 0, 0, 3],
              [83, 35, 17, 65, 0, 0]],
    "fp":    [[20, 100, 80, 0, 0, 0],
              [63, 100, 17, 0, 3, 0]],
    "ft":    [[83, 65, 17, 0, 0, 3],
              [83, 35, 17, 65, 0, 0]],
    "pt":    [[63, 100, 17, 0, 3, 0],
              [20, 100, 80, 0, 0, 0]],
    "cfp":   [[20, 100, 60, 0, 3, 0],
              [20, 100, 80, 0, 0, 0],
              [43, 100, 17, 0, 3, 0]],
    "cft":   [[41.5, 65, 17, 0, 3, 3],
              [41.6, 65, 58.5, 0, 3, 3],
              [83, 35, 17, 65, 0, 0]],
    "cpt":   [[20, 65, 80, 0, 0, 3],
              [63, 100, 17, 0, 3, 0],
              [20, 35, 80, 65, 0, 0]],
    "fpt":   [[20, 65, 80, 0, 0, 3],
              [63, 100, 17, 0, 3, 0],
              [20, 35, 80, 65, 0, 0]],
    "cfpt":  [[20, 65, 60, 0, 3, 3],
              [20, 65, 80, 0, 0, 3],
              [43, 100, 17, 0, 3, 0],
              [40, 35, 60, 65, 0, 0]]
  };

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
          dimensions = {"contact": {}, "faq": {}, "portfolio": {},
                        "teaching": {}};
      $(".toggle.on").each(function(idx, elm) {
        var key = this.id.replace("-toggle", "");
        selected.push(key);
        ruleKey.push(key[0]);
      });
      ruleKey = ruleKey.sort().join("");
      selected.sort();
      scales = rules[ruleKey];
      $(selected).each(function(idx) {
        dimensions[this] = {};
        dimensions[this].width  = scales[idx][0] / 100;
        dimensions[this].height = scales[idx][1] / 100;
        dimensions[this].left   = scales[idx][2] / 100;
        dimensions[this].top    = scales[idx][3] / 100;
        dimensions[this].hspace = scales[idx][4];
        dimensions[this].vspace = scales[idx][5];
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
        motherWidth  = minWidth - 2 * spaceWidth;
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
      $("#portfolio").css({
        "width":  (motherWidth * dim.portfolio.width) - dim.portfolio.hspace + "px",
        "height": (motherHeight * dim.portfolio.height) - dim.portfolio.vspace + "px",
        "left":   (motherWidth * dim.portfolio.left) + "px",
        "top":    (motherHeight * dim.portfolio.top) + "px"
      });
      $("#teaching").css({
        "width":  (motherWidth * dim.teaching.width) - dim.teaching.hspace + "px",
        "height": (motherHeight * dim.teaching.height) - dim.teaching.vspace + "px",
        "left":   (motherWidth * dim.teaching.left) + "px",
        "top":    (motherHeight * dim.teaching.top) + "px"
      });
      $("#contact").css({
        "width":  (motherWidth * dim.contact.width) - dim.contact.hspace + "px",
        "height": (motherHeight * dim.contact.height) - dim.contact.vspace + "px",
        "left":   (motherWidth * dim.contact.left) + "px",
        "top":    (motherHeight * dim.contact.top) + "px"
      });
      $("#faq").css({
        "width":  (motherWidth * dim.faq.width) - dim.faq.hspace + "px",
        "height": (motherHeight * dim.faq.height) - dim.faq.vspace + "px",
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
      var teachingArea   = $("#teaching").width() * $("#teaching").height(),
          contactArea    = $("#contact").width() * $("#contact").height(),
          faqArea        = $("#faq").width() * $("#faq").height(),
          portfolioWidth = $("#portfolio").width(),
          maxArea        = 250000;

      $("#portfolio .text").css({
        "font-size":   portfolioWidth / 23 + "px",
        "line-height": portfolioWidth / 16.5 + "px"
      });

      $("#portfolio .image").css({"margin-left": portfolioWidth * 0.02 + "px"})
        .children("img").css({"height": portfolioWidth / 16.5 * 2.7 + "px"});

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
    $(".toggle").each(function(idx, elm) {
      var sel = "#" + this.id.replace("-toggle", "");
      if($(this).hasClass("on")) {
        $(sel).css("display", "block");
      } else {
        $(sel).css("display", "none");
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

  $(".toggle").click(function(evt) {
    evt.preventDefault();
    $(this).toggleClass("on");
    updateDisplay();
    setBoxSizes();
    setFontSizes();
  });

  // Portfolio-Liste ein-/ausklappen
  $("#portfolio-foldout").click(function(evt) {
    evt.preventDefault();
    $("#foldout-btn").toggleClass("down");
    $("#portfolio-list").toggleClass("hidden");
  });

  $("#portfolio .project .image").click(function(){
    var imgContainer = $(this)
        img = imgContainer.find("img"),
        text = imgContainer.next(".text"),
        portfolioWidth = $("#portfolio").width();
    if (!imgContainer.hasClass("zoom")) {
      imgContainer.addClass("zoom");
      text.hide();
      img.css({"width": portfolioWidth * 0.75 + "px"});
    }
  });


  setBoxSizes();
  setFontSizes();
  updateDisplay();
});
