// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps:["main"],

    paths:{
        // JavaScript folders.
        libs:"../assets/js/libs",
        plugins:"../assets/js/plugins",
        vendor:"../assets/vendor",

        // Libraries.
        jquery:"../assets/js/libs/jquery",
        lodash:"../assets/js/libs/lodash",
        backbone:"../assets/js/libs/backbone",
        handlebars:"../assets/js/libs/handlebars",
        bootstrap:"../assets/bootstrap/js/bootstrap",
        localStorage: "../assets/js/libs/localStorage"
    },

    shim:{
        // Backbone library depends on lodash and jQuery.
        backbone:{
            deps:["lodash", "jquery"],
            exports:"Backbone"
        },

        handlebars:{
            exports:"Handlebars"
        },

        bootstrap:{
            exports:"Bootstrap"
        },

        localStorage: {
            deps: ["backbone"],
            exports:"LocalStorage"
        },

        // Backbone.LayoutManager depends on Backbone.
        "plugins/backbone.layoutmanager":["backbone"]
    }

});
