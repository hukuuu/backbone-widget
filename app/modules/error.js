// Error module
define([
    // Application.
    "app"
],

// Map dependencies from above array.
    function (app) {

        // Create a new module.
        var Error = app.module();

        // Default Model.
        Error.Model = Backbone.Model.extend({

        });

        // Default Collection.
        Error.Collection = Backbone.Collection.extend({
            model:Error.Model
        });

        // Default View.
        Error.Views.Main = Backbone.View.extend({
            template:"error",
            events: {
                'click button[class="close"]' : "removeView"
            },
            data:function(){
                console.log(this.model);
                return this.model;
            },
            removeView: function(){
                this.remove();
            }
        });
        Error.Views.Layout = Backbone.View.extend({
        });

        // Return the module for AMD compliance.
        return Error;

    });
