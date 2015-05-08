import Ember from 'ember';

export default Ember.Service.extend({
  apiUrl: 'http://localhost:1337/api/v1/player',

  save(player) {
    // return Ember.$.post(this.apiUrl, player);
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'POST',
      url: apiUrl ,
      data: player,
      success: (data) => {
        console.log(data);
        return data;
      },
      error: (jqXHR) => {
        return jqXHR;
      }
    });
  },

  update(player) {
    console.log('LOOK AT ME');
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'PUT',
      url: apiUrl + '/' + player.id,
      data: player,
      success: (data) => {
        console.log(data);
        return data;
      },
      error: (jqXHR) => {
        return jqXHR;
      }
    });
  },

  find() {
    return Ember.$.getJSON(this.apiUrl);
  },

  // Registers the socket
  setup: function () {
    io.socket.get(this.apiUrl);
  }

});
