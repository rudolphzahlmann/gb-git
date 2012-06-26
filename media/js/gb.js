
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
      var teachingWidth  = $("#teaching").width(),
          contactWidth   = $("#contact").width(),
          faqWidth       = $("#faq").width(),
          portfolioWidth = $("#portfolio").width();

      $("#portfolio .text").css({
        "font-size": Math.min(Math.max(parseInt(portfolioWidth / 23), 10), 30) + "px",
      });

      $("#portfolio .image").css({"margin-left": portfolioWidth * 0.02 + "px"})
        .children("img").css({"height": Math.min(Math.max(parseInt(portfolioWidth / 16.5 * 2.55), 63), 192) + "px"});

      $("#teaching .content").css({
        "font-size": Math.min(Math.max(parseInt(teachingWidth / 23), 13), 30) + "px"
      });

      $("#contact .content").css({
        "font-size": Math.min(Math.max(parseInt(contactWidth / 30), 11), 30) + "px",
        "line-height": "1.6em"
      });
      
      $("#contact_form input").css({
        "font-size": Math.min(Math.max(parseInt(contactWidth / 30), 11), 30) + "px",
        "padding-left": Math.min(Math.max(parseInt(contactWidth / 80), 5), 20) + "px",
        "padding-right": Math.min(Math.max(parseInt(contactWidth / 80), 4), 20) + "px",
        "height": Math.min(Math.max(parseInt(contactWidth / 18), 22), 50) + "px"
      });
      
      $("#contact_form input.submit_btn").css({
        "padding-left": Math.min(Math.max(parseInt(contactWidth / 130), 3), 16) + "px",
        "padding-right": Math.min(Math.max(parseInt(contactWidth / 130), 2), 16) + "px",
        "height": Math.min(Math.max(parseInt(contactWidth / 24), 16), 38) + "px",
        //"top": 3-(Math.min(Math.max(parseInt(contactWidth / 260), 0), 3)) + "px"
      });
      
      $("#id_message").css({
        "font-size": Math.min(Math.max(parseInt(contactWidth / 30), 11), 30) + "px",
        "padding-left": Math.min(Math.max(parseInt(contactWidth / 80), 5), 20) + "px",
        "padding-right": Math.min(Math.max(parseInt(contactWidth / 80), 4), 20) + "px",
        "height": Math.min(Math.max(parseInt(contactWidth / 6), 66), 450) + "px",
        "width": contactWidth
      });
      
      $("#contact .content .headline").css({
        "font-size": "11px",
        "line-height": "1.4em",
        "margin-bottom": Math.min(Math.max(parseInt(contactWidth / 120), 0), 10) + "px"
      });

      $("#faq .content").css({
        "font-size": Math.min(Math.max(parseInt(faqWidth / 40), 11), 30) + "px",
        "line-height": "1.6em"
      });
      
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
    var imgContainer = $(this),
        images = imgContainer.data("images"),
        text = imgContainer.next(".text"),
        portfolioWidth = $("#portfolio").width(),
        imgWidth = portfolioWidth * 0.75,
        parent = imgContainer.parent();
    if (!imgContainer.hasClass("zoom")) {
      parent.addClass("zoom");
      text.hide();
      imgContainer.find("img").remove();
      $.each(images, function(idx, elm) {
        $('<img src="'+elm.url+'" style="width: '+imgWidth+'px;" alt="'+elm.title+'">').appendTo(imgContainer);
      });
      imgContainer.css("height", "310px");
    }
  });

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
    if($(this).val() == "") {
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
    if( $(this).val() == "" ) {
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
  setFontSizes();
  updateDisplay();
});