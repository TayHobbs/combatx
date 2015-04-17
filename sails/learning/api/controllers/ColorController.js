/**
 * ColorController
 *
 * @description :: Server-side logic for managing colors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    Color.create({ name:'Red' }).exec(function createCB(err, created) {
      console.log('Created user with name ' + created.name);
    });
  }
};

