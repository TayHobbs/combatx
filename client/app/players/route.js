import Ember from 'ember';

export default Ember.Route.extend({
  battle: Ember.inject.service(),

  model() {
    return this.get('battle').find();
  },

  actions: {
    addPlayer() {
      let player = {
        name: 'Player 1',
        health: 100
      };
      this.get('battle').save(player);
    }
  }

});
