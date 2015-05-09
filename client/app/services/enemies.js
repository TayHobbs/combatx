import Ember from 'ember';

export default Ember.Service.extend({
  apiUrl: 'http://localhost:1337/api/v1/enemy',

  save(enemy) {
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'POST',
      url: apiUrl ,
      data: enemy,
      success: (data) => { return data; }
    });
  },

  update(enemy) {
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'PUT',
      url: `${apiUrl}/${enemy.id}`,
      data: enemy,
      success: (data) => { return data; }
    });
  },

  destroy(enemy) {
    let apiUrl = this.apiUrl;
    return Ember.$.ajax({
      method: 'DELETE',
      url: `${apiUrl}/${enemy.id}`,
      success: (data) => { return data; }
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
