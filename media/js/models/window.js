(function() {

  window.app.WindowModel = Backbone.Model.extend({

    initialize: function(){
      this.set({"width": window.innerWidth, "height": window.innerHeight});
    }
  });

})();
