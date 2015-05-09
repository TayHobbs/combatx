import Ember from 'ember';

export default Ember.Controller.extend({
  battle: Ember.inject.service(),
  enemies: Ember.inject.service(),

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

      this.get('enemies').update(player);
    },
    newEnemy() {
      let enemy = { name: 'Brothgar', health: 100 };
      this.get('enemies').save(enemy);
    }
  }

});
