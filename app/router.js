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
                app.useLayout('main-layout').setViews({
                    '.add-city' : new Widget.Views.AddCity(),
                    '.cities' : new Widget.Views.Layout()
                })
            }
        });

        return Router;

    });
