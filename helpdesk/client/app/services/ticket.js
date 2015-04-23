import Ember from 'ember';

export default Ember.Service.extend({
  apiUrl: 'http://localhost:1337/api/v1/ticket',

  save(ticket) {
    return Ember.$.post(this.apiUrl, ticket);
  },

  find() {
    return Ember.$.getJSON(this.apiUrl);
  }
});
