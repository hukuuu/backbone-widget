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
                var widgetLayout = new Widget.Views.Layout(),
                    widgetAddCity =  new Widget.Views.AddCity();
                widgetAddCity.on('city:added',function(url){
                    $.get(url, function (data) {
                        console.log(data);
                        widgetLayout.insertView(new Widget.Views.Main({model:data.data})).render();
                    });
                },this);
                app.useLayout('main-layout').setViews({
                    '.add-city-container' : widgetAddCity,
                    '.cities-container' : widgetLayout
                })
            }
        });

        return Router;

    });
