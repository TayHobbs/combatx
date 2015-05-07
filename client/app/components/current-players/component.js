import Ember from 'ember';

export default Ember.Component.extend({
  setup: function () {
    io.socket.get('/api/v1/players');
    io.socket.on('connect', () => {
      Ember.Logger.debug('combatx component is listening for socket.io events');
    });

    io.socket.on('addPlayer', (message) => {
      console.log("I AM USED");
      if(message.verb === "created") {
        var modelName = message.model;
        console.log(this.store.get('players'));
        console.log(store.normalize(modelName, message.data));
        console.log(modelName);
        this.store.push(modelName, this.store.normalize(modelName, message.data));
      }
    });

  }.on('init')
});
