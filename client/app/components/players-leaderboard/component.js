import Ember from 'ember';

export default Ember.Component.extend({
  damageDealtDesc: ['damageDealt:desc'],
  playersByDamageDealt: Ember.computed.sort('players', 'damageDealtDesc')
});
