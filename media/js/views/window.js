$(function($) {
  
  window.app.WindowView = Backbone.View.extend({
    el: $(window),

    events: {
      "resize window": "windowResize"
    },

    initialize: function() {
      this.model = new window.app.WindowModel;
    },
    
    windowResize: function() {
      this.get("model").set({
        "width": window.innerWidth,
        "height": window.innerHeight
      });
    }

  });

});
