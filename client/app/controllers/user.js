import Ember from 'ember';

export default Ember.Controller.extend({
  users: Ember.computed(function() {
   return this.store.find('user')
  }),
  actions: {
    createUser: function() {
      this.model.save();
    }
  }
});
