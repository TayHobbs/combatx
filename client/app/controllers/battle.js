import Ember from 'ember';

export default Ember.Controller.extend({
  battle:  Ember.inject.service(),
  enemies: Ember.inject.service(),

  currentPlayers: Ember.computed(function() {
    let currentPlayers = Ember.A([]);
    this.get('battle').find().then((players) => {
     players.forEach((player) => {
       currentPlayers.pushObject(player);
     });
    });
    return currentPlayers;
  }),

  loggedIn: Ember.computed('localStorageProxy.username', function() {
    if (!this.get('localStorageProxy.username')) { return false; }
    return this.get('localStorageProxy.username');
  }),

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
        this.get('currentPlayers').pushObject(message.data);
      }
    });

  }.on('init'),

  actions: {
    login() {
      this.set('localStorageProxy.username', this.get('username'));
      let player = {
        name: this.get('username'),
        health: 100
      };
      this.get('battle').save(player);
    },

    attack() {
      let oldHealth = this.get('model').get('firstObject').health;
      let name      = this.get('model').get('firstObject').name;
      let id        = this.get('model').get('firstObject').id;
      let player    = { id: id, name: name, health: oldHealth - 10 };

      if (oldHealth - 10 <= 0) {
        this.get('enemies').destroy(player);
      } else {
        this.get('enemies').update(player);
      }
    },

    newEnemy() {
      let enemy = {
        name: Ember.A(['Brothgar', 'Krag\'Nor', 'LagLear']).objectAt(Math.round(Math.random() * 2)),
        health: Math.round(Math.random() * (10 - 30) * -10)
      };

      this.get('enemies').save(enemy);
    }
  }

});

