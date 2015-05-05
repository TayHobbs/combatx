import Ember from 'ember';

export default Ember.Component.extend({
  setup: function () {
    io.socket.get('/api/v1/player');
    io.socket.on('connect', () => {
      Ember.Logger.debug('combatx component is listening for socket.io events');
    });

    io.socket.on('player', (message) => {
      if(message.verb === "created") {
        this.get('players').pushObject(message.data);
      }
    });

  }.on('init')
});
