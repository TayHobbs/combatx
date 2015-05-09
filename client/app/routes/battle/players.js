import Ember from 'ember';

export default Ember.Route.extend({
  battle: Ember.inject.service(),

  model() {
    return this.get('battle').find();
  }

});
