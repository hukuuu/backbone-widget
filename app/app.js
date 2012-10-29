define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone",
    "handlebars",

    // Plugins.
    "plugins/backbone.layoutmanager"
],

    function ($, _, Backbone, Handlebars) {
        // Provide a global location to place configuration settings and module
        // creation.
        var app = {
            // The root path to run the application.
            root:"/backbone-widget-github/"
        };

        // Localize or create a new JavaScript Template object.
        var JST = window.JST = window.JST || {};

        // Configure LayoutManager with Backbone Boilerplate defaults.
        Backbone.LayoutManager.configure({
            // Allow LayoutManager to augment Backbone.View.prototype.
            manage:true,

            prefix:"app/templates/",

            fetch:function (path) {
                var done;

                // Add the html extension.
                path = path + ".html";
                // If the template has not been loaded yet, then load.
                if (!JST[path]) {
                    done = this.async();
                    return $.ajax({ url:app.root + path }).then(function (contents) {
                        // debug helper
                        // usage: {{debug}} or {{debug someValue}}
                        // from: @commondream (http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/)
                        Handlebars.registerHelper("debug", function (optionalValue) {
                            console.log("Current Context");
                            console.log("====================");
                            console.log(this);

                            if (optionalValue) {
                                console.log("Value");
                                console.log("====================");
                                console.log(optionalValue);
                            }
                        });
                        JST[path] = Handlebars.compile(contents);
                        JST[path].__compiled__ = true;

                        done(JST[path]);
                    });
                }

                // If the template hasn't been compiled yet, then compile.
                if (!JST[path].__compiled__) {
                    JST[path] = Handlebars.template(JST[path]);
                    JST[path].__compiled__ = true;
                }

                return JST[path];
            }
        });

        // Mix Backbone.Events, modules, and layout management into the app object.
        return _.extend(app, {
            // Create a custom object with a nested Views object.
            module:function (additionalProps) {
                return _.extend({ Views:{} }, additionalProps);
            },

            // Helper for using layouts.
            useLayout: function(name) {
                // If already using this Layout, then don't re-inject into the DOM.
                if (this.layout && this.layout.options.template === name) {
                    return this.layout;
                }

                // Ensure previous layouts are completely removed.
                if (this.layout) {
                    this.layout.remove();
                }

                // Create a new Layout.
                var layout = new Backbone.Layout({
                    template: name,
                    className: "layout " + name,
                    id: "layout"
                });

                // Insert into the DOM.
                $("#main").empty().append(layout.el);

                // Render the layout.
                layout.render();

                // Cache the reference on the Router.
                this.layout = layout;

                // Return the reference, for later usage.
                return layout;
            }
        }, Backbone.Events);

    });
