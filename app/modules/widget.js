// Widget module
define([
    // Application.
    "app",
    ""
],

// Map dependencies from above array.
    function (app) {

        // Create a new module.
        var Widget = app.module();

        // Default Model.
        Widget.Model = Backbone.Model.extend({
            validate: function(attrs) {
                console.log(attrs);
            }
        });

        // Default Collection.
        Widget.Collection = Backbone.Collection.extend({
            model:Widget.Model
        });

        Widget.Views.Main = Backbone.View.extend({
            template:'widget',
            tagName: 'div',
            className: 'widget span3',
            events : {
                'click a[class*="close"]': 'removeView'
            },
            data:function () {
                return this.model;
            },
            removeView: function(event){
                Backbone.Events.trigger('widget:removed',this.options.urlId);
                this.remove();
            }
        });

        // Default View.
        Widget.Views.Layout = Backbone.View.extend({
            tagName:'div',
            className:'cities row-fluid'
        });

        // Return the module for AMD compliance.
        return Widget;

    });
