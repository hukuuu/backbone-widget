define([
    // Application.
    "app",
    "modules/widget",
    "modules/addCity",
    "modules/error"
],

    function (app, Widget, Addcity, Error) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({
            routes:{
                "":"index"
            },

            index:function () {
                var widgetLayout = new Widget.Views.Layout(),
                    addCity = new Addcity.Views.AddCity(),
                    errorLayout = new Error.Views.Layout();

                var Urls = new Addcity.Collection();
                //get all urls from the localStorage and load the views
                Urls.fetch().done(function () {
                    Urls.each(function (urlModel) {
                        $.get(urlModel.get('url'), function (data) {
                            widgetLayout.insertView(new Widget.Views.Main({model:data.data, urlId:urlModel.id})).render();
                        });
                    });
                });

                Backbone.Events.on('widget:removed', function (urlId) {
                    var model = Urls.get(urlId);
                    model.destroy();
                });

                app.useLayout('main-layout').setViews({
                    '.add-city-container':addCity,
                    '.cities-container':widgetLayout,
                    '.errors-container': errorLayout
                })


                addCity.on('city:added', function (url) {
                    $.get(url, function (data) {
                        var widgetModel = new Widget.Model();

                        var valid = widgetModel.set({'data': data.data},{
                                error: function(model,error){
                                errorLayout.insertView(new Error.Views.Main({model:error})).render();
                            }
                        });

                        if (valid) {
                            var urlModel = new Addcity.Model({
                                url:url
                            })
                            Urls.push(urlModel)
                            urlModel.save();
                            widgetLayout.insertView(new Widget.Views.Main({model:data.data, urlId:urlModel.id})).render();
                        }else{
                           widgetModel.destroy();
                        }
                    });
                }, this);
            }
        });

        return Router;

    });
