import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.find('player');
  },

  actions: {

    newPlayer(player) {
      player.save();
    }

  }
});
