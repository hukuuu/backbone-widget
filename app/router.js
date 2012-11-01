define([
    // Application.
    "app",
    "modules/widget",
    "modules/addCity"
],

    function (app, Widget, Addcity) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({
            routes:{
                "":"index"
            },

            index:function () {
                var widgetLayout = new Widget.Views.Layout(),
                    addCity =  new Addcity.Views.AddCity();

                var Urls = new Addcity.Collection();
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
                   model.destroy();
                });

                app.useLayout('main-layout').setViews({
                    '.add-city-container' : addCity,
                    '.cities-container' : widgetLayout
                })


                addCity.on('city:added',function(url){
                    $.get(url, function (data) {
                        var widgetModel = new Widget.Model(data.data);
                        console.log(widgetModel);
                        widgetModel.validate();
//                        var urlModel = new Addcity.Model({
//                            url:url
//                        })
//                        urlModel.collection = Urls;
//                        urlModel.save();
//                        console.log('giving: ', urlModel.id);
//                        widgetLayout.insertView(new Widget.Views.Main({model:data.data, urlId:urlModel.id})).render();
                    });
                },this);
            }
        });

        return Router;

    });
