import Ember from 'ember';

export default Ember.Controller.extend({
  battle: Ember.inject.service(),

  actions: {
    addPlayer() {
      let player = this.store.createRecord('player', { name: this.get('name'), health: 100 });
      player.save();
      // let playerInfo = {
      //   name: 'Kieth',
      //   health: 100
      // }
      // console.log(playerInfo);
      // this.get('battle').save(playerInfo);
      this.set('name', '');
    }
  }

});
