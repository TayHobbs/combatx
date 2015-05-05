import Ember from 'ember';

export default Ember.Service.extend({
  apiUrl: 'http://localhost:1337/api/v1/player',

  save(player) {
    return Ember.$.post(this.apiUrl, player);
  },

  find() {
    return Ember.$.getJSON(this.apiUrl);
  },

  // Registers the socket
  setup: function () {
    io.socket.get(this.apiUrl);
  }

});
