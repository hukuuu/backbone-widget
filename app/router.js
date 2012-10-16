define([
  // Application.
  "app"
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      console.log('widget started');
      app.useLayout('main',{
        template: 'main-layout'
      });
    }
  });

  return Router;

});
