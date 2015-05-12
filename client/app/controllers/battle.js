import Ember from 'ember';

export default Ember.Controller.extend({
  players:  Ember.inject.service(),
  enemies: Ember.inject.service(),

  currentPlayers: Ember.computed(function() {
    let currentPlayers = Ember.A([]);
    this.get('players').find().then((players) => {
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
      if (message.verb === 'updated') {
        let player = Ember.ObjectProxy.create({ content: this.get('currentPlayers').findBy('id', message.data.id) });
        player.set('damageDealt',  message.data.damageDealt);
      }
    });

  }.on('init'),

  updateDamageDealt: function() {
    let oldDamageDealt = parseInt(this.get('localStorageProxy.damageDealt'));
    let player         = { id: this.get('localStorageProxy.id'), damageDealt: oldDamageDealt + 10 };

    this.set('localStorageProxy.damageDealt', oldDamageDealt + 10);
    this.get('players').update(player);
  },

  actions: {
    login() {
      this.set('localStorageProxy.username', this.get('username'));
      let player = {
        name: this.get('username'),
        health: 100,
        damageDealt: 0
      };
      this.get('players').save(player).then((player) => {
        this.set('localStorageProxy.id', player.id);
        this.set('localStorageProxy.damageDealt', player.damageDealt);
      });

    },

    attack() {
      this.updateDamageDealt();
      let oldHealth = this.get('model').get('firstObject').health;
      let name      = this.get('model').get('firstObject').name;
      let id        = this.get('model').get('firstObject').id;
      let enemy     = { id: id, name: name, health: oldHealth - 10 };

      if (oldHealth - 10 <= 0) {
        this.get('enemies').destroy(enemy);
      } else {
        this.get('enemies').update(enemy);
      }
    },

    newEnemy() {
      let enemy = {
        name: Ember.A(['Brothgar', 'Krag\'Nor', 'LagLear']).objectAt(Math.round(Math.random() * 2)),
        health: Math.round(Math.random() * (2500 - 3000) * -10)
      };

      this.get('enemies').save(enemy);
    }
  }

});
