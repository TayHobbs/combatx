import Ember from 'ember';

export default Ember.Component.extend({
  setup: function () {
    io.socket.get('/api/v1/ticket');
    io.socket.on('connect', () => {
      Ember.Logger.debug('helpdesk-tickets component is listening for socket.io events');
    });

    io.socket.on('ticket', (message) => {
      if(message.verb === "created") {
        this.get('tickets').pushObject(message.data);
      }
    });

  }.on('init')
});
