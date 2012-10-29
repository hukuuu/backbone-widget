// Widget module
define([
    // Application.
    "app"
],

// Map dependencies from above array.
    function (app) {

        var optionns = {

            country : 'BG',
            cities : [
                'Stara Zagora',
                'Sofia'
            ],
            api_key : '32c7ad7bd43b9bab'
        }

        // Create a new module.
        var Widget = app.module();


        // only for testing
        Widget.BASE_URL = 'sofia.json';

        // Default Model.
        Widget.Model = Backbone.Model.extend({
            url:'sofia.json'
        });

        // Default Collection.
        Widget.Collection = Backbone.Collection.extend({
            model:Widget.Model,
            url:'sofia.json'
        });

        Widget.Views.Main = Backbone.View.extend({
            template:'main-view',
            data:function(){
                return this.model;
            }
        });

        // Default View.
        Widget.Views.Layout = Backbone.Layout.extend({
            template:"widget",
            initialize:function () {
                var forecast = new Widget.Collection().fetch(),
                    me = this;
                console.log(me);
                forecast.done(function (data) {
                    console.log(data.current_observation);
                    app.useLayout(me.template).setViews({
                        '.widget-container':new Widget.Views.Main({model:data.current_observation})
                    });
                });
            }
        });

        // Return the module for AMD compliance.
        return Widget;

    });
