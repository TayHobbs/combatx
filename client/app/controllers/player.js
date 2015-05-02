import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createPlayer() {
      let player = this.store.createRecord('player', {
        name: this.get('name')
      });
      this.send('newPlayer', player);
      this.set('name', '');
    }
  }
});
