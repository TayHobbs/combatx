import Ember from 'ember';

export default Ember.Controller.extend({
  enemies: Ember.inject.service(),

  setup: function () {
    io.socket.get('/api/v1/player');
    io.socket.get('/api/v1/enemy');

    io.socket.on('connect', () => {
      Ember.Logger.debug('combatx component is listening for socket.io events');
    });

    io.socket.on('enemy', (message) => {
      if (message.verb === 'created') {
        this.get('model').pushObject(message.data);
      }
      if (message.verb === 'updated') {
        this.set('model', Ember.A([message.data]));
      }
      if (message.verb === 'destroyed') {
        this.set('model', Ember.A([]));
      }
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
    attack() {
      let oldHealth = this.get('model').get('firstObject').health;
      let name      = this.get('model').get('firstObject').name;
      let id        = this.get('model').get('firstObject').id;
      let player    = { id: id, name: name, health: oldHealth - 10 };

      if (oldHealth - 10 === 0) {
        this.get('enemies').destroy(player);
        this.set('defeated', true);
      } else {
        this.get('enemies').update(player);
      }
    },
    newEnemy() {
      let enemy = { name: 'Brothgar', health: 100 };
      this.get('enemies').save(enemy);
      this.set('defeated', false);
    }
  }

});

