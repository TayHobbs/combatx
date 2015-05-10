import Ember from 'ember';

export default Ember.Service.extend({
  apiUrl: 'http://localhost:1337/api/v1/player',

  save(player) {
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'POST',
      url: apiUrl ,
      data: player,
      success: (data) => { return data; }
    });
  },

  update(player) {
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'PUT',
      url: `${apiUrl}/${player.id}`,
      data: player,
      success: (data) => { return data; }
    });
  },

  find() {
    let apiUrl = `${this.apiUrl}/leaderboard`;
    return Ember.$.ajax({
      method: 'GET',
      url: apiUrl,
      success: (data) => {
        return data;
      }
    });
  },

  // Registers the socket
  setup: function () {
    io.socket.get(this.apiUrl);
  }

});
