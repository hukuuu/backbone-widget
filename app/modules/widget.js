// Widget module
define([
    // Application.
    "app"
],

// Map dependencies from above array.
    function (app) {

        var options = {

            country:'BG',
            cities:[
                'Stara Zagora',
                'Sofia'
            ],
            jsons:[
                'StaraZagora.json'
            ],
            api_key:'32c7ad7bd43b9bab'
        }

        // Create a new module.
        var Widget = app.module();


        // only for testing
        Widget.BASE_URL = 'sofia.json';

        // Default Model.
        Widget.Model = Backbone.Model.extend({
        });

        // Default Collection.
        Widget.Collection = Backbone.Collection.extend({
            model:Widget.Model
        });

        Widget.Views.AddCity = Backbone.View.extend({
            template: 'add-city',
            events: {
                'click #add': 'addButtonClicked'
            },
            addButtonClicked : function(e){
                var json = this.$el.find('#city').val();
                Backbone.Events.trigger('nice',json);
            }
        });

        Widget.Views.Main = Backbone.View.extend({
            template:'main-view',
            initialize:function () {
                console.log(this.options.url);
            },
            data:function () {
                return this.model;
            }
        });

        // Default View.
        Widget.Views.Layout = Backbone.View.extend({
            collection : new Widget.Collection(),
            initialize:function () {
                var me = this;
//                options.jsons.forEach(function (url) {
//                    $.get(url, function (data) {
//                        console.log(data);
//                        me.insertView(new Widget.Views.Main({model:data.current_observation})).render();
//                    });
//                });

                Backbone.Events.on('nice',function(json){
                    this.collection.add({json: json});
                    $.get(json, function (data) {
                        console.log(data);
                        me.insertView(new Widget.Views.Main({model:data.current_observation})).render();
                    });
                },this);
            }
        });

        // Return the module for AMD compliance.
        return Widget;

    });
