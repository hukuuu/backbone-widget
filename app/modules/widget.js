// Widget module
define([
    // Application.
    "app"
],

// Map dependencies from above array.
    function (app) {

        // Create a new module.
        var Widget = app.module();

        Widget.Settings = {
            BASE_URL : '/backbone-widget-github/feed/weather.ashx?q={city},{country}&format=json&num_of_days=5&key=b9a5e2f018094138123110'
        }

        // Default Model.
        Widget.Model = Backbone.Model.extend({
        });

        // Default Collection.
        Widget.Collection = Backbone.Collection.extend({
            model:Widget.Model
        });

        Widget.Views.AddCity = Backbone.View.extend({
            template: 'add-city',

            tagName: "div",
            className: "add-city",

            events: {
                'click #add': 'addButtonClicked'
            },
            addButtonClicked : function(e){
                var city = this.$el.find('#city').val(),
                    country = this.$el.find('#country').val(),
                    url = Widget.Settings.BASE_URL.replace('{city}',city).replace('{country}',country);
                console.log(url);
                this.trigger('city:added',url);
            }
        });

        Widget.Views.Main = Backbone.View.extend({
            template:'widget',
            tagName: 'div',
            className: 'widget span3',
            initialize:function () {
            },
            events : {
                'click a[class*="close"]': 'removeView'
            },
            data:function () {
                console.log(this.model);
                return this.model;
            },
            removeView: function(event){
                this.remove();
            }
        });

        // Default View.
        Widget.Views.Layout = Backbone.View.extend({
            tagName:'div',
            className:'cities row-fluid',
            collection : new Widget.Collection(),
            initialize:function () {
                var me = this;
            }
        });

        // Return the module for AMD compliance.
        return Widget;

    });
