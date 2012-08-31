
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
              [41.5, 65, 58.5, 0, 3, 3],
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
        mother       = $("#mother"),
        body         = $(document.body),
        winsize      = $("#winsize");

    winsize.html(winWidth + " / " + winHeight);

    function getDimensions() {
      var selected = [],
          ruleKey = [],
          scales,
          dimensions = {
            "contact": {}, "faq": {}, "portfolio": {}, "teaching": {}
          };
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
      body.addClass("landscape");
      body.removeClass("portrait");
    } else {
      body.removeClass("landscape");
      body.addClass("portrait");
    }

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
      "width":  motherWidth,
      "height": motherHeight
    });

    // set content boxes portfolio, teaching, faq, contact
    var dim = getDimensions();
    $("#portfolio:not(.hide)").css({
      "width":  (motherWidth * dim.portfolio.width) - dim.portfolio.hspace,
      "height": (motherHeight * dim.portfolio.height) - dim.portfolio.vspace,
      "left":   (motherWidth * dim.portfolio.left),
      "top":    (motherHeight * dim.portfolio.top)
    });
    $("#teaching:not(.hide)").css({
      "width":  (motherWidth * dim.teaching.width) - dim.teaching.hspace,
      "height": (motherHeight * dim.teaching.height) - dim.teaching.vspace,
      "left":   (motherWidth * dim.teaching.left),
      "top":    (motherHeight * dim.teaching.top)
    });
    $("#contact:not(.hide)").css({
      "width":  (motherWidth * dim.contact.width) - dim.contact.hspace,
      "height": (motherHeight * dim.contact.height) - dim.contact.vspace,
      "left":   (motherWidth * dim.contact.left),
      "top":    (motherHeight * dim.contact.top)
    });
    $("#faq:not(.hide)").css({
      "width":  (motherWidth * dim.faq.width) - dim.faq.hspace,
      "height": (motherHeight * dim.faq.height) - dim.faq.vspace,
      "left":   (motherWidth * dim.faq.left),
      "top":    (motherHeight * dim.faq.top)
    });
    $("#faq:not(.hide) #map").css("height", motherHeight * 0.4);
  }

  function setNavigationSize() {
    // set navigation font sizes and distances
    var contentWidth = $("#navigation .content").width(),
        contentHeight = $("#navigation .content").height(),
        arrowSize    = contentWidth / 17.3;

    $(".navigation.headline").css({
      //"font-size":   contentWidth / 8.8,
      //"margin-left": arrowSize * 1.5
    });

    $("#foldout-btn").css({
      "width":      arrowSize,
      "height":     arrowSize,
      "margin-top": (contentWidth / 55) - 6.5
    });

    //$("#portfolio-list").css("margin-left", arrowSize * 1.5);
  }

  function setFontSizes(delay) {

    if (delay === undefined) {
      delay = 500;
    }

    function _calcSize(width, div, min, max) {
      return Math.min(Math.max(Math.floor(width / div), min), max);
    }

    // set font sizes in content boxes (both landscape and portrait mode)
    setTimeout(function() {
      // measure area of each content box
      var teachingWidth  = $("#teaching").width(),
          contactWidth   = $("#contact").width(),
          faqWidth       = $("#faq").width(),
          portfolioWidth = $("#portfolio").width();

      $("#portfolio .project:not(.zoom) .text").css({
        "font-size": _calcSize(portfolioWidth, 23, 10, 30)
      });

      $("#portfolio .project.zoom .text").css({
        "font-size": _calcSize(portfolioWidth, 23, 2, 6)
      });

      $("#portfolio .image").css({"margin-right": portfolioWidth * 0.02})
        .children("img").css({"height": _calcSize(portfolioWidth, 32, 63, 192)});

      $("#teaching .content").css({
        "font-size": _calcSize(teachingWidth, 23, 13, 30)
      });

      $("#contact .content").css({
        "font-size": _calcSize(contactWidth, 40, 11, 30),
        "line-height": "1.6em"
      });

      $("#contact_form input").css({
        "font-size": _calcSize(contactWidth, 30, 11, 30),
        "padding-left": _calcSize(contactWidth, 80, 5, 20),
        "padding-right": _calcSize(contactWidth, 80, 4, 20),
        "height": _calcSize(contactWidth, 18, 22, 50)
      });

      $("#contact_form input.submit_btn").css({
        "padding-left": _calcSize(contactWidth, 130, 3, 16),
        "padding-right": _calcSize(contactWidth, 130, 2, 16),
        "height": _calcSize(contactWidth, 24, 16, 38)
      });

      $("#id_message").css({
        "font-size": _calcSize(contactWidth, 30, 11, 30),
        "padding-left": _calcSize(contactWidth, 80, 5, 20),
        "padding-right": _calcSize(contactWidth, 80, 4, 20),
        "height": _calcSize(contactWidth, 6, 66, 450),
        "width": contactWidth
      });

      $("#contact .content .headline").css({
        "font-size": "11px",
        "line-height": "1.4em",
        "margin-bottom": _calcSize(contactWidth, 120, 0, 10)
      });

      $("#faq .content").css({
        "font-size": _calcSize(faqWidth, 40, 11, 30),
        "line-height": "1.6em"
      });

    }, delay);
  }

  function setProjectSizes() {
    var portfolioWidth = $("#portfolio").width(),
        imgWidth = portfolioWidth * 0.75;
    $("#portfolio .project").each(function (idx) {
      var elm = $(this),
          imgContainer = elm.find(".image"),
          imgSlider = imgContainer.find(".slider"),
          img = imgContainer.find("img"),
          offset = imgSlider.data("offset") || 0;
      if (elm.is(".zoom")) {
        imgContainer.css("width", imgWidth);
        imgSlider.css({
          "width": img.length * imgWidth,
          "margin-left": offset
        });
        img.css("width", imgWidth);
      } else {
        imgContainer.css("width", "");
        imgSlider.css({"width": "", "margin-left": ""});
      }
    });
  }

  function updateDisplay() {
    $(".toggle").each(function(idx, elm) {
      var sel = "#" + this.id.replace("-toggle", "");
      $(this).is(".on") ? $(sel).removeClass("hide") : $(sel).addClass("hide");
    });
  }

  function imageClick(evt) {
    var imgContainer = $(this),
        imgSlider = imgContainer.find(".slider"),
        images = imgContainer.data("images"),
        portfolioWidth = $("#portfolio").width(),
        imgWidth = portfolioWidth * 0.75,
        parent = imgContainer.parent(),
        selectedImgIdx = -1 * parseFloat(imgSlider.css("margin-left")) / imgWidth,
        maxImgIdx = images.length - 1,
        btn = $(evt.target);

    if (parent.is(".zoom")) {
      var offset = 0;
      if (btn.is(".next") && selectedImgIdx == maxImgIdx) {
        offset = -1 * selectedImgIdx * imgWidth;
      } else if (btn.is(".next") && selectedImgIdx < maxImgIdx) {
        offset = -1 * (selectedImgIdx + 1) * imgWidth;
      } else if (btn.is(".prev") && selectedImgIdx > 0) {
        offset = -1 * (selectedImgIdx - 1) * imgWidth;
      }
      imgSlider.data("offset", offset);
    } else {
      parent.addClass("zoom");
      parent.find(".caption").addClass("visible");
      imgContainer.find("img").remove();
      $.each(images, function(idx, elm) {
        var img = $('<img src="' + elm.url + '" ' +
                    'alt="' + elm.title + '">').appendTo(imgSlider);
      });
      setFontSizes(0);
    }
    setProjectSizes();
  }

  function textClick(evt) {
    var imgContainer = $(this).prev(".image"),
        imgSlider = imgContainer.find(".slider"),
        images = imgContainer.data("images"),
        parent = imgContainer.parent();

    if (parent.is(".zoom")) {
      evt.preventDefault();
      parent.removeClass("zoom");
      parent.find(".caption").removeClass("visible");
      elm = images[0];
      $('<img src="' + elm.url + '" ' +
        'style="height: 50px;" alt="' + elm.title + '">').appendTo(imgSlider);
      setFontSizes(0);
    }
    setProjectSizes();
  }

  $(window).resize(function() {
    var oldWidth  = window.innerWidth,
        oldHeight = window.innerHeight;
    setTimeout(function() {
      if (oldWidth == window.innerWidth && oldHeight == window.innerHeight) {
        setBoxSizes();
        setNavigationSize();
        setFontSizes();
        setProjectSizes();
      }
    }, 250);
  });

  $(".toggle").click(function(evt) {
    evt.preventDefault();
    $(this).toggleClass("on");
    updateDisplay();
    setBoxSizes();
    setNavigationSize();
    setFontSizes();
    setProjectSizes();
  });

  // wenn "Portfolio" geklickt wird
  $("#portfolio-toggle").click(function(evt) {
    evt.preventDefault();
    $("#portfolio-list").toggleClass("hidden");
  });

  $("#portfolio .project .image").click(imageClick);
  $("#portfolio .project .text").click(textClick);

  $("#portfolio").on("mouseenter mouseleave", ".zoom .arrow", function(evt) {
    var images = $(this).parents(".image").data("images");
    if (evt.type === "mouseenter") {} else {}
  });

  // 3 FUNCTIONS FOR CONTACT FORM

  $("input[type=text]").focus(function() {
    if($(this).val() == "Ihr Name" || $(this).val() == "Ihre Email-Adresse") {
      $(this).val("");
      $(this).removeClass("error");
    }
  });

  $("input[type=text]").blur(function() {
    if($(this).val() === "") {
      if($(this).attr("id") == "id_emailaddress") {
        $(this).val("Ihre Email-Adresse");
      } else if($(this).attr("id") == "id_name") {
        $(this).val("Ihr Name");
      }
      $(this).addClass("error");
    }
  });

  $("#id_message").focus(function() {
     if( $(this).val() == "Ihre Nachricht" ) {
       $(this).val("");
       $(this).removeClass("error");
     }
  });

  $("#id_message").blur(function() {
    if( $(this).val() === "" ) {
      $(this).val("Ihre Nachricht");
      $(this).addClass("error");
    }
  });

  $("input[type=text]").keyup(function() {
    emscale = $(this).css("font-size").replace("px", "")/1.571;
    inputlength = $(this).val().length;
    $(this).width((inputlength+2)*(emscale)+"px");
  });

  $("input[type=text]").blur(function() {
    emscale = $(this).css("font-size").replace("px", "")/1.571;
    inputlength = $(this).val().length;
    $(this).width(inputlength*(emscale)+3+"px");
  });

  //

  setBoxSizes();
  setNavigationSize();
  setFontSizes();
  updateDisplay();
  setProjectSizes();
});
