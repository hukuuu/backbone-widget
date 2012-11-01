// Addcity module
define([
    // Application.
    "app"
],

// Map dependencies from above array.
    function (app) {

        // Create a new module.
        var Addcity = app.module();

        Addcity.Settings = {
            BASE_URL:'/backbone-widget-github/feed/weather.ashx?q={city},{country}&format=json&num_of_days=5&key=b9a5e2f018094138123110'
        }

        // Default Model.
        Addcity.Model = Backbone.Model.extend({

        });

        // Default Collection.
        Addcity.Collection = Backbone.Collection.extend({
            model:Addcity.Model,
            localStorage:new Backbone.LocalStorage("Urls")
        });

        Addcity.Views.AddCity = Backbone.View.extend({
            template: 'add-city',

            tagName: "div",
            className: "add-city",

            events: {
                'click #add': 'addButtonClicked'
            },
            addButtonClicked : function(e){
                var city = this.$el.find('#city').val(),
                    country = this.$el.find('#country').val(),
                    url = Addcity.Settings.BASE_URL.replace('{city}',city).replace('{country}',country);
                this.trigger('city:added',url);
            }
        });

        // Return the module for AMD compliance.
        return Addcity;

    });
