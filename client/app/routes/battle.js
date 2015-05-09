import Ember from 'ember';

export default Ember.Route.extend({
  enemies: Ember.inject.service(),

  model() {
    return this.get('enemies').find();
  }

});

