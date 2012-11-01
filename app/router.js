define([
    // Application.
    "app",
    "modules/widget"
],

    function (app, Widget) {

        var LocalStorageCollection = Backbone.Collection.extend({
            localStorage: new Backbone.LocalStorage("Urls") // Unique name within your app.

        });

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({
            routes:{
                "":"index"
            },

            index:function () {
                var widgetLayout = new Widget.Views.Layout(),
                    widgetAddCity =  new Widget.Views.AddCity();

                var Urls = new LocalStorageCollection();
                //get all urls from the localStorage and load the views
                Urls.fetch().done(function(){
                    Urls.each(function(urlModel){
                        $.get(urlModel.get('url'), function(data){
                            widgetLayout.insertView(new Widget.Views.Main({model:data.data,urlId:urlModel.id})).render();
                        });
                    });
                });

                Backbone.Events.on('widget:removed',function(urlId){
                   var model = Urls.get(urlId);
                    console.log(urlId);
                   Urls.remove(model);
                });

                app.useLayout('main-layout').setViews({
                    '.add-city-container' : widgetAddCity,
                    '.cities-container' : widgetLayout
                })


                widgetAddCity.on('city:added',function(url){
                    $.get(url, function (data) {
                        var urlModel = new Backbone.Model({
                            url:url
                        })
                        Urls.push(urlModel);
                        urlModel.save();
                        console.log('giving: ', urlModel.id);
                        widgetLayout.insertView(new Widget.Views.Main({model:data.data, urlId:urlModel.id})).render();
                    });
                },this);
            }
        });

        return Router;

    });
