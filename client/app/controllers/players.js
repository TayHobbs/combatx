import Ember from 'ember';

export default Ember.Controller.extend({
  battle: Ember.inject.service(),

  setup: function () {
    io.socket.get('/api/v1/player');
    io.socket.on('connect', () => {
      Ember.Logger.debug('combatx component is listening for socket.io events');
    });

    io.socket.on('player', (message) => {
      if (message.verb === 'created') {
        this.get('model').pushObject(message.data);
      }
      if (message.verb === 'updated') {
        this.set('model', Ember.A([message.data]));
      }
    });

  }.on('init'),

  actions: {
    addPlayer() {
      let player = { name: this.get('name'), health: 100 };
      this.get('battle').save(player);
      this.set('name', '');
    },
    attack() {
      let oldHealth = this.get('model').get('firstObject').health;
      let name      = this.get('model').get('firstObject').name;
      let id        = this.get('model').get('firstObject').id;
      let player    = { id: id, name: name, health: oldHealth - 10 };

      this.get('battle').update(player);
    }
  }

});
