/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/bootswatch/paper/bootstrap.css');
app.import('vendor/sails.io.js');

module.exports = app.toTree();
