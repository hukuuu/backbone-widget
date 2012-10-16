define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Widget = app.module();

  // Default model.
  Widget.Model = Backbone.Model.extend({
  
  });

  // Default collection.
  Widget.Collection = Backbone.Collection.extend({
    model: Widget.Model
  });

  // Return the module for AMD compliance.
  return Widget;

});
