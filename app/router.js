define([
    // Application.
    "app",
    "modules/widget"
],

    function (app, Widget) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({
            routes:{
                "":"index"
            },

            index:function () {
                new Widget.Views.Layout();
            }
        });

        return Router;

    });
